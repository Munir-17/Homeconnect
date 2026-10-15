export type UserRole = 'worker' | 'employer' | 'admin';

export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unsubmitted';

export type EmploymentType = 'Full Time' | 'Part Time' | 'Temporary' | 'Live-In' | 'Live-Out';

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Shortlisted' 
  | 'Interview Scheduled' 
  | 'Hired' 
  | 'Rejected';

export type ProfileVisibility = 'Public' | 'Private' | 'Available for Hire';

export interface VerificationDocument {
  id: string;
  type: 'national_id' | 'passport' | 'police_clearance' | 'reference_letter' | 'certificate';
  title: string;
  documentNumber?: string;
  fileUrl: string;
  fileName: string;
  uploadDate: string;
  status: VerificationStatus;
  adminNotes?: string;
  verifiedAt?: string;
}

export interface WorkerReview {
  id: string;
  employerId: string;
  employerName: string;
  employerLocation: string;
  workerId: string;
  date: string;
  rating: number; // overall 1-5
  reliability: number;
  punctuality: number;
  professionalism: number;
  honesty: number;
  comment: string;
  jobTitle: string;
}

export interface EmployerReview {
  id: string;
  workerId: string;
  workerName: string;
  employerId: string;
  date: string;
  rating: number; // overall 1-5
  respectfulness: number;
  timelyPayment: number;
  workEnvironment: number;
  comment: string;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  dateOfBirth: string;
  gender: 'Female' | 'Male' | 'Other';
  address: string;
  city: string;
  neighborhood: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  occupation: string; // e.g. "Housekeeper & Childminder"
  experienceYears: number;
  skills: string[];
  languages: string[];
  expectedSalary: {
    amount: number;
    period: 'monthly' | 'hourly' | 'daily';
    currency: string;
  };
  preferredEmploymentType: EmploymentType[];
  availability: 'Immediate' | 'Within 1 Week' | 'Within 2 Weeks' | 'Weekends Only';
  visibility: ProfileVisibility;
  isVerified: boolean; // Overall badge
  verificationStatus: {
    nationalId: VerificationStatus;
    policeClearance: VerificationStatus;
    referenceLetters: VerificationStatus;
    workHistory: VerificationStatus;
  };
  background: string; // Bio / story
  challenges: string; // Challenges overcome
  futurePlans: string; // Aspirations, educational or career plans
  certificates: {
    name: string;
    issuer: string;
    year: number;
  }[];
  references: {
    name: string;
    relationship: string;
    contact: string;
    status: 'Verified' | 'Pending Verification';
    notes: string;
  }[];
  documents: VerificationDocument[];
  reviews: WorkerReview[];
  ratingAverage: number;
  completedJobsCount: number;
  joinedDate: string;
}

export interface HouseholdInfo {
  residenceType: 'Apartment' | 'House / Villa' | 'Townhouse' | 'Estate';
  bedrooms: number;
  numberOfAdults: number;
  numberOfChildren: number;
  childrenAges: string[];
  pets: string[];
  specialCareNeeds: string;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  fullName: string;
  companyOrFamilyName: string;
  address: string;
  city: string;
  neighborhood: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  householdInfo: HouseholdInfo;
  employmentPreferences: {
    preferredLanguages: string[];
    preferredType: EmploymentType;
    cookingRequired: boolean;
    childcareExperienceRequired: boolean;
  };
  subscriptionTier: 'Free' | 'Family Plus' | 'Premium Household';
  verifiedAccount: boolean;
  joinedDate: string;
  reviewsGiven: WorkerReview[];
  reviewsReceived: EmployerReview[];
  ratingAverage: number;
}

export interface JobListing {
  id: string;
  employerId: string;
  employerName: string;
  employerAvatar: string;
  title: string;
  description: string;
  location: string;
  neighborhood: string;
  salary: {
    amount: number;
    currency: string;
    period: 'monthly' | 'hourly' | 'daily';
  };
  workingHours: string; // e.g. "08:00 - 17:00, Mon - Fri"
  employmentType: EmploymentType;
  requiredSkills: string[];
  preferredLanguages: string[];
  experienceRequiredYears: number;
  accommodationProvided: boolean;
  mealsProvided: boolean;
  status: 'Open' | 'Closed' | 'Draft';
  createdAt: string;
  applicantsCount: number;
  isFeatured?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  employerId: string;
  employerName: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  workerOccupation: string;
  workerExperienceYears: number;
  workerRating: number;
  workerVerified: boolean;
  appliedDate: string;
  status: ApplicationStatus;
  coverNote: string;
  expectedRate?: string;
  matchScore: number;
  interviewId?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  employerId: string;
  employerName: string;
  employerAddress: string;
  workerId: string;
  workerName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: 'In-Person Home Visit' | 'Video Call' | 'Phone Call' | 'Practical Trial';
  locationOrLink: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Reschedule Requested' | 'Completed';
  notes: string;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantWorkerId: string;
  participantWorkerName: string;
  participantWorkerAvatar: string;
  participantEmployerId: string;
  participantEmployerName: string;
  participantEmployerAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  relatedJobTitle?: string;
}

export interface MatchScoreBreakdown {
  overallScore: number;
  locationScore: number;
  locationDistanceText: string;
  skillScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  experienceScore: number;
  salaryScore: number;
  availabilityScore: number;
}

export interface DisputeRecord {
  id: string;
  filedBy: 'worker' | 'employer';
  filerName: string;
  againstName: string;
  jobTitle: string;
  category: 'Non-payment' | 'Attendance' | 'Behavior' | 'Contract Disagreement' | 'Property Damage';
  description: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Dismissed';
  filedDate: string;
  resolutionNote?: string;
}
