'use client';

import React from 'react';

export default function TelemetryMetrics() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40 w-full flex flex-col gap-5">
      <h3 className="text-emerald-100 font-semibold tracking-wide text-sm uppercase mb-1">
        Key Metrics
      </h3>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#06110D]/60 border border-emerald-800/40 rounded-xl p-3 flex flex-col items-center justify-center shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]">
          <span className="text-2xl font-mono font-bold text-emerald-400">
            <span className="text-cyan-300 drop-shadow-[0_0_8px_#38BDF8]">18</span> / 50
          </span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-500 mt-1">High-Risk Nodes</span>
        </div>
        <div className="bg-[#06110D]/60 border border-emerald-800/40 rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-2xl font-mono font-bold text-red-400 drop-shadow-[0_0_8px_#EF4444]">-32%</span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-500 mt-1">Crop Yield</span>
        </div>
        <div className="bg-[#06110D]/60 border border-emerald-800/40 rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-xl font-mono font-semibold text-amber-400">-28%</span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-500 mt-1">Soil Moisture</span>
        </div>
        <div className="bg-[#06110D]/60 border border-emerald-800/40 rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-xl font-mono font-semibold text-emerald-100">50</span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-500 mt-1">Total Nodes</span>
        </div>
      </div>

      {/* Live Sparkline */}
      <div className="mt-2">
        <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Live Telemetry Sparklines</div>
        <svg viewBox="0 -5 100 30" className="w-full h-16 mt-4 overflow-visible drop-shadow-[0_0_6px_#38BDF8]">
          <defs>
             <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
               <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
             </linearGradient>
          </defs>
          <g className="animate-[pulse_2s_ease-in-out_infinite]">
            <path 
              d="M0,15 Q5,2 10,12 T20,10 T30,18 T40,4 T50,15 T60,5 T70,18 T80,8 T90,16 T100,5" 
              fill="none" 
              stroke="#38BDF8" 
              strokeWidth="1.5"
              className="drop-shadow-[0_0_4px_#38BDF8]"
            />
            <path 
              d="M0,15 Q5,2 10,12 T20,10 T30,18 T40,4 T50,15 T60,5 T70,18 T80,8 T90,16 T100,5 L100,25 L0,25 Z" 
              fill="url(#lineGlow)" 
            />
          </g>
        </svg>
      </div>
    </div>
  );
}