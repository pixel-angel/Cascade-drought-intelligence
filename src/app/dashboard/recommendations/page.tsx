'use client';

import { useState, useEffect } from 'react';

type Priority = 'High' | 'Medium' | 'Low';
type Category = 'All' | 'Water' | 'Agriculture' | 'Monitoring';

interface Recommendation {
  id: string;
  category: Category;
  priority: Priority;
  title: string;
  desc: string;
  why: string;
  icon: string;
}

const DEFAULT_RECOMMENDATIONS: Recommendation[] = [
  { id: 'r1', category: 'Water', priority: 'High', title: 'Prioritize water conservation', desc: 'Review water use and identify opportunities to reduce avoidable losses across the watershed.', why: 'Useful when water availability is under pressure.', icon: '💧' },
  { id: 'r2', category: 'Agriculture', priority: 'High', title: 'Review irrigation schedules', desc: 'Use local soil moisture and weather information to guide irrigation decisions.', why: 'Helps inform water-efficient farm planning.', icon: '🌱' },
  { id: 'r3', category: 'Monitoring', priority: 'Medium', title: 'Monitor soil moisture', desc: 'Track soil moisture readings over time to help identify changing conditions.', why: 'Helps detect changes in soil water availability.', icon: '📡' },
  { id: 'r4', category: 'Agriculture', priority: 'Medium', title: 'Review crop water requirements', desc: 'Review crop stage, local conditions, and available agricultural guidance before making planting decisions.', why: 'Supports informed agricultural planning.', icon: '🌾' },
  { id: 'r5', category: 'Water', priority: 'Medium', title: 'Review water storage readiness', desc: 'Review storage capacity, infrastructure condition, and local water management plans.', why: 'Supports preparation for periods of low water availability.', icon: '🌊' },
  { id: 'r6', category: 'Monitoring', priority: 'Low', title: 'Strengthen drought monitoring', desc: 'Maintain a consistent record of rainfall, reservoir levels, and watershed indicators.', why: 'Improves visibility into changing watershed conditions.', icon: '📊' },
];

export default function RecommendationsPage() {
  // Converted static recommendations to dynamic state
  const [recommendations, setRecommendations] = useState<Recommendation[]>(DEFAULT_RECOMMENDATIONS);
  const [filterCat, setFilterCat] = useState<Category>('All');
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(false);

  // Fetch live recommendations from AWS EC2 backend on mount
  useEffect(() => {
    const fetchLiveRecommendations = async () => {
      try {
        const response = await fetch('http://65.0.21.127:8000/recommendations');
        if (response.ok) {
          const data = await response.json();
          if (data.recommendations && data.recommendations.length > 0) {
            setRecommendations(data.recommendations);
            setIsLive(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch live recommendations, falling back to demo data:', error);
      }
    };

    fetchLiveRecommendations();
  }, []);

  const handleReview = (id: string) => {
    setReviewedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredRecs = filterCat === 'All' ? recommendations : recommendations.filter(r => r.category === filterCat);
  const highPriorityCount = recommendations.filter(r => r.priority === 'High').length;

  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'bg-red-950/40 text-red-400 border-red-900/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]';
      case 'Medium': return 'bg-amber-950/40 text-amber-400 border-amber-900/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Low': return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
    }
  };

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-end mb-6 border-b border-emerald-900/40 pb-5">
        <div>
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold mb-1">CASCADE / Decision Support</p>
          <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Recommendations
          </h1>
          <p className="text-xs text-emerald-400/80 mt-1">
            Explore practical actions for water conservation, agricultural planning, and drought preparedness.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-[10px] uppercase ${isLive ? 'border-emerald-800/50 bg-[#0A1713] text-emerald-400' : 'border-amber-800/50 bg-[#17130A] text-amber-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLive ? 'bg-cyan-400' : 'bg-amber-400'}`} />
          {isLive ? 'Live AI Recommendations' : 'Demo Mode'}
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-panel bg-[#091510] p-5 rounded-2xl border border-emerald-900/50">
          <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Available suggestions</div>
          <div className="text-3xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">{recommendations.length}</div>
          <div className="text-xs text-emerald-600/80 mt-1">Across three categories</div>
        </div>
        <div className="glass-panel bg-red-950/10 p-5 rounded-2xl border border-red-900/40 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
          <div className="text-[10px] uppercase tracking-wider text-red-400/80 mb-2">High-priority suggestions</div>
          <div className="text-3xl font-mono font-bold text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{highPriorityCount}</div>
          <div className="text-xs text-red-500/70 mt-1">Based on current stress index</div>
        </div>
        <div className="glass-panel bg-[#091510] p-5 rounded-2xl border border-emerald-900/50">
          <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Marked reviewed</div>
          <div className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{reviewedIds.length}</div>
           <div className="text-xs text-emerald-600/80 mt-1">{recommendations.length - reviewedIds.length} still to review</div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="glass-panel bg-[#091510] p-5 rounded-2xl border border-emerald-900/50 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-emerald-100">Suggested actions</h2>
          <p className="text-[10px] text-emerald-500 mt-1">Filter suggestions to find relevant actions.</p>
        </div>
        <div className="flex gap-2 bg-[#06110D] p-1.5 rounded-lg border border-emerald-800/40 shadow-inner">
          {(['All', 'Water', 'Agriculture', 'Monitoring'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${filterCat === cat ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]' : 'text-emerald-500 hover:text-emerald-300 border border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {filteredRecs.map((rec) => {
          const isReviewed = reviewedIds.includes(rec.id);
          
          return (
            <div key={rec.id} className={`flex flex-col glass-panel p-6 rounded-2xl border transition-all duration-300 ${isReviewed ? 'border-emerald-800/50 bg-[#07130F] opacity-60' : 'border-emerald-700/40 bg-emerald-950/20 hover:bg-emerald-900/30 hover:border-emerald-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'}`}>
              
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-center text-2xl shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]">
                    {rec.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold mb-0.5">{rec.category}</div>
                    <h3 className={`text-lg font-bold ${isReviewed ? 'text-emerald-400/60 line-through' : 'text-white drop-shadow-sm'}`}>{rec.title}</h3>
                  </div>
                </div>
                <span className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getPriorityStyle(rec.priority)}`}>
                  {rec.priority}
                </span>
              </div>
              
              <p className="text-sm text-emerald-100/80 mb-6 leading-relaxed">
                {rec.desc}
              </p>

              <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-xl p-4 mb-6 shadow-inner">
                <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                  <span className="text-cyan-400">💡</span> Why it may help
                </h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed">{rec.why}</p>
              </div>

              {/* Action Bar */}
              <div className="mt-auto pt-5 border-t border-emerald-800/30 flex gap-3">
                <button 
                  onClick={() => alert(`Opening detailed plan for:\n\n"${rec.title}"`)}
                  className="flex-1 px-5 py-2.5 rounded-lg border border-cyan-700/50 text-xs font-semibold text-cyan-400 bg-cyan-950/20 hover:bg-cyan-900/40 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] transition-all"
                >
                  View next steps
                </button>
                <button 
                  onClick={() => handleReview(rec.id)}
                  className={`flex-1 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isReviewed 
                      ? 'bg-[#06110D] text-emerald-600 border border-emerald-900/50' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400/50 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:brightness-110'
                  }`}
                >
                  {isReviewed ? '✓ Reviewed' : 'Mark reviewed'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </main>
  );
}