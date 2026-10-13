import torch
import pandas as pd
from model_pipeline import DirectedDroughtSAGE, data, nodes_df

# Load the trained model (we are using the untrained weights from your pipeline for now)
model = DirectedDroughtSAGE(in_channels=3, hidden_channels=16, out_channels=1)
model.eval()

def run_simulation(target_node_id: int, new_capacity: float) -> dict:
    """
    Simulates a drought scenario by altering a node's capacity and 
    running a forward pass to see the downstream impact.
    """
    print(f"\n--- SIMULATION RUNNING ---")
    print(f"Action: Dropping Node {target_node_id} capacity to {new_capacity}")
    
    # 1. Clone the original graph data so we don't permanently corrupt the baseline
    sim_data = data.clone()
    
    # 2. Find the index of the node we want to modify
    # (Feature index 2 corresponds to 'current_capacity' based on our schema)
    node_idx = nodes_df.index[nodes_df['node_id'] == target_node_id].tolist()[0]
    
    # 3. Apply the drought shock to the tensor
    sim_data.x[node_idx, 2] = new_capacity
    
    # 4. Run the model to see the cascading downstream effects
    with torch.no_grad():
        new_predictions = model(sim_data.x, sim_data.edge_index)
        
    # 5. Format the output as a JSON-friendly dictionary for Kashish's API
    results = {}
    for i, score in enumerate(new_predictions):
        node_type = "Reservoir" if nodes_df['node_type'][i] == 1 else "Farm"
        results[f"Node_{i}_{node_type}"] = round(score.item(), 4)
        
    return results

# Test the scenario: What happens if Reservoir 0 suddenly drops to 10% capacity?
if __name__ == "__main__":
    baseline_results = run_simulation(target_node_id=0, new_capacity=0.8) # Normal
    drought_results = run_simulation(target_node_id=0, new_capacity=0.1)  # Disaster
    
    print("\nBaseline Scores:", baseline_results)
    print("Drought Scores: ", drought_results)