import React from 'react';
import { X, Check, ShieldCheck, Sparkles, Award, Zap, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PricingModal: React.FC = () => {
  const { isPricingModalOpen, setIsPricingModalOpen, showToast, currentEmployer, updateEmployerProfile } = useApp();

  if (!isPricingModalOpen) return null;

  const handleSelectPlan = (tierName: 'Free' | 'Family Plus' | 'Premium Household') => {
    updateEmployerProfile({ subscriptionTier: tierName });
    showToast('Plan Updated!', `Your household account is now on the ${tierName} plan.`);
    setIsPricingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="px-6 py-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Transparent Marketplace Revenue Model
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mt-1">
              Household Membership & Screening Plans
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Support ethical domestic worker recruitment, verified background screening, and placement guarantees.
            </p>
          </div>

          <button
            onClick={() => setIsPricingModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Free Starter */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">Standard Starter</h3>
                <p className="text-xs text-slate-500 mt-1">For occasional or trial domestic hiring.</p>
                <div className="my-4">
                  <span className="text-3xl font-heading font-black text-slate-900">$0</span>
                  <span className="text-xs text-slate-500"> / forever</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Browse verified worker profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    1 Active job posting
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Standard chat messaging
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    ✕ AI Match score breakdown
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan('Free')}
                className="mt-6 w-full py-2 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Current Tier
              </button>
            </div>

            {/* Tier 2: Family Plus (Popular) */}
            <div className="bg-emerald-50/70 rounded-2xl p-6 border-2 border-emerald-500 flex flex-col justify-between relative shadow-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                Most Popular for Families
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">Family Plus</h3>
                <p className="text-xs text-slate-600 mt-1">Full access to verified nanny & housekeeper pool.</p>
                <div className="my-4">
                  <span className="text-3xl font-heading font-black text-emerald-900">$49</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Unlimited active vacancies
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Full AI Suitability Match Engine
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Compare up to 3 candidates side-by-side
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Unlimited interview scheduling
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Full CID Police Clearance document access
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan('Family Plus')}
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                {currentEmployer.subscriptionTier === 'Family Plus' ? 'Active Plan' : 'Upgrade to Family Plus'}
              </button>
            </div>

            {/* Tier 3: Premium Household */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-white">Premium & Diplomatic</h3>
                <p className="text-xs text-slate-400 mt-1">For estates, diplomats, and multi-staff homes.</p>
                <div className="my-4">
                  <span className="text-3xl font-heading font-black text-white">$119</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    All Family Plus features included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    90-Day Free Candidate Replacement
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Dedicated Recruitment Officer Concierge
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Background Deep-Dive with voice verified references
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan('Premium Household')}
                className="mt-6 w-full py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                {currentEmployer.subscriptionTier === 'Premium Household' ? 'Active Plan' : 'Select Premium Plan'}
              </button>
            </div>
          </div>

          {/* Placement Fee & Screening Add-ons */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-3">
              À La Carte Safety Add-ons:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Single Placement Success Guarantee</span>
                  <span className="text-slate-500 text-[11px]">90-day replacement policy without monthly subscription</span>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">$149 USD</span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">CID Deep-Dive Background Packet</span>
                  <span className="text-slate-500 text-[11px]">Fingerprint verification + past 3 employers interviewed</span>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">$35 USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
