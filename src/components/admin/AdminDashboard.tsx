import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Award, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  FileCheck, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Scale, 
  Sparkles,
  BarChart3,
  Calendar,
  Lock,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerificationDocument } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    adminStats, 
    workers, 
    employers, 
    jobs, 
    verifyDocument, 
    disputes, 
    resolveDispute 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'verification' | 'disputes' | 'reports'>('overview');
  const [selectedDocPreview, setSelectedDocPreview] = useState<{ workerId: string; workerName: string; doc: VerificationDocument } | null>(null);
  const [rejectNote, setRejectNote] = useState('');
  const [resolvingDisputeId, setResolvingDisputeId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  // Collect all documents across all workers that are pending review
  const pendingDocs = workers.flatMap(w => 
    w.documents
      .filter(d => d.status === 'pending')
      .map(doc => ({
        workerId: w.id,
        workerName: w.fullName,
        workerAvatar: w.avatar,
        workerOccupation: w.occupation,
        doc
      }))
  );

  const allVerifiedWorkersCount = workers.filter(w => w.isVerified).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Admin Top Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Platform Integrity & Officer Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              HOMECONNECT Administration & Oversight
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Screening biometric IDs, validating CID background checks, enforcing fair employment standards, and auditing revenue models.
            </p>
          </div>

          {/* Sub navigation within Admin */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveAdminTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeAdminTab === 'overview'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Executive KPI
            </button>
            <button
              onClick={() => setActiveAdminTab('verification')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all relative ${
                activeAdminTab === 'verification'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Verification Queue
              {pendingDocs.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-black rounded-full">
                  {pendingDocs.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveAdminTab('disputes')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeAdminTab === 'disputes'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Dispute Resolution ({disputes.filter(d => d.status !== 'Resolved').length})
            </button>
            <button
              onClick={() => setActiveAdminTab('reports')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeAdminTab === 'reports'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Revenue & Demand
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Workers</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-heading font-black text-slate-900">{adminStats.totalWorkers}</span>
            <span className="text-[11px] font-bold text-emerald-600">+12%</span>
          </div>
          <span className="text-[10px] text-slate-500">{allVerifiedWorkersCount} Active in Harare</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Employers</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-heading font-black text-slate-900">{adminStats.totalEmployers}</span>
            <span className="text-[11px] font-bold text-emerald-600">+8.4%</span>
          </div>
          <span className="text-[10px] text-slate-500">Subscribed Families</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Active Jobs</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-heading font-black text-slate-900">{jobs.length}</span>
            <span className="text-[11px] font-bold text-teal-600">Open</span>
          </div>
          <span className="text-[10px] text-slate-500">In High-Demand Areas</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Placements</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-heading font-black text-slate-900">{adminStats.successfulPlacements}</span>
            <span className="text-[11px] font-bold text-emerald-600">78.2%</span>
          </div>
          <span className="text-[10px] text-slate-500">Placement Success Rate</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Verified Badge</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-heading font-black text-emerald-700">{adminStats.verifiedWorkers}</span>
            <span className="text-[11px] font-bold text-emerald-600">83%</span>
          </div>
          <span className="text-[10px] text-slate-500">Police & ID Checked</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Monthly Revenue</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-heading font-black text-slate-900">${(adminStats.monthlyRevenueUSD / 1000).toFixed(1)}k</span>
            <span className="text-[11px] font-bold text-emerald-600">+19%</span>
          </div>
          <span className="text-[10px] text-slate-500">USD recurring MRR</span>
        </div>
      </div>

      {/* Main Tabs Content */}

      {/* TAB 1: OVERVIEW */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Queue Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                Pending Verification Queue ({pendingDocs.length})
              </h3>
              <button
                onClick={() => setActiveAdminTab('verification')}
                className="text-xs text-amber-700 font-bold hover:underline"
              >
                Review All →
              </button>
            </div>

            {pendingDocs.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No documents awaiting validation.</p>
            ) : (
              <div className="space-y-3">
                {pendingDocs.slice(0, 3).map(({ workerId, workerName, workerAvatar, doc }) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={workerAvatar} alt={workerName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 block">{workerName}</span>
                        <span className="text-[10px] text-slate-500">{doc.title}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDocPreview({ workerId, workerName, doc });
                        setActiveAdminTab('verification');
                      }}
                      className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[11px] font-semibold text-slate-700"
                    >
                      Audit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Monetization Streams (October)
            </h3>

            <div className="space-y-3">
              {adminStats.revenueBreakdown.map(item => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{item.category}</span>
                    <span className="font-bold text-slate-900">${item.amount.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Demanded Skills */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Most Demanded Domestic Skills
            </h3>

            <div className="space-y-3">
              {adminStats.topDemandedSkills.map(skill => (
                <div key={skill.skill} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 font-semibold">{skill.skill}</span>
                    <span className="text-indigo-700 font-bold">{skill.demandCount} job requests</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFICATION QUEUE */}
      {activeAdminTab === 'verification' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Pending Documents */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center justify-between">
              <span>Awaiting Validation</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                {pendingDocs.length} Pending
              </span>
            </h3>

            {pendingDocs.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
                All uploaded documents have been reviewed and verified.
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingDocs.map(item => {
                  const isSelected = selectedDocPreview?.doc.id === item.doc.id;

                  return (
                    <div
                      key={item.doc.id}
                      onClick={() => setSelectedDocPreview(item)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.workerAvatar}
                          alt={item.workerName}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-heading font-bold text-xs text-slate-900 block truncate">
                            {item.workerName}
                          </span>
                          <span className="text-[11px] font-semibold text-amber-800 block truncate mt-0.5">
                            {item.doc.title}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1">
                            Uploaded {item.doc.uploadDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Audit & Inspection View */}
          <div className="lg:col-span-2">
            {selectedDocPreview ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                      Official Document Verification
                    </span>
                    <h3 className="font-heading font-bold text-lg text-slate-900 mt-1">
                      {selectedDocPreview.doc.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Candidate: <strong>{selectedDocPreview.workerName}</strong> ({selectedDocPreview.doc.documentNumber || 'Pending Document Number'})
                    </p>
                  </div>

                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                    Status: Pending Officer Sign-Off
                  </span>
                </div>

                {/* Simulated Document Preview Viewer */}
                <div className="bg-slate-900 rounded-2xl p-4 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      SECURE_VAULT://{selectedDocPreview.doc.fileName}
                    </span>
                    <span>Format: High-Res Scan</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 flex items-center justify-center border border-slate-800">
                    <img
                      src={selectedDocPreview.doc.fileUrl}
                      alt="Document scan preview"
                      className="object-cover w-full h-full opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                          GOV_DATABASE_SYNC: MATCH FOUND
                        </span>
                        <span className="text-[10px] text-slate-300">Watermark Valid</span>
                      </div>

                      <div className="text-xs">
                        <p className="font-bold text-white">Record Holder: {selectedDocPreview.workerName}</p>
                        <p className="text-[11px] text-slate-300">Doc ID: {selectedDocPreview.doc.documentNumber || 'CID-VERIFIED-RECORD'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800">
                    Officer Decision & Compliance Notes:
                  </h4>

                  <textarea
                    rows={2}
                    placeholder="Enter compliance feedback or note regarding national database check..."
                    value={rejectNote}
                    onChange={(e) => setRejectNote(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                  />

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => {
                        verifyDocument(
                          selectedDocPreview.workerId, 
                          selectedDocPreview.doc.id, 
                          'rejected', 
                          rejectNote || 'Document image illegible or unverified record'
                        );
                        setSelectedDocPreview(null);
                        setRejectNote('');
                      }}
                      className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors"
                    >
                      Reject Document
                    </button>

                    <button
                      onClick={() => {
                        verifyDocument(
                          selectedDocPreview.workerId, 
                          selectedDocPreview.doc.id, 
                          'verified', 
                          rejectNote || 'Approved after cross-referencing national civil records.'
                        );
                        setSelectedDocPreview(null);
                        setRejectNote('');
                      }}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve & Grant Verified Badge
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-xs text-slate-500">
                Select a document from the queue on the left to inspect high-resolution scan and approve.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DISPUTES & INTEGRITY */}
      {activeAdminTab === 'disputes' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Dispute Resolution Bureau
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Protecting both workers and employers through mediated arbitration and fair wage escrow.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {disputes.map(disp => (
              <div
                key={disp.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        disp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {disp.status}
                      </span>
                      <span className="text-xs text-slate-400">Case ID: {disp.id} • Filed on {disp.filedDate}</span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-slate-900 mt-1">
                      {disp.category}: {disp.filerName} vs. {disp.againstName}
                    </h4>
                    <p className="text-xs text-slate-500">Related Engagement: {disp.jobTitle}</p>
                  </div>

                  {disp.status !== 'Resolved' && (
                    <button
                      onClick={() => setResolvingDisputeId(disp.id)}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
                    >
                      Arbitrate Case
                    </button>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <span className="font-bold text-slate-500 block text-[10px] uppercase mb-0.5">Claim Details:</span>
                  "{disp.description}"
                </div>

                {disp.resolutionNote && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900">
                    <span className="font-bold block text-[10px] uppercase mb-0.5">Official Admin Ruling:</span>
                    {disp.resolutionNote}
                  </div>
                )}

                {/* Resolving Box */}
                {resolvingDisputeId === disp.id && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 pt-3">
                    <span className="font-bold text-amber-900 text-xs block">
                      Enter Formal Arbitration Ruling:
                    </span>
                    <textarea
                      rows={2}
                      value={resolutionText}
                      onChange={(e) => setResolutionText(e.target.value)}
                      placeholder="e.g. Compensation transferred; worker clear of liability..."
                      className="w-full text-xs p-2 rounded-lg border border-amber-300 bg-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setResolvingDisputeId(null)}
                        className="px-3 py-1 text-xs text-slate-600 hover:underline"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!resolutionText) return;
                          resolveDispute(disp.id, resolutionText);
                          setResolvingDisputeId(null);
                          setResolutionText('');
                        }}
                        className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs shadow-xs"
                      >
                        Close & Enforce Resolution
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REPORTS & REVENUE */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-6">
          {/* User Growth Trend Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Platform User Growth & Placement Rate Trend
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Total Workers</th>
                    <th className="py-2.5 px-3">Total Employers</th>
                    <th className="py-2.5 px-3">Placements Completed</th>
                    <th className="py-2.5 px-3">Placement Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminStats.userGrowth.map(row => (
                    <tr key={row.month} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{row.month} 2026</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.workers.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.employers.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">{row.placements}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-600">
                        {((row.placements / row.employers) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
