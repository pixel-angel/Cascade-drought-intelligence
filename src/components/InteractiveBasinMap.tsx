'use client';

import { useEffect, useRef } from 'react';

export interface NodePoint {
  id: string;
  x: number;
  y: number;
  type: 'Reservoir' | 'Farm' | 'Sensor';
  status: 'nominal' | 'warning' | 'critical' | 'healthy' | 'at-risk';
  label: string;
  value?: number;
  name?: string;
  moisture?: number;
  flowCapacity?: number;
  stressIndex?: number;
}

export const INITIAL_SAMPLE_NODES: NodePoint[] = [
  { id: 'node-1', x: 200, y: 120, type: 'Reservoir', status: 'nominal', label: 'Upper Basin', moisture: 68, flowCapacity: 92, stressIndex: 0.12 },
  { id: 'node-2', x: 450, y: 100, type: 'Sensor', status: 'nominal', label: 'North Sector', moisture: 65, flowCapacity: 88, stressIndex: 0.15 },
  { id: 'node-3', x: 750, y: 250, type: 'Farm', status: 'nominal', label: 'East Valley', moisture: 71, flowCapacity: 95, stressIndex: 0.08 },
  { id: 'node-4', x: 600, y: 480, type: 'Farm', status: 'nominal', label: 'South Delta', moisture: 62, flowCapacity: 85, stressIndex: 0.18 },
  { id: 'node-5', x: 280, y: 420, type: 'Sensor', status: 'warning', label: 'West Sector', moisture: 42, flowCapacity: 55, stressIndex: 0.65 },
  { id: 'node-27', x: 380, y: 280, type: 'Reservoir', status: 'critical', label: 'East Reservoir', moisture: 24, flowCapacity: 70, stressIndex: 0.84 },
];

interface MapProps {
  nodes?: NodePoint[];
  activeNodeId?: string;
  onNodeClick?: (id: string) => void;
}

export default function InteractiveBasinMap({ nodes = INITIAL_SAMPLE_NODES, activeNodeId = 'node-27', onNodeClick }: MapProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const orangeCircleRef = useRef<SVGCircleElement>(null);
  const redCircleRef = useRef<SVGCircleElement>(null);
  const redDotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frameId: number;
    let offset = 0;
    let pulse = 0;
    let pulse2 = 0.5; 

    const tick = () => {
      offset -= 0.8;
      pulse = pulse >= 1 ? 0 : pulse + 0.012;
      pulse2 = pulse2 >= 1 ? 0 : pulse2 + 0.012;

      if (pathRef.current) pathRef.current.style.strokeDashoffset = `${offset}px`;
      
      if (orangeCircleRef.current) {
        orangeCircleRef.current.setAttribute('r', (12 + pulse * 22).toString());
        orangeCircleRef.current.setAttribute('opacity', Math.max(0, 1 - pulse).toString());
      }
      if (redCircleRef.current) {
        redCircleRef.current.setAttribute('r', (14 + pulse2 * 26).toString());
        redCircleRef.current.setAttribute('opacity', Math.max(0, 1 - pulse2).toString());
      }
      if (redDotRef.current) redDotRef.current.style.opacity = pulse > 0.5 ? '1' : '0.35';

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeNode = nodes.find(n => String(n.id) === String(activeNodeId)) || nodes[5];

  const getNodeColor = (status: string) => {
    switch(status) {
      case 'warning': return { fill: '#F59E0B', stroke: '#FCD34D', shadow: 'drop-shadow-[0_0_8px_#F59E0B]' };
      case 'critical': return { fill: '#EF4444', stroke: '#FCA5A5', shadow: 'drop-shadow-[0_0_8px_#EF4444]' };
      default: return { fill: '#10B981', stroke: '#6EE7B7', shadow: 'drop-shadow-[0_0_8px_#10B981]' };
    }
  };

  return (
    <div className="flex-1 w-full bg-[#040D0A] rounded-xl border border-emerald-900/40 overflow-hidden relative min-h-[600px] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
      
      {/* BULLETPROOF TERRAIN BACKGROUND IMAGE */}
      <img 
        src="/cascade-terrain-clean.png" 
        alt="Terrain Background"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.50, zIndex: 0 }}
      />
      
      {/* Dark Opacity Mask */}
      <div className="absolute inset-0 bg-[#040D0A]/70 z-10 pointer-events-none" />

      {/* Legend */}
      <div className="absolute top-6 left-6 z-20 bg-[#06110D]/85 backdrop-blur-md border border-emerald-900/50 rounded-lg p-4 font-mono text-[10px] uppercase tracking-widest text-emerald-400 pointer-events-none shadow-xl">
        <div className="mb-2 font-bold text-emerald-300 border-b border-emerald-900/50 pb-2">Node Status</div>
        <div className="flex items-center gap-2 mb-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10B981]"></span> Nominal</div>
        <div className="flex items-center gap-2 mb-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_5px_#F59E0B]"></span> Elevated Risk</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_#EF4444]"></span> Critical Alert</div>
      </div>

      {/* Active Inspector */}
      <div className="absolute top-6 left-52 z-20 bg-[#0A1713]/90 backdrop-blur-md border border-emerald-900/50 rounded-lg p-3 flex items-center gap-4 pointer-events-none shadow-xl">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-emerald-500 mb-1 font-bold">Active Inspector</div>
          <div className="flex items-center gap-2">
            <span ref={redDotRef} className={`w-3 h-3 rounded-full ${activeNode.status === 'critical' ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : activeNode.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B]' : 'bg-emerald-500 shadow-[0_0_8px_#10B981]'}`} />
            <span className="text-sm font-semibold text-white">{activeNode.label}</span>
          </div>
        </div>
        <div className="h-8 w-px bg-emerald-900/60 mx-2"></div>
        <div className="text-xs text-emerald-300 font-mono">{activeNode.moisture}% moisture</div>
      </div>

      {/* SVG Network Overlay */}
      <svg viewBox="0 0 1000 600" className="w-full h-full absolute inset-0 z-20 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
        <g stroke="#06B6D4" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" opacity="0.85">
          <path ref={pathRef} d="M 200 120 L 450 100 L 750 250 L 600 480 L 280 420 L 380 280 L 200 120 M 380 280 L 600 480" fill="none" style={{ strokeDashoffset: '0px' }} />
        </g>

        {/* DYNAMIC NODES RENDERED FROM STATE */}
        {nodes.map((node) => {
          const col = getNodeColor(node.status);
          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`} onClick={() => onNodeClick?.(node.id)} className="cursor-pointer group">
              {node.status === 'critical' && (
                <circle cx="0" cy="0" r="18" stroke="#EF4444" strokeWidth="2" fill="none" className="animate-ping opacity-70 pointer-events-none" />
              )}
              {node.status === 'warning' && (
                <circle cx="0" cy="0" r="16" stroke="#F59E0B" strokeWidth="2" fill="none" className="animate-pulse opacity-70 pointer-events-none" />
              )}
              <circle cx="0" cy="0" r="12" fill={col.fill} stroke={col.stroke} strokeWidth="3" className={`group-hover:stroke-white transition-all ${col.shadow}`} />
              <text x="0" y="-18" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontFamily="monospace" className="pointer-events-none font-bold uppercase tracking-wider">{node.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}