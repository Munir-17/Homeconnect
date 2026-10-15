import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Heart, 
  PawPrint, 
  CheckCircle2, 
  Star, 
  Edit3, 
  Save, 
  ShieldCheck, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmployerProfile, EmploymentType } from '../../types';

export const EmployerProfileView: React.FC = () => {
  const { currentEmployer, updateEmployerProfile, setIsPricingModalOpen } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<EmployerProfile>(currentEmployer);

  const handleSave = () => {
    updateEmployerProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Employer Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 px-6 py-6 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Household Account
            </span>
            <span className="text-xs text-slate-400">
              Active Member Since {currentEmployer.joinedDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-lg flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {currentEmployer.subscriptionTier}
            </span>

            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="text-xs text-slate-300 hover:text-white underline ml-1"
            >
              Upgrade Tier
            </button>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-3.5 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all ml-2"
            >
              {isEditing ? (
                <>
                  <Save className="w-3.5 h-3.5 text-emerald-600" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  Edit Household
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={currentEmployer.avatar}
              alt={currentEmployer.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md"
            />

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                    {currentEmployer.fullName}
                  </h1>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {currentEmployer.companyOrFamilyName}
                  </p>
                </div>

                {/* Worker Feedback Score on this Household */}
                <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <div>
                    <div className="font-heading font-extrabold text-base text-slate-900 leading-none">
                      {currentEmployer.ratingAverage} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Employer Score by Workers
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentEmployer.address}, {currentEmployer.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {currentEmployer.phoneNumber}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentEmployer.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Household & Employment Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Household Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Home className="w-4 h-4 text-emerald-600" />
            Household Information & Structure
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Residence Type</span>
              <span className="font-bold text-slate-800">{formData.householdInfo.residenceType} ({formData.householdInfo.bedrooms} Bedrooms)</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Adults in Home</span>
              <span className="font-bold text-slate-800">{formData.householdInfo.numberOfAdults} Adults</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Children</span>
              <span className="font-bold text-slate-800">
                {formData.householdInfo.numberOfChildren} Children ({formData.householdInfo.childrenAges.join(', ')})
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Pets</span>
              <span className="font-bold text-slate-800">
                {formData.householdInfo.pets.join(', ')}
              </span>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 font-medium block mb-1">Special Care Needs or Notes:</span>
              <p className="p-3 bg-slate-50 rounded-xl text-slate-700 italic border border-slate-100">
                "{formData.householdInfo.specialCareNeeds}"
              </p>
            </div>
          </div>
        </div>

        {/* Employment Preferences */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            Domestic Staffing Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Preferred Arrangement</span>
              <span className="font-bold text-emerald-800 px-2 py-0.5 bg-emerald-50 rounded-md">
                {formData.employmentPreferences.preferredType}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Languages Preferred</span>
              <span className="font-bold text-slate-800">
                {formData.employmentPreferences.preferredLanguages.join(', ')}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Family Cooking Required?</span>
              <span className="font-bold text-slate-800">
                {formData.employmentPreferences.cookingRequired ? 'Yes (Healthy meals)' : 'No'}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Infant/Childcare Experience?</span>
              <span className="font-bold text-slate-800">
                {formData.employmentPreferences.childcareExperienceRequired ? 'Yes (Required)' : 'Not needed'}
              </span>
            </div>

            <div className="pt-2">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-emerald-900">
                <span className="font-bold block mb-0.5">Automated Search Matching:</span>
                <p className="text-[11px] text-emerald-800">
                  Our Matching Engine uses these exact criteria to score candidate profiles when you search for candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Given by Workers to this Household */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          Worker Feedback on this Household
        </h3>
        <p className="text-xs text-slate-500">
          At HOMECONNECT, accountability is two-way. Workers rate households to encourage fair wages, safe conditions, and prompt payment.
        </p>

        {currentEmployer.reviewsReceived.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No worker feedback recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {currentEmployer.reviewsReceived.map(rev => (
              <div
                key={rev.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rev.workerName} (Placed Worker)</span>
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {rev.rating} / 5.0
                  </div>
                </div>

                {/* Worker rating criteria breakdown */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200 text-[10px]">
                  <div>
                    <span className="text-slate-400 block">Respectfulness</span>
                    <span className="font-bold text-slate-800">★ {rev.respectfulness}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Timely Payment</span>
                    <span className="font-bold text-slate-800">★ {rev.timelyPayment}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Work Environment</span>
                    <span className="font-bold text-slate-800">★ {rev.workEnvironment}</span>
                  </div>
                </div>

                <p className="text-slate-700 italic">"{rev.comment}"</p>
                <span className="text-[10px] text-slate-400 block text-right">{rev.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
