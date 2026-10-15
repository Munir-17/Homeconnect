import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  WorkerProfile, 
  EmployerProfile, 
  JobListing, 
  JobApplication, 
  Interview, 
  Conversation, 
  MessageItem, 
  DisputeRecord, 
  WorkerReview, 
  EmployerReview, 
  VerificationDocument, 
  ApplicationStatus 
} from '../types';
import { 
  INITIAL_WORKERS, 
  INITIAL_EMPLOYERS, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_INTERVIEWS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_DISPUTES,
  INITIAL_ADMIN_STATS
} from '../data/mockData';
import { calculateSuitabilityScore } from '../utils/matchingEngine';

interface ToastInfo {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentWorker: WorkerProfile;
  currentEmployer: EmployerProfile;
  workers: WorkerProfile[];
  employers: EmployerProfile[];
  jobs: JobListing[];
  applications: JobApplication[];
  interviews: Interview[];
  conversations: Conversation[];
  messages: MessageItem[];
  disputes: DisputeRecord[];
  adminStats: typeof INITIAL_ADMIN_STATS;
  comparedWorkers: WorkerProfile[];
  toasts: ToastInfo[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
  // Modals & Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isJobModalOpen: boolean;
  setIsJobModalOpen: (open: boolean) => void;
  jobToEdit: JobListing | null;
  setJobToEdit: (job: JobListing | null) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: (open: boolean) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (open: boolean) => void;
  selectedWorkerForSchedule: WorkerProfile | null;
  setSelectedWorkerForSchedule: (worker: WorkerProfile | null) => void;
  selectedApplicationForSchedule: JobApplication | null;
  setSelectedApplicationForSchedule: (app: JobApplication | null) => void;
  // Action Handlers
  createJob: (jobData: Omit<JobListing, 'id' | 'createdAt' | 'applicantsCount' | 'employerId' | 'employerName' | 'employerAvatar'>) => void;
  updateJob: (jobId: string, updates: Partial<JobListing>) => void;
  deleteJob: (jobId: string) => void;
  applyForJob: (jobId: string, coverNote: string, expectedRate?: string) => void;
  withdrawApplication: (appId: string) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  scheduleInterview: (data: {
    workerId: string;
    workerName: string;
    jobId: string;
    jobTitle: string;
    date: string;
    time: string;
    type: Interview['type'];
    locationOrLink: string;
    notes: string;
    applicationId?: string;
  }) => void;
  respondToInterview: (interviewId: string, response: 'Accepted' | 'Declined' | 'Reschedule Requested') => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenConversation: (workerId: string, employerId: string, jobTitle?: string) => string;
  updateWorkerProfile: (updates: Partial<WorkerProfile>) => void;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => void;
  toggleCompareWorker: (worker: WorkerProfile) => void;
  removeComparedWorker: (workerId: string) => void;
  clearComparedWorkers: () => void;
  verifyDocument: (workerId: string, docId: string, status: 'verified' | 'rejected', notes?: string) => void;
  uploadWorkerDocument: (doc: Omit<VerificationDocument, 'id' | 'uploadDate' | 'status'>) => void;
  addWorkerReview: (reviewData: Omit<WorkerReview, 'id' | 'date'>) => void;
  addEmployerReview: (reviewData: Omit<EmployerReview, 'id' | 'date'>) => void;
  resolveDispute: (disputeId: string, resolutionNote: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return (localStorage.getItem('homeconnect_role') as UserRole) || 'employer';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<JobListing | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedWorkerForSchedule, setSelectedWorkerForSchedule] = useState<WorkerProfile | null>(null);
  const [selectedApplicationForSchedule, setSelectedApplicationForSchedule] = useState<JobApplication | null>(null);

  // Entities state
  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem('homeconnect_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [employers, setEmployers] = useState<EmployerProfile[]>(() => {
    const saved = localStorage.getItem('homeconnect_employers');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYERS;
  });

  const [jobs, setJobs] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem('homeconnect_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('homeconnect_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    const saved = localStorage.getItem('homeconnect_interviews');
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('homeconnect_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<MessageItem[]>(() => {
    const saved = localStorage.getItem('homeconnect_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [disputes, setDisputes] = useState<DisputeRecord[]>(() => {
    const saved = localStorage.getItem('homeconnect_disputes');
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [adminStats] = useState(INITIAL_ADMIN_STATS);
  const [comparedWorkers, setComparedWorkers] = useState<WorkerProfile[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('homeconnect_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('homeconnect_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('homeconnect_employers', JSON.stringify(employers));
  }, [employers]);

  useEffect(() => {
    localStorage.setItem('homeconnect_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('homeconnect_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('homeconnect_interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem('homeconnect_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('homeconnect_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('homeconnect_disputes', JSON.stringify(disputes));
  }, [disputes]);

  const currentWorker = workers[0]; // Tendai Moyo
  const currentEmployer = employers[0]; // David & Sarah Jenkins

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Job Actions
  const createJob = (jobData: Omit<JobListing, 'id' | 'createdAt' | 'applicantsCount' | 'employerId' | 'employerName' | 'employerAvatar'>) => {
    const newJob: JobListing = {
      ...jobData,
      id: 'job-' + Date.now(),
      employerId: currentEmployer.id,
      employerName: currentEmployer.fullName,
      employerAvatar: currentEmployer.avatar,
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0
    };
    setJobs(prev => [newJob, ...prev]);
    showToast('Job Published', `"${newJob.title}" is now live and accepting worker applications!`);
  };

  const updateJob = (jobId: string, updates: Partial<JobListing>) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updates } : j));
    showToast('Job Updated', 'Your job listing changes have been saved.');
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    showToast('Job Removed', 'The job listing has been closed and removed.', 'info');
  };

  // Applications
  const applyForJob = (jobId: string, coverNote: string, expectedRate?: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Check if already applied
    const existing = applications.find(a => a.jobId === jobId && a.workerId === currentWorker.id);
    if (existing) {
      showToast('Already Applied', 'You have already submitted an application for this position.', 'warning');
      return;
    }

    const suitability = calculateSuitabilityScore(currentWorker, job);

    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      employerId: job.employerId,
      employerName: job.employerName,
      workerId: currentWorker.id,
      workerName: currentWorker.fullName,
      workerAvatar: currentWorker.avatar,
      workerOccupation: currentWorker.occupation,
      workerExperienceYears: currentWorker.experienceYears,
      workerRating: currentWorker.ratingAverage,
      workerVerified: currentWorker.isVerified,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      coverNote,
      expectedRate: expectedRate || `$${currentWorker.expectedSalary.amount}/${currentWorker.expectedSalary.period}`,
      matchScore: suitability.overallScore
    };

    setApplications(prev => [newApp, ...prev]);
    // increment count
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));
    showToast('Application Submitted!', `Your profile was sent to ${job.employerName} with a ${suitability.overallScore}% suitability score.`);
  };

  const withdrawApplication = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
    showToast('Application Withdrawn', 'Your application has been retracted.', 'info');
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    showToast('Application Status Changed', `Candidate application marked as "${status}".`);
  };

  // Interviews
  const scheduleInterview = (data: {
    workerId: string;
    workerName: string;
    jobId: string;
    jobTitle: string;
    date: string;
    time: string;
    type: Interview['type'];
    locationOrLink: string;
    notes: string;
    applicationId?: string;
  }) => {
    const newInterview: Interview = {
      id: 'int-' + Date.now(),
      applicationId: data.applicationId || 'app-gen',
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      employerId: currentEmployer.id,
      employerName: currentEmployer.fullName,
      employerAddress: currentEmployer.address,
      workerId: data.workerId,
      workerName: data.workerName,
      date: data.date,
      time: data.time,
      type: data.type,
      locationOrLink: data.locationOrLink,
      status: 'Pending',
      notes: data.notes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInterviews(prev => [newInterview, ...prev]);

    if (data.applicationId) {
      setApplications(prev => prev.map(a => 
        a.id === data.applicationId 
          ? { ...a, status: 'Interview Scheduled', interviewId: newInterview.id } 
          : a
      ));
    }

    // Auto open conversation with invitation notice
    startOrOpenConversation(data.workerId, currentEmployer.id, data.jobTitle);

    showToast('Interview Invitation Sent', `Interview scheduled with ${data.workerName} for ${data.date} at ${data.time}.`);
  };

  const respondToInterview = (interviewId: string, response: 'Accepted' | 'Declined' | 'Reschedule Requested') => {
    setInterviews(prev => prev.map(i => i.id === interviewId ? { ...i, status: response } : i));
    showToast('Interview Response Sent', `You have marked the interview as "${response}".`);
  };

  // Messaging
  const startOrOpenConversation = (workerId: string, employerId: string, jobTitle?: string): string => {
    const existing = conversations.find(
      c => c.participantWorkerId === workerId && c.participantEmployerId === employerId
    );

    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const worker = workers.find(w => w.id === workerId) || currentWorker;
    const employer = employers.find(e => e.id === employerId) || currentEmployer;

    const newConv: Conversation = {
      id: 'conv-' + Date.now(),
      participantWorkerId: worker.id,
      participantWorkerName: worker.fullName,
      participantWorkerAvatar: worker.avatar,
      participantEmployerId: employer.id,
      participantEmployerName: employer.fullName,
      participantEmployerAvatar: employer.avatar,
      lastMessage: 'Conversation opened',
      lastTimestamp: 'Just now',
      unreadCount: 0,
      relatedJobTitle: jobTitle || 'Domestic Placement'
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  };

  const sendMessage = (conversationId: string, text: string) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const isWorkerSender = currentRole === 'worker';
    const senderId = isWorkerSender ? currentWorker.id : currentEmployer.id;
    const senderName = isWorkerSender ? currentWorker.fullName : currentEmployer.fullName;
    const recipientId = isWorkerSender ? conv.participantEmployerId : conv.participantWorkerId;

    const newMsg: MessageItem = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId,
      senderName,
      senderRole: isWorkerSender ? 'worker' : 'employer',
      recipientId,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setMessages(prev => [...prev, newMsg]);

    setConversations(prev => prev.map(c => 
      c.id === conversationId 
        ? { ...c, lastMessage: text, lastTimestamp: 'Just now' } 
        : c
    ));

    // Simulated reply after 1.5 seconds if sent to the other party
    setTimeout(() => {
      const simulatedReply: MessageItem = {
        id: 'msg-reply-' + Date.now(),
        conversationId,
        senderId: recipientId,
        senderName: isWorkerSender ? conv.participantEmployerName : conv.participantWorkerName,
        senderRole: isWorkerSender ? 'employer' : 'worker',
        recipientId: senderId,
        content: isWorkerSender 
          ? "Thank you for the message, Tendai! I appreciate your quick responsiveness."
          : "Thank you for reaching out! I have received your message and will review the details promptly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };
      setMessages(prev => [...prev, simulatedReply]);
      setConversations(prev => prev.map(c => 
        c.id === conversationId 
          ? { ...c, lastMessage: simulatedReply.content, lastTimestamp: 'Just now' } 
          : c
      ));
    }, 1800);
  };

  // Profile Updates
  const updateWorkerProfile = (updates: Partial<WorkerProfile>) => {
    setWorkers(prev => prev.map(w => w.id === currentWorker.id ? { ...w, ...updates } : w));
    showToast('Profile Saved', 'Your worker profile information has been updated.');
  };

  const updateEmployerProfile = (updates: Partial<EmployerProfile>) => {
    setEmployers(prev => prev.map(e => e.id === currentEmployer.id ? { ...e, ...updates } : e));
    showToast('Employer Profile Saved', 'Household details & preferences have been updated.');
  };

  // Compare Tool
  const toggleCompareWorker = (worker: WorkerProfile) => {
    setComparedWorkers(prev => {
      const exists = prev.some(w => w.id === worker.id);
      if (exists) {
        return prev.filter(w => w.id !== worker.id);
      }
      if (prev.length >= 3) {
        showToast('Limit Reached', 'You can compare up to 3 candidates at once.', 'warning');
        return prev;
      }
      showToast('Added to Compare', `${worker.fullName} added to candidate comparison matrix.`);
      return [...prev, worker];
    });
  };

  const removeComparedWorker = (workerId: string) => {
    setComparedWorkers(prev => prev.filter(w => w.id !== workerId));
  };

  const clearComparedWorkers = () => {
    setComparedWorkers([]);
  };

  // Verification Queue (Admin)
  const verifyDocument = (workerId: string, docId: string, status: 'verified' | 'rejected', notes?: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id !== workerId) return w;

      const updatedDocs = w.documents.map(d => {
        if (d.id !== docId) return d;
        return {
          ...d,
          status,
          adminNotes: notes || (status === 'verified' ? 'Approved by Admin Officer' : 'Document rejected due to clarity/validity issue'),
          verifiedAt: status === 'verified' ? new Date().toISOString().split('T')[0] : undefined
        };
      });

      // Check if all essential docs are verified
      const allVerified = updatedDocs.length > 0 && updatedDocs.every(d => d.status === 'verified');

      return {
        ...w,
        documents: updatedDocs,
        isVerified: allVerified,
        verificationStatus: {
          ...w.verificationStatus,
          nationalId: updatedDocs.some(d => d.type === 'national_id' && d.status === 'verified') ? 'verified' : 'pending',
          policeClearance: updatedDocs.some(d => d.type === 'police_clearance' && d.status === 'verified') ? 'verified' : 'pending'
        }
      };
    }));

    showToast(
      status === 'verified' ? 'Document Approved' : 'Document Rejected',
      `Document marked as ${status}. Badge updated accordingly.`
    );
  };

  const uploadWorkerDocument = (doc: Omit<VerificationDocument, 'id' | 'uploadDate' | 'status'>) => {
    const newDoc: VerificationDocument = {
      ...doc,
      id: 'doc-' + Date.now(),
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setWorkers(prev => prev.map(w => {
      if (w.id !== currentWorker.id) return w;
      return {
        ...w,
        documents: [newDoc, ...w.documents],
        verificationStatus: {
          ...w.verificationStatus,
          [doc.type === 'national_id' ? 'nationalId' : doc.type === 'police_clearance' ? 'policeClearance' : 'referenceLetters']: 'pending'
        }
      };
    }));

    showToast('Document Uploaded', 'Document sent to Platform Admin verification queue.');
  };

  // Reviews
  const addWorkerReview = (reviewData: Omit<WorkerReview, 'id' | 'date'>) => {
    const newReview: WorkerReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    setWorkers(prev => prev.map(w => {
      if (w.id !== reviewData.workerId) return w;
      const updatedReviews = [newReview, ...w.reviews];
      const avg = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(2));
      return {
        ...w,
        reviews: updatedReviews,
        ratingAverage: avg,
        completedJobsCount: w.completedJobsCount + 1
      };
    }));

    showToast('Review Submitted', 'Worker rated successfully across Reliability, Punctuality, and Honesty.');
  };

  const addEmployerReview = (reviewData: Omit<EmployerReview, 'id' | 'date'>) => {
    const newReview: EmployerReview = {
      ...reviewData,
      id: 'rev-emp-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    setEmployers(prev => prev.map(e => {
      if (e.id !== reviewData.employerId) return e;
      const updated = [newReview, ...e.reviewsReceived];
      const avg = Number((updated.reduce((sum, r) => sum + r.rating, 0) / updated.length).toFixed(2));
      return {
        ...e,
        reviewsReceived: updated,
        ratingAverage: avg
      };
    }));

    showToast('Employer Review Published', 'Thank you for rating the household environment and payment punctuality.');
  };

  const resolveDispute = (disputeId: string, resolutionNote: string) => {
    setDisputes(prev => prev.map(d => 
      d.id === disputeId 
        ? { ...d, status: 'Resolved', resolutionNote } 
        : d
    ));
    showToast('Dispute Resolved', 'Case officially resolved and documented in registry.');
  };

  const resetAllData = () => {
    localStorage.clear();
    setWorkers(INITIAL_WORKERS);
    setEmployers(INITIAL_EMPLOYERS);
    setJobs(INITIAL_JOBS);
    setApplications(INITIAL_APPLICATIONS);
    setInterviews(INITIAL_INTERVIEWS);
    setConversations(INITIAL_CONVERSATIONS);
    setMessages(INITIAL_MESSAGES);
    setDisputes(INITIAL_DISPUTES);
    showToast('Data Reset', 'All demo records have been reset to factory state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentWorker,
        currentEmployer,
        workers,
        employers,
        jobs,
        applications,
        interviews,
        conversations,
        messages,
        disputes,
        adminStats,
        comparedWorkers,
        toasts,
        showToast,
        dismissToast,
        activeTab,
        setActiveTab,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isJobModalOpen,
        setIsJobModalOpen,
        jobToEdit,
        setJobToEdit,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isPricingModalOpen,
        setIsPricingModalOpen,
        activeConversationId,
        setActiveConversationId,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        selectedWorkerForSchedule,
        setSelectedWorkerForSchedule,
        selectedApplicationForSchedule,
        setSelectedApplicationForSchedule,
        createJob,
        updateJob,
        deleteJob,
        applyForJob,
        withdrawApplication,
        updateApplicationStatus,
        scheduleInterview,
        respondToInterview,
        sendMessage,
        startOrOpenConversation,
        updateWorkerProfile,
        updateEmployerProfile,
        toggleCompareWorker,
        removeComparedWorker,
        clearComparedWorkers,
        verifyDocument,
        uploadWorkerDocument,
        addWorkerReview,
        addEmployerReview,
        resolveDispute,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
