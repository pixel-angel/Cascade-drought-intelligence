import Link from "next/link";
import { ArrowDown, ArrowRight, Activity, Network } from "lucide-react";
import BasinVisual from "./BasinVisual";
import WaterBackdrop from "./WaterBackdrop";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-emerald-400/10">
      <WaterBackdrop />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(6,182,212,0.10),transparent_35%),radial-gradient(ellipse_at_20%_60%,rgba(16,185,129,0.09),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:grid-cols-[1fr_.9fr] lg:gap-16 lg:py-28">
        {/* Left: Hero content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2 text-[10px] tracking-[0.18em] text-emerald-300 sm:text-xs">
            <Activity size={14} />
            PREDICTIVE WATERSHED INTELLIGENCE
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Drought doesn't stop
            <span className="block text-emerald-400">at one reservoir.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            Understand how water scarcity propagates across connected
            watersheds. Predict downstream stress and help agricultural
            communities prepare before conditions deteriorate.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-3 rounded-lg bg-emerald-400 px-5 py-3.5 text-sm font-semibold text-[#06110D] transition hover:bg-emerald-300"
            >
              Explore the platform
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#technology"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3.5 text-sm text-slate-300 transition hover:border-emerald-400/30 hover:text-white"
            >
              How it works <ArrowDown size={15} />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <Network size={15} className="text-cyan-400" />
              GraphSAGE model
            </span>

            <span className="flex items-center gap-2">
              <Activity size={15} className="text-emerald-400" />
              Network-aware predictions
            </span>
          </div>
        </div>

        {/* Right: Watershed visualization */}
        <div className="relative">
          <div className="absolute inset-10 rounded-full bg-emerald-400/[0.06] blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#081811]/90 p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <div className="text-[10px] tracking-[0.18em] text-emerald-400">
                  NETWORK TOPOLOGY
                </div>

                <h2 className="mt-1 text-sm font-medium text-white">
                  Watershed intelligence
                </h2>
              </div>

              <span className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                CONCEPT
              </span>
            </div>

            <div className="py-5">
              <BasinVisual />
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4">
              {[
                { label: "NOMINAL", color: "#10B981" },
                { label: "ELEVATED", color: "#F59E0B" },
                { label: "CRITICAL", color: "#EF4444" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.025] py-3"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-[9px] tracking-wider text-slate-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-4 right-5 hidden items-center gap-2 rounded-lg border border-cyan-400/20 bg-[#0B1C15] px-3 py-2 text-xs text-cyan-300 sm:flex">
            <Activity size={14} />
            Connected watershed view
          </div>
        </div>
      </div>
    </section>
  );
}
