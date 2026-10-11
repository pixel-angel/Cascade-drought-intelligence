'use client';

import React, { useState } from 'react';

const STEPS = [
  { id: 1, label: '01', title: 'Data' },
  { id: 2, label: '02', title: 'Simulation' },
  { id: 3, label: '03', title: 'Impact' },
  { id: 4, label: '04', title: 'AI Advise' },
  { id: 5, label: '05', title: 'Report' },
];

export default function SimulationTimeline() {
  const [activeStep, setActiveStep] = useState(2);

  // Calculate how far the glowing blue bar should stretch
  const progressPercentage = ((activeStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="glass-panel p-5 rounded-2xl w-full border border-emerald-900/40">
      <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-4">
        Predictive Simulation Timeline
      </div>

      <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4 py-2">
        {/* Background Dark Track */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 rounded-full bg-emerald-950/80 border border-emerald-800/50 z-0" />
        
        {/* Animated Glowing Progress Bar */}
        <div 
          className="absolute left-8 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_12px_#38bdf8] transition-all duration-500 ease-out z-0"
          style={{ width: `calc(${progressPercentage}% - 2rem)` }}
        />

        {/* Pipeline Nodes */}
        {STEPS.map((step) => {
          const isActive = step.id === activeStep;
          const isDone = step.id < activeStep;

          return (
            <div 
              key={step.id} 
              onClick={() => setActiveStep(step.id)}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 border ${
                  isActive
                    ? 'bg-gradient-to-b from-cyan-400 to-emerald-600 text-slate-950 border-white shadow-[0_0_18px_#38BDF8] scale-110'
                    : isDone
                    ? 'bg-[#0B1713] text-emerald-400 border-cyan-500 shadow-[inset_0_0_10px_rgba(56,189,248,0.3)]'
                    : 'bg-[#0B1713] text-emerald-600 border-emerald-900/60'
                }`}
              >
                {step.label}
              </div>
              <span className={`mt-2 text-xs font-medium tracking-tight transition-colors duration-300 ${isActive ? 'text-cyan-300' : 'text-emerald-400/80'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}