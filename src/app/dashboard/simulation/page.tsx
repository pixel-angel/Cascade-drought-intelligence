'use client';

import { useState } from 'react';

const TIMELINE_STEPS = [
  { id: 1, label: 'Data' },
  { id: 2, label: 'Simulation' },
  { id: 3, label: 'Impact' },
  { id: 4, label: 'AI Advise' },
  { id: 5, label: 'Report' },
];

const MOCK_IMPACT_DATA = [
  { node: 'Node_0_Reservoir', value: 0.0691 },
  { node: 'Node_1_Reservoir', value: 0.5573 },
  { node: 'Node_2_Reservoir', value: 0.5546 },
  { node: 'Node_3_Reservoir', value: 0.5608 },
  { node: 'Node_4_Reservoir', value: 0.5561 },
  { node: 'Node_5_Farm', value: 0.5484 },
  { node: 'Node_6_Farm', value: 0.5390 },
  { node: 'Node_7_Farm', value: 0.5349 },
  { node: 'Node_8_Farm', value: 0.5494 },
];

export default function SimulationPage() {
  const [timeStep, setTimeStep] = useState(7);
  const [severity, setSeverity] = useState('Moderate (-30% rainfall)');
  
  // Animation States
  const [activeStep, setActiveStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Awaiting simulation parameters...']);

  const handleRunSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setHasResults(false);
    setActiveStep(1);
    setLogs(['[SYSTEM] Initializing CASCADE simulation engine...']);

    // Sequence the timeline progression to simulate backend processing
    setTimeout(() => {
      setActiveStep(2);
      setLogs(prev => [...prev, '[DATA] Telemetry baseline established.', '[SIMULATION] Injecting parameters...']);
    }, 800);

    setTimeout(() => {
      setActiveStep(3);
      setLogs(prev => [...prev, '[SIMULATION] Processing hydrodynamic models...', '[IMPACT] Calculating downstream propagation...']);
    }, 1800);

    setTimeout(() => {
      setActiveStep(4);
      setLogs(prev => [...prev, '[IMPACT] Node calculations complete.', '[AI ADVISE] Generating mitigation strategies...']);
    }, 2800);

    setTimeout(() => {
      setActiveStep(5);
      setLogs(prev => [...prev, '[REPORT] Compiling final diagnostics.']);
      setIsSimulating(false);
      setHasResults(true);
    }, 3800);
  };

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="mb-8 border-b border-emerald-900/60 pb-5">
        <p className="text-xs text-emerald-300 uppercase tracking-widest font-semibold mb-1">CASCADE / Engine</p>
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Predictive Simulation
        </h1>
      </header>

      {/* Dynamic Timeline */}
      <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <h3 className="text-xs text-emerald-500 uppercase tracking-widest font-bold mb-8 relative z-10">Predictive Simulation Timeline</h3>
        
        <div className="relative z-10 flex items-center justify-between w-full max-w-4xl mx-auto px-4">
          {/* Connecting Background Line */}
          <div className="absolute top-1/2 left-[5%] right-[5%] h-1 bg-emerald-950 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Active Progress Line */}
          <div 
            className="absolute top-1/2 left-[5%] h-1 bg-cyan-400 -translate-y-1/2 z-0 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_#38BDF8]"
            style={{ width: `${((activeStep - 1) / (TIMELINE_STEPS.length - 1)) * 90}%` }}
          />

          {TIMELINE_STEPS.map((step) => {
            const isCompleted = step.id < activeStep;
            const isCurrent = step.id === activeStep;
            const isPending = step.id > activeStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold border-2 transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-[#040D0A] border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                      : isCurrent 
                        ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.6)] scale-110'
                        : 'bg-[#0A1713] border-emerald-900/60 text-emerald-700'
                  }`}
                >
                  0{step.id}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors ${
                  isCompleted ? 'text-cyan-500' : isCurrent ? 'text-white' : 'text-emerald-800'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#0A1713] border border-emerald-900/40 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Simulation Controls</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs text-emerald-400 font-semibold">Time Step (months)</label>
                <span className="text-cyan-400 font-mono font-bold">{timeStep}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="12" 
                value={timeStep} 
                onChange={(e) => setTimeStep(Number(e.target.value))}
                className="w-full accent-cyan-500 outline-none h-1.5 bg-emerald-950 rounded-full appearance-none cursor-pointer"
                disabled={isSimulating}
              />
            </div>

            <div className="mb-8">
              <label className="text-xs text-emerald-400 font-semibold block mb-3">Drought Severity</label>
              <select 
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                disabled={isSimulating}
                className="w-full bg-[#06110D] border border-emerald-800/60 text-emerald-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-3 outline-none cursor-pointer"
              >
                <option>Low (-10% rainfall)</option>
                <option>Moderate (-30% rainfall)</option>
                <option>High (-50% rainfall)</option>
                <option>Critical (-70% rainfall)</option>
              </select>
            </div>

            <button 
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                isSimulating 
                  ? 'bg-emerald-950/40 text-emerald-600 border border-emerald-900/40 cursor-not-allowed'
                  : 'bg-transparent border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
              }`}
            >
              {isSimulating ? 'Processing...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {/* Right Column: Upgraded Backend Response Terminal */}
        <div className="lg:col-span-8">
          <div className="bg-[#040D0A] border border-emerald-900/40 rounded-xl overflow-hidden h-full flex flex-col font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            
            {/* Terminal Header */}
            <div className="bg-[#0A1713] border-b border-emerald-900/40 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-900/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-900/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/60"></span>
                </div>
                <span className="text-[10px] text-emerald-600 ml-2 tracking-widest">CASCADE // ENGINE_OUTPUT</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-cyan-500 uppercase tracking-widest">
                {isSimulating ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> Executing</>
                ) : hasResults ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Completed</>
                ) : (
                  <><span className="w-1.5 h-1.5 rounded-full bg-emerald-900"></span> Standby</>
                )}
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Logs View (Shows while waiting or simulating) */}
              {(!hasResults || isSimulating) && (
                <div className="flex flex-col gap-2">
                  {logs.map((log, i) => (
                    <div key={i} className="text-xs text-emerald-400/70 animate-fade-in-up">
                      <span className="text-emerald-700 mr-2">{'>'}</span> {log}
                    </div>
                  ))}
                  {isSimulating && (
                    <div className="text-xs text-cyan-400 mt-2 animate-pulse">
                      <span className="text-cyan-700 mr-2">{'>'}</span> _
                    </div>
                  )}
                </div>
              )}

              {/* Data Visualization View (Shows when complete) */}
              {hasResults && !isSimulating && (
                <div className="animate-fade-in-up">
                  
                  {/* Top Level Summary Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="border border-emerald-900/40 rounded bg-[#06110D] p-3">
                      <div className="text-[9px] text-emerald-600 uppercase mb-1">Status</div>
                      <div className="text-sm text-emerald-400 font-bold">SUCCESS</div>
                    </div>
                    <div className="border border-emerald-900/40 rounded bg-[#06110D] p-3">
                      <div className="text-[9px] text-emerald-600 uppercase mb-1">Modified Node</div>
                      <div className="text-sm text-cyan-400 font-bold">0</div>
                    </div>
                    <div className="border border-emerald-900/40 rounded bg-[#06110D] p-3">
                      <div className="text-[9px] text-emerald-600 uppercase mb-1">New Capacity</div>
                      <div className="text-sm text-amber-400 font-bold">50%</div>
                    </div>
                  </div>

                  <div className="text-xs text-emerald-500 uppercase tracking-widest font-bold mb-4 border-b border-emerald-900/40 pb-2">
                    Downstream Impact Analysis
                  </div>

                  {/* Parsed JSON Data Graphics */}
                  <div className="flex flex-col gap-3">
                    {MOCK_IMPACT_DATA.map((data, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="w-32 text-[10px] text-emerald-400/80 truncate">
                          {data.node}
                        </div>
                        <div className="flex-1 h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ease-out ${data.value > 0.5 ? 'bg-cyan-500' : 'bg-red-500'}`}
                            style={{ width: `${data.value * 100}%` }}
                          />
                        </div>
                        <div className={`w-16 text-right text-[10px] font-bold ${data.value > 0.5 ? 'text-cyan-400' : 'text-red-400'}`}>
                          {data.value.toFixed(4)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}