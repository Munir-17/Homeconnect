import React, { useState } from 'react';
import { X, Star, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile, EmployerProfile } from '../../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetWorker?: WorkerProfile;
  targetEmployer?: EmployerProfile;
  mode: 'employer_rates_worker' | 'worker_rates_employer';
  jobTitle?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  targetWorker,
  targetEmployer,
  mode,
  jobTitle = 'Domestic Employment Engagement'
}) => {
  const { 
    currentEmployer, 
    currentWorker, 
    addWorkerReview, 
    addEmployerReview 
  } = useApp();

  // Employer Rating Worker Criteria
  const [reliability, setReliability] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [professionalism, setProfessionalism] = useState(5);
  const [honesty, setHonesty] = useState(5);

  // Worker Rating Employer Criteria
  const [respectfulness, setRespectfulness] = useState(5);
  const [timelyPayment, setTimelyPayment] = useState(5);
  const [workEnvironment, setWorkEnvironment] = useState(5);

  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'employer_rates_worker' && targetWorker) {
      const avg = Number(((reliability + punctuality + professionalism + honesty) / 4).toFixed(1));
      addWorkerReview({
        employerId: currentEmployer.id,
        employerName: currentEmployer.fullName,
        employerLocation: currentEmployer.neighborhood,
        workerId: targetWorker.id,
        rating: avg,
        reliability,
        punctuality,
        professionalism,
        honesty,
        comment,
        jobTitle
      });
    } else if (mode === 'worker_rates_employer' && targetEmployer) {
      const avg = Number(((respectfulness + timelyPayment + workEnvironment) / 3).toFixed(1));
      addEmployerReview({
        workerId: currentWorker.id,
        workerName: currentWorker.fullName,
        employerId: targetEmployer.id,
        rating: avg,
        respectfulness,
        timelyPayment,
        workEnvironment,
        comment
      });
    }

    onClose();
  };

  const renderStarInput = (val: number, setVal: (n: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            type="button"
            key={num}
            onClick={() => setVal(num)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Star
              className={`w-5 h-5 ${
                num <= val ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="font-bold text-xs text-slate-700 ml-1.5">{val}.0</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="font-heading font-extrabold text-base text-white">
              {mode === 'employer_rates_worker'
                ? `Rate ${targetWorker?.fullName || 'Worker'}`
                : `Rate Household Experience with ${targetEmployer?.fullName || 'Employer'}`}
            </h3>
            <p className="text-xs text-slate-300">
              Honest, transparent ratings ensure platform accountability and worker safety.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 text-xs overflow-y-auto">
          {mode === 'employer_rates_worker' ? (
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                Domestic Worker Evaluation Criteria:
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Reliability</span>
                  <span className="text-[10px] text-slate-500">Dependability with household tasks & routines</span>
                </div>
                {renderStarInput(reliability, setReliability)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block">Punctuality</span>
                  <span className="text-[10px] text-slate-500">Arrived on time for shifts and schedules</span>
                </div>
                {renderStarInput(punctuality, setPunctuality)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block">Professionalism</span>
                  <span className="text-[10px] text-slate-500">Demeanor, respect for property, hygiene</span>
                </div>
                {renderStarInput(professionalism, setProfessionalism)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block">Honesty</span>
                  <span className="text-[10px] text-slate-500">Trustworthiness around family and valuables</span>
                </div>
                {renderStarInput(honesty, setHonesty)}
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                Household Employer Evaluation Criteria:
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Respectfulness</span>
                  <span className="text-[10px] text-slate-500">Courteous, dignified treatment of domestic staff</span>
                </div>
                {renderStarInput(respectfulness, setRespectfulness)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block">Timely Payment</span>
                  <span className="text-[10px] text-slate-500">Agreed salary disbursed promptly on agreed dates</span>
                </div>
                {renderStarInput(timelyPayment, setTimelyPayment)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block">Work Environment</span>
                  <span className="text-[10px] text-slate-500">Safe, clean, and reasonable working hours</span>
                </div>
                {renderStarInput(workEnvironment, setWorkEnvironment)}
              </div>
            </div>
          )}

          {/* Comment */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Written Testimonial / Feedback *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Share details on daily duties, communication, work ethic, and whether you recommend them..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
