'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  GraduationCap, 
  UserCheck, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    requestedRole: 'student',
    studentId: '',
    className: '10',
    section: 'A',
    subject: '',
    designation: '',
    childStudentId: ''
  });

  // Auto redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: user.uid, email: user.email }),
          });
          const data = await res.json();
          if (data.success && data.user && data.user.status === 'approved') {
            const role = data.user.role;
            if (role === 'superadmin' || role === 'admin') router.push('/dashboard/admin');
            else if (role === 'teacher') router.push('/dashboard/teacher');
            else if (role === 'parent') router.push('/dashboard/parent');
            else router.push('/dashboard/student');
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const queryEmail = searchParams.get('email');
    const queryName = searchParams.get('name');
    if (queryEmail || queryName) {
      setFormData(prev => ({
        ...prev,
        email: queryEmail || prev.email,
        name: queryName || prev.name
      }));
    }
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    setLoading(true);

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const firebaseUser = userCredential.user;

      // Update Firebase Display Name
      await updateProfile(firebaseUser, {
        displayName: formData.name,
      });

      // 2. Save Pending User Request to MongoDB via API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          requestedRole: formData.requestedRole,
          details: {
            studentId: formData.studentId,
            class: formData.className,
            section: formData.section,
            subject: formData.subject,
            designation: formData.designation,
            childStudentId: formData.childStudentId
          }
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'নিবন্ধন করতে সমস্যা হয়েছে');
      }

      setSuccessMessage(data.message || 'রেজিস্ট্রেশন সফল হয়েছে! সুপার এডমিনের এপ্রুভালের পর আপনি লগইন করতে পারবেন।');
      
      // Clear passwords
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">একাউন্ট রেজিস্ট্রেশন করুন</h2>
          <p className="mt-2 text-sm text-slate-600">
            ডাঃ মুজিব-রুবি মডেল হাই স্কুল ডিজিটাল পোর্টাল
          </p>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-base text-emerald-900">
              <Clock className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>আবেদন জমা হয়েছে! (Pending Approval)</span>
            </div>
            <p className="text-emerald-700 leading-relaxed">{successMessage}</p>
            <Link 
              href="/login"
              className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition"
            >
              লগইন পেজে যান <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!successMessage && (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                আপনি কোন অ্যাকাউন্ট তৈরি করতে চান?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'student', label: 'শিক্ষার্থী', icon: GraduationCap },
                  { id: 'teacher', label: 'শিক্ষক', icon: UserCheck },
                  { id: 'parent', label: 'অভিভাবক', icon: User }
                ].map((role) => {
                  const Icon = role.icon;
                  const selected = formData.requestedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, requestedRole: role.id })}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition ${
                        selected 
                          ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-bold shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">পূর্ণ নাম</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">মোবাইল নম্বর</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01700000000"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Role Dynamic Fields */}
            {formData.requestedRole === 'student' && (
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">শ্রেণী</label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="6">ষষ্ঠ (Class 6)</option>
                    <option value="7">সপ্তম (Class 7)</option>
                    <option value="8">অষ্টম (Class 8)</option>
                    <option value="9">নবম (Class 9)</option>
                    <option value="10">দশম (Class 10)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">শাখা / সেকশন</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="A">ক শাখা (Sec A)</option>
                    <option value="B">খ শাখা (Sec B)</option>
                  </select>
                </div>
              </div>
            )}

            {formData.requestedRole === 'teacher' && (
              <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">বিষয়</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="যেমন: গণিত"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">পদবী</label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="যেমন: সহকারী শিক্ষক"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}

            {formData.requestedRole === 'parent' && (
              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1">সন্তানের স্টুডেন্ট আইডি / রোল</label>
                <input
                  type="text"
                  name="childStudentId"
                  placeholder="যেমন: 2024101"
                  value={formData.childStudentId}
                  onChange={handleChange}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                />
              </div>
            )}

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">কনফার্ম পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'প্রসেসিং হচ্ছে...' : (
                <>
                  একাউন্টের জন্য আবেদন জমা দিন <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Bottom Link */}
            <div className="text-center pt-3 text-sm text-slate-600">
              ইতিমধ্যেই একাউন্ট আছে?{' '}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                লগইন করুন
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-bold text-sm">লোড হচ্ছে...</div>
      </div>
    }>
      <RegisterFormContent />
    </Suspense>
  );
}
