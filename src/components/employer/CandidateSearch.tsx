import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Filter, 
  Sparkles, 
  Check, 
  Scale, 
  Calendar, 
  MessageSquare, 
  ChevronRight,
  Info,
  DollarSign,
  Award,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile } from '../../types';
import { calculateSuitabilityScore } from '../../utils/matchingEngine';

interface CandidateSearchProps {
  onSelectWorkerForProfile: (worker: WorkerProfile) => void;
}

const ALL_SKILLS = [
  'Childcare & Infant Care',
  'Continental Cooking',
  'Elderly Care & Companionship',
  'Deep Cleaning',
  'Laundry & Steam Ironing',
  'First Aid & CPR',
  'Special Needs Childcare (Autism/ADHD)',
  'Pet Friendly',
  'Medication Reminders'
];

export const CandidateSearch: React.FC<CandidateSearchProps> = ({ onSelectWorkerForProfile }) => {
  const { 
    workers, 
    jobs,
    currentEmployer,
    toggleCompareWorker, 
    comparedWorkers,
    setIsScheduleModalOpen,
    setSelectedWorkerForSchedule,
    startOrOpenConversation,
    setActiveTab
  } = useApp();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [selectedMinExperience, setSelectedMinExperience] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [maxSalary, setMaxSalary] = useState<number>(600);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [selectedJobContext, setSelectedJobContext] = useState<string>('all');
  const [expandedBreakdownWorkerId, setExpandedBreakdownWorkerId] = useState<string | null>(null);

  // Active Job for Matching Context
  const activeJob = useMemo(() => {
    if (selectedJobContext === 'all') return jobs[0] || null;
    return jobs.find(j => j.id === selectedJobContext) || jobs[0] || null;
  }, [jobs, selectedJobContext]);

  // Handle skill toggle
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Filter & Rank Workers
  const rankedWorkers = useMemo(() => {
    return workers
      .filter(w => {
        // Search term
        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          const matchName = w.fullName.toLowerCase().includes(q);
          const matchOcc = w.occupation.toLowerCase().includes(q);
          const matchSkills = w.skills.some(s => s.toLowerCase().includes(q));
          if (!matchName && !matchOcc && !matchSkills) return false;
        }

        // Neighborhood
        if (selectedNeighborhood !== 'All' && w.neighborhood !== selectedNeighborhood) {
          return false;
        }

        // Min Experience
        if (w.experienceYears < selectedMinExperience) {
          return false;
        }

        // Max Salary
        if (w.expectedSalary.amount > maxSalary) {
          return false;
        }

        // Availability
        if (selectedAvailability !== 'All' && w.availability !== selectedAvailability) {
          return false;
        }

        // Verified Only
        if (verifiedOnly && !w.isVerified) {
          return false;
        }

        // Skills filter
        if (selectedSkills.length > 0) {
          const hasSelected = selectedSkills.every(req => 
            w.skills.some(ws => ws.toLowerCase().includes(req.toLowerCase()))
          );
          if (!hasSelected) return false;
        }

        return true;
      })
      .map(worker => {
        const breakdown = calculateSuitabilityScore(worker, activeJob);
        return {
          worker,
          breakdown
        };
      })
      .sort((a, b) => b.breakdown.overallScore - a.breakdown.overallScore);
  }, [
    workers,
    activeJob,
    searchTerm,
    selectedNeighborhood,
    selectedMinExperience,
    selectedSkills,
    maxSalary,
    selectedAvailability,
    verifiedOnly
  ]);

  const uniqueNeighborhoods = useMemo(() => {
    return Array.from(new Set(workers.map(w => w.neighborhood)));
  }, [workers]);

  return (
    <div className="space-y-6">
      {/* Search Header & Match Context Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Automated AI Suitability Matching Engine
            </div>
            <h1 className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
              Screened Domestic Workers & Nannies
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Every worker has undergone criminal background check and reference verification.
            </p>
          </div>

          {/* Job Context Selector for Match Engine */}
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Match Engine calibrated for:
            </span>
            <select
              value={selectedJobContext}
              onChange={(e) => setSelectedJobContext(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Default: Highlands Housekeeper & Childcare</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>
                  {j.title} (${j.salary.amount}/mo)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Controls Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role (e.g. Nanny, Cook), or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Neighborhoods (Harare)</option>
              {uniqueNeighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedMinExperience}
              onChange={(e) => setSelectedMinExperience(Number(e.target.value))}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value={0}>Any Experience Level</option>
              <option value={3}>3+ Years Verified Experience</option>
              <option value={5}>5+ Years Senior Experience</option>
              <option value={8}>8+ Years Expert Experience</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Row 2: Salary, Availability, Verified Badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 font-medium">Max Monthly Budget:</span>
              <span className="font-bold text-slate-800">${maxSalary} USD / mo</span>
            </div>
            <input
              type="range"
              min={250}
              max={800}
              step={25}
              value={maxSalary}
              onChange={(e) => setMaxSalary(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 font-medium block mb-1">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">Any Availability</option>
              <option value="Immediate">Immediate Start</option>
              <option value="Within 1 Week">Within 1 Week</option>
              <option value="Within 2 Weeks">Within 2 Weeks</option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 pt-4 sm:pt-5">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Only 100% Verified Badge Workers
              </span>
            </label>

            {(searchTerm || selectedNeighborhood !== 'All' || selectedMinExperience > 0 || selectedSkills.length > 0 || verifiedOnly) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedNeighborhood('All');
                  setSelectedMinExperience(0);
                  setSelectedSkills([]);
                  setVerifiedOnly(false);
                  setMaxSalary(650);
                }}
                className="text-[11px] text-slate-400 hover:text-slate-700 underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Skill Pills Selection */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Filter by Desired Core Skills:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ALL_SKILLS.map(skill => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-600 border-emerald-600 text-white font-medium shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {active && <Check className="w-3 h-3 stroke-[3]" />}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Count & Comparison Bar Banner */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-medium text-slate-600">
          Showing <span className="font-bold text-slate-900">{rankedWorkers.length}</span> verified candidates, ranked by suitability score.
        </p>

        {comparedWorkers.length > 0 && (
          <div className="text-xs text-indigo-700 font-semibold flex items-center gap-2">
            <span>{comparedWorkers.length} candidate(s) pinned for side-by-side comparison</span>
            <button
              onClick={() => {}}
              className="underline text-indigo-600 hover:text-indigo-800"
            >
              Open Comparison Matrix
            </button>
          </div>
        )}
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rankedWorkers.map(({ worker, breakdown }) => {
          const isComparing = comparedWorkers.some(w => w.id === worker.id);
          const isExpanded = expandedBreakdownWorkerId === worker.id;

          // Suitability color badge
          const matchColor = 
            breakdown.overallScore >= 90
              ? 'bg-emerald-500 text-white'
              : breakdown.overallScore >= 80
              ? 'bg-teal-600 text-white'
              : 'bg-amber-500 text-white';

          return (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6">
                {/* Header: Photo, Name, Badge, Match Score */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="relative">
                      <img
                        src={worker.avatar}
                        alt={worker.fullName}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                      />
                      {worker.isVerified && (
                        <div 
                          title="Verified National ID, Police Clearance & References"
                          className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-sm"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-bold text-lg text-slate-900">
                          {worker.fullName}
                        </h3>
                        {worker.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Badge
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold">
                            Pending Screening
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {worker.occupation}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {worker.neighborhood}, {worker.city}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          {worker.experienceYears} yrs experience
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {worker.ratingAverage} ({worker.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-right shrink-0">
                    <div className={`px-2.5 py-1 rounded-xl font-heading font-black text-sm tracking-tight ${matchColor} shadow-xs flex items-center gap-1 justify-center`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      {breakdown.overallScore}% Match
                    </div>
                    <button
                      onClick={() => setExpandedBreakdownWorkerId(isExpanded ? null : worker.id)}
                      className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 underline mt-1 block text-right"
                    >
                      {isExpanded ? 'Hide Score' : 'Why Match?'}
                    </button>
                  </div>
                </div>

                {/* Match Breakdown Expandable Panel */}
                {isExpanded && (
                  <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>Suitability Score Breakdown</span>
                      <span className="text-emerald-700 font-extrabold">{breakdown.overallScore} / 100</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Skill Set Match:</span>
                          <span className="font-semibold">{breakdown.skillScore}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${breakdown.skillScore}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Location Proximity:</span>
                          <span className="font-semibold">{breakdown.locationDistanceText}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${breakdown.locationScore}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Experience Level:</span>
                          <span className="font-semibold">{worker.experienceYears} yrs ({breakdown.experienceScore}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${breakdown.experienceScore}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Salary Alignment:</span>
                          <span className="font-semibold">${worker.expectedSalary.amount}/mo ({breakdown.salaryScore}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${breakdown.salaryScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Worker Bio Excerpt */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed italic">
                  "{worker.background}"
                </p>

                {/* Key Skills Pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {worker.skills.slice(0, 4).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {worker.skills.length > 4 && (
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[11px] rounded-md">
                      +{worker.skills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Rate & Availability Meta */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Expected Rate:</span>{' '}
                    <span className="font-bold text-slate-900">
                      ${worker.expectedSalary.amount} {worker.expectedSalary.currency}
                    </span>
                    <span className="text-[10px] text-slate-500"> / {worker.expectedSalary.period}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Availability: <strong className="text-emerald-700">{worker.availability}</strong></span>
                  </div>
                </div>

                {/* Verification Breakdown Checklist */}
                <div className="mt-3 grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg text-[10px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className={`w-3 h-3 ${worker.verificationStatus.nationalId === 'verified' ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>National ID</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className={`w-3 h-3 ${worker.verificationStatus.policeClearance === 'verified' ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>Police Check</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className={`w-3 h-3 ${worker.verificationStatus.referenceLetters === 'verified' ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>References</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Compare Toggle */}
                  <button
                    onClick={() => toggleCompareWorker(worker)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isComparing
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-700'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    {isComparing ? 'Comparing ✓' : 'Add to Compare'}
                  </button>

                  {/* Message Worker */}
                  <button
                    onClick={() => {
                      startOrOpenConversation(worker.id, currentEmployer.id, activeJob ? activeJob.title : undefined);
                      setActiveTab('messages');
                    }}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
                    title="Send instant message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Schedule Interview */}
                  <button
                    onClick={() => {
                      setSelectedWorkerForSchedule(worker);
                      setIsScheduleModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold rounded-lg transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Interview
                  </button>

                  {/* View Full Profile */}
                  <button
                    onClick={() => onSelectWorkerForProfile(worker)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                  >
                    <span>Full Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {rankedWorkers.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No candidates match your current filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your budget range, removing specific skills, or clearing the neighborhood filter to see all screened workers.
          </p>
        </div>
      )}
    </div>
  );
};
