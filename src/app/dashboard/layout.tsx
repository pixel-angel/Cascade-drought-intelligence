
"use client";

import Sidebar from "@/components/Sidebar";
import DroughtBackdrop from "@/components/DroughtBackdrop";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#06110D] font-sans text-emerald-50">
      <DroughtBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col pb-16 md:flex-row md:pb-8">
        <Sidebar />

        <div className="animate-fade-in-up w-full min-w-0 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Dashboard Live Telemetry Ticker */}
      <div className="pointer-events-none fixed bottom-[60px] left-0 z-40 flex h-8 w-full items-center overflow-hidden border-t border-emerald-900/50 bg-[#040D0A]/90 backdrop-blur-md md:bottom-0">
        <div className="ticker-scroll flex w-max shrink-0 gap-12 whitespace-nowrap pr-12 font-mono text-[10px] font-bold tracking-widest text-emerald-500">
          {/* Set 1 */}
          <span className="shrink-0">
            [SYSTEM] LIVE TELEMETRY STREAM ACTIVE
          </span>
          <span className="shrink-0 text-cyan-400 drop-shadow-[0_0_5px_#38BDF8]">
            ◆ SENSOR 04 (UPPER BASIN): MOISTURE DROP -2.1%
          </span>
          <span className="shrink-0 text-emerald-400">
            ◆ SENSOR 12 (EASTERN): NOMINAL
          </span>
          <span className="shrink-0 text-amber-400 drop-shadow-[0_0_5px_#F59E0B]">
            ◆ ALERT: SOIL TEMP ELEVATED IN SECTOR 7
          </span>
          <span className="shrink-0">
            ◆ NETWORK LATENCY: 12ms
          </span>
          <span className="shrink-0 text-cyan-400">
            ◆ SENSOR 09 (CENTRAL): RAINFALL DETECTED +4.2mm
          </span>
          <span className="shrink-0">
            [SYSTEM] END OF STREAM
          </span>

          {/* Set 2: duplicate for seamless looping */}
          <span className="shrink-0">
            [SYSTEM] LIVE TELEMETRY STREAM ACTIVE
          </span>
          <span className="shrink-0 text-cyan-400 drop-shadow-[0_0_5px_#38BDF8]">
            ◆ SENSOR 04 (UPPER BASIN): MOISTURE DROP -2.1%
          </span>
          <span className="shrink-0 text-emerald-400">
            ◆ SENSOR 12 (EASTERN): NOMINAL
          </span>
          <span className="shrink-0 text-amber-400 drop-shadow-[0_0_5px_#F59E0B]">
            ◆ ALERT: SOIL TEMP ELEVATED IN SECTOR 7
          </span>
          <span className="shrink-0">
            ◆ NETWORK LATENCY: 12ms
          </span>
          <span className="shrink-0 text-cyan-400">
            ◆ SENSOR 09 (CENTRAL): RAINFALL DETECTED +4.2mm
          </span>
          <span className="shrink-0">
            [SYSTEM] END OF STREAM
          </span>
        </div>
      </div>
    </div>
  );
}
