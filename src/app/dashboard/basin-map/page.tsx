'use client';

import { useState } from 'react';
import InteractiveBasinMap, { INITIAL_SAMPLE_NODES, NodePoint } from '@/components/InteractiveBasinMap';

export default function BasinMapPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-27');

  const activeNode = INITIAL_SAMPLE_NODES.find(
    (node: NodePoint) => String(node.id) === String(selectedNodeId)
  ) || INITIAL_SAMPLE_NODES[5];

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="mb-6 border-b border-emerald-900/60 pb-5">
        <p className="text-xs text-emerald-300 uppercase tracking-widest font-semibold mb-1">CASCADE / MONITORING</p>
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Interactive Basin Map
        </h1>
        <p className="text-xs text-emerald-400 mt-1">Live telemetry network and downstream propagation routes.</p>
      </header>

      {/* Main Map Container */}
      <div className="flex flex-col h-[700px] w-full">
        <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-6 flex flex-col h-full relative">
          <div className="flex justify-between items-center mb-4 z-30">
            <h3 className="text-xs text-white uppercase tracking-widest font-bold">Watershed Node Network</h3>
            <div className="border border-emerald-900/60 text-emerald-400 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/30">
              Live Data
            </div>
          </div>
          
          {/* Connected Interactive Map Component */}
          <div className="flex-1 w-full rounded-lg overflow-hidden relative">
            <InteractiveBasinMap activeNodeId={selectedNodeId} onNodeClick={setSelectedNodeId} />
          </div>
        </div>
      </div>

    </main>
  );
}