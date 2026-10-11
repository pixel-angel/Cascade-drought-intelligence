'use client';

import { useState } from 'react';

type Severity = 'Critical' | 'High' | 'Moderate' | 'Low';

interface Basin {
  id: string;
  name: string;
  area: string;
  rainfall: number;
  moisture: number;
  cropImpact: number;
  severity: Severity;
}

const BASINS: Basin[] = [
  { id: 'upper', name: 'Upper Basin', area: '12,400', rainfall: 62, moisture: 24, cropImpact: 38, severity: 'Critical' },
  { id: 'central', name: 'Central Basin', area: '8,600', rainfall: 74, moisture: 36, cropImpact: 26, severity: 'High' },
  { id: 'eastern', name: 'Eastern Basin', area: '5,300', rainfall: 83, moisture: 48, cropImpact: 17, severity: 'Moderate' },
  { id: 'lower', name: 'Lower Basin', area: '2,100', rainfall: 91, moisture: 64, cropImpact: 8, severity: 'Low' },
];

const getBarColor = (impact: number) => {
  if (impact > 30) return 'bg-red-500';
  if (impact > 20) return 'bg-amber-500';
  return 'bg-emerald-500';
};

const getSeverityStyles = (severity: Severity) => {
  switch (severity) {
    case 'Critical': return { text: 'text-red-400', border: 'border-red-900/60', bg: 'bg-red-950/20', bar: 'bg-red-500' };
    case 'High': return { text: 'text-amber-400', border: 'border-amber-900/60', bg: 'bg-amber-950/20', bar: 'bg-amber-500' };
    case 'Moderate': return { text: 'text-amber-200', border: 'border-amber-700/40', bg: 'bg-amber-950/10', bar: 'bg-amber-400' };
    case 'Low': return { text: 'text-emerald-400', border: 'border-emerald-800/60', bg: 'bg-emerald-950/20', bar: 'bg-emerald-500' };
  }
};

export default function ImpactAnalysisPage() {
  const [selectedId, setSelectedId] = useState<string>('upper');
  const [filter, setFilter] = useState<Severity | 'All'>('All');

  const selectedBasin = BASINS.find((b) => b.id === selectedId) || BASINS[0];
  const filteredBasins = filter === 'All' ? BASINS : BASINS.filter(b => b.severity === filter);

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header - Brightened secondary text, changed to CASCADE */}
      <header className="flex justify-between items-end mb-8 border-b border-emerald-900/60 pb-5">
        <div>
          <p className="text-xs text-emerald-300 uppercase tracking-widest font-semibold mb-1">CASCADE / Drought Intelligence</p>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Impact Analysis
          </h1>
          <p className="text-sm text-emerald-200/80 mt-1">
            Explore sample rainfall, soil moisture, and agricultural impact indicators.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg border border-emerald-700/50 bg-[#0A1713] text-xs text-emerald-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          Seasonal overview
        </div>
      </header>

      {/* Top KPI Cards - Unified borders, removed shadows, increased contrast */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0A1713] p-5 rounded-xl border border-emerald-800/60">
          <div className="text-xs uppercase tracking-wider text-emerald-300 mb-2 font-semibold">Watersheds monitored</div>
          <div className="text-3xl font-mono font-bold text-cyan-400">4</div>
        </div>
        <div className="bg-[#0A1713] p-5 rounded-xl border border-emerald-800/60">
          <div className="text-xs uppercase tracking-wider text-emerald-300 mb-2 font-semibold">Agricultural area</div>
          <div className="text-3xl font-mono font-bold text-emerald-400">28,400 <span className="text-sm text-emerald-500">ha</span></div>
        </div>
        <div className="bg-[#0A1713] p-5 rounded-xl border border-emerald-800/60">
          <div className="text-xs uppercase tracking-wider text-emerald-300 mb-2 font-semibold">High-risk watersheds</div>
          <div className="text-3xl font-mono font-bold text-amber-400">2</div>
        </div>
        <div className="bg-[#0A1713] p-5 rounded-xl border border-emerald-800/60">
          <div className="text-xs uppercase tracking-wider text-emerald-300 mb-2 font-semibold">Lowest soil moisture</div>
          <div className="text-3xl font-mono font-bold text-red-400">24%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Basin List */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="flex justify-between items-center px-1 mb-2">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-emerald-100">Watershed Impact Overview</h2>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as Severity | 'All')}
              className="bg-[#0A1713] border border-emerald-700/60 text-emerald-100 text-sm rounded-lg p-2 outline-none"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            {filteredBasins.map((basin) => {
              const styles = getSeverityStyles(basin.severity);
              const isSelected = selectedId === basin.id;
              
              return (
                <div 
                  key={basin.id}
                  onClick={() => setSelectedId(basin.id)}
                  className={`p-5 rounded-xl cursor-pointer transition-all border ${isSelected ? 'border-cyan-600 bg-[#0B1E17]' : 'border-emerald-800/60 bg-[#0A1713] hover:border-emerald-600/60'}`}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-white">{basin.name}</h3>
                      <p className="text-sm text-emerald-300/80 mt-1">{basin.area} ha</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs uppercase tracking-wider font-bold border ${styles.bg} ${styles.text} ${styles.border}`}>
                      {basin.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="flex justify-between text-xs text-emerald-200 uppercase mb-2 font-semibold">
                        <span>Rainfall</span>
                        <span className="font-mono">{basin.rainfall}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${basin.rainfall}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-emerald-200 uppercase mb-2 font-semibold">
                        <span>Moisture</span>
                        <span className="font-mono">{basin.moisture}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                        <div className={`h-full ${styles.bar}`} style={{ width: `${basin.moisture}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Details & Chart - Cleaned up hierarchy */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          
          <div className="bg-[#0A1713] p-6 rounded-xl border border-emerald-800/60">
            <div className="mb-6 border-b border-emerald-800/60 pb-4">
              <p className="text-xs text-emerald-300 uppercase tracking-widest font-semibold mb-1">Selected Region</p>
              <h3 className="text-2xl font-bold text-white">{selectedBasin.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#06110D] border border-emerald-800/40 rounded-lg p-4">
                <p className="text-xs text-emerald-300 uppercase font-semibold mb-2">Soil Moisture</p>
                <p className={`text-2xl font-mono font-bold ${getSeverityStyles(selectedBasin.severity).text}`}>{selectedBasin.moisture}%</p>
              </div>
              <div className="bg-[#06110D] border border-emerald-800/40 rounded-lg p-4">
                <p className="text-xs text-emerald-300 uppercase font-semibold mb-2">Crop Impact</p>
                <p className="text-2xl font-mono font-bold text-amber-500">{selectedBasin.cropImpact}%</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-4">
              <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">Interpretation</h4>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                This region is categorized as <strong className={getSeverityStyles(selectedBasin.severity).text}>{selectedBasin.severity.toUpperCase()}</strong> severity. 
                {selectedBasin.severity === 'Critical' ? ' Prioritize review of local conditions immediately.' : ' Continue standard baseline monitoring.'}
              </p>
            </div>
          </div>

          <div className="bg-[#0A1713] p-6 rounded-xl border border-emerald-800/60">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-emerald-100 mb-6">Crop Impact Comparison</h3>
            <div className="flex flex-col gap-5">
              {BASINS.map(basin => (
                <div key={basin.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={selectedId === basin.id ? 'text-white font-semibold' : 'text-emerald-200/90'}>{basin.name}</span>
                    <span className="font-mono text-emerald-100">{basin.cropImpact}%</span>
                  </div>
                  <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${getBarColor(basin.cropImpact)}`}
                      style={{ width: `${basin.cropImpact}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}