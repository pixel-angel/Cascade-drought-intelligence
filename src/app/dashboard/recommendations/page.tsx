
'use client';

import { useEffect, useState } from 'react';

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
  detailedSteps: string[];
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'r1',
    category: 'Water',
    priority: 'High',
    title: 'Prioritize water conservation',
    desc: 'Review water use and identify opportunities to reduce avoidable losses across the watershed.',
    why: 'Useful when water availability is under pressure.',
    icon: '💧',
    detailedSteps: [
      'Audit main distribution channels for structural leakage or unmetered extraction points.',
      'Enforce tier-1 restrictions on non-essential commercial runoff.',
      'Deploy automated shutoff valves at high-stress diversion junctions.',
    ],
  },
  {
    id: 'r2',
    category: 'Agriculture',
    priority: 'High',
    title: 'Review irrigation schedules',
    desc: 'Use local soil moisture and weather information to guide irrigation decisions.',
    why: 'Helps inform water-efficient farm planning.',
    icon: '🌱',
    detailedSteps: [
      'Calibrate soil moisture telemetry probes across upper agricultural plots.',
      'Shift scheduled flood irrigation to evening or nocturnal time slots to minimize evaporation.',
      'Provide district farmers with updated soil-water retention advisory alerts.',
    ],
  },
  {
    id: 'r3',
    category: 'Monitoring',
    priority: 'Medium',
    title: 'Monitor soil moisture',
    desc: 'Track soil moisture readings over time to help identify changing conditions.',
    why: 'Helps detect changes in soil water availability.',
    icon: '📡',
    detailedSteps: [
      'Inspect subsurface sensor nodes for battery integrity and signal continuity.',
      'Compare current volumetric water content against 5-year historical drought benchmarks.',
      'Generate automated weekly subsurface depletion trend logs for field teams.',
    ],
  },
  {
    id: 'r4',
    category: 'Agriculture',
    priority: 'Medium',
    title: 'Review crop water requirements',
    desc: 'Review crop stage, local conditions, and available agricultural guidance before making planting decisions.',
    why: 'Supports informed agricultural planning.',
    icon: '🌾',
    detailedSteps: [
      'Assess current crop growth cycles against predicted seasonal precipitation deficits.',
      'Recommend drought-tolerant crop rotation variants for secondary plots.',
      'Consult regional agronomy boards regarding optimized fertilizer-to-water ratios.',
    ],
  },
  {
    id: 'r5',
    category: 'Water',
    priority: 'Medium',
    title: 'Review water storage readiness',
    desc: 'Review storage capacity, infrastructure condition, and local water management plans.',
    why: 'Supports preparation for periods of low water availability.',
    icon: '🌊',
    detailedSteps: [
      'Measure current silt accumulation levels in primary holding basins.',
      'Test emergency backup generator systems at main reservoir pumping stations.',
      'Verify auxiliary valve seal integrity to prevent seepage during low-flow periods.',
    ],
  },
  {
    id: 'r6',
    category: 'Monitoring',
    priority: 'Low',
    title: 'Strengthen drought monitoring',
    desc: 'Maintain a consistent record of rainfall, reservoir levels, and watershed indicators.',
    why: 'Improves visibility into changing watershed conditions.',
    icon: '📊',
    detailedSteps: [
      'Standardize rain gauge data logging intervals across all monitoring stations.',
      'Archive monthly telemetry snapshots into cold storage for long-term analytics.',
      'Conduct cross-validation checks between satellite imagery feeds and ground sensor grids.',
    ],
  },
];

const API_URL = 'http://65.0.21.127:8000/recommendations';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] =
    useState<Recommendation[]>(RECOMMENDATIONS);

  const [filterCat, setFilterCat] = useState<Category>('All');
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  // Fetch recommendations from the backend on mount.
  useEffect(() => {
    let cancelled = false;

    const fetchLiveRecommendations = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();

        if (
          Array.isArray(data.recommendations) &&
          data.recommendations.length > 0
        ) {
          const mergedRecommendations: Recommendation[] =
            data.recommendations.map(
              (rec: Partial<Recommendation>, index: number) => {
                const fallback =
                  RECOMMENDATIONS.find((item) => item.id === rec.id) ??
                  RECOMMENDATIONS[index % RECOMMENDATIONS.length];

                return {
                  ...fallback,
                  ...rec,
                  id: rec.id ?? fallback.id,
                  detailedSteps:
                    rec.detailedSteps ?? fallback.detailedSteps,
                };
              }
            );

          if (!cancelled) {
            setRecommendations(mergedRecommendations);
            setIsLive(true);
          }
        }
      } catch (error) {
        console.error(
          'Failed to fetch live recommendations. Using demo data:',
          error
        );

        if (!cancelled) {
          setRecommendations(RECOMMENDATIONS);
          setIsLive(false);
        }
      }
    };

    fetchLiveRecommendations();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleReview = (id: string) => {
    setReviewedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const filteredRecs =
    filterCat === 'All'
      ? recommendations
      : recommendations.filter((rec) => rec.category === filterCat);

  const highPriorityCount = recommendations.filter(
    (rec) => rec.priority === 'High'
  ).length;

  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-950/40 text-red-400 border-red-900/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]';
      case 'Medium':
        return 'bg-amber-950/40 text-amber-400 border-amber-900/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Low':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06110D] p-5 font-sans text-emerald-50 md:p-8">
      {/* Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 border-b border-emerald-900/40 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
            CASCADE / Decision Support
          </p>

          <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Recommendations
          </h1>

          <p className="mt-1 text-xs text-emerald-400/80">
            Explore practical actions for water conservation, agricultural
            planning, and drought preparedness.
          </p>
        </div>

        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[10px] uppercase ${
            isLive
              ? 'border-emerald-800/50 bg-[#0A1713] text-emerald-400'
              : 'border-amber-800/50 bg-[#17130A] text-amber-400'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 animate-pulse rounded-full ${
              isLive ? 'bg-cyan-400' : 'bg-amber-400'
            }`}
          />
          {isLive ? 'Live AI Recommendations' : 'Demo Mode'}
        </div>
      </header>

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="glass-panel rounded-2xl border border-emerald-900/50 bg-[#091510] p-5">
          <div className="mb-2 text-[10px] uppercase tracking-wider text-emerald-500">
            Available suggestions
          </div>
          <div className="font-mono text-3xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
            {recommendations.length}
          </div>
          <div className="mt-1 text-xs text-emerald-600/80">
            Across three categories
          </div>
        </div>

        <div className="glass-panel rounded-2xl border border-red-900/40 bg-red-950/10 p-5 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
          <div className="mb-2 text-[10px] uppercase tracking-wider text-red-400/80">
            High-priority suggestions
          </div>
          <div className="font-mono text-3xl font-bold text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            {highPriorityCount}
          </div>
          <div className="mt-1 text-xs text-red-500/70">
            Based on available recommendations
          </div>
        </div>

        <div className="glass-panel rounded-2xl border border-emerald-900/50 bg-[#091510] p-5">
          <div className="mb-2 text-[10px] uppercase tracking-wider text-emerald-500">
            Marked reviewed
          </div>
          <div className="font-mono text-3xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
            {reviewedIds.filter((id) =>
              recommendations.some((rec) => rec.id === id)
            ).length}
          </div>
          <div className="mt-1 text-xs text-emerald-600/80">
            {
              recommendations.filter((rec) => !reviewedIds.includes(rec.id))
                .length
            }{' '}
            still to review
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="glass-panel mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-900/50 bg-[#091510] p-5 md:flex-row">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
            Suggested actions
          </h2>
          <p className="mt-1 text-[10px] text-emerald-500">
            Filter suggestions to find relevant actions.
          </p>
        </div>

        <div className="flex max-w-full flex-wrap gap-2 rounded-lg border border-emerald-800/40 bg-[#06110D] p-1.5 shadow-inner">
          {(['All', 'Water', 'Agriculture', 'Monitoring'] as Category[]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`cursor-pointer rounded-md border px-4 py-1.5 text-xs font-medium transition-all ${
                  filterCat === cat
                    ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                    : 'border-transparent text-emerald-500 hover:text-emerald-300'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="mb-6 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        {filteredRecs.map((rec) => {
          const isReviewed = reviewedIds.includes(rec.id);
          const isModalOpen = activeModalId === rec.id;

          return (
            <div
              key={rec.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                isReviewed
                  ? 'glass-panel border-emerald-800/50 bg-[#07130F] opacity-60'
                  : 'glass-panel border-emerald-700/40 bg-emerald-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-emerald-500/50 hover:bg-emerald-900/30'
              }`}
            >
              <div>
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-700/50 bg-emerald-900/40 text-2xl shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]">
                      {rec.icon}
                    </div>

                    <div>
                      <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                        {rec.category}
                      </div>
                      <h3
                        className={`text-lg font-bold ${
                          isReviewed
                            ? 'text-emerald-400/60 line-through'
                            : 'text-white drop-shadow-sm'
                        }`}
                      >
                        {rec.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${getPriorityStyle(
                      rec.priority
                    )}`}
                  >
                    {rec.priority}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-emerald-100/80">
                  {rec.desc}
                </p>

                <div className="mb-6 rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-4 shadow-inner">
                  <h4 className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="text-cyan-400">💡</span>
                    Why it may help
                  </h4>
                  <p className="text-xs leading-relaxed text-emerald-200/90">
                    {rec.why}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-3 border-t border-emerald-800/30 pt-5">
                <button
                  onClick={() =>
                    setActiveModalId(isModalOpen ? null : rec.id)
                  }
                  className="flex-1 cursor-pointer rounded-lg border border-cyan-700/50 bg-cyan-950/20 px-3 py-2.5 text-xs font-semibold text-cyan-400 transition-all hover:bg-cyan-900/40 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] sm:px-5"
                >
                  {isModalOpen ? 'Hide steps' : 'View next steps'}
                </button>

                <button
                  onClick={() => handleReview(rec.id)}
                  className={`flex-1 cursor-pointer rounded-lg px-3 py-2.5 text-xs font-bold transition-all sm:px-5 ${
                    isReviewed
                      ? 'border border-emerald-900/50 bg-[#06110D] text-emerald-600'
                      : 'border border-cyan-400/50 bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                  }`}
                >
                  {isReviewed ? '✓ Reviewed' : 'Mark reviewed'}
                </button>
              </div>

              {/* Detailed Steps Modal */}
              {isModalOpen && (
                <div className="animate-fadeIn absolute inset-0 z-20 flex flex-col justify-between rounded-2xl border border-cyan-500/50 bg-[#06110D]/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                        Execution Protocol
                      </span>
                      <button
                        onClick={() => setActiveModalId(null)}
                        className="cursor-pointer rounded border border-emerald-700/50 bg-emerald-900/40 px-2 py-1 text-xs font-bold text-emerald-400 hover:text-white"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <h4 className="mb-3 text-sm font-bold text-white">
                      {rec.title}
                    </h4>

                    <div className="rounded-xl border border-emerald-900/40 bg-[#040D09] p-3 text-xs text-emerald-200/90">
                      <p className="mb-2 font-semibold text-cyan-300">
                        Specific Roadmap Steps:
                      </p>

                      <ul className="list-disc space-y-1.5 pl-4 text-emerald-400/80">
                        {rec.detailedSteps.map((step, idx) => (
                          <li key={`${rec.id}-step-${idx}`}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-emerald-900/40 pt-3">
                    <button
                      onClick={() => setActiveModalId(null)}
                      className="cursor-pointer rounded-lg bg-cyan-600 px-4 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-cyan-500"
                    >
                      Done Viewing
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prototype Notice */}
      <div className="mt-8 flex gap-3 rounded-xl border border-emerald-800/50 bg-[#081812] p-4 shadow-inner">
        <span className="text-emerald-500">ℹ️</span>
        <p className="text-xs leading-relaxed text-emerald-400/80">
          <strong className="text-emerald-300">Prototype note:</strong>{' '}
          Recommendations and execution steps are illustrative guidance.
          Validate actions against local conditions and expert advice before
          implementation.
        </p>
      </div>
    </main>
  );
}
