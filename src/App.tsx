/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CandidateSearch } from './components/employer/CandidateSearch';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { MyJobsView } from './components/employer/MyJobsView';
import { EmployerProfileView } from './components/employer/EmployerProfileView';
import { JobPostModal } from './components/employer/JobPostModal';
import { CandidateComparisonModal } from './components/employer/CandidateComparisonModal';
import { ScheduleInterviewModal } from './components/employer/ScheduleInterviewModal';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { WorkerJobsView } from './components/worker/WorkerJobsView';
import { WorkerApplicationsView } from './components/worker/WorkerApplicationsView';
import { WorkerProfileView } from './components/worker/WorkerProfileView';
import { InterviewManagementView } from './components/interviews/InterviewManagementView';
import { MessagingView } from './components/messaging/MessagingView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PricingModal } from './components/monetization/PricingModal';
import { AuthModal } from './components/auth/AuthModal';
import { ReviewModal } from './components/reviews/ReviewModal';
import { WorkerProfile, EmployerProfile } from './types';
import { X, CheckCircle2, AlertCircle, Info, ShieldCheck, HeartHandshake, Star } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, activeTab, setActiveTab, workers, employers, toasts, dismissToast } = useApp();

  // State for inspecting a full worker profile in modal or dedicated screen
  const [inspectedWorker, setInspectedWorker] = useState<WorkerProfile | null>(null);

  // Review modal trigger
  const [reviewModalState, setReviewModalState] = useState<{
    isOpen: boolean;
    mode: 'employer_rates_worker' | 'worker_rates_employer';
    targetWorker?: WorkerProfile;
    targetEmployer?: EmployerProfile;
  }>({
    isOpen: false,
    mode: 'employer_rates_worker'
  });

  const handleSelectWorkerForProfile = (workerOrId: WorkerProfile | string) => {
    if (typeof workerOrId === 'string') {
      const found = workers.find(w => w.id === workerOrId);
      if (found) setInspectedWorker(found);
    } else {
      setInspectedWorker(workerOrId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* If viewing full worker profile */}
        {inspectedWorker ? (
          <WorkerProfileView
            worker={inspectedWorker}
            isOwner={currentRole === 'worker' && inspectedWorker.id === workers[0].id}
            onBack={() => setInspectedWorker(null)}
          />
        ) : (
          <>
            {/* EMPLOYER SCREENS */}
            {currentRole === 'employer' && (
              <>
                {activeTab === 'home' && (
                  <div className="space-y-8">
                    <EmployerDashboard onSelectWorkerForProfile={handleSelectWorkerForProfile} />
                    <div className="pt-4 border-t border-slate-200">
                      <CandidateSearch onSelectWorkerForProfile={handleSelectWorkerForProfile} />
                    </div>
                  </div>
                )}
                {activeTab === 'find-workers' && (
                  <CandidateSearch onSelectWorkerForProfile={handleSelectWorkerForProfile} />
                )}
                {activeTab === 'my-jobs' && (
                  <MyJobsView onSelectWorkerForProfile={handleSelectWorkerForProfile} />
                )}
                {activeTab === 'interviews' && <InterviewManagementView />}
                {activeTab === 'messages' && <MessagingView />}
                {activeTab === 'profile' && <EmployerProfileView />}
              </>
            )}

            {/* WORKER SCREENS */}
            {currentRole === 'worker' && (
              <>
                {activeTab === 'home' && <WorkerDashboard />}
                {activeTab === 'find-jobs' && <WorkerJobsView />}
                {activeTab === 'applications' && <WorkerApplicationsView />}
                {activeTab === 'interviews' && <InterviewManagementView />}
                {activeTab === 'messages' && <MessagingView />}
                {activeTab === 'profile' && <WorkerProfileView worker={workers[0]} isOwner={true} />}
              </>
            )}

            {/* ADMIN SCREENS */}
            {currentRole === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Modals */}
      <JobPostModal />
      <CandidateComparisonModal />
      <ScheduleInterviewModal />
      <PricingModal />
      <AuthModal />
      <ReviewModal
        isOpen={reviewModalState.isOpen}
        onClose={() => setReviewModalState(prev => ({ ...prev, isOpen: false }))}
        mode={reviewModalState.mode}
        targetWorker={reviewModalState.targetWorker}
        targetEmployer={reviewModalState.targetEmployer}
      />

      {/* Floating Action Button for Reviews Demo */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            if (currentRole === 'employer') {
              setReviewModalState({
                isOpen: true,
                mode: 'employer_rates_worker',
                targetWorker: workers[0]
              });
            } else {
              setReviewModalState({
                isOpen: true,
                mode: 'worker_rates_employer',
                targetEmployer: employers[0]
              });
            }
          }}
          className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-full text-xs font-bold shadow-lg border border-slate-700 flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{currentRole === 'employer' ? 'Rate Placed Worker' : 'Rate Household Employer'}</span>
        </button>
      </div>

      {/* Toast Notifications Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-4 rounded-2xl shadow-xl border text-xs pointer-events-auto flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : toast.type === 'info'
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-emerald-200 text-slate-800'
            }`}
          >
            {toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h5 className="font-bold">{toast.title}</h5>
              <p className="mt-0.5 opacity-90 leading-relaxed text-[11px]">{toast.message}</p>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
