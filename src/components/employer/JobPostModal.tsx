import React, { useState, useEffect } from 'react';
import { X, Briefcase, PlusCircle, CheckCircle2, DollarSign, Clock, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmploymentType, JobListing } from '../../types';

const COMMON_SKILLS = [
  'Childcare & Infant Care',
  'Continental Cooking',
  'Elderly Care & Companionship',
  'Deep Cleaning',
  'Laundry & Steam Ironing',
  'First Aid & CPR',
  'Special Needs Childcare (Autism/ADHD)',
  'Pet Friendly',
  'Garden & House Care',
  'Driving License'
];

export const JobPostModal: React.FC = () => {
  const { 
    isJobModalOpen, 
    setIsJobModalOpen, 
    jobToEdit, 
    setJobToEdit, 
    createJob, 
    updateJob,
    currentEmployer 
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Harare');
  const [neighborhood, setNeighborhood] = useState('Highlands');
  const [salaryAmount, setSalaryAmount] = useState(450);
  const [salaryPeriod, setSalaryPeriod] = useState<'monthly' | 'hourly' | 'daily'>('monthly');
  const [workingHours, setWorkingHours] = useState('07:30 - 16:30, Monday to Friday');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Live-Out');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([
    'Childcare & Infant Care',
    'Deep Cleaning',
    'Laundry & Steam Ironing'
  ]);
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(['English (Fluent)', 'Shona (Fluent)']);
  const [experienceRequiredYears, setExperienceRequiredYears] = useState(3);
  const [accommodationProvided, setAccommodationProvided] = useState(false);
  const [mealsProvided, setMealsProvided] = useState(true);

  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title);
      setDescription(jobToEdit.description);
      setLocation(jobToEdit.location);
      setNeighborhood(jobToEdit.neighborhood);
      setSalaryAmount(jobToEdit.salary.amount);
      setSalaryPeriod(jobToEdit.salary.period);
      setWorkingHours(jobToEdit.workingHours);
      setEmploymentType(jobToEdit.employmentType);
      setRequiredSkills(jobToEdit.requiredSkills);
      setPreferredLanguages(jobToEdit.preferredLanguages);
      setExperienceRequiredYears(jobToEdit.experienceRequiredYears);
      setAccommodationProvided(jobToEdit.accommodationProvided);
      setMealsProvided(jobToEdit.mealsProvided);
    } else {
      // Default clean template
      setTitle('');
      setDescription('');
      setNeighborhood(currentEmployer.neighborhood || 'Highlands');
      setSalaryAmount(450);
      setSalaryPeriod('monthly');
      setWorkingHours('07:30 - 16:30, Monday to Friday');
      setEmploymentType('Live-Out');
      setRequiredSkills(['Childcare & Infant Care', 'Deep Cleaning']);
    }
  }, [jobToEdit, isJobModalOpen, currentEmployer]);

  if (!isJobModalOpen) return null;

  const toggleSkill = (skill: string) => {
    setRequiredSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    if (jobToEdit) {
      updateJob(jobToEdit.id, {
        title,
        description,
        location,
        neighborhood,
        salary: {
          amount: salaryAmount,
          currency: 'USD',
          period: salaryPeriod
        },
        workingHours,
        employmentType,
        requiredSkills,
        preferredLanguages,
        experienceRequiredYears,
        accommodationProvided,
        mealsProvided
      });
    } else {
      createJob({
        title,
        description,
        location,
        neighborhood,
        salary: {
          amount: salaryAmount,
          currency: 'USD',
          period: salaryPeriod
        },
        workingHours,
        employmentType,
        requiredSkills,
        preferredLanguages,
        experienceRequiredYears,
        accommodationProvided,
        mealsProvided,
        status: 'Open',
        isFeatured: true
      });
    }

    setJobToEdit(null);
    setIsJobModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-extrabold text-white">
                {jobToEdit ? 'Edit Domestic Vacancy' : 'Post a Verified Domestic Vacancy'}
              </h2>
              <p className="text-xs text-slate-300">
                Reach pre-screened, police-cleared domestic workers with AI automated matching.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setJobToEdit(null);
              setIsJobModalOpen(false);
            }}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Job Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Full-Time Housekeeper & Infant Nanny"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Detailed Job Description & Duties *</label>
            <textarea
              required
              rows={3}
              placeholder="Describe daily routines, household dynamics, expectation for cleanliness, cooking, or child routines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Location & Neighborhood */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">City</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Neighborhood / Suburb</label>
              <input
                type="text"
                placeholder="e.g. Highlands, Borrowdale, Avondale"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Employment Type & Hours */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Employment Type *</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Live-Out">Live-Out (Commuter)</option>
                <option value="Live-In">Live-In (Private Room Provided)</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Temporary">Temporary / Trial</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Working Schedule / Hours *</label>
              <input
                type="text"
                placeholder="e.g. 07:30 - 16:30, Mon - Fri"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Salary Compensation */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="col-span-2">
              <label className="font-bold text-slate-800 block mb-1">Offered Compensation (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min={50}
                  max={2000}
                  step={10}
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Period</label>
              <select
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value as any)}
                className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white font-medium"
              >
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>

          {/* Experience Required */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Minimum Required Experience (Years): {experienceRequiredYears} yrs
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={experienceRequiredYears}
              onChange={(e) => setExperienceRequiredYears(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Required Skills Selection */}
          <div>
            <label className="font-bold text-slate-800 block mb-1.5">
              Select Required Skills for AI Candidate Matching:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SKILLS.map(skill => {
                const isSelected = requiredSkills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accommodation & Meals Perks */}
          <div className="flex flex-wrap gap-6 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mealsProvided}
                onChange={(e) => setMealsProvided(e.target.checked)}
                className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="font-medium text-slate-700">Meals Provided on Duty</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accommodationProvided}
                onChange={(e) => setAccommodationProvided(e.target.checked)}
                className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="font-medium text-slate-700">Private Live-in Room Included</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setJobToEdit(null);
                setIsJobModalOpen(false);
              }}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" />
              {jobToEdit ? 'Save Changes' : 'Publish Vacancy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
