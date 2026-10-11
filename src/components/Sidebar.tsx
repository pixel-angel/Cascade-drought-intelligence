'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', short: 'Dash' },
  { name: 'Impact Analysis', path: '/dashboard/impact-analysis', short: 'Impact' },
  { name: 'Data Graphs', path: '/dashboard/data-graphs', short: 'Data' },
  { name: 'Basin Map', path: '/dashboard/basin-map', short: 'Map' },
  { name: 'Simulation', path: '/dashboard/simulation', short: 'Sim' },
  { name: 'Recommendations', path: '/dashboard/recommendations', short: 'Recs' },
  { name: 'Reports', path: '/dashboard/reports', short: 'Reports' },
  { name: 'Settings', path: '/dashboard/settings', short: 'Set' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Command Center Mode) */}
      <aside className="hidden md:flex w-64 min-h-screen bg-[#040D0A] border-r border-emerald-900/40 p-5 flex-col z-50 shrink-0 sticky top-0">
        
        <div className="mb-10 px-1">
          <Link href="/" className="flex items-center gap-3.5 group cursor-pointer select-none">
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[10px] group-hover:bg-cyan-400/30 transition-all duration-500" />
              <svg viewBox="0 0 40 40" fill="none" className="relative w-full h-full">
                <path d="M27 10C27 10 22 6 15 6C8.37258 6 3 11.3726 3 18C3 24.6274 8.37258 30 15 30C22 30 27 26 27 26" stroke="url(#grad-outer)" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
                <path d="M27 15C27 15 23 11.5 17 11.5C13.4101 11.5 10.5 14.4101 10.5 18C10.5 21.5899 13.4101 24.5 17 24.5C23 24.5 27 21 27 21" stroke="url(#grad-inner)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="27" cy="10" r="2.5" fill="#38BDF8" className="drop-shadow-[0_0_5px_#38BDF8]" />
                <circle cx="27" cy="26" r="2.5" fill="#10B981" className="drop-shadow-[0_0_5px_#10B981]" />
                <circle cx="27" cy="15" r="1.5" fill="#6EE7B7" />
                <circle cx="27" cy="21" r="1.5" fill="#34D399" />
                <defs>
                  <linearGradient id="grad-outer" x1="3" y1="6" x2="27" y2="30"><stop offset="0%" stopColor="#38BDF8" /><stop offset="100%" stopColor="#10B981" /></linearGradient>
                  <linearGradient id="grad-inner" x1="10.5" y1="11.5" x2="27" y2="24.5"><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#047857" /></linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-extrabold tracking-[0.1em] text-white group-hover:text-cyan-300 transition-colors leading-tight">CASCADE</span>
              <span className="text-[7.5px] font-bold tracking-[0.22em] text-emerald-400 mt-0.5 uppercase leading-none opacity-90">Drought Intelligence</span>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${isActive ? 'bg-emerald-950/45 text-emerald-300 border border-emerald-800/60 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]' : 'text-emerald-400/80 hover:bg-emerald-900/20 hover:text-emerald-200 border border-transparent'}`}>
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isActive ? <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-900" />}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 px-2">
          <div className="text-[9px] uppercase tracking-widest text-emerald-600 font-bold mb-1">CASCADE SYSTEM</div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38BDF8]" /> System Online
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav (Field Mode) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-[60px] bg-[#040D0A]/95 backdrop-blur-lg border-t border-emerald-900/60 z-50 flex items-center justify-between px-2 overflow-x-auto hide-scrollbar gap-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`flex flex-col items-center justify-center min-w-[64px] h-full gap-1 px-2 transition-all ${isActive ? 'text-cyan-400' : 'text-emerald-600'}`}>
              <div className="w-2 h-2 flex items-center justify-center">
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />}
              </div>
              <span className="text-[10px] font-semibold">{item.short}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}