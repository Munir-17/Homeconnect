import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Video, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Interview } from '../../types';

export const ScheduleInterviewModal: React.FC = () => {
  const { 
    isScheduleModalOpen, 
    setIsScheduleModalOpen, 
    selectedWorkerForSchedule, 
    setSelectedWorkerForSchedule,
    selectedApplicationForSchedule,
    setSelectedApplicationForSchedule,
    jobs,
    currentEmployer,
    scheduleInterview
  } = useApp();

  const [jobId, setJobId] = useState('');
  const [date, setDate] = useState('2026-10-18');
  const [time, setTime] = useState('10:00 AM');
  const [type, setType] = useState<Interview['type']>('In-Person Home Visit');
  const [locationOrLink, setLocationOrLink] = useState('');
  const [notes, setNotes] = useState('');

  const employerJobs = jobs.filter(j => j.employerId === currentEmployer.id);

  useEffect(() => {
    if (selectedApplicationForSchedule) {
      setJobId(selectedApplicationForSchedule.jobId);
    } else if (employerJobs.length > 0) {
      setJobId(employerJobs[0].id);
    }
    setLocationOrLink(currentEmployer.address + ', Harare');
    setNotes('Please bring physical original National ID and past reference letters. We look forward to meeting you.');
  }, [selectedApplicationForSchedule, currentEmployer, employerJobs]);

  if (!isScheduleModalOpen || !selectedWorkerForSchedule) return null;

  const currentJob = jobs.find(j => j.id === jobId) || employerJobs[0] || jobs[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    scheduleInterview({
      workerId: selectedWorkerForSchedule.id,
      workerName: selectedWorkerForSchedule.fullName,
      jobId: currentJob.id,
      jobTitle: currentJob.title,
      date,
      time,
      type,
      locationOrLink,
      notes,
      applicationId: selectedApplicationForSchedule?.id
    });

    setSelectedWorkerForSchedule(null);
    setSelectedApplicationForSchedule(null);
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-extrabold text-white">
                Schedule Candidate Interview
              </h2>
              <p className="text-xs text-slate-300">
                Send an official invitation with location & screening requirements.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedWorkerForSchedule(null);
              setSelectedApplicationForSchedule(null);
              setIsScheduleModalOpen(false);
            }}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Worker Summary Banner */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <img
            src={selectedWorkerForSchedule.avatar}
            alt={selectedWorkerForSchedule.fullName}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-heading font-bold text-sm text-slate-900">
                {selectedWorkerForSchedule.fullName}
              </h4>
              {selectedWorkerForSchedule.isVerified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <p className="text-xs text-slate-500">
              {selectedWorkerForSchedule.occupation} • {selectedWorkerForSchedule.experienceYears} yrs exp
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 text-xs overflow-y-auto">
          {/* Related Job */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">For Vacancy Position</label>
            <select
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {employerJobs.map(j => (
                <option key={j.id} value={j.id}>
                  {j.title} (${j.salary.amount}/mo)
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Time</label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Type of Interview */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">Interview Format</label>
            <select
              value={type}
              onChange={(e) => {
                const val = e.target.value as Interview['type'];
                setType(val);
                if (val === 'Video Call') {
                  setLocationOrLink('https://meet.google.com/hcn-' + Math.floor(1000 + Math.random() * 9000));
                } else if (val === 'Phone Call') {
                  setLocationOrLink(currentEmployer.phoneNumber);
                } else {
                  setLocationOrLink(currentEmployer.address + ', Harare');
                }
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="In-Person Home Visit">In-Person Home Visit & Trial Chat</option>
              <option value="Video Call">Google Meet / Video Call</option>
              <option value="Practical Trial">Practical Household Trial (Paid)</option>
              <option value="Phone Call">Preliminary Phone Screening</option>
            </select>
          </div>

          {/* Location or Link */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              {type === 'Video Call' ? 'Video Meeting Link' : type === 'Phone Call' ? 'Phone Contact' : 'Physical Address & Gate Instructions'}
            </label>
            <input
              type="text"
              required
              value={locationOrLink}
              onChange={(e) => setLocationOrLink(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Instructions for Candidate (Documents to bring, duration, etc.)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedWorkerForSchedule(null);
                setSelectedApplicationForSchedule(null);
                setIsScheduleModalOpen(false);
              }}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              Dispatch Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
