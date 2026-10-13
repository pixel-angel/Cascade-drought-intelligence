from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Link to the ML engine directory to access your GNN model
sys.path.append(os.path.abspath("../ml-engine"))
from inference import run_simulation, nodes_df

app = FastAPI(title="ADIG Drought Simulation API")

# Enable CORS so the Next.js frontend can make requests without browser blocks
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationRequest(BaseModel):
    node_id: int
    new_capacity: float

@app.get("/")
def read_root():
    return {"status": "online", "message": "ADIG Simulation Engine Running"}

@app.get("/nodes")
def get_all_nodes():
    """Returns the base state of all 50 nodes for initial frontend map rendering."""
    return nodes_df.to_dict(orient="records")

@app.post("/simulate")
def simulate(payload: SimulationRequest):
    """
    Receives slider inputs from the UI, modifies reservoir capacity,
    and runs a forward pass through the GraphSAGE model.
    """
    if payload.node_id not in nodes_df['node_id'].values:
        raise HTTPException(status_index=404, detail="Node ID not found in basin topology")
    
    try:
        updated_scores = run_simulation(
            target_node_id=payload.node_id, 
            new_capacity=payload.new_capacity
        )
        return {
            "status": "success",
            "modified_node": payload.node_id,
            "new_capacity": payload.new_capacity,
            "downstream_impact": updated_scores
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))