import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  Star, 
  FileText, 
  Upload, 
  Lock, 
  Globe, 
  Eye, 
  Edit3, 
  Save, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  Heart,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile, ProfileVisibility, VerificationDocument } from '../../types';

interface WorkerProfileViewProps {
  worker?: WorkerProfile;
  isOwner?: boolean;
  onBack?: () => void;
}

export const WorkerProfileView: React.FC<WorkerProfileViewProps> = ({ 
  worker: propWorker, 
  isOwner = false,
  onBack 
}) => {
  const { 
    currentWorker, 
    updateWorkerProfile, 
    uploadWorkerDocument, 
    currentRole,
    currentEmployer,
    setIsScheduleModalOpen,
    setSelectedWorkerForSchedule,
    startOrOpenConversation,
    setActiveTab,
    showToast
  } = useApp();

  // If viewed from Worker persona, it is owner; otherwise use propWorker
  const activeWorker = propWorker || currentWorker;
  const isEditingAllowed = isOwner || currentRole === 'worker';

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<WorkerProfile>>({
    fullName: activeWorker.fullName,
    occupation: activeWorker.occupation,
    phoneNumber: activeWorker.phoneNumber,
    email: activeWorker.email,
    address: activeWorker.address,
    neighborhood: activeWorker.neighborhood,
    experienceYears: activeWorker.experienceYears,
    availability: activeWorker.availability,
    visibility: activeWorker.visibility,
    background: activeWorker.background,
    challenges: activeWorker.challenges,
    futurePlans: activeWorker.futurePlans,
    expectedSalary: activeWorker.expectedSalary
  });

  // Document upload state
  const [docUploadType, setDocUploadType] = useState<VerificationDocument['type']>('national_id');
  const [docTitle, setDocTitle] = useState('');
  const [docFileSelected, setDocFileSelected] = useState<string>('');

  const handleSave = () => {
    updateWorkerProfile(formData);
    setIsEditing(false);
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) {
      showToast('Document Title Required', 'Please enter a title for your document.', 'warning');
      return;
    }

    uploadWorkerDocument({
      type: docUploadType,
      title: docTitle,
      fileName: docTitle.toLowerCase().replace(/\s+/g, '_') + '.pdf',
      fileUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=600&q=80',
      documentNumber: 'DOC-' + Math.floor(100000 + Math.random() * 900000)
    });

    setDocTitle('');
    setDocFileSelected('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Navigation / Breadcrumb if viewing someone else */}
      {onBack && (
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          ← Back to Candidate Search
        </button>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Banner with Status & Visibility */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-slate-900 px-6 py-6 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {activeWorker.isVerified ? 'Fully Vetted & Screened Worker' : 'Verification Under Review'}
            </span>

            <span className="text-xs text-slate-300">
              Member since {activeWorker.joinedDate}
            </span>
          </div>

          {/* Visibility badge or switcher */}
          <div className="flex items-center gap-2">
            {isEditingAllowed ? (
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-300">Visibility:</span>
                <select
                  value={formData.visibility}
                  onChange={(e) => {
                    const val = e.target.value as ProfileVisibility;
                    setFormData(prev => ({ ...prev, visibility: val }));
                    updateWorkerProfile({ visibility: val });
                  }}
                  className="bg-transparent font-bold text-white focus:outline-hidden cursor-pointer"
                >
                  <option value="Available for Hire" className="text-slate-900">🟢 Available for Hire</option>
                  <option value="Public" className="text-slate-900">🌐 Public Profile</option>
                  <option value="Private" className="text-slate-900">🔒 Private</option>
                </select>
              </div>
            ) : (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">
                🟢 {activeWorker.visibility}
              </span>
            )}

            {isEditingAllowed && (
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="px-3.5 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                {isEditing ? (
                  <>
                    <Save className="w-3.5 h-3.5 text-emerald-600" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                    Edit Profile
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative shrink-0">
              <img
                src={activeWorker.avatar}
                alt={activeWorker.fullName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-slate-100 shadow-md"
              />
              {activeWorker.isVerified && (
                <div 
                  title="✅ 100% Verified Identity, Police Clearance, References"
                  className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-2 shadow-lg ring-4 ring-white"
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                      {activeWorker.fullName}
                    </h1>
                    {activeWorker.isVerified && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Badge
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-emerald-800 mt-0.5">
                    {activeWorker.occupation}
                  </p>
                </div>

                {/* Rating display */}
                <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <div>
                    <div className="font-heading font-extrabold text-base text-slate-900 leading-none">
                      {activeWorker.ratingAverage} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {activeWorker.reviews.length} Verified Reviews
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta pills: Location, Experience, Age, Salary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Location</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activeWorker.neighborhood}, {activeWorker.city}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Experience</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {activeWorker.experienceYears} Years Verified
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Expected Wage</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">
                    ${activeWorker.expectedSalary.amount} {activeWorker.expectedSalary.currency} / {activeWorker.expectedSalary.period}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Availability</span>
                  <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                    {activeWorker.availability}
                  </span>
                </div>
              </div>

              {/* Action buttons if viewed by Employer */}
              {currentRole === 'employer' && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedWorkerForSchedule(activeWorker);
                      setIsScheduleModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Interview With {activeWorker.fullName.split(' ')[0]}
                  </button>

                  <button
                    onClick={() => {
                      startOrOpenConversation(activeWorker.id, currentEmployer.id);
                      setActiveTab('messages');
                    }}
                    className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Details & Right Column Verification/Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Story, Background, Challenges, Plans, Skills, Certs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information & Background Story */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-600" />
              Background & Professional Philosophy
            </h3>

            {isEditing ? (
              <textarea
                value={formData.background}
                onChange={(e) => setFormData(prev => ({ ...prev, background: e.target.value }))}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="Write about your journey and philosophy..."
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeWorker.background}
              </p>
            )}

            {/* Persona 1: Challenges Overcome */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/60 text-xs">
              <span className="font-bold text-amber-900 block mb-1">Challenges Overcome & Resilience:</span>
              {isEditing ? (
                <textarea
                  value={formData.challenges}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                  rows={2}
                  className="w-full text-xs p-2 rounded-lg border border-amber-300 bg-white"
                />
              ) : (
                <p className="text-amber-800 leading-relaxed">
                  {activeWorker.challenges || 'Committed to steady self-improvement and continuing education.'}
                </p>
              )}
            </div>

            {/* Persona 1: Future Plans & Aspirations */}
            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200/60 text-xs">
              <span className="font-bold text-teal-900 block mb-1">Future Career Plans & Development:</span>
              {isEditing ? (
                <textarea
                  value={formData.futurePlans}
                  onChange={(e) => setFormData(prev => ({ ...prev, futurePlans: e.target.value }))}
                  rows={2}
                  className="w-full text-xs p-2 rounded-lg border border-teal-300 bg-white"
                />
              ) : (
                <p className="text-teal-800 leading-relaxed">
                  {activeWorker.futurePlans || 'Aiming for senior household management certifications.'}
                </p>
              )}
            </div>
          </div>

          {/* Skills & Spoken Languages */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Verified Skills & Core Competencies
            </h3>

            <div className="flex flex-wrap gap-2">
              {activeWorker.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-100 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block mb-2">Spoken Languages:</span>
              <div className="flex flex-wrap gap-2">
                {activeWorker.languages.map(lang => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates & Professional Credentials */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Accredited Certifications & Training
            </h3>

            <div className="space-y-3">
              {activeWorker.certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{cert.name}</span>
                    <span className="text-slate-500 text-[11px]">{cert.issuer}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 font-bold text-slate-700 rounded-md text-[11px]">
                    Year {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Verification Status */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Employer References
            </h3>

            <div className="space-y-3">
              {activeWorker.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{ref.name}</span>
                      <span className="text-slate-500 text-[11px]">{ref.relationship}</span>
                    </div>

                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {ref.status}
                    </span>
                  </div>

                  <p className="text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100">
                    "{ref.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Received from Employers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Verified Household Reviews ({activeWorker.reviews.length})
            </h3>

            {activeWorker.reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews yet. First placement rating pending.</p>
            ) : (
              <div className="space-y-3">
                {activeWorker.reviews.map(rev => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{rev.employerName}</span>
                        <span className="text-slate-500 text-[11px] ml-2">({rev.employerLocation})</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {rev.rating} / 5.0
                      </div>
                    </div>

                    {/* 4 Employer Rating Criteria breakdown */}
                    <div className="grid grid-cols-4 gap-2 py-2 border-y border-slate-200 text-[10px]">
                      <div>
                        <span className="text-slate-400 block">Reliability</span>
                        <span className="font-bold text-slate-800">★ {rev.reliability}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Punctuality</span>
                        <span className="font-bold text-slate-800">★ {rev.punctuality}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Professionalism</span>
                        <span className="font-bold text-slate-800">★ {rev.professionalism}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Honesty</span>
                        <span className="font-bold text-slate-800">★ {rev.honesty}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-slate-400 block text-right">Job: {rev.jobTitle} • {rev.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Verification & Document Management */}
        <div className="space-y-6">
          {/* Verification Status Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Screening & Clearance
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">National Identity (ID)</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                  activeWorker.verificationStatus.nationalId === 'verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeWorker.verificationStatus.nationalId}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">CID Police Clearance</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                  activeWorker.verificationStatus.policeClearance === 'verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeWorker.verificationStatus.policeClearance}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Reference Checks</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                  activeWorker.verificationStatus.referenceLetters === 'verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeWorker.verificationStatus.referenceLetters}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Work History & Skills</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                  activeWorker.verificationStatus.workHistory === 'verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {activeWorker.verificationStatus.workHistory}
                </span>
              </div>
            </div>

            {/* Badge award status */}
            <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
              activeWorker.isVerified ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {activeWorker.isVerified ? 'Awarded: ✅ Verified Worker Badge' : 'Badge In Progress'}
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {activeWorker.isVerified
                    ? 'Verified workers receive 4.5x more interview requests and unlock placement fee insurance.'
                    : 'Upload national ID and CID police clearance to obtain your Verified Badge.'}
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Uploaded Documents ({activeWorker.documents.length})
            </h3>

            <div className="space-y-2.5 text-xs">
              {activeWorker.documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate max-w-[170px]">{doc.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      doc.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">File: {doc.fileName}</p>
                  {doc.adminNotes && (
                    <p className="text-[11px] text-slate-600 italic bg-white p-1.5 rounded-md border border-slate-100">
                      Officer note: {doc.adminNotes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Document Upload Form for Worker */}
            {isEditingAllowed && (
              <form onSubmit={handleDocumentSubmit} className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Upload Required Document
                </span>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Document Category</label>
                  <select
                    value={docUploadType}
                    onChange={(e) => setDocUploadType(e.target.value as any)}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option value="national_id">National ID Card</option>
                    <option value="passport">Passport (Optional)</option>
                    <option value="police_clearance">Police Clearance (CID)</option>
                    <option value="reference_letter">Reference Letter</option>
                    <option value="certificate">Training Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Document Title</label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="e.g. CID Police Clearance 2026"
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-600 block">Click to select PDF or Image scan</span>
                  <span className="text-[10px] text-slate-400">Max size 10MB (PDF, JPG, PNG)</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Submit for Admin Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
