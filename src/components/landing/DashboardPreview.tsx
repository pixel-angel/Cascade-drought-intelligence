import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Monitor } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section
      id="platform"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-xs tracking-[0.2em] text-emerald-400">
            <Monitor size={15} />
            THE CASCADE PLATFORM
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Your entire basin.
            <span className="block text-slate-500">
              One intelligence layer.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Explore watershed health, inspect individual nodes, identify
            critical locations, and understand where interventions may be
            needed.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-400/25 px-4 py-3 text-sm text-emerald-300 transition hover:bg-emerald-400/10"
        >
          Open dashboard <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="group relative rounded-2xl border border-emerald-400/20 bg-[#0A1B14] p-2 shadow-[0_0_80px_rgba(16,185,129,0.06)] sm:p-3">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-3">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-3 truncate font-mono text-[10px] text-slate-500">
            CASCADE / DROUGHT IMPACT DASHBOARD
          </span>
        </div>

        <div className="relative overflow-hidden rounded-b-xl">
          <Image
            src="/images/dashboard-preview.png"
            alt="CASCADE drought impact dashboard with watershed node network, risk indicators, and node telemetry"
            width={1824}
            height={1024}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="h-auto w-full object-cover object-top transition duration-500 group-hover:brightness-110"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
        <span>CASCADE · Drought Impact Dashboard</span>
        <span>Existing product interface</span>
      </div>
    </section>
  );
}
