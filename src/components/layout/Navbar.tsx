import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  UserCheck, 
  PlusCircle, 
  BarChart3, 
  Scale, 
  ChevronDown,
  RotateCcw,
  Sparkles,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    currentWorker, 
    currentEmployer, 
    activeTab, 
    setActiveTab,
    setIsJobModalOpen,
    setIsPricingModalOpen,
    comparedWorkers,
    setIsCompareModalOpen,
    applications,
    interviews,
    conversations,
    resetAllData
  } = useApp();

  const pendingInterviewsCount = interviews.filter(i => 
    currentRole === 'worker' 
      ? i.workerId === currentWorker.id && i.status === 'Pending'
      : i.employerId === currentEmployer.id && i.status === 'Pending'
  ).length;

  const totalUnreadConvs = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const pendingWorkerApps = applications.filter(a => a.workerId === currentWorker.id).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Trust & Persona Switcher */}
      <div className="bg-slate-900 text-slate-100 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-300">100% Background Screened Domestic Network</span>
            <span className="text-slate-400 hidden sm:inline">• Criminal Records Cleared & ID Verified</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs">Viewing As Persona:</span>
            <div className="inline-flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => {
                  setCurrentRole('employer');
                  setActiveTab('home');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all flex items-center gap-1.5 ${
                  currentRole === 'employer'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Employer (David)
              </button>

              <button
                onClick={() => {
                  setCurrentRole('worker');
                  setActiveTab('home');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all flex items-center gap-1.5 ${
                  currentRole === 'worker'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Worker (Tendai)
              </button>

              <button
                onClick={() => {
                  setCurrentRole('admin');
                  setActiveTab('home');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all flex items-center gap-1.5 ${
                  currentRole === 'admin'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Officer
              </button>
            </div>

            <button
              onClick={resetAllData}
              title="Reset all demo data"
              className="text-slate-400 hover:text-slate-200 p-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                  HOMECONNECT
                  <span className="text-xs px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 font-semibold tracking-normal uppercase">
                    Trust
                  </span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                  Screened Domestic Recruitment
                </p>
              </div>
            </button>
          </div>

          {/* Role-Specific Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {currentRole === 'employer' && (
              <>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'home'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Find Workers
                </button>
                <button
                  onClick={() => setActiveTab('my-jobs')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'my-jobs'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  My Job Posts
                </button>
                <button
                  onClick={() => setActiveTab('interviews')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                    activeTab === 'interviews'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Interviews
                  {pendingInterviewsCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[11px] font-bold rounded-full">
                      {pendingInterviewsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                    activeTab === 'messages'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Messages
                  {totalUnreadConvs > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white text-[11px] font-bold rounded-full">
                      {totalUnreadConvs}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'profile'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Household Info
                </button>
              </>
            )}

            {currentRole === 'worker' && (
              <>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'home'
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Worker Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('find-jobs')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'find-jobs'
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Available Jobs
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                    activeTab === 'applications'
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  My Applications
                  {pendingWorkerApps > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-teal-600 text-white text-[11px] font-bold rounded-full">
                      {pendingWorkerApps}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('interviews')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                    activeTab === 'interviews'
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Interview Invites
                  {pendingInterviewsCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-teal-600 text-white text-[11px] font-bold rounded-full">
                      {pendingInterviewsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'messages'
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Messages
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'profile'
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  My Worker Profile
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'home'
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Admin Overview
                </button>
                <button
                  onClick={() => setActiveTab('verification-queue')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                    activeTab === 'verification-queue'
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Document Verification
                  <span className="ml-1.5 px-1.5 py-0.2 bg-amber-600 text-white text-[11px] font-bold rounded-full">
                    2 Pending
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('disputes')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'disputes'
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Disputes & Integrity
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'reports'
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Reports & Revenue
                </button>
              </>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Compare Bar Indicator */}
            {comparedWorkers.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare ({comparedWorkers.length})</span>
                <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
              </button>
            )}

            {/* Role specific CTAs */}
            {currentRole === 'employer' && (
              <>
                <button
                  onClick={() => setIsPricingModalOpen(true)}
                  className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Premium Plans
                </button>
                <button
                  onClick={() => setIsJobModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post a Job</span>
                </button>
              </>
            )}

            {currentRole === 'worker' && (
              <button
                onClick={() => setActiveTab('profile')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-lg hover:bg-teal-100 transition-colors"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{currentWorker.isVerified ? '✅ Verified Profile' : 'Upload Verification Docs'}</span>
              </button>
            )}

            {currentRole === 'admin' && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Platform Integrity Active</span>
              </div>
            )}

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={
                  currentRole === 'worker'
                    ? currentWorker.avatar
                    : currentRole === 'employer'
                    ? currentEmployer.avatar
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                }
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentRole === 'worker'
                    ? currentWorker.fullName
                    : currentRole === 'employer'
                    ? currentEmployer.fullName
                    : 'Admin Officer (Sarah)'}
                </div>
                <div className="text-[10px] text-slate-500 capitalize">
                  {currentRole === 'employer' ? 'Verified Household' : currentRole === 'worker' ? 'Verified Nanny' : 'Super Admin'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
