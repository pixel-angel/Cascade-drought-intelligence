'use client';

import { useState, useRef } from 'react';

const NAV_ITEMS = [
  { 
    id: 'profile', 
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'notifications', 
    label: 'Notifications',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'analysis', 
    label: 'Analysis',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'display', 
    label: 'Display',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="9" x2="21" y2="9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

export default function SettingsPage() {
  // Toggle states
  const [sysNotif, setSysNotif] = useState(true);
  const [critAlert, setCritAlert] = useState(true);
  const [wkSummary, setWkSummary] = useState(false);
  const [compact, setCompact] = useState(false);
  const [showCharts, setShowCharts] = useState(true);

  // Active navigation state
  const [activeSection, setActiveSection] = useState('profile');

  // Refs for scrolling to each section
  const profileRef = useRef<HTMLElement>(null);
  const notificationsRef = useRef<HTMLElement>(null);
  const analysisRef = useRef<HTMLElement>(null);
  const displayRef = useRef<HTMLElement>(null);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    if (id === 'profile' && profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'notifications' && notificationsRef.current) {
      notificationsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'analysis' && analysisRef.current) {
      analysisRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'display' && displayRef.current) {
      displayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <div 
      onClick={onChange}
      className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ${
        enabled 
          ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.4)] border border-cyan-400' 
          : 'bg-[#06110D] border border-emerald-800/60'
      }`}
    >
      <div 
        className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? 'translate-x-5' : 'translate-x-0 opacity-60'
        }`} 
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="mb-8 border-b border-emerald-900/40 pb-5">
        <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold mb-1">Workspace Preferences</p>
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Settings
        </h1>
        <p className="text-xs text-emerald-400/80 mt-1">
          Manage your profile, analysis preferences and notifications.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="xl:col-span-3 flex flex-col gap-4 sticky top-8">
          <div className="glass-panel p-5 rounded-2xl border border-emerald-900/40">
            <h2 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4 px-3">Preferences</h2>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all w-full text-left ${
                    activeSection === item.id 
                      ? 'bg-cyan-950/30 text-cyan-300 border border-cyan-900/50 shadow-[inset_0_0_12px_rgba(34,211,238,0.1)]' 
                      : 'text-emerald-400/80 hover:bg-emerald-900/20 hover:text-emerald-200 border border-transparent'
                  }`}
                >
                  <span className={activeSection === item.id ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'opacity-60'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-900/40 bg-emerald-950/10">
            <h3 className="text-sm font-bold text-emerald-100 mb-1">CASCADE</h3>
            <p className="text-[10px] text-emerald-500 mb-3">Agricultural Drought Impact Graph</p>
            <span className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-800/50 text-[10px] text-emerald-400 font-mono inline-block">
              Demo environment
            </span>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          
          {/* Profile Section */}
          <section ref={profileRef} className="glass-panel p-6 md:p-8 rounded-2xl border border-emerald-900/40">
            <h2 className="text-lg font-bold text-emerald-100 mb-1">Profile Information</h2>
            <p className="text-xs text-emerald-500 mb-6">Update your workspace profile details.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Display name</label>
                <input 
                  type="text" 
                  placeholder="Enter your display name"
                  className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-100 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none placeholder-emerald-800 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Email address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-100 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none placeholder-emerald-800 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Organization</label>
              <input 
                type="text" 
                placeholder="Enter your organization"
                className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-100 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none placeholder-emerald-800 transition-colors"
              />
            </div>
          </section>

          {/* Notifications Section */}
          <section ref={notificationsRef} className="glass-panel p-6 md:p-8 rounded-2xl border border-emerald-900/40">
            <h2 className="text-lg font-bold text-emerald-100 mb-1">Notifications</h2>
            <p className="text-xs text-emerald-500 mb-8">Choose which alerts you want to see.</p>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center pb-6 border-b border-emerald-900/30">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-100 mb-1">System notifications</h3>
                  <p className="text-xs text-emerald-500/80">Receive general application notifications.</p>
                </div>
                <Toggle enabled={sysNotif} onChange={() => setSysNotif(!sysNotif)} />
              </div>

              <div className="flex justify-between items-center pb-6 border-b border-emerald-900/30">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-100 mb-1">Critical drought alerts</h3>
                  <p className="text-xs text-emerald-500/80">Highlight locations marked as critical.</p>
                </div>
                <Toggle enabled={critAlert} onChange={() => setCritAlert(!critAlert)} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-100 mb-1">Weekly summary</h3>
                  <p className="text-xs text-emerald-500/80">Enable the weekly summary preference.</p>
                </div>
                <Toggle enabled={wkSummary} onChange={() => setWkSummary(!wkSummary)} />
              </div>
            </div>
          </section>

          {/* Analysis Section */}
          <section ref={analysisRef} className="glass-panel p-6 md:p-8 rounded-2xl border border-emerald-900/40">
            <h2 className="text-lg font-bold text-emerald-100 mb-1">Analysis Preferences</h2>
            <p className="text-xs text-emerald-500 mb-6">Configure the default options used in your analyses.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Analysis method</label>
                <select className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-100 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none appearance-none cursor-pointer">
                  <option>Balanced</option>
                  <option>Conservative</option>
                  <option>Aggressive</option>
                </select>
                <p className="text-[10px] text-emerald-600 mt-2">Select the approach used for analysis.</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Drought severity threshold</label>
                <select className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-100 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none appearance-none cursor-pointer">
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
                <p className="text-[10px] text-emerald-600 mt-2">Choose the severity level to highlight.</p>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Default region</label>
              <select className="w-full bg-[#0A1713] border border-emerald-800/60 text-emerald-100 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none appearance-none cursor-pointer">
                <option>All Regions</option>
                <option>Upper Basin</option>
                <option>Central Basin</option>
              </select>
              <p className="text-[10px] text-emerald-600 mt-2">Choose the region you want selected by default.</p>
            </div>
          </section>

          {/* Display Section */}
          <section ref={displayRef} className="glass-panel p-6 md:p-8 rounded-2xl border border-emerald-900/40">
            <h2 className="text-lg font-bold text-emerald-100 mb-1">Display Preferences</h2>
            <p className="text-xs text-emerald-500 mb-8">Personalize how information appears on your screen.</p>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center pb-6 border-b border-emerald-900/30">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-100 mb-1">Compact view</h3>
                  <p className="text-xs text-emerald-500/80">Prefer a more compact presentation of information.</p>
                </div>
                <Toggle enabled={compact} onChange={() => setCompact(!compact)} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-100 mb-1">Show charts</h3>
                  <p className="text-xs text-emerald-500/80">Keep charts visible when viewing analysis results.</p>
                </div>
                <Toggle enabled={showCharts} onChange={() => setShowCharts(!showCharts)} />
              </div>
            </div>
          </section>

          {/* Save Action Bar */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-900/40 bg-gradient-to-r from-[#06110D] to-[#0A1F18] flex flex-col md:flex-row justify-between items-center gap-4 mt-2">
            <p className="text-xs text-emerald-400/80">Remember to save your changes to apply them to your workspace.</p>
            <button 
              onClick={() => alert('Settings Saved Successfully!')}
              className="w-full md:w-auto px-6 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 border border-cyan-400/50 text-white shadow-[0_0_12px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:brightness-110 transition-all whitespace-nowrap"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}