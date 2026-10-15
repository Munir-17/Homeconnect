import React from 'react';
import { 
  FileText, 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MessageSquare, 
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';

export const WorkerApplicationsView: React.FC = () => {
  const { 
    applications, 
    currentWorker, 
    withdrawApplication, 
    startOrOpenConversation, 
    setActiveTab, 
    interviews 
  } = useApp();

  const myApplications = applications.filter(a => a.workerId === currentWorker.id);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Hired':
        return 'bg-emerald-600 text-white';
      case 'Interview Scheduled':
        return 'bg-indigo-600 text-white';
      case 'Shortlisted':
        return 'bg-teal-100 text-teal-800 border border-teal-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'Submitted':
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h1 className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
          My Job Applications & Status Tracker
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor each application's real-time review stage, scheduled interviews, and employment offers.
        </p>
      </div>

      {myApplications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Applications Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
            Browse open positions from verified families in your area and apply with your verified credentials.
          </p>
          <button
            onClick={() => setActiveTab('find-jobs')}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
          >
            Find Jobs Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map(app => {
            const hasInterview = interviews.find(i => i.applicationId === app.id || (i.workerId === app.workerId && i.jobId === app.jobId));

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        Applied on {app.appliedDate}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-slate-900 mt-1.5">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">
                      Employer: {app.employerName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 text-xs font-black border border-teal-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      {app.matchScore}% Suitability Match
                    </span>

                    <button
                      onClick={() => {
                        startOrOpenConversation(currentWorker.id, app.employerId, app.jobTitle);
                        setActiveTab('messages');
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
                      title="Message Employer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Cover Note & Expected Rate */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <span className="font-semibold text-slate-500 block mb-0.5 text-[10px] uppercase">
                    Your Application Intro & Rate ({app.expectedRate}):
                  </span>
                  "{app.coverNote}"
                </div>

                {/* If Interview Scheduled */}
                {hasInterview && (
                  <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 text-indigo-900">
                      <Calendar className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <span className="font-bold block">Interview Invitation Active: {hasInterview.date} at {hasInterview.time}</span>
                        <span className="text-[11px] text-indigo-700">Format: {hasInterview.type} ({hasInterview.locationOrLink})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('interviews')}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-colors shrink-0"
                    >
                      View & Respond →
                    </button>
                  </div>
                )}

                {/* Footer status & Withdraw action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400">
                    Application ID: {app.id}
                  </span>

                  {app.status !== 'Hired' && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to withdraw this application?')) {
                          withdrawApplication(app.id);
                        }
                      }}
                      className="text-slate-400 hover:text-red-600 text-xs font-medium underline"
                    >
                      Withdraw Application
                    </button>
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
