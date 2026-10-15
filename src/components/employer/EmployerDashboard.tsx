import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  PlusCircle, 
  ChevronRight, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Award,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile } from '../../types';
import { calculateSuitabilityScore } from '../../utils/matchingEngine';

interface EmployerDashboardProps {
  onSelectWorkerForProfile: (worker: WorkerProfile) => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onSelectWorkerForProfile }) => {
  const { 
    currentEmployer, 
    workers, 
    jobs, 
    applications, 
    interviews, 
    setActiveTab, 
    setIsJobModalOpen, 
    setIsScheduleModalOpen,
    setSelectedWorkerForSchedule,
    toggleCompareWorker,
    comparedWorkers,
    setIsPricingModalOpen
  } = useApp();

  const employerJobs = jobs.filter(j => j.employerId === currentEmployer.id);
  const myJobApps = applications.filter(a => employerJobs.some(j => j.id === a.jobId));
  const myInterviews = interviews.filter(i => i.employerId === currentEmployer.id);

  // Top recommended matches for this employer's first active job
  const activeJob = employerJobs[0] || jobs[0];
  const recommendedWorkers = workers
    .map(worker => ({
      worker,
      breakdown: calculateSuitabilityScore(worker, activeJob)
    }))
    .sort((a, b) => b.breakdown.overallScore - a.breakdown.overallScore)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Household & Safe Recruitment
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              Welcome, {currentEmployer.fullName}
            </h1>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Find background-cleared, experienced domestic workers with confidence. All candidates have verified police records and reference checks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsJobModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Post New Vacancy
            </button>
            <button
              onClick={() => setActiveTab('find-workers')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors"
            >
              Search All Workers
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Screened Candidates</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-slate-900">{workers.length}</span>
            <span className="text-[11px] font-bold text-emerald-600">Available</span>
          </div>
          <span className="text-[10px] text-slate-500">100% ID & Criminal Checked</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Open Vacancies</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-emerald-700">{employerJobs.length}</span>
            <span className="text-[11px] font-bold text-slate-500">Active</span>
          </div>
          <span className="text-[10px] text-slate-500">Highlands & Surrounds</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Received Applications</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-teal-700">{myJobApps.length}</span>
            <span className="text-[11px] font-bold text-teal-600">Candidates</span>
          </div>
          <span className="text-[10px] text-slate-500">Under review</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Scheduled Interviews</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-indigo-700">{myInterviews.length}</span>
            <span className="text-[11px] font-bold text-indigo-600">Active</span>
          </div>
          <span className="text-[10px] text-slate-500">Home visits & trials</span>
        </div>
      </div>

      {/* Recommended Candidates Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Automated AI Recommendations
            </div>
            <h2 className="text-lg font-heading font-extrabold text-slate-900">
              Top Ranked Candidates for "{activeJob?.title}"
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('find-workers')}
            className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Explore all {workers.length} candidates →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedWorkers.map(({ worker, breakdown }) => {
            const isComparing = comparedWorkers.some(w => w.id === worker.id);

            return (
              <div
                key={worker.id}
                className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <img
                      src={worker.avatar}
                      alt={worker.fullName}
                      className="w-14 h-14 rounded-xl object-cover ring-2 ring-white shadow-xs"
                    />
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-heading font-extrabold text-xs inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {breakdown.overallScore}% Fit
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {worker.experienceYears} yrs exp
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <h3 className="font-heading font-bold text-sm text-slate-900">
                      {worker.fullName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium truncate">{worker.occupation}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {worker.neighborhood} • ${worker.expectedSalary.amount}/mo
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {worker.skills.slice(0, 2).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleCompareWorker(worker)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors"
                    title="Compare side-by-side"
                  >
                    <Scale className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedWorkerForSchedule(worker);
                      setIsScheduleModalOpen(true);
                    }}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors text-center"
                  >
                    Interview
                  </button>

                  <button
                    onClick={() => onSelectWorkerForProfile(worker)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Postings & Placement Guarantee Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Your Active Household Vacancies ({employerJobs.length})
            </h3>
            <button
              onClick={() => setActiveTab('my-jobs')}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              Manage Listings →
            </button>
          </div>

          <div className="space-y-3">
            {employerJobs.map(job => (
              <div
                key={job.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{job.title}</span>
                  <span className="text-slate-500 text-[11px]">
                    {job.employmentType} • ${job.salary.amount}/month • {job.workingHours}
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs inline-block">
                    {applications.filter(a => a.jobId === job.id).length} Applicants
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Placement Guarantee Banner */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200/80 space-y-3">
          <div className="p-2 w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-emerald-950">
            90-Day Placement Guarantee
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Every domestic placement arranged through HOMECONNECT includes a replacement pledge. If an employee is not the right fit within 90 days, we re-match your family at zero placement fee.
          </p>
          <button
            onClick={() => setIsPricingModalOpen(true)}
            className="text-xs font-bold text-emerald-900 underline block pt-1"
          >
            Learn about Placement Insurance →
          </button>
        </div>
      </div>
    </div>
  );
};
