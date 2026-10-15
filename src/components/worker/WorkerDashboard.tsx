import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  Calendar, 
  Clock, 
  Star, 
  Eye, 
  TrendingUp, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkerDashboard: React.FC = () => {
  const { 
    currentWorker, 
    applications, 
    interviews, 
    setActiveTab, 
    jobs 
  } = useApp();

  const myApps = applications.filter(a => a.workerId === currentWorker.id);
  const myInterviews = interviews.filter(i => i.workerId === currentWorker.id);
  const pendingInterviews = myInterviews.filter(i => i.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Welcome & Verification Hero Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-teal-700 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentWorker.avatar}
              alt={currentWorker.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Welcome back, {currentWorker.fullName.split(' ')[0]}!
                </h1>
                {currentWorker.isVerified && (
                  <span className="p-1 bg-emerald-500 text-white rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                {currentWorker.occupation} • Harare ({currentWorker.neighborhood})
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                  🟢 {currentWorker.visibility}
                </span>
                <span className="text-[11px] text-slate-300">
                  Target Rate: ${currentWorker.expectedSalary.amount}/mo
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors"
            >
              Manage Profile & Docs
            </button>
            <button
              onClick={() => setActiveTab('find-jobs')}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" />
              Browse Open Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Active Applications</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-slate-900">{myApps.length}</span>
            <span className="text-[11px] font-bold text-teal-600">Tracking</span>
          </div>
          <span className="text-[10px] text-slate-500">Submitted to vetted families</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Interview Invites</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-indigo-700">{myInterviews.length}</span>
            {pendingInterviews.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                {pendingInterviews.length} New RSVP
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">Scheduled trials & visits</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Profile Trust Rating</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-amber-600 flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              {currentWorker.ratingAverage}
            </span>
            <span className="text-[11px] font-bold text-slate-500">/ 5.0</span>
          </div>
          <span className="text-[10px] text-slate-500">From {currentWorker.reviews.length} previous employers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Verified Credentials</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-heading font-black text-emerald-700">100%</span>
            <span className="text-[11px] font-bold text-emerald-600">Cleared</span>
          </div>
          <span className="text-[10px] text-slate-500">CID Record & Biometric ID</span>
        </div>
      </div>

      {/* Main Grid: Pending Action Banners & Recent Apps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Next Steps & Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Interviews Alert */}
          {pendingInterviews.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-sm text-indigo-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Upcoming Household Interview Invitation
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-bold">
                  Action Required
                </span>
              </div>

              {pendingInterviews.map(i => (
                <div key={i.id} className="bg-white p-4 rounded-xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{i.jobTitle}</h4>
                    <p className="text-slate-600 mt-0.5">With {i.employerName} • {i.date} at {i.time}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Location: {i.locationOrLink}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('interviews')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold self-start sm:self-auto transition-colors"
                  >
                    Respond Now →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Recent Applications Tracker */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                Active Job Applications
              </h3>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs text-teal-700 font-bold hover:underline"
              >
                View All ({myApps.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {myApps.map(app => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{app.jobTitle}</span>
                    <span className="text-slate-500 text-[11px]">{app.employerName} • Applied {app.appliedDate}</span>
                  </div>

                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold inline-block ${
                      app.status === 'Interview Scheduled'
                        ? 'bg-indigo-100 text-indigo-800'
                        : app.status === 'Shortlisted'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-[10px] text-teal-700 font-bold block mt-1">
                      {app.matchScore}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Verified Status & Safe Working Tips */}
        <div className="space-y-6">
          {/* Verification Badge Status */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Worker Status
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-900">
                <span>National Biometric ID</span>
                <span className="font-bold">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-900">
                <span>CID Police Clearance</span>
                <span className="font-bold">✓ Cleared</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-900">
                <span>Employer References</span>
                <span className="font-bold">✓ Verified</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-100">
              Verified workers receive direct interview requests and priority placement protection under HOMECONNECT labor standards.
            </div>
          </div>

          {/* Worker Safety & Rights */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Worker Rights & Safe Labor Code
            </h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              • Guaranteed on-time monthly payment by the 25th.<br />
              • Clear working hours with scheduled rest days.<br />
              • Protection through the Admin Dispute Resolution Bureau.<br />
              • Private live-in accommodation standards enforced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
