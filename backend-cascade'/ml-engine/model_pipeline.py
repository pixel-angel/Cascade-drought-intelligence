import torch
import torch.nn.functional as F
import pandas as pd
from torch_geometric.data import Data
from torch_geometric.nn import SAGEConv

# 1. LOAD GENERATED BASIN DATA FROM AWS S3 (Anonymous Access)
nodes_df = pd.read_csv('s3://adig-basin-data/nodes.csv', storage_options={'anon': True})
edges_df = pd.read_csv('s3://adig-basin-data/edges.csv', storage_options={'anon': True})

# 2. CONSTRUCT PYTORCH GEOMETRIC DATA OBJECT
node_features = nodes_df[['node_type', 'base_moisture', 'current_capacity']].values
x = torch.tensor(node_features, dtype=torch.float)

# Edge indices: shape [2, num_edges]
edge_index = torch.tensor(edges_df[['source_id', 'target_id']].values.T, dtype=torch.long)
edge_weight = torch.tensor(edges_df['flow_capacity'].values, dtype=torch.float)

data = Data(x=x, edge_index=edge_index, edge_attr=edge_weight)

# 3. DEFINE THE GRAPHSAGE MODEL
class DirectedDroughtSAGE(torch.nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels):
        super(DirectedDroughtSAGE, self).__init__()
        self.conv1 = SAGEConv(in_channels, hidden_channels, flow="source_to_target")
        self.conv2 = SAGEConv(hidden_channels, hidden_channels, flow="source_to_target")
        self.regressor = torch.nn.Linear(hidden_channels, out_channels)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=0.2, training=self.training)
        x = self.conv2(x, edge_index)
        x = F.relu(x)
        return torch.sigmoid(self.regressor(x))

# 4. RUN FORWARD PASS & SAVE WEIGHTS
model = DirectedDroughtSAGE(in_channels=3, hidden_channels=16, out_channels=1)
model.eval()

with torch.no_grad():
    predictions = model(data.x, data.edge_index)

print("Graph Nodes Shape:", data.x.shape)
print("Graph Edges Shape:", data.edge_index.shape)

torch.save(model.state_dict(), 'drought_sage_weights.pth')
print("Model weights for 50-node cloud-connected graph saved successfully!")