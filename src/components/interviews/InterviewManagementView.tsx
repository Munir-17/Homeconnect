import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  MessageSquare, 
  Check, 
  X, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Interview } from '../../types';

export const InterviewManagementView: React.FC = () => {
  const { 
    interviews, 
    currentRole, 
    currentWorker, 
    currentEmployer, 
    respondToInterview, 
    startOrOpenConversation, 
    setActiveTab,
    setIsScheduleModalOpen,
    setSelectedWorkerForSchedule,
    workers
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

  const relevantInterviews = interviews.filter(i => {
    const isMine = currentRole === 'worker' ? i.workerId === currentWorker.id : i.employerId === currentEmployer.id;
    if (!isMine) return false;
    if (activeFilter === 'pending') return i.status === 'Pending';
    if (activeFilter === 'accepted') return i.status === 'Accepted';
    if (activeFilter === 'completed') return i.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
            Interview Management & Scheduling
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {currentRole === 'worker'
              ? 'Review household interview requests, accept meeting times, or request reschedule.'
              : 'Monitor candidate interview RSVPs, host home visits, and conduct trials.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({relevantInterviews.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'pending' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Action
          </button>
          <button
            onClick={() => setActiveFilter('accepted')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'accepted' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Confirmed
          </button>
        </div>
      </div>

      {relevantInterviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Interviews Scheduled</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {currentRole === 'worker'
              ? 'When employers review your application, interview invitations will appear here.'
              : 'Search candidates and invite them to an in-person or video chat interview.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {relevantInterviews.map(interview => {
            const isWorker = currentRole === 'worker';
            const counterPartyName = isWorker ? interview.employerName : interview.workerName;
            const counterPartyId = isWorker ? interview.employerId : interview.workerId;

            return (
              <div
                key={interview.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        interview.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : interview.status === 'Declined'
                          ? 'bg-red-100 text-red-800'
                          : interview.status === 'Reschedule Requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {interview.status === 'Pending' ? 'Action Required: Pending RSVP' : `Status: ${interview.status}`}
                      </span>

                      <span className="text-xs text-slate-400">
                        Position: {interview.jobTitle}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-slate-900 mt-1">
                      {isWorker ? `Interview with ${counterPartyName}` : `Interviewing: ${counterPartyName}`}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      startOrOpenConversation(interview.workerId, interview.employerId, interview.jobTitle);
                      setActiveTab('messages');
                    }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1.5 text-xs font-semibold self-start sm:self-auto transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Message</span>
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Time</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {interview.date} at {interview.time}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Format</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                      {interview.type === 'Video Call' ? (
                        <Video className="w-3.5 h-3.5 text-indigo-600" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {interview.type}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Location / Contact</span>
                    <span className="font-medium text-slate-700 block mt-0.5 truncate" title={interview.locationOrLink}>
                      {interview.locationOrLink}
                    </span>
                  </div>
                </div>

                {/* Notes from Employer */}
                {interview.notes && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">Employer Instructions:</span>
                    <p className="italic">"{interview.notes}"</p>
                  </div>
                )}

                {/* Action Buttons based on Role & Status */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Created on {interview.createdAt}
                  </span>

                  {isWorker && interview.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => respondToInterview(interview.id, 'Declined')}
                        className="px-3.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Decline
                      </button>

                      <button
                        onClick={() => respondToInterview(interview.id, 'Reschedule Requested')}
                        className="px-3.5 py-1.5 border border-amber-300 text-amber-800 hover:bg-amber-50 rounded-xl font-bold flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Request Reschedule
                      </button>

                      <button
                        onClick={() => respondToInterview(interview.id, 'Accepted')}
                        className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Accept Invitation
                      </button>
                    </div>
                  )}

                  {!isWorker && (
                    <div className="flex items-center gap-2">
                      {interview.status !== 'Completed' && (
                        <button
                          onClick={() => respondToInterview(interview.id, 'Completed' as any)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs"
                        >
                          Mark as Completed
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const targetWorker = workers.find(w => w.id === interview.workerId);
                          if (targetWorker) {
                            setSelectedWorkerForSchedule(targetWorker);
                            setIsScheduleModalOpen(true);
                          }
                        }}
                        className="px-4 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold text-xs"
                      >
                        Reschedule / Edit Date
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
