'use client';

import React, { useState } from 'react';

export default function SimulationControls() {
  const [timeStep, setTimeStep] = useState(6);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    // Fake a processing delay for the UI prototype
    setTimeout(() => {
      setIsSimulating(false);
      alert("Simulation Complete! Node 27 and 33 require immediate attention based on a 6-month severe drought scenario.");
    }, 2500);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40 w-full flex flex-col gap-6">
      <h3 className="text-emerald-100 font-semibold tracking-wide text-sm uppercase">
        Drought Simulation Controls
      </h3>

      {/* Time Step Slider */}
      <div>
        <div className="flex justify-between text-xs text-emerald-300/80 mb-2 font-medium">
          <span>Time Step (months)</span>
          <span className="text-emerald-400 font-mono">{timeStep}</span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          value={timeStep}
          onChange={(e) => setTimeStep(Number(e.target.value))}
          className="w-full h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-cyan-400 shadow-[0_0_10px_#38BDF8]"
        />
      </div>

      {/* Severity Dropdown */}
      <div>
        <label className="block text-xs text-emerald-300/80 mb-2 font-medium">
          Drought Severity
        </label>
        <select className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 outline-none">
          <option>Moderate (-30% rainfall)</option>
          <option>Severe (-50% rainfall)</option>
          <option>Extreme (-70% rainfall)</option>
        </select>
      </div>

      {/* Glowing Run Button with Loading State */}
      <button 
        onClick={handleRunSimulation}
        disabled={isSimulating}
        className={`relative group w-full overflow-hidden rounded-xl p-[1px] mt-2 transition-all ${isSimulating ? 'opacity-80 cursor-wait' : ''}`}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-500 to-cyan-400 rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
        <div className="relative bg-[#06110D] px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-bold tracking-widest uppercase text-sm group-hover:text-white transition-colors">
            {isSimulating ? 'Processing Model...' : 'Run Simulation'}
          </span>
        </div>
      </button>
    </div>
  );
}