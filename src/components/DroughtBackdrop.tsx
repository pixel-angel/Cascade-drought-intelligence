'use client';

export default function DroughtBackdrop() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Dark background base */}
      <div className="absolute inset-0 bg-[#06110D]" />
      
      {/* Subtle glowing orbs/gradients for the command center feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}