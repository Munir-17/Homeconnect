import React, { useState } from 'react';
import { 
  Briefcase, 
  PlusCircle, 
  Clock, 
  MapPin, 
  DollarSign, 
  Users, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobListing, JobApplication, ApplicationStatus } from '../../types';

interface MyJobsViewProps {
  onSelectWorkerForProfile: (workerId: string) => void;
}

export const MyJobsView: React.FC<MyJobsViewProps> = ({ onSelectWorkerForProfile }) => {
  const { 
    jobs, 
    applications, 
    currentEmployer, 
    setIsJobModalOpen, 
    setJobToEdit, 
    updateJob, 
    deleteJob, 
    updateApplicationStatus,
    setIsScheduleModalOpen,
    setSelectedApplicationForSchedule,
    setSelectedWorkerForSchedule,
    workers,
    startOrOpenConversation,
    setActiveTab
  } = useApp();

  // Selected job for inspecting applicants
  const employerJobs = jobs.filter(j => j.employerId === currentEmployer.id);
  const [selectedJobId, setSelectedJobId] = useState<string>(employerJobs[0]?.id || '');
  const [applicantFilterStatus, setApplicantFilterStatus] = useState<string>('All');

  const activeJob = employerJobs.find(j => j.id === selectedJobId) || employerJobs[0];

  const jobApplications = applications.filter(a => {
    if (a.jobId !== activeJob?.id) return false;
    if (applicantFilterStatus !== 'All' && a.status !== applicantFilterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
            Job Posting & Applicant Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming applications, update candidate hiring stages, and manage open household listings.
          </p>
        </div>

        <button
          onClick={() => {
            setJobToEdit(null);
            setIsJobModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {employerJobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Job Listings Posted Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
            Create your first vacancy to start receiving vetted domestic worker applications.
          </p>
          <button
            onClick={() => setIsJobModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
          >
            Create Job Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of Jobs */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Your Open Vacancies ({employerJobs.length})
            </h3>

            {employerJobs.map(job => {
              const isSelected = activeJob?.id === job.id;
              const appsForThisJob = applications.filter(a => a.jobId === job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                      job.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {job.status}
                    </span>

                    <span className="text-xs font-extrabold text-slate-900">
                      ${job.salary.amount} / {job.salary.period}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-slate-900 mt-2 line-clamp-1">
                    {job.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {job.neighborhood}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-600" />
                      {appsForThisJob.length} Applicants
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setJobToEdit(job);
                          setIsJobModalOpen(true);
                        }}
                        className="text-slate-600 hover:text-emerald-700 flex items-center gap-1 text-[11px] font-semibold"
                      >
                        <Edit className="w-3 h-3" /> Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateJob(job.id, {
                            status: job.status === 'Open' ? 'Closed' : 'Open'
                          });
                        }}
                        className="text-slate-600 hover:text-slate-900 text-[11px] font-semibold"
                      >
                        {job.status === 'Open' ? 'Close' : 'Reopen'}
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this job listing?')) {
                          deleteJob(job.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-[11px]"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 2 Columns: Selected Job Details & Candidate Applicants */}
          <div className="lg:col-span-2 space-y-6">
            {activeJob && (
              <>
                {/* Job Overview Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-heading font-extrabold text-slate-900">
                        {activeJob.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Posted on {activeJob.createdAt} • {activeJob.employmentType} ({activeJob.workingHours})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-heading font-black text-slate-900">
                        ${activeJob.salary.amount} USD
                      </span>
                      <span className="text-xs text-slate-500 block">per {activeJob.salary.period}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeJob.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeJob.requiredSkills.map(s => (
                      <span key={s} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Candidate Applications Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                    <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      Received Applications ({jobApplications.length})
                    </h3>

                    {/* Filter Status */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-slate-500">Filter Status:</span>
                      <select
                        value={applicantFilterStatus}
                        onChange={(e) => setApplicantFilterStatus(e.target.value)}
                        className="py-1 px-2.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {jobApplications.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
                      No applications found with status "{applicantFilterStatus}".
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobApplications.map(app => {
                        const targetWorker = workers.find(w => w.id === app.workerId);

                        return (
                          <div
                            key={app.id}
                            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={app.workerAvatar}
                                  alt={app.workerName}
                                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-heading font-bold text-sm text-slate-900">
                                      {app.workerName}
                                    </h4>
                                    {app.workerVerified && (
                                      <span className="p-0.5 bg-emerald-600 text-white rounded-full">
                                        <ShieldCheck className="w-3 h-3" />
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>{app.workerOccupation}</span>
                                    <span>•</span>
                                    <span>{app.workerExperienceYears} yrs exp</span>
                                    <span>•</span>
                                    <span className="flex items-center text-amber-600 font-bold">
                                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                                      {app.workerRating}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-start sm:self-auto">
                                <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black flex items-center gap-1 border border-emerald-200">
                                  <Sparkles className="w-3 h-3 text-emerald-600" />
                                  {app.matchScore}% Match
                                </span>

                                <select
                                  value={app.status}
                                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                                  className={`text-xs font-bold py-1 px-2.5 rounded-lg border focus:outline-hidden ${
                                    app.status === 'Hired'
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : app.status === 'Shortlisted'
                                      ? 'bg-teal-50 text-teal-800 border-teal-200'
                                      : app.status === 'Interview Scheduled'
                                      ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                      : app.status === 'Rejected'
                                      ? 'bg-red-50 text-red-800 border-red-200'
                                      : 'bg-slate-50 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  <option value="Submitted">Status: Submitted</option>
                                  <option value="Under Review">Status: Under Review</option>
                                  <option value="Shortlisted">Status: Shortlisted</option>
                                  <option value="Interview Scheduled">Status: Interview Scheduled</option>
                                  <option value="Hired">Status: Hired</option>
                                  <option value="Rejected">Status: Rejected</option>
                                </select>
                              </div>
                            </div>

                            {/* Cover Note */}
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                              <span className="font-semibold text-slate-500 block mb-0.5 text-[10px] uppercase">
                                Applicant Note & Expected Rate ({app.expectedRate}):
                              </span>
                              "{app.coverNote}"
                            </div>

                            {/* Applicant Quick Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                              <span className="text-[11px] text-slate-400">
                                Applied on {app.appliedDate}
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    if (targetWorker) {
                                      setSelectedWorkerForSchedule(targetWorker);
                                    }
                                    setSelectedApplicationForSchedule(app);
                                    setIsScheduleModalOpen(true);
                                  }}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors"
                                >
                                  <Calendar className="w-3.5 h-3.5" />
                                  Schedule Interview
                                </button>

                                <button
                                  onClick={() => {
                                    startOrOpenConversation(app.workerId, currentEmployer.id, app.jobTitle);
                                    setActiveTab('messages');
                                  }}
                                  className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors"
                                  title="Message Applicant"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => onSelectWorkerForProfile(app.workerId)}
                                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold text-xs transition-colors"
                                >
                                  View Full Profile →
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
