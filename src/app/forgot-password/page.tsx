'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  Mail, 
  Key, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Step 1: Request Reset Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'রিসেট আবেদন ব্যর্থ হয়েছে');
      }

      setGeneratedCode(data.resetCode || '');
      setSuccessMessage(data.message || 'রিসেট কোড সফলভাবে সুপার এডমিন প্যানেলে জমা হয়েছে!');
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Confirm Reset Code & Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          resetCode,
          newPassword
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'পাসওয়ার্ড রিসেট করা সম্ভব হয়নি');
      }

      setSuccessMessage('আপনার পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে! এখন লগইন করুন।');
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'রিসেট কোড সঠিক নয় অথবা ত্রুটি ঘটেছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            <Key className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">পাসওয়ার্ড ভুলে গেছেন?</h2>
          <p className="mt-2 text-xs text-slate-600">
            ডাঃ মুজিব-রুবি মডেল হাই স্কুল একাউন্ট ভেরিফিকেশন পোর্টিং
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className={`px-3 py-1 rounded-full font-bold text-xs ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            ধাপ ১: ইমেইল সাবমিট
          </span>
          <span className={`px-3 py-1 rounded-full font-bold text-xs ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            ধাপ ২: কোড ও নতুন পাসওয়ার্ড
          </span>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* STEP 1 FORM */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">আপনার রেজিস্টার্ড ইমেইল দিন</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'প্রসেসিং হচ্ছে...' : (
                <>
                  রিসেট কোড পাঠাতে আবেদন করুন <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2 FORM */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {generatedCode && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 text-xs space-y-1">
                <p className="font-bold">🔑 আপনার ভেরিফিকেশন কোড: <span className="font-mono text-sm underline">{generatedCode}</span></p>
                <p className="text-[11px] text-slate-600">এই কোডটি সুপার এডমিন প্যানেলের "🔑 রিসেট আবেদন" ট্যাবে জমা রয়েছে।</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">৬ ডিজিটের রিসেট কোড (Reset Code)</label>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="RST-123456"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">নতুন পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">কনফার্ম পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'সেভ হচ্ছে...' : 'নতুন পাসওয়ার্ড সেভ করুন'}
            </button>
          </form>
        )}

        {/* Bottom Navigation Link */}
        <div className="text-center pt-6 text-xs text-slate-600 border-t border-slate-100 mt-6">
          পাসওয়ার্ড মনে পড়েছে?{' '}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            লগইন পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}
