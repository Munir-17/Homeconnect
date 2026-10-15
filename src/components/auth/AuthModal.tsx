import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Phone, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, showToast, setCurrentRole } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot_password' | 'verify_otp'>('login');
  const [roleToRegister, setRoleToRegister] = useState<'employer' | 'worker'>('employer');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('Senior Nanny & Childminder');
  const [otpCode, setOtpCode] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'login') {
      showToast('Logged In Successfully', `Welcome back to HOMECONNECT.`);
      setIsAuthModalOpen(false);
    } else if (authMode === 'register') {
      // Move to mobile/email verification step
      setAuthMode('verify_otp');
      showToast('Verification Code Sent', `A 6-digit SMS verification code was sent to ${phone || '+263 77 123 4567'}.`, 'info');
    } else if (authMode === 'verify_otp') {
      if (roleToRegister === 'worker') {
        setCurrentRole('worker');
        showToast('Worker Account Registered!', 'Your mobile number is verified. You can now complete your profile and upload verification documents.');
      } else {
        setCurrentRole('employer');
        showToast('Household Account Verified!', 'Welcome to HOMECONNECT. You can now search vetted workers or post vacancies.');
      }
      setIsAuthModalOpen(false);
      setAuthMode('login');
    } else if (authMode === 'forgot_password') {
      showToast('Password Reset Link Sent', `Check ${email} for password reset instructions.`, 'info');
      setAuthMode('login');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-white">
                HOMECONNECT Access
              </h3>
              <p className="text-[11px] text-slate-400">
                Secure Domestic Worker Recruitment
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher if not verifying OTP */}
        {authMode !== 'verify_otp' && authMode !== 'forgot_password' && (
          <div className="flex border-b border-slate-200 text-xs font-bold bg-slate-50">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 text-center transition-colors ${
                authMode === 'login'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-3 text-center transition-colors ${
                authMode === 'register'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register Account
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 text-xs overflow-y-auto">
          {/* LOGIN MODE */}
          {authMode === 'login' && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. tendai.moyo@homeconnect.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot_password')}
                    className="text-emerald-700 hover:underline text-[11px]"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors mt-2"
              >
                Sign In
              </button>
            </>
          )}

          {/* REGISTER MODE */}
          {authMode === 'register' && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">I am registering as a:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoleToRegister('employer')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      roleToRegister === 'employer'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    🏡 Household Employer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleToRegister('worker')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      roleToRegister === 'worker'
                        ? 'bg-teal-50 border-teal-600 text-teal-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    👩‍🍳 Domestic Worker
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tendai Moyo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number (for SMS Verification)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+263 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {roleToRegister === 'worker' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Occupation</label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Senior Housekeeper & Nanny">Senior Housekeeper & Nanny</option>
                    <option value="Elderly Caregiver & Homemaker">Elderly Caregiver & Homemaker</option>
                    <option value="Infant Specialist Nanny">Infant Specialist Nanny</option>
                    <option value="Private Chef & Houseman">Private Chef & Houseman</option>
                    <option value="General Housekeeper & Cleaner">General Housekeeper & Cleaner</option>
                  </select>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Continue to Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* OTP VERIFICATION STEP */}
          {authMode === 'verify_otp' && (
            <div className="space-y-4 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  Verify Mobile Number
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit confirmation code to <strong>{phone || '+263 77 123 4567'}</strong>.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-48 text-center text-lg font-mono tracking-widest py-2 px-3 rounded-xl border-2 border-emerald-500 mx-auto block focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Demo helper: Type any 6 digits (e.g. 555888)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                Confirm & Activate Account
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-xs text-slate-500 hover:underline block mx-auto"
              >
                Change mobile number
              </button>
            </div>
          )}

          {/* FORGOT PASSWORD */}
          {authMode === 'forgot_password' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  Reset Password
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your registered email address and we will send a password reset link.
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Registered Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-slate-500 hover:underline"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
