'use client';

import { useState } from 'react';

type Severity = 'Critical' | 'High' | 'Moderate' | 'Low';
type Status = 'Completed' | 'Processing';

interface Report {
  id: string;
  title: string;
  ref: string;
  type: string;
  date: string;
  severity: Severity;
  status: Status;
}

const INITIAL_REPORTS: Report[] = [
  { id: '1', title: 'Upper Basin Drought Assessment', ref: 'RPT-001', type: 'Impact Analysis', date: '09 Oct 2026', severity: 'Critical', status: 'Completed' },
  { id: '2', title: 'Watershed Risk Overview', ref: 'RPT-002', type: 'Risk Assessment', date: '08 Oct 2026', severity: 'High', status: 'Completed' },
  { id: '3', title: 'Seasonal Water Availability', ref: 'RPT-003', type: 'Water Analysis', date: '07 Oct 2026', severity: 'Moderate', status: 'Processing' },
  { id: '4', title: 'Agricultural Impact Summary', ref: 'RPT-004', type: 'Agriculture', date: '06 Oct 2026', severity: 'Low', status: 'Completed' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');

  const handleGenerate = () => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `Ad-Hoc Analysis ${reports.length + 1}`,
      ref: `RPT-00${reports.length + 1}`,
      type: 'Custom Assessment',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      severity: 'Moderate',
      status: 'Processing'
    };
    setReports([newReport, ...reports]);
  };

  // 🚀 Elite Invisible Print-to-PDF Engine
  const handleExport = (report: Report) => {
    const isHighRisk = report.severity === 'Critical' || report.severity === 'High';
    
    // Injectable CSS specifically designed for crisp A4 PDF Printing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${report.ref} - ${report.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@500&display=swap');
          body { font-family: 'Inter', sans-serif; color: #111827; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          .header { border-bottom: 2px solid #047857; padding-bottom: 24px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end; }
          .logo { font-size: 28px; font-weight: 800; color: #111827; letter-spacing: 2px; }
          .logo span { color: #047857; }
          .meta { text-align: right; font-size: 11px; color: #4B5563; font-family: 'JetBrains Mono', monospace; }
          h1 { font-size: 26px; margin: 0 0 16px 0; color: #111827; font-weight: 800; letter-spacing: -0.5px; }
          .badge { display: inline-block; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px; }
          .badge.critical { background: #FEF2F2; color: #991B1B; border: 1px solid #FCA5A5; }
          .badge.high { background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74; }
          .badge.moderate { background: #FFFBEB; color: #92400E; border: 1px solid #FCD34D; }
          .badge.low { background: #ECFDF5; color: #065F46; border: 1px solid #6EE7B7; }
          .section { margin-bottom: 32px; }
          .section h3 { font-size: 12px; text-transform: uppercase; color: #047857; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 1px; font-weight: 800; }
          .section p { font-size: 14px; color: #374151; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
          .card { border: 1px solid #E5E7EB; padding: 16px; border-radius: 8px; background: #F9FAFB; }
          .card-label { font-size: 10px; text-transform: uppercase; color: #6B7280; margin-bottom: 6px; font-weight: 600; letter-spacing: 0.5px; }
          .card-value { font-size: 16px; font-weight: 600; color: #111827; font-family: 'JetBrains Mono', monospace; }
          ul { margin: 0; padding-left: 20px; }
          li { margin-bottom: 12px; font-size: 14px; color: #374151; }
          .footer { margin-top: 64px; font-size: 10px; color: #9CA3AF; text-align: center; border-top: 1px solid #E5E7EB; padding-top: 24px; font-family: 'JetBrains Mono', monospace; }
          @media print {
            body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 1.5cm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">CASCADE<span>.</span></div>
          <div class="meta">
            <div><strong>REF:</strong> ${report.ref}</div>
            <div style="margin-top: 4px;"><strong>DATE:</strong> ${report.date}</div>
          </div>
        </div>
        
        <h1>${report.title}</h1>
        <div class="badge ${report.severity.toLowerCase()}">${report.severity} SEVERITY</div>

        <div class="section">
          <h3>1. Executive Summary</h3>
          <p>This automated assessment provides a high-level overview of the watershed conditions associated with the <strong>${report.title}</strong>. Based on the latest telemetry and predictive models, the current severity level is classified as <strong>${report.severity.toUpperCase()}</strong>.</p>
        </div>

        <div class="section">
          <h3>2. Key Indicators</h3>
          <div class="grid">
            <div class="card">
              <div class="card-label">Primary Status</div>
              <div class="card-value">${report.status.toUpperCase()}</div>
            </div>
            <div class="card">
              <div class="card-label">Risk Classification</div>
              <div class="card-value">${report.severity.toUpperCase()}</div>
            </div>
            <div class="card">
              <div class="card-label">Assessment Method</div>
              <div class="card-value">Standard / Balanced</div>
            </div>
            <div class="card">
              <div class="card-label">Report Type</div>
              <div class="card-value">${report.type}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>3. Actionable Recommendations</h3>
          <ul>
            ${isHighRisk ? 
              '<li><strong>[IMMEDIATE]</strong> Review localized soil moisture telemetry for critical deterioration.</li><li><strong>[IMMEDIATE]</strong> Advise local agricultural partners of high-risk status.</li><li><strong>[SECONDARY]</strong> Prepare resource reallocation contingencies based on predictive modeling.</li>' : 
              '<li>Continue standard baseline environmental monitoring.</li><li>Review weekly summary reports for structural trend shifts.</li><li>No immediate escalation required.</li>'}
          </ul>
        </div>

        <div class="footer">
          Generated by CASCADE Drought Intelligence on ${new Date().toLocaleString()} <br/>
          CONFIDENTIAL - FOR INTERNAL DECISION SUPPORT ONLY
        </div>
      </body>
      </html>
    `;

    // Create an invisible iframe, inject the HTML, and call print()
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    if (iframe.contentWindow) {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(htmlContent);
      iframe.contentWindow.document.close();
      
      // Small delay to ensure styles are loaded before opening print dialog
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedCount = reports.filter(r => r.status === 'Completed').length;
  const processingCount = reports.filter(r => r.status === 'Processing').length;

  const getSeverityColor = (severity: Severity): string => {
    switch (severity) {
      case 'Critical': return 'text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]';
      case 'High': return 'text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]';
      case 'Moderate': return 'text-amber-200 drop-shadow-[0_0_5px_rgba(253,230,138,0.5)]';
      case 'Low': return 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]';
      default: return 'text-emerald-400'; 
    }
  };

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6 border-b border-emerald-900/40 pb-5">
        <div>
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold mb-1">Workspace / Documentation</p>
          <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Reports
          </h1>
          <p className="text-xs text-emerald-400/80 mt-1">
            View, organize and export drought analysis reports.
          </p>
        </div>
        <button 
          onClick={handleGenerate}
          className="px-5 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400/50 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:brightness-110 transition-all flex items-center gap-2"
        >
          <span>+</span> Generate Report
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-panel p-5 rounded-2xl border border-emerald-900/40 flex justify-between items-start bg-[#0A1713]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Total Reports</div>
            <div className="text-3xl font-mono font-bold text-cyan-400 drop-shadow-md">{reports.length < 10 ? `0${reports.length}` : reports.length}</div>
            <div className="text-xs text-emerald-600/80 mt-1">Reports in this demo</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#06110D] border border-emerald-800/50 flex items-center justify-center text-emerald-400">📄</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-emerald-900/40 flex justify-between items-start bg-[#0A1713] shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Completed</div>
            <div className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-md">{completedCount < 10 ? `0${completedCount}` : completedCount}</div>
            <div className="text-xs text-emerald-600/80 mt-1">Ready to export</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-center text-emerald-400">✓</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-amber-900/30 flex justify-between items-start bg-[#0A1713] shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-amber-500/80 mb-2">Processing</div>
            <div className="text-3xl font-mono font-bold text-amber-400 drop-shadow-md">{processingCount < 10 ? `0${processingCount}` : processingCount}</div>
            <div className="text-xs text-emerald-600/80 mt-1">Sample pending report</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-950/30 border border-amber-900/50 flex items-center justify-center text-amber-400 animate-pulse">⏳</div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40 bg-[#0A1713]">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-lg font-bold text-emerald-100">Report Library</h2>
            <p className="text-[10px] text-emerald-500 mt-1 uppercase tracking-widest">Browse and manage your analysis reports.</p>
          </div>
          <span className="px-3 py-1 bg-[#06110D] border border-emerald-800/50 rounded-full text-[10px] text-emerald-400 font-mono">
            {filteredReports.length} reports
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#06110D] border border-emerald-800/60 text-emerald-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-2.5 outline-none placeholder-emerald-700 transition-colors"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
            className="w-full md:w-48 bg-[#06110D] border border-emerald-800/60 text-emerald-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-2.5 outline-none appearance-none cursor-pointer"
          >
            <option value="All">All statuses</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-12 gap-4 py-3 border-b border-emerald-800/60 text-[10px] uppercase tracking-wider text-emerald-500 font-semibold mb-2">
              <div className="col-span-4">Report</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1 text-center">Severity</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {filteredReports.length > 0 ? filteredReports.map((report) => (
              <div key={report.id} className="grid grid-cols-12 gap-4 py-4 border-b border-emerald-900/30 items-center hover:bg-emerald-900/20 transition-colors group rounded-lg px-2 -mx-2">
                <div className="col-span-4">
                  <h3 className="text-sm font-bold text-emerald-50 group-hover:text-cyan-300 transition-colors">{report.title}</h3>
                  <div className="text-[10px] text-emerald-600 font-mono mt-0.5">{report.ref}</div>
                </div>
                
                <div className="col-span-2 text-xs text-emerald-400/80">
                  {report.type}
                </div>
                
                <div className="col-span-2 text-xs text-emerald-400/80 font-mono">
                  {report.date}
                </div>
                
                <div className="col-span-1 text-center font-bold text-xs">
                  <span className={getSeverityColor(report.severity)}>{report.severity}</span>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    report.status === 'Completed' 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' 
                      : 'bg-amber-950/40 text-amber-400 border-amber-900/50 animate-pulse'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="col-span-1 flex justify-end">
                  <button 
                    onClick={() => handleExport(report)}
                    disabled={report.status !== 'Completed'}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 ${
                      report.status === 'Completed'
                        ? 'border-emerald-700/50 text-emerald-300 hover:bg-emerald-800/40 hover:text-white hover:border-cyan-500/50'
                        : 'border-emerald-900/40 text-emerald-800 cursor-not-allowed opacity-50'
                    }`}
                  >
                    ↓ Export
                  </button>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center text-emerald-600 text-sm">
                No reports found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 border border-emerald-800/50 bg-[#081812] rounded-xl p-4 shadow-inner">
        <p className="text-[10px] text-emerald-500/80 leading-relaxed uppercase tracking-widest">
          Demo mode: Reports contain illustrative sample information.
        </p>
      </div>
    </main>
  );
}