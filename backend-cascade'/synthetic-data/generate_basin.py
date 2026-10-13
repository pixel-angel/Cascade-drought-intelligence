import pandas as pd
import numpy as np

NUM_NODES = 50
NUM_RESERVOIRS = 5
NUM_EDGES = 100

# 1. GENERATE NODES
# Simulating coordinates roughly around central India
lats = np.random.uniform(20.0, 22.0, NUM_NODES)
lons = np.random.uniform(78.0, 80.0, NUM_NODES)

nodes_data = {
    'node_id': range(NUM_NODES),
    'lat': lats,
    'lon': lons,
    'node_type': [1 if i < NUM_RESERVOIRS else 0 for i in range(NUM_NODES)], # 0-4 are reservoirs, 5-49 are farms
    'base_moisture': np.random.uniform(0.3, 1.0, NUM_NODES),
    'current_capacity': np.random.uniform(0.5, 1.0, NUM_NODES) # Start mostly full
}
nodes_df = pd.DataFrame(nodes_data)
nodes_df.to_csv('nodes.csv', index=False)

# 2. GENERATE DIRECTED EDGES (Flowing downstream)
edges = set()
while len(edges) < NUM_EDGES:
    source = np.random.randint(0, NUM_NODES - 1)
    target = np.random.randint(source + 1, NUM_NODES) # Forces directional flow
    edges.add((source, target))

sources, targets = zip(*edges)
edges_data = {
    'source_id': sources,
    'target_id': targets,
    'flow_capacity': np.random.uniform(10.0, 100.0, len(edges))
}
edges_df = pd.DataFrame(edges_data)
edges_df.to_csv('edges.csv', index=False)

print("Generated nodes.csv and edges.csv successfully.")