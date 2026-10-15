import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Send, 
  X,
  Building,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobListing } from '../../types';
import { calculateSuitabilityScore } from '../../utils/matchingEngine';

export const WorkerJobsView: React.FC = () => {
  const { jobs, currentWorker, applyForJob, applications } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');

  // Apply Modal state
  const [jobToApply, setJobToApply] = useState<JobListing | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [expectedRate, setExpectedRate] = useState(`$${currentWorker.expectedSalary.amount}/month`);

  const filteredJobs = jobs
    .filter(job => {
      if (job.status !== 'Open') return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchDesc = job.description.toLowerCase().includes(q);
        const matchLoc = job.neighborhood.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }
      if (selectedType !== 'All' && job.employmentType !== selectedType) return false;
      if (selectedNeighborhood !== 'All' && job.neighborhood !== selectedNeighborhood) return false;
      return true;
    })
    .map(job => {
      const match = calculateSuitabilityScore(currentWorker, job);
      return { job, match };
    })
    .sort((a, b) => b.match.overallScore - a.match.overallScore);

  const handleOpenApplyModal = (job: JobListing) => {
    setJobToApply(job);
    setCoverNote(
      `Dear ${job.employerName}, I am very interested in your "${job.title}" position. I have ${currentWorker.experienceYears} years of verified experience in ${currentWorker.occupation} and reside nearby in ${currentWorker.neighborhood}. I look forward to contributing to your household.`
    );
    setExpectedRate(`$${job.salary.amount}/${job.salary.period}`);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobToApply) return;
    applyForJob(jobToApply.id, coverNote, expectedRate);
    setJobToApply(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Verified Household Vacancies
            </div>
            <h1 className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
              Domestic Jobs & Nanny Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Apply to verified employers with upfront salaries, fair labor practices, and transparent contracts.
            </p>
          </div>

          <div className="bg-teal-50 px-4 py-2.5 rounded-xl border border-teal-100 text-xs">
            <span className="text-teal-900 font-bold block">Applying as: {currentWorker.fullName}</span>
            <span className="text-teal-700 text-[11px]">
              {currentWorker.isVerified ? '✅ 100% Verified Profile' : 'Pending Verification'}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs by keyword or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            >
              <option value="All">All Types (Live-In & Live-Out)</option>
              <option value="Live-Out">Live-Out Only</option>
              <option value="Live-In">Live-In Only</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <div>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            >
              <option value="All">All Suburbs (Harare)</option>
              <option value="Highlands">Highlands</option>
              <option value="Borrowdale">Borrowdale</option>
              <option value="Mount Pleasant">Mount Pleasant</option>
              <option value="Avondale">Avondale</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map(({ job, match }) => {
          const hasApplied = applications.some(a => a.jobId === job.id && a.workerId === currentWorker.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                      {job.employmentType}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-slate-900 mt-1">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      Household: {job.employerName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-xl bg-teal-600 text-white font-heading font-black text-xs inline-flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      {match.overallScore}% Fit
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">for your profile</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.neighborhood}, {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.workingHours}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.requiredSkills.map(s => {
                    const workerHasSkill = currentWorker.skills.some(ws => ws.toLowerCase().includes(s.toLowerCase()));
                    return (
                      <span
                        key={s}
                        className={`px-2 py-0.5 text-[11px] rounded-md font-medium flex items-center gap-1 ${
                          workerHasSkill
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {workerHasSkill && <Check className="w-3 h-3 text-emerald-600" />}
                        {s}
                      </span>
                    );
                  })}
                </div>

                {/* Perks: Meals & Room */}
                <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  {job.mealsProvided && <span>🍲 Daily Meals Provided</span>}
                  {job.accommodationProvided && <span>🛏️ Private Room Provided</span>}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Offered Wage</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ${job.salary.amount} USD
                  </span>
                  <span className="text-xs text-slate-500"> / {job.salary.period}</span>
                </div>

                {hasApplied ? (
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Application Submitted
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenApplyModal(job)}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    1-Click Apply
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      {jobToApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Apply for {jobToApply.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Employer: {jobToApply.employerName} ({jobToApply.neighborhood})
                </p>
              </div>
              <button
                onClick={() => setJobToApply(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Your Introduction & Cover Message</label>
                <textarea
                  required
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Expected Rate / Compensation</label>
                <input
                  type="text"
                  required
                  value={expectedRate}
                  onChange={(e) => setExpectedRate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-800 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your Verified Badge and police clearance records will be attached automatically.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setJobToApply(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
