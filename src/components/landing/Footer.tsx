"use client"

import Link from "next/link";
import { Waves, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-400/10 bg-[#040C08]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-3">
            <Waves size={24} className="text-emerald-400" />
            <span>
              <span className="block text-sm font-bold tracking-[0.17em] text-white">
                CASCADE
              </span>
              <span className="block text-[9px] tracking-[0.2em] text-slate-500">
                DROUGHT INTELLIGENCE ENGINE
              </span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-6 text-slate-500">
            Understanding connected watersheds to support proactive agricultural
            resource management.
          </p>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-emerald-400 transition hover:text-emerald-300"
          >
            Enter dashboard <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-slate-600 sm:flex-row sm:justify-between">
          <span>© 2026 CASCADE</span>
          <span>Predictive watershed intelligence</span>
        </div>
      </div>
    </footer>
  );
}
