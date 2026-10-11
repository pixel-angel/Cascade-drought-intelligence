"use client";

import { useState } from "react";
import Link from "next/link";
import { Waves, ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Technology", href: "#technology" },
  { label: "The platform", href: "#platform" },
  { label: "Impact", href: "#impact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-emerald-400/10 bg-[#06110D]/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10">
            <Waves size={23} className="text-emerald-400" />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-[0.16em] text-white">
              CASCADE
            </span>
            <span className="block text-[9px] tracking-[0.24em] text-emerald-400">
              DROUGHT INTELLIGENCE
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-300 transition hover:bg-emerald-400/15"
          >
            Open dashboard <ArrowUpRight size={15} />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-slate-300 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="space-y-4 border-t border-emerald-400/10 bg-[#06110D] px-5 py-5 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-slate-300"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block text-sm text-emerald-400"
          >
            Open dashboard ↗
          </Link>
        </div>
      )}
    </header>
  );
}
