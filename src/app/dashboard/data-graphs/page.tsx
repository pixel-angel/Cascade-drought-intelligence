'use client';

import { useCallback, useEffect, useState } from 'react';

type MetricTab = 'Rainfall' | 'Soil Moisture' | 'Water Level';

interface Reading {
  month: string;
  value: number;
}

interface GraphResponse {
  readings?: Reading[];
  data?: Reading[];
  [key: string]: unknown;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Demo data is used only when live data cannot be loaded.
const DEMO_DATA: Record<MetricTab, Reading[]> = {
  Rainfall: [
    { month: 'Jan', value: 82 },
    { month: 'Feb', value: 68 },
    { month: 'Mar', value: 91 },
    { month: 'Apr', value: 54 },
    { month: 'May', value: 43 },
    { month: 'Jun', value: 29 },
    { month: 'Jul', value: 47 },
    { month: 'Aug', value: 35 },
    { month: 'Sep', value: 61 },
    { month: 'Oct', value: 74 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 96 },
  ],
  'Soil Moisture': [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 60 },
    { month: 'Mar', value: 75 },
    { month: 'Apr', value: 45 },
    { month: 'May', value: 38 },
    { month: 'Jun', value: 24 },
    { month: 'Jul', value: 30 },
    { month: 'Aug', value: 28 },
    { month: 'Sep', value: 42 },
    { month: 'Oct', value: 55 },
    { month: 'Nov', value: 62 },
    { month: 'Dec', value: 70 },
  ],
  'Water Level': [
    { month: 'Jan', value: 90 },
    { month: 'Feb', value: 85 },
    { month: 'Mar', value: 88 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 45 },
    { month: 'Jul', value: 40 },
    { month: 'Aug', value: 35 },
    { month: 'Sep', value: 50 },
    { month: 'Oct', value: 65 },
    { month: 'Nov', value: 78 },
    { month: 'Dec', value: 85 },
  ],
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://65.0.21.127:8000';

const GRAPH_ENDPOINT = `${API_BASE_URL}/graphs`;

function normalizeReadings(payload: unknown): Reading[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const response = payload as GraphResponse;
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(response.readings)
      ? response.readings
      : Array.isArray(response.data)
        ? response.data
        : [];

  return rows
    .filter(
      (row): row is Record<string, unknown> =>
        !!row && typeof row === 'object'
    )
    .map((row, index) => {
      const rawMonth = row.month ?? row.date ?? row.timestamp;
      const rawValue = row.value ?? row.reading;

      let month =
        typeof rawMonth === 'string'
          ? rawMonth.slice(0, 3)
          : MONTHS[index % MONTHS.length];

      const matchedMonth = MONTHS.find(
        (item) => item.toLowerCase() === month.toLowerCase()
      );

      if (matchedMonth) {
        month = matchedMonth;
      }

      return {
        month,
        value: Number(rawValue),
      };
    })
    .filter(
      (row) => Number.isFinite(row.value) && row.month.length > 0
    )
    .sort(
      (a, b) => MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)
    );
}

export default function DataGraphsPage() {
  const [activeTab, setActiveTab] = useState<MetricTab>('Rainfall');

  const [liveData, setLiveData] = useState<
    Partial<Record<MetricTab, Reading[]>>
  >({});

  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const currentData = liveData[activeTab] ?? DEMO_DATA[activeTab];
  const usingLiveMetric = Boolean(liveData[activeTab]);

  const fetchGraphData = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(GRAPH_ENDPOINT, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal,
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Graph API returned ${response.status}`);
      }

      const payload: unknown = await response.json();

      // Supports either one shared dataset per response or a response
      // containing separate arrays for each metric.
      if (!payload || typeof payload !== 'object') {
        throw new Error('The graph API returned an invalid response.');
      }

      const body = payload as Record<string, unknown>;

      const nextData: Partial<Record<MetricTab, Reading[]>> = {};

      const metricKeys: Record<MetricTab, string[]> = {
        Rainfall: ['rainfall', 'Rainfall'],
        'Soil Moisture': [
          'soil_moisture',
          'soilMoisture',
          'Soil Moisture',
        ],
        'Water Level': ['water_level', 'waterLevel', 'Water Level'],
      };

      for (const metric of Object.keys(metricKeys) as MetricTab[]) {
        for (const key of metricKeys[metric]) {
          if (Array.isArray(body[key])) {
            const readings = normalizeReadings(body[key]);

            if (readings.length > 0) {
              nextData[metric] = readings;
              break;
            }
          }
        }
      }

      // Also support a response with a generic readings/data array
      // for the selected metric, optionally identified by a metric field.
      if (Object.keys(nextData).length === 0) {
        const genericRows = Array.isArray(payload)
          ? payload
          : Array.isArray(body.readings)
            ? body.readings
            : Array.isArray(body.data)
              ? body.data
              : [];

        const metricFieldRows = genericRows.filter(
          (item): item is Record<string, unknown> =>
            !!item &&
            typeof item === 'object' &&
            ('metric' in item || 'indicator' in item)
        );

        if (metricFieldRows.length > 0) {
          const aliases: Record<MetricTab, string[]> = {
            Rainfall: ['rainfall', 'precipitation'],
            'Soil Moisture': ['soil moisture', 'soil_moisture'],
            'Water Level': ['water level', 'water_level', 'reservoir level'],
          };

          for (const metric of Object.keys(aliases) as MetricTab[]) {
            const rows = metricFieldRows.filter((row) => {
              const label = String(
                row.metric ?? row.indicator
              ).toLowerCase();

              return aliases[metric].some((alias) =>
                label.includes(alias)
              );
            });

            const readings = normalizeReadings(rows);

            if (readings.length > 0) {
              nextData[metric] = readings;
            }
          }
        } else {
          // A plain readings array represents the selected/default
          // metric only; don't silently use it for all three tabs.
          const readings = normalizeReadings(genericRows);

          if (readings.length > 0) {
            nextData.Rainfall = readings;
          }
        }
      }

      if (Object.keys(nextData).length === 0) {
        throw new Error(
          'No supported graph readings were found in the API response.'
        );
      }

      setLiveData(nextData);
      setIsLive(true);
    } catch (error) {
      if (signal.aborted) return;

      console.error('Unable to load graph data:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load graph data.'
      );
      setIsLive(false);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchGraphData(controller.signal);

    return () => controller.abort();
  }, [fetchGraphData]);

  const values = currentData.map((item) => item.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const avgVal = values.length
    ? (
        values.reduce((sum, value) => sum + value, 0) / values.length
      ).toFixed(1)
    : '0';

  const minMonth = currentData.find(
    (item) => item.value === minVal
  )?.month;

  const maxMonth = currentData.find(
    (item) => item.value === maxVal
  )?.month;

  const latestReading = currentData[currentData.length - 1];
  const latestVal = latestReading?.value ?? 0;
  const latestMonth = latestReading?.month ?? '—';

  const getUnit = () => (activeTab === 'Rainfall' ? 'mm' : '%');

  const exportCSV = () => {
    const rows = [
      ['Month', 'Metric', 'Reading', 'Unit'],
      ...currentData.map((item) => [
        item.month,
        activeTab,
        String(item.value),
        getUnit(),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${value.replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\r\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `cascade-${activeTab
      .toLowerCase()
      .replace(/\s+/g, '-')}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const stepX =
    currentData.length > 1 ? 1000 / (currentData.length - 1) : 0;

  const maxH = 200;

  const getY = (value: number) =>
    maxH - (value / Math.max(100, maxVal)) * maxH;

  const points = currentData
    .map((item, index) => `${index * stepX},${getY(item.value)}`)
    .join(' ');

  const tabOptions: MetricTab[] = [
    'Rainfall',
    'Soil Moisture',
    'Water Level',
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06110D] p-5 font-sans text-emerald-50 md:p-8">
      {/* Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 border-b border-emerald-900/40 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
            CASCADE / Analytics
          </p>

          <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Data Graphs
          </h1>

          <p className="mt-1 text-xs text-emerald-400/80">
            Explore rainfall patterns, soil moisture trends, and water
            availability.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[10px] uppercase ${
              isLive
                ? 'border-emerald-800/50 bg-[#0A1713] text-emerald-400'
                : 'border-amber-900/50 bg-amber-950/20 text-amber-300'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLive
                  ? 'animate-pulse bg-cyan-400'
                  : 'bg-amber-400'
              }`}
            />
            {loading
              ? 'Connecting'
              : isLive
                ? 'Live API data'
                : 'Demo Mode'}
          </div>

          <button
            onClick={exportCSV}
            className="rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-shadow hover:shadow-[0_0_15px_#38BDF8]"
          >
            ↓ Export CSV
          </button>
        </div>
      </header>

      {/* Data status */}
      {!isLive && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-900/40 bg-amber-950/20 p-3">
          <span className="text-sm text-amber-500">ⓘ</span>
          <div className="text-xs leading-relaxed text-amber-200/70">
            {loading
              ? 'Connecting to the graph API. Demo readings are displayed until live data is available.'
              : errorMessage
                ? `Live data unavailable: ${errorMessage} Demo readings are being displayed instead.`
                : 'These readings are illustrative and do not represent live sensor measurements.'}
          </div>
        </div>
      )}

      {isLive && !usingLiveMetric && (
        <div className="mb-6 rounded-xl border border-amber-900/40 bg-amber-950/20 p-3 text-xs text-amber-200/80">
          No live {activeTab.toLowerCase()} readings were returned. This
          metric is showing demo data.
        </div>
      )}

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Period average',
            value: avgVal,
            unit: getUnit(),
            note: `Average ${activeTab.toLowerCase()}`,
            color: 'text-emerald-300',
          },
          {
            label: 'Highest reading',
            value: String(maxVal),
            unit: getUnit(),
            note: `Recorded in ${maxMonth ?? '—'}`,
            color: 'text-cyan-400',
          },
          {
            label: 'Lowest reading',
            value: String(minVal),
            unit: getUnit(),
            note: `Recorded in ${minMonth ?? '—'}`,
            color: 'text-amber-400',
          },
          {
            label: 'Latest reading',
            value: String(latestVal),
            unit: getUnit(),
            note: `${latestMonth} reading`,
            color: 'text-emerald-100',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-2xl border border-emerald-900/40 p-5"
          >
            <div className="mb-2 text-[10px] uppercase tracking-wider text-emerald-500">
              {stat.label}
            </div>
            <div
              className={`font-mono text-3xl font-bold drop-shadow-md ${stat.color}`}
            >
              {stat.value}{' '}
              <span className="font-sans text-sm text-emerald-600">
                {stat.unit}
              </span>
            </div>
            <div className="mt-1 text-xs text-emerald-600/80">
              {stat.note}
            </div>
          </div>
        ))}
      </div>

      {/* Main Line Chart */}
      <section className="glass-panel mb-6 rounded-2xl border border-emerald-900/40 p-5 md:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
              {activeTab} Trend
            </h2>
            <p className="mt-1 text-[10px] text-emerald-500">
              Monthly indicator readings for the selected period.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    : 'border-emerald-800/50 bg-[#0A1713] text-emerald-500 hover:bg-emerald-900/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 h-[250px] w-full">
          <svg
            viewBox="0 -20 1000 240"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
            role="img"
            aria-label={`${activeTab} monthly trend chart`}
          >
            {[0, 50, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={maxH - (y / 100) * maxH}
                x2="1000"
                y2={maxH - (y / 100) * maxH}
                stroke="#064E3B"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            <defs>
              <linearGradient
                id="cascadeGraphAreaGlow"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>

            {currentData.length > 1 && (
              <>
                <polygon
                  points={`0,${maxH} ${points} 1000,${maxH}`}
                  fill="url(#cascadeGraphAreaGlow)"
                />

                <polyline
                  points={points}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_#38BDF8]"
                />
              </>
            )}

            {currentData.map((item, index) => (
              <circle
                key={item.month}
                cx={index * stepX}
                cy={getY(item.value)}
                r="5"
                fill="#06110D"
                stroke="#38BDF8"
                strokeWidth="3"
                className="drop-shadow-[0_0_5px_#38BDF8]"
              >
                <title>
                  {item.month}: {item.value} {getUnit()}
                </title>
              </circle>
            ))}
          </svg>

          <div className="mt-4 flex w-full justify-between gap-1 font-mono text-[10px] text-emerald-500 sm:text-xs">
            {currentData.map((item) => (
              <span key={item.month}>{item.month}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Comparison + Insights */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="glass-panel rounded-2xl border border-emerald-900/40 p-5 md:col-span-2 md:p-6">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-emerald-100">
            Monthly Comparison
          </h2>
          <p className="mb-6 text-[10px] text-emerald-500">
            Compare individual monthly readings.
          </p>

          <div className="flex h-[200px] items-end justify-between gap-1 border-b border-emerald-900/50 pb-2 pt-4">
            {currentData.map((item) => {
              const isLowest = item.value === minVal;
              const barHeight =
                (item.value / Math.max(100, maxVal)) * 100;

              return (
                <div
                  key={item.month}
                  className="group flex h-full w-full flex-col items-center justify-end"
                >
                  <span
                    className={`mb-2 text-[10px] font-mono opacity-0 transition-opacity group-hover:opacity-100 ${
                      isLowest ? 'text-amber-400' : 'text-cyan-300'
                    }`}
                  >
                    {item.value}
                  </span>

                  <div
                    title={`${item.month}: ${item.value} ${getUnit()}`}
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-500 hover:brightness-125 ${
                      isLowest
                        ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                        : 'bg-cyan-600/80 shadow-[0_0_10px_rgba(8,145,178,0.3)]'
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />

                  <span className="mt-2 text-[9px] text-emerald-600 sm:text-[10px]">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-emerald-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-cyan-600" />
              Monthly reading
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Lowest reading
            </span>
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-emerald-900/40 p-5 md:p-6">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-emerald-100">
            What the data tells us
          </h2>
          <p className="mb-6 text-[10px] text-emerald-500">
            Calculated from the currently displayed readings.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3 rounded-xl border border-emerald-800/40 bg-[#0A1713] p-4">
              <span className="text-emerald-400">⏱️</span>
              <div>
                <p className="mb-1 text-xs font-semibold text-emerald-100">
                  Period average
                </p>
                <p className="text-[10px] text-emerald-500/80">
                  The average {activeTab.toLowerCase()} reading was {avgVal}{' '}
                  {getUnit()}.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-emerald-800/40 bg-[#0A1713] p-4">
              <span className="text-cyan-400">↗️</span>
              <div>
                <p className="mb-1 text-xs font-semibold text-emerald-100">
                  Highest reading
                </p>
                <p className="text-[10px] text-emerald-500/80">
                  {maxMonth} recorded {maxVal} {getUnit()}, the highest value
                  in this period.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-amber-900/30 bg-amber-950/20 p-4">
              <span className="text-amber-400">↘️</span>
              <div>
                <p className="mb-1 text-xs font-semibold text-amber-200">
                  Lowest reading
                </p>
                <p className="text-[10px] text-amber-500/80">
                  {minMonth} recorded {minVal} {getUnit()}, the lowest value
                  in this period.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Data Table */}
      <section className="glass-panel rounded-2xl border border-emerald-900/40 p-5 md:p-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
              Monthly Readings
            </h2>
            <p className="mt-1 text-[10px] text-emerald-500">
              Detailed readings for {activeTab.toLowerCase()}.
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-emerald-800/50 bg-[#0A1713] px-3 py-1 font-mono text-[10px] text-emerald-400">
            {currentData.length} records
          </span>
        </div>

        <div className="w-full overflow-x-auto text-left text-xs text-emerald-100">
          <div className="grid min-w-[280px] grid-cols-3 border-b border-emerald-800/60 py-3 text-[10px] uppercase tracking-wider text-emerald-500">
            <div>Month</div>
            <div className="text-center">Indicator</div>
            <div className="text-right">Reading</div>
          </div>

          {currentData.map((item) => (
            <div
              key={item.month}
              className="grid min-w-[280px] grid-cols-3 border-b border-emerald-900/30 py-3 transition-colors hover:bg-emerald-900/20"
            >
              <div className="font-semibold text-emerald-300">
                {item.month}
              </div>
              <div className="text-center text-emerald-500/80">
                {activeTab}
              </div>
              <div className="text-right font-mono font-bold text-cyan-300">
                {item.value} {getUnit()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-6 text-[10px] leading-relaxed text-emerald-600/80">
        CASCADE analytics are intended to support watershed monitoring.
        Validate readings, units, and local conditions before using them to
        make water-management decisions.
      </p>
    </main>
  );
}
