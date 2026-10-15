import React from 'react';
import { 
  X, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Calendar, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Award,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateSuitabilityScore } from '../../utils/matchingEngine';

export const CandidateComparisonModal: React.FC = () => {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    comparedWorkers, 
    removeComparedWorker, 
    clearComparedWorkers,
    setIsScheduleModalOpen,
    setSelectedWorkerForSchedule,
    startOrOpenConversation,
    currentEmployer,
    setActiveTab,
    jobs
  } = useApp();

  if (!isCompareModalOpen) return null;

  const activeJob = jobs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-extrabold text-white">
                Candidate Side-by-Side Comparison Matrix
              </h2>
              <p className="text-xs text-slate-300">
                Compare verified screening records, suitability scores, and wage expectations before interviewing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedWorkers.length > 0 && (
              <button
                onClick={clearComparedWorkers}
                className="text-xs text-slate-400 hover:text-white underline mr-2"
              >
                Clear all ({comparedWorkers.length})
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto flex-1">
          {comparedWorkers.length === 0 ? (
            <div className="text-center py-16">
              <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No candidates selected for comparison</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click "Add to Compare" on any 2 or 3 worker cards in the search list to review them side by side.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              {/* Matrix Table */}
              <div className={`grid grid-cols-${comparedWorkers.length + 1} gap-4`}>
                {/* Column 1: Row Labels */}
                <div className="space-y-6 pt-28 text-xs font-semibold text-slate-500">
                  <div className="h-9 flex items-center">Suitability Match</div>
                  <div className="h-9 flex items-center">Verified Screening</div>
                  <div className="h-9 flex items-center">Experience & Age</div>
                  <div className="h-9 flex items-center">Location & Distance</div>
                  <div className="h-9 flex items-center">Expected Rate</div>
                  <div className="h-9 flex items-center">Availability</div>
                  <div className="h-16 flex items-center">Core Competencies</div>
                  <div className="h-9 flex items-center">Spoken Languages</div>
                  <div className="h-12 flex items-center">Average Rating</div>
                  <div className="h-12 flex items-center">Actions</div>
                </div>

                {/* Candidate Columns */}
                {comparedWorkers.map(worker => {
                  const breakdown = calculateSuitabilityScore(worker, activeJob);

                  return (
                    <div 
                      key={worker.id}
                      className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 relative flex flex-col justify-between"
                    >
                      {/* Remove Candidate */}
                      <button
                        onClick={() => removeComparedWorker(worker.id)}
                        className="absolute top-3 right-3 p-1 rounded-full bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 shadow-xs"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Candidate Avatar & Basic Info */}
                      <div className="text-center pb-4 border-b border-slate-200">
                        <img
                          src={worker.avatar}
                          alt={worker.fullName}
                          className="w-16 h-16 rounded-2xl object-cover mx-auto ring-2 ring-white shadow-xs"
                        />
                        <h4 className="font-heading font-bold text-sm text-slate-900 mt-2">
                          {worker.fullName}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{worker.occupation}</p>
                      </div>

                      {/* Rows */}
                      <div className="space-y-6 text-xs pt-4">
                        {/* Suitability */}
                        <div className="h-9 flex items-center">
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-3 h-3" />
                            {breakdown.overallScore}% Match
                          </span>
                        </div>

                        {/* Verified Screening */}
                        <div className="h-9 flex items-center">
                          {worker.isVerified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              100% ID & Police Clear
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              Verification Pending
                            </span>
                          )}
                        </div>

                        {/* Experience & Age */}
                        <div className="h-9 flex items-center font-bold text-slate-800">
                          {worker.experienceYears} Years ({worker.age} yrs old)
                        </div>

                        {/* Location */}
                        <div className="h-9 flex items-center text-slate-700">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {worker.neighborhood}
                          </span>
                        </div>

                        {/* Expected Rate */}
                        <div className="h-9 flex items-center font-extrabold text-slate-900">
                          ${worker.expectedSalary.amount} {worker.expectedSalary.currency} / {worker.expectedSalary.period}
                        </div>

                        {/* Availability */}
                        <div className="h-9 flex items-center font-medium text-emerald-800">
                          {worker.availability}
                        </div>

                        {/* Skills */}
                        <div className="h-16 flex flex-wrap gap-1 items-center overflow-hidden">
                          {worker.skills.slice(0, 3).map(s => (
                            <span key={s} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700">
                              {s}
                            </span>
                          ))}
                          {worker.skills.length > 3 && (
                            <span className="text-[10px] text-slate-400">+{worker.skills.length - 3}</span>
                          )}
                        </div>

                        {/* Languages */}
                        <div className="h-9 flex items-center text-slate-700">
                          {worker.languages.join(', ')}
                        </div>

                        {/* Rating */}
                        <div className="h-12 flex items-center gap-1.5">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-900">{worker.ratingAverage}</span>
                          <span className="text-slate-400 text-[11px]">({worker.completedJobsCount} jobs completed)</span>
                        </div>

                        {/* Actions */}
                        <div className="h-12 flex items-center gap-2 pt-2 border-t border-slate-200">
                          <button
                            onClick={() => {
                              setSelectedWorkerForSchedule(worker);
                              setIsScheduleModalOpen(true);
                              setIsCompareModalOpen(false);
                            }}
                            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Interview
                          </button>

                          <button
                            onClick={() => {
                              startOrOpenConversation(worker.id, currentEmployer.id);
                              setIsCompareModalOpen(false);
                              setActiveTab('messages');
                            }}
                            className="p-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Chat with candidate"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All background records verified against National Civil Registry and CID.</span>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
