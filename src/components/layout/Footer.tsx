import React from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, Lock, Award, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentRole, setActiveTab, setIsPricingModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Trust Pillars Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% ID & Police Vetted</h4>
              <p className="text-xs text-slate-400 mt-1">Biometric National ID and CID Criminal records checked before placement.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/50">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Verified Past References</h4>
              <p className="text-xs text-slate-400 mt-1">Directly contacted past employer testimonials and verified work history.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/50">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Fair Work & Dignity</h4>
              <p className="text-xs text-slate-400 mt-1">Transparent contracts, mutual reviews, safe environment guarantees.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">90-Day Placement Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">Free candidate replacement or placement fee refund if not satisfied.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                HOMECONNECT
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The ethical domestic worker recruitment marketplace. We bridge vetted household professionals with loving families through rigorous screening, transparent reviews, and smart suitability matching.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> SSL Encrypted
              </span>
              <span>•</span>
              <span>GDPR / Data Protection Compliant</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">For Employers</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setCurrentRole('employer'); setActiveTab('home'); }} className="hover:text-emerald-400 transition-colors">
                  Find Vetted Workers
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('employer'); setActiveTab('my-jobs'); }} className="hover:text-emerald-400 transition-colors">
                  Post a Job Listing
                </button>
              </li>
              <li>
                <button onClick={() => setIsPricingModalOpen(true)} className="hover:text-emerald-400 transition-colors">
                  Pricing & Subscriptions
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('employer'); setActiveTab('interviews'); }} className="hover:text-emerald-400 transition-colors">
                  Schedule Interviews
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">For Domestic Workers</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setCurrentRole('worker'); setActiveTab('find-jobs'); }} className="hover:text-teal-400 transition-colors">
                  Browse Available Jobs
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('worker'); setActiveTab('profile'); }} className="hover:text-teal-400 transition-colors">
                  Upload Verification Docs
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('worker'); setActiveTab('profile'); }} className="hover:text-teal-400 transition-colors">
                  Get Verified Badge
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('worker'); setActiveTab('applications'); }} className="hover:text-teal-400 transition-colors">
                  Track Applications
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Admin & Safety</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setCurrentRole('admin'); setActiveTab('verification-queue'); }} className="hover:text-amber-400 transition-colors">
                  Document Verification Queue
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('admin'); setActiveTab('disputes'); }} className="hover:text-amber-400 transition-colors">
                  Dispute Resolution Bureau
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentRole('admin'); setActiveTab('reports'); }} className="hover:text-amber-400 transition-colors">
                  Platform Placement Metrics
                </button>
              </li>
              <li>
                <span className="text-slate-500">24/7 Helpline: +263 800 4663</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HOMECONNECT Inc. Building trust, transparency, and dignity for domestic workers.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Domestic Worker Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
