'use client';

import { useState } from 'react';

type MetricTab = 'Rainfall' | 'Soil Moisture' | 'Water Level';

// Different datasets for each tab to make the graphs actually change!
const DATA_SETS: Record<MetricTab, { month: string; value: number }[]> = {
  'Rainfall': [
    { month: 'Jan', value: 82 }, { month: 'Feb', value: 68 }, { month: 'Mar', value: 91 },
    { month: 'Apr', value: 54 }, { month: 'May', value: 43 }, { month: 'Jun', value: 29 },
    { month: 'Jul', value: 47 }, { month: 'Aug', value: 35 }, { month: 'Sep', value: 61 },
    { month: 'Oct', value: 74 }, { month: 'Nov', value: 88 }, { month: 'Dec', value: 96 },
  ],
  'Soil Moisture': [
    { month: 'Jan', value: 65 }, { month: 'Feb', value: 60 }, { month: 'Mar', value: 75 },
    { month: 'Apr', value: 45 }, { month: 'May', value: 38 }, { month: 'Jun', value: 24 },
    { month: 'Jul', value: 30 }, { month: 'Aug', value: 28 }, { month: 'Sep', value: 42 },
    { month: 'Oct', value: 55 }, { month: 'Nov', value: 62 }, { month: 'Dec', value: 70 },
  ],
  'Water Level': [
    { month: 'Jan', value: 90 }, { month: 'Feb', value: 85 }, { month: 'Mar', value: 88 },
    { month: 'Apr', value: 75 }, { month: 'May', value: 60 }, { month: 'Jun', value: 45 },
    { month: 'Jul', value: 40 }, { month: 'Aug', value: 35 }, { month: 'Sep', value: 50 },
    { month: 'Oct', value: 65 }, { month: 'Nov', value: 78 }, { month: 'Dec', value: 85 },
  ]
};

export default function DataGraphsPage() {
  const [activeTab, setActiveTab] = useState<MetricTab>('Rainfall');

  const currentData = DATA_SETS[activeTab];
  
  // Dynamically calculate insights based on the active tab's data
  const values = currentData.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const avgVal = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  const minMonth = currentData.find(d => d.value === minVal)?.month;
  const maxMonth = currentData.find(d => d.value === maxVal)?.month;
  const latestVal = currentData[currentData.length - 1].value;

  // SVG Line Chart calculations
  const maxH = 200;
  const stepX = 1000 / 11;
  const points = currentData.map((d, i) => `${i * stepX},${maxH - (d.value / 100) * maxH}`).join(' ');

  // Determine unit based on tab
  const getUnit = () => activeTab === 'Rainfall' ? 'mm' : '%';

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-end mb-6 border-b border-emerald-900/40 pb-5">
        <div>
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold mb-1">CASCADE / Analytics</p>
          <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Data Graphs
          </h1>
          <p className="text-xs text-emerald-400/80 mt-1">
            Explore rainfall patterns, soil moisture trends, and water availability.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1.5 rounded-lg border border-emerald-800/50 bg-[#0A1713] text-[10px] text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Demonstration data
          </div>
          <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_#38BDF8] transition-shadow">
            ↓ Export CSV
          </button>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="mb-6 border border-amber-900/40 bg-amber-950/20 rounded-xl p-3 flex items-start gap-3">
        <span className="text-amber-500 text-sm">ⓘ</span>
        <p className="text-xs text-amber-200/70">
          These readings are illustrative and do not represent live sensor measurements. Drought risk is not inferred from these readings.
        </p>
      </div>

      {/* Top KPI Cards (Dynamic) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Period average', value: avgVal, unit: getUnit(), note: `Average ${activeTab.toLowerCase()}`, color: 'text-emerald-300' },
          { label: 'Highest reading', value: maxVal.toString(), unit: getUnit(), note: `Recorded in ${maxMonth}`, color: 'text-cyan-400' },
          { label: 'Lowest reading', value: minVal.toString(), unit: getUnit(), note: `Recorded in ${minMonth}`, color: 'text-amber-400' },
          { label: 'Latest reading', value: latestVal.toString(), unit: getUnit(), note: 'Dec reading', color: 'text-emerald-100' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl border border-emerald-900/40">
            <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">{stat.label}</div>
            <div className={`text-3xl font-mono font-bold ${stat.color} drop-shadow-md`}>
              {stat.value} <span className="text-sm font-sans text-emerald-600">{stat.unit}</span>
            </div>
            <div className="text-xs text-emerald-600/80 mt-1">{stat.note}</div>
          </div>
        ))}
      </div>

      {/* Main Line Chart Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-emerald-100">{activeTab} Trend</h3>
            <p className="text-[10px] text-emerald-500 mt-1">Monthly indicator readings for the selected period.</p>
          </div>
          <div className="flex gap-2">
            {(['Rainfall', 'Soil Moisture', 'Water Level'] as MetricTab[]).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(56,189,248,0.2)]' : 'bg-[#0A1713] text-emerald-500 border border-emerald-800/50 hover:bg-emerald-900/30'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Native SVG Line Chart */}
        <div className="relative w-full h-[250px] mt-8">
          <svg viewBox="0 -20 1000 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Grid Lines */}
            {[0, 50, 100].map(y => (
              <line key={y} x1="0" y1={maxH - (y/100)*maxH} x2="1000" y2={maxH - (y/100)*maxH} stroke="#064E3B" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            {/* Gradient Fill */}
            <defs>
              <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon points={`0,${maxH} ${points} 1000,${maxH}`} fill="url(#areaGlow)" className="transition-all duration-500 ease-in-out" />
            {/* The Line */}
            <polyline points={points} fill="none" stroke="#38BDF8" strokeWidth="4" className="drop-shadow-[0_0_8px_#38BDF8] transition-all duration-500 ease-in-out" />
            {/* Data Dots */}
            {currentData.map((d, i) => (
              <circle key={i} cx={i * stepX} cy={maxH - (d.value / 100) * maxH} r="5" fill="#06110D" stroke="#38BDF8" strokeWidth="3" className="drop-shadow-[0_0_5px_#38BDF8] hover:r-8 transition-all duration-500 ease-in-out cursor-pointer" />
            ))}
          </svg>
          
          {/* X-Axis Labels */}
          <div className="flex justify-between w-full mt-4 text-xs text-emerald-500 font-mono">
            {currentData.map(d => <span key={d.month}>{d.month}</span>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bar Chart Panel (Dynamic) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-emerald-900/40">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-emerald-100 mb-1">Monthly Comparison</h3>
          <p className="text-[10px] text-emerald-500 mb-6">Compare individual monthly readings.</p>
          
          <div className="flex items-end justify-between h-[200px] mt-4 pt-4 border-b border-emerald-900/50 pb-2 gap-1">
            {currentData.map((d) => {
              const isLowest = d.value === minVal;
              return (
                <div key={d.month} className="flex flex-col items-center justify-end w-full h-full group">
                  <span className={`text-[10px] font-mono mb-2 opacity-0 group-hover:opacity-100 transition-opacity ${isLowest ? 'text-amber-400' : 'text-cyan-300'}`}>
                    {d.value}
                  </span>
                  <div 
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-500 ease-in-out hover:brightness-125 ${isLowest ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-cyan-600/80 shadow-[0_0_10px_rgba(8,145,178,0.3)]'}`} 
                    style={{ height: `${d.value}%` }} 
                  />
                  <span className="text-[10px] text-emerald-600 mt-2">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-[10px] text-emerald-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-cyan-600 rounded-full" /> Monthly reading</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_5px_#F59E0B]" /> Lowest reading</span>
          </div>
        </div>

        {/* Insights Panel (Dynamic) */}
        <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-emerald-100 mb-1">What the data tells us</h3>
          <p className="text-[10px] text-emerald-500 mb-6">Insights calculated from the selected readings.</p>
          
          <div className="flex flex-col gap-4">
            <div className="bg-[#0A1713] border border-emerald-800/40 rounded-xl p-4 flex gap-3">
              <span className="text-emerald-400">⏱️</span>
              <div>
                <p className="text-xs text-emerald-100 font-semibold mb-1">Period average</p>
                <p className="text-[10px] text-emerald-500/80">The average {activeTab.toLowerCase()} reading was {avgVal} {getUnit()}.</p>
              </div>
            </div>
            <div className="bg-[#0A1713] border border-emerald-800/40 rounded-xl p-4 flex gap-3">
              <span className="text-cyan-400">↗️</span>
              <div>
                <p className="text-xs text-emerald-100 font-semibold mb-1">Highest reading</p>
                <p className="text-[10px] text-emerald-500/80">{maxMonth} recorded {maxVal} {getUnit()}, the highest value in this period.</p>
              </div>
            </div>
            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 flex gap-3 shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]">
              <span className="text-amber-400">↘️</span>
              <div>
                <p className="text-xs text-amber-200 font-semibold mb-1">Lowest reading</p>
                <p className="text-[10px] text-amber-500/80">{minMonth} recorded {minVal} {getUnit()}, the lowest value in this period.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table (Dynamic) */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-emerald-100">Monthly Readings</h3>
            <p className="text-[10px] text-emerald-500 mt-1">Detailed readings for {activeTab.toLowerCase()}.</p>
          </div>
          <span className="px-3 py-1 bg-[#0A1713] border border-emerald-800/50 rounded-full text-[10px] text-emerald-400 font-mono">12 records</span>
        </div>
        
        <div className="w-full text-left text-xs text-emerald-100">
          <div className="grid grid-cols-3 py-3 border-b border-emerald-800/60 text-[10px] uppercase tracking-wider text-emerald-500">
            <div>Month</div>
            <div className="text-center">Indicator</div>
            <div className="text-right">Reading</div>
          </div>
          {currentData.map((d) => (
            <div key={d.month} className="grid grid-cols-3 py-3 border-b border-emerald-900/30 hover:bg-emerald-900/20 transition-colors">
              <div className="font-semibold text-emerald-300">{d.month}</div>
              <div className="text-center text-emerald-500/80">{activeTab}</div>
              <div className="text-right font-mono font-bold text-cyan-300">{d.value} {getUnit()}</div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}