'use client';

import { useState } from 'react';
import InteractiveBasinMap, { INITIAL_SAMPLE_NODES, NodePoint } from '@/components/InteractiveBasinMap';

const styleMap = {
  nominal: { border: 'border-emerald-900/40', box: 'bg-emerald-500/10 border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]', text: 'text-emerald-400', bar: 'bg-emerald-500', risk: 'Nominal', pulse: 'bg-emerald-500 shadow-[0_0_10px_#10B981]' },
  warning: { border: 'border-amber-900/40', box: 'bg-amber-500/10 border-amber-500/20 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]', text: 'text-amber-400', bar: 'bg-amber-500', risk: 'Elevated', pulse: 'bg-amber-500 shadow-[0_0_10px_#F59E0B]' },
  critical: { border: 'border-red-900/40', box: 'bg-red-500/10 border-red-500/20 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]', text: 'text-red-500', bar: 'bg-red-500', risk: 'Critical', pulse: 'bg-red-500 shadow-[0_0_10px_#EF4444]' },
};

export default function DashboardPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-27');
  const [nodes, setNodes] = useState<NodePoint[]>(INITIAL_SAMPLE_NODES);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeNode = nodes.find(node => String(node.id) === String(selectedNodeId)) || nodes[5];
  const currentStyle = styleMap[activeNode.status as keyof typeof styleMap] || styleMap.nominal;

  // 1. Replaced the setTimeout mock with an async fetch targeting the live AWS backend
  const handleRunSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    try {
      const response = await fetch('http://65.0.21.127:8000/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ current_nodes: nodes }),
      });

      if (!response.ok) {
        throw new Error(`AWS Server Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // 2. Overwrite the frontend UI state with the live GraphSAGE predictions
      if (data.updated_nodes) {
        setNodes(data.updated_nodes);
      }
    } catch (error) {
      console.error('Simulation request failed:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Drought Impact Dashboard</h1>
        <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold mt-1">Monitor watershed vulnerability and live alerts</p>
      </header>

      {/* Top metrics summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Monitored Nodes</div>
          <div className="text-4xl font-bold text-white mb-1">128</div>
          <div className="text-[10px] text-emerald-500/70">Across sample watershed</div>
        </div>
        <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-5 flex flex-col justify-center relative">
          <div className="absolute top-5 right-5 text-emerald-400 text-xs">✓</div>
          <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Healthy Nodes</div>
          <div className="text-4xl font-bold text-emerald-400 mb-1">86</div>
          <div className="text-[10px] text-emerald-500/70">67% of monitored nodes</div>
        </div>
        <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-5 flex flex-col justify-center relative">
          <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Nodes At Risk</div>
          <div className="text-4xl font-bold text-amber-500 mb-1">29</div>
          <div className="text-[10px] text-emerald-500/70">Require continued monitoring</div>
        </div>
        <div className="bg-[#0A1713] border border-red-900/30 rounded-xl p-5 flex flex-col justify-center relative shadow-[inset_0_0_30px_rgba(239,68,68,0.03)]">
          <div className="absolute top-5 right-5 text-red-500 text-xs font-bold">!</div>
          <div className="text-[10px] text-red-500/80 uppercase tracking-widest font-bold mb-2">Critical Alerts</div>
          <div className="text-4xl font-bold text-red-500 mb-1">13</div>
          <div className="text-[10px] text-red-500/60">Review priority locations</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 flex flex-col h-full">
          <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-6 flex flex-col h-full min-h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs text-white uppercase tracking-widest font-bold">Watershed Node Network</h3>
              <div className="border border-emerald-900/60 text-emerald-400 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/30">Live Data</div>
            </div>
            
            <div className="flex-1 w-full rounded-lg overflow-hidden relative">
              <InteractiveBasinMap nodes={nodes} activeNodeId={selectedNodeId} onNodeClick={setSelectedNodeId} />
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-6">
            <h3 className="text-xs text-white uppercase tracking-widest font-bold mb-1">Node Details</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[9px] text-emerald-500 uppercase tracking-widest">Selected Location:</span>
              <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold">{activeNode.label}</span>
            </div>

            <div className={`rounded-lg border p-5 mb-8 flex justify-between items-center relative overflow-hidden ${currentStyle.box}`}>
              <div>
                <div className="text-[9px] text-emerald-500/80 uppercase tracking-widest font-bold mb-1">Current Status</div>
                <div className={`text-xl font-bold tracking-wider uppercase ${currentStyle.text}`}>{activeNode.status}</div>
              </div>
              <div className="relative">
                 <div className={`w-4 h-4 rounded-full ${currentStyle.pulse} animate-pulse absolute inset-0 opacity-40 blur-sm`}></div>
                 <div className={`w-4 h-4 rounded-full ${currentStyle.pulse} relative z-10 opacity-80`}></div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest">Soil Moisture</span>
                <span className={`text-[11px] font-bold ${currentStyle.text}`}>{activeNode.moisture}%</span>
              </div>
              <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${currentStyle.bar}`} style={{ width: `${activeNode.moisture}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#06110D] border border-emerald-900/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-500 uppercase tracking-widest mb-1">Drought Risk</span>
                <span className={`text-sm font-bold ${currentStyle.text}`}>{currentStyle.risk}</span>
              </div>
              <div className="bg-[#06110D] border border-emerald-900/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-500 uppercase tracking-widest mb-1">Flow Capacity</span>
                <span className="text-sm font-bold text-white">{activeNode.flowCapacity}%</span>
              </div>
            </div>
          </div>

          <div 
            onClick={handleRunSimulation}
            className={`bg-[#0A1713] border rounded-xl p-6 transition-all cursor-pointer group ${
              isSimulating 
                ? 'border-cyan-500/80 bg-cyan-950/20 animate-pulse' 
                : 'border-emerald-900/40 hover:border-emerald-500/60'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-white uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">
                {isSimulating ? 'Running Simulation...' : 'Run Simulation'}
              </h3>
              {isSimulating && (
                <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            <p className="text-[10px] text-emerald-500 leading-relaxed pr-2">
              Run the backend simulation and refresh the network impact data.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}