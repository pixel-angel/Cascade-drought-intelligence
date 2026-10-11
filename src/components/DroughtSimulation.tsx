
"use client";

import { useMemo, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function DroughtSimulation() {
  const [rainfall, setRainfall] = useState(35);
  const [temperature, setTemperature] = useState(32);
  const [irrigation, setIrrigation] = useState(25);
  const [day, setDay] = useState(1);

  const metrics = useMemo(() => {
    const moisture = clamp(
      48 +
        rainfall * 0.42 +
        irrigation * 0.35 -
        (temperature - 20) * 1.1 -
        (day - 1) * 0.7,
      0,
      100
    );

    const cropHealth = clamp(
      100 -
        Math.max(0, 45 - moisture) * 1.7 -
        Math.max(0, temperature - 32) * 1.5,
      0,
      100
    );

    const drought = 100 - moisture;

    return { moisture, cropHealth, drought };
  }, [rainfall, temperature, irrigation, day]);

  const severity =
    metrics.drought < 30
      ? "Low"
      : metrics.drought < 55
        ? "Moderate"
        : metrics.drought < 75
          ? "High"
          : "Severe";

  const advanceDay = () => {
    setDay((current) => current + 1);
  };

  const reset = () => {
    setRainfall(35);
    setTemperature(32);
    setIrrigation(25);
    setDay(1);
  };

  const meter = (value: number, color: string) => (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );

  return (
    <section className="space-y-6 text-slate-900">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          CASCADE • Climate Lab
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Drought Simulation
        </h1>
        <p className="mt-2 text-slate-600">
          Adjust the weather and irrigation to explore their effect on farmland.
        </p>
      </div>

      {/* Dynamic landscape */}
      <div
        className="relative isolate min-h-[260px] overflow-hidden rounded-2xl border border-amber-900/10 p-6 text-white shadow-lg"
        style={{
          background: `linear-gradient(to bottom,
            ${temperature > 35 ? "#e8a46d" : "#8bc9df"} 0%,
            ${temperature > 35 ? "#f0c28c" : "#d8e9ce"} 48%,
            #b5a06c 49%,
            #75583c 100%)`,
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-[52%] transition-colors duration-700"
          style={{
            background: `linear-gradient(165deg,
              ${metrics.moisture < 30 ? "#ad784c" : "#66894b"},
              ${metrics.moisture < 30 ? "#70452f" : "#344f32"})`,
          }}
        />

        <div className="absolute right-8 top-7 h-14 w-14 rounded-full bg-amber-200/90 shadow-[0_0_45px_15px_rgba(255,210,110,0.25)]" />

        {/* Crop rows */}
        <div className="absolute inset-x-0 bottom-0 flex h-[47%] justify-around overflow-hidden opacity-80">
          {Array.from({ length: 11 }, (_, index) => (
            <div
              key={index}
              className="h-[160%] w-3 rotate-[18deg] rounded-full"
              style={{
                backgroundColor:
                  metrics.cropHealth < 40 ? "#9b8050" : "#294e2d",
                transform: `rotate(${index % 2 ? 14 : -14}deg) scaleX(${
                  0.8 + metrics.cropHealth / 100
                })`,
                transition: "all 500ms",
              }}
            />
          ))}
        </div>

        {metrics.moisture < 35 && (
          <div className="absolute inset-x-0 bottom-0 h-[30%] opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 20px, #3c2418 21px 23px, transparent 24px 42px)",
            }}
          />
        )}

        <div className="relative z-10 max-w-lg">
          <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-semibold backdrop-blur">
            DAY {day}
          </span>
          <h2 className="mt-4 text-2xl font-bold">
            {metrics.moisture < 30
              ? "The land is drying out"
              : metrics.moisture < 55
                ? "Water levels need attention"
                : "Farmland conditions are stable"}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-white/90">
            {metrics.moisture < 30
              ? "Try increasing rainfall or irrigation to improve soil moisture."
              : metrics.moisture < 55
                ? "Changes in weather and water supply can affect crop growth."
                : "Observe how the crops respond as you change the conditions."}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 z-10 rounded-xl bg-black/35 px-3 py-2 text-sm backdrop-blur">
          ☀️ {temperature}°C
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Soil moisture",
            value: Math.round(metrics.moisture),
            unit: "%",
            color: "#16875d",
          },
          {
            label: "Crop health",
            value: Math.round(metrics.cropHealth),
            unit: "%",
            color: "#65a30d",
          },
          {
            label: "Drought index",
            value: Math.round(metrics.drought),
            unit: "/100",
            color: "#d97706",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="my-3 text-3xl font-bold">
              {item.value}
              <span className="ml-1 text-sm font-medium text-slate-400">
                {item.unit}
              </span>
            </p>
            {meter(item.value, item.color)}
          </div>
        ))}
      </div>

      {/* Interactive controls */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold">Environmental controls</h2>
            <p className="mt-1 text-sm text-slate-500">
              Move the sliders to change the simulated conditions.
            </p>
          </div>

          <div>
            <div className="mb-2 flex justify-between gap-3">
              <label htmlFor="rainfall" className="font-medium">
                Rainfall
              </label>
              <span className="text-sm font-semibold text-sky-700">
                {rainfall} mm
              </span>
            </div>
            <input
              id="rainfall"
              type="range"
              min="0"
              max="100"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>No rain</span>
              <span>Heavy rain</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between gap-3">
              <label htmlFor="temperature" className="font-medium">
                Temperature
              </label>
              <span className="text-sm font-semibold text-orange-700">
                {temperature}°C
              </span>
            </div>
            <input
              id="temperature"
              type="range"
              min="15"
              max="45"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>15°C</span>
              <span>45°C</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between gap-3">
              <label htmlFor="irrigation" className="font-medium">
                Irrigation
              </label>
              <span className="text-sm font-semibold text-emerald-700">
                {irrigation}%
              </span>
            </div>
            <input
              id="irrigation"
              type="range"
              min="0"
              max="100"
              value={irrigation}
              onChange={(e) => setIrrigation(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Off</span>
              <span>Maximum</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Simulation status</h2>

          <div className="mt-5 rounded-xl bg-amber-50 p-4">
            <p className="text-sm text-amber-800">Drought severity</p>
            <p className="mt-1 text-2xl font-bold text-amber-950">
              {severity}
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {metrics.moisture < 35
              ? "Soil moisture is low in this model. Increasing water input can improve the simulated conditions."
              : metrics.moisture < 60
                ? "Conditions are in a middle range. Try different combinations of heat, rain and irrigation."
                : "Soil moisture is relatively high in this model. Reduce water input or increase temperature to explore drought."}
          </p>

          <div className="mt-auto space-y-3 pt-6">
            <button
              onClick={advanceDay}
              className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Advance one day →
            </button>
            <button
              onClick={reset}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-50"
            >
              Reset simulation
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs leading-5 text-slate-500">
        Educational prototype: indicators use simplified illustrative
        equations, not measured soil data or a validated agricultural forecast.
      </p>
    </section>
  );
}