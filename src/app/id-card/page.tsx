'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Printer, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Phone, 
  Calendar, 
  Droplet, 
  GraduationCap,
  Award,
  QrCode,
  School,
  CheckCircle2,
  Lock,
  LogIn,
  AlertCircle,
  Clock,
  Send,
  Loader2,
  UploadCloud
} from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/components/Toast';
import ImageUploadInput from '@/components/ImageUploadInput';

export default function IdCardPortal() {
  const toast = useToast();
  const [userSession, setUserSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loadingApp, setLoadingApp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [cardType, setCardType] = useState<'student' | 'teacher'>('student');
  const [existingApplication, setExistingApplication] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    teacherId: '',
    className: '১০ম শ্রেণী (বিজ্ঞান শাখা)',
    roll: '০৫',
    session: '২০২৬',
    bloodGroup: 'B+',
    phone: '',
    emergencyContact: '',
    designation: 'সহকারী শিক্ষক (আইসিটি ও বিজ্ঞান)',
    department: 'বিজ্ঞান বিভাগ',
    photoUrl: ''
  });

  // 1. Check Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cleanEmail = user.email?.toLowerCase().trim() || '';
        try {
          const res = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: user.uid, email: user.email }),
          });
          const data = await res.json();
          if (data.success && data.user) {
            setUserSession(data.user);
            const r = data.user.role === 'teacher' ? 'teacher' : 'student';
            setCardType(r);
            setFormData(prev => ({
              ...prev,
              name: data.user.name || '',
              phone: data.user.phone || '',
              className: data.user.details?.class ? `${data.user.details.class}ম শ্রেণী` : prev.className,
              designation: data.user.details?.subject ? `শিক্ষক (${data.user.details.subject})` : prev.designation,
            }));

            // Fetch existing ID card application for this user
            fetchUserApplication(cleanEmail);
          } else {
            setUserSession({ email: cleanEmail, name: user.displayName || cleanEmail.split('@')[0], role: 'student' });
            fetchUserApplication(cleanEmail);
          }
        } catch (e) {
          setUserSession({ email: cleanEmail, name: cleanEmail.split('@')[0], role: 'student' });
        }
      } else {
        setUserSession(null);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserApplication = async (email: string) => {
    try {
      setLoadingApp(true);
      const res = await fetch(`/api/id-cards?userEmail=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success && data.idCard) {
        setExistingApplication(data.idCard);
        setCardType(data.idCard.cardType);
        setFormData({
          name: data.idCard.name || '',
          studentId: data.idCard.studentId || '',
          teacherId: data.idCard.teacherId || '',
          className: data.idCard.className || '১০ম শ্রেণী (বিজ্ঞান শাখা)',
          roll: data.idCard.roll || '০১',
          session: data.idCard.session || '২০২৬',
          bloodGroup: data.idCard.bloodGroup || 'B+',
          phone: data.idCard.phone || '',
          emergencyContact: data.idCard.emergencyContact || '',
          designation: data.idCard.designation || 'সহকারী শিক্ষক',
          department: data.idCard.department || 'সাধারণ বিভাগ',
          photoUrl: data.idCard.photoUrl || ''
        });
      }
    } catch (e) {
      console.error('Error fetching ID card:', e);
    } finally {
      setLoadingApp(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('পূর্ণ নাম প্রদান করা আবশ্যক');
      return;
    }
    if (!formData.photoUrl) {
      toast.error('আইডি কার্ডের জন্য প্রার্থীর ছবি আপলোড করা আবশ্যক');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/id-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userSession?._id || '',
          userEmail: userSession?.email || '',
          cardType,
          ...formData
        })
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'আইডি কার্ডের আবেদন সফলভাবে জমা হয়েছে!');
        setExistingApplication(data.idCard);
      } else {
        toast.error(data.message || 'আবেদন জমা দিতে সমস্যা হয়েছে');
      }
    } catch (err) {
      toast.error('সার্ভার কানেকশন ত্রুটি!');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    if (existingApplication?.status !== 'approved') {
      toast.warning('আপনার আবেদনটি এখনো অনুমোদিত হয়নি। অ্যাডমিন অনুমোদন করার পর অফিসিয়াল প্রিন্ট কার্যকর হবে।');
      return;
    }
    toast.success('আইডি কার্ড প্রিন্টিং উইন্ডো খোলা হচ্ছে...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // Loading Screen
  if (checkingAuth) {
    return (
      <div className="py-24 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-600">নিরাপত্তা ও অথেন্টিকেশন ভেরিফাই হচ্ছে...</p>
      </div>
    );
  }

  // 2. Unauthenticated Gate
  if (!userSession) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-5">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                সুরক্ষিত প্রাতিষ্ঠানিক সেবা
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                আইডি কার্ড অ্যাক্সেস সীমাবদ্ধ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ডাঃ মুজিব-রুবি মডেল হাই স্কুলের প্রাতিষ্ঠানিক ডিজিটাল আইডি কার্ড তৈরি, ছবি আপলোড এবং ডাউনলোডের জন্য শিক্ষার্থী বা শিক্ষক অ্যাকাউন্টে লগইন থাকা আবশ্যক।
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>অ্যাকাউন্টে লগইন করুন</span>
              </Link>
            </div>

            <p className="text-[11px] text-slate-400">
              একাউন্ট না থাকলে প্রধান কার্যালয় অথবা ক্লাস শিক্ষকের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Portal
  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-10">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-14 px-4 print:hidden">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            অথেনটিকেটেড ডিজিটাল আইডি পোর্টাল (User: {userSession.email})
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">ডিজিটাল আইডি কার্ড আবেদন ও প্রিন্ট</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            আপনার ছবি ও সঠিক তথ্য প্রদান করে প্রাতিষ্ঠানিক ডিজিটাল আইডি কার্ডের আবেদন করুন। অ্যাডমিন অনুমোদনের পর প্রিন্ট ও সংরক্ষণ সক্রিয় হবে।
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Application Status Banner if already submitted */}
        {existingApplication && (
          <div className={`p-5 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden ${
            existingApplication.status === 'approved'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : existingApplication.status === 'rejected'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-3">
              {existingApplication.status === 'approved' ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
              ) : existingApplication.status === 'rejected' ? (
                <AlertCircle className="w-7 h-7 text-rose-600 shrink-0" />
              ) : (
                <Clock className="w-7 h-7 text-amber-600 shrink-0 animate-pulse" />
              )}
              <div>
                <h4 className="font-black text-sm sm:text-base">
                  {existingApplication.status === 'approved' && '✓ অভিনন্দন! আপনার আইডি কার্ডটি অ্যাডমিন কর্তৃক অনুমোদিত হয়েছে।'}
                  {existingApplication.status === 'rejected' && '⚠️ আবেদনে তথ্যের অসঙ্গতি রয়েছে। সংশোধন করে পুনরায় জমা দিন।'}
                  {existingApplication.status === 'pending' && '⏳ আপনার আইডি কার্ড আবেদনটি পর্যালোচনার জন্য জমা হয়েছে (Pending)।'}
                </h4>
                <p className="text-xs opacity-90 mt-0.5">
                  আবেদন আইডি: {existingApplication.studentId || existingApplication.teacherId} | জমা দেওয়ার তারিখ: {new Date(existingApplication.updatedAt).toLocaleDateString('bn-BD')}
                </p>
              </div>
            </div>

            {existingApplication.status === 'approved' && (
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>কার্ড প্রিন্ট / PDF সেভ করুন</span>
              </button>
            )}
          </div>
        )}

        {/* Toggle Bar: Student vs Teacher */}
        <div className="flex items-center justify-center gap-3 print:hidden">
          <button
            onClick={() => setCardType('student')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              cardType === 'student'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            শিক্ষার্থী আইডি কার্ড ফর্ম
          </button>
          <button
            onClick={() => setCardType('teacher')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              cardType === 'teacher'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            শিক্ষক ও স্টাফ আইডি কার্ড ফর্ম
          </button>
        </div>

        {/* Grid: Left Form + Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Submission Form */}
          <form onSubmit={handleSubmitApplication} className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 print:hidden">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {cardType === 'student' ? 'শিক্ষার্থীর প্রাতিষ্ঠানিক তথ্য পূরণ করুন' : 'শিক্ষকের প্রাতিষ্ঠানিক তথ্য পূরণ করুন'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">ছবি আপলোড ও তথ্য সাবমিট করলে সরাসরি অ্যাডমিন অনুমোদন পেন্ডিয়ে যাবে</p>
            </div>

            {/* Direct Image Upload with native file picker & upload API */}
            <div>
              <ImageUploadInput
                label="১. প্রার্থীর পাসপোর্ট সাইজ ছবি আপলোড (আবশ্যক)"
                value={formData.photoUrl}
                onChange={(url) => setFormData({ ...formData, photoUrl: url })}
              />
            </div>

            {cardType === 'student' ? (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিক্ষার্থীর পূর্ণ নাম (বাংলায় বা ইংরেজিতে)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">রোল নম্বর</label>
                    <input
                      type="text"
                      value={formData.roll}
                      onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">শিক্ষাবর্ষ</label>
                    <input
                      type="text"
                      value={formData.session}
                      onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">শ্রেণী ও শাখা</label>
                  <input
                    type="text"
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">রক্তের গ্রুপ</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">অভিভাবকের জরুরি যোগাযোগ নম্বর</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিক্ষকের পূর্ণ নাম</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">পদবী ও বিষয়</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">রক্তের গ্রুপ</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">বিভাগ (Department)</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>অফিসিয়াল আইডি কার্ডের আবেদন জমা দিন</span>
              </button>
            </div>
          </form>

          {/* Right Card: High-Definition Live Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-5">
            
            <div className="text-center print:hidden">
              <span className="text-[11px] font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                কার্ড লাইভ প্রিভিউ (Digital Card Live View)
              </span>
            </div>

            {/* Official High-Resolution ID Card */}
            <div className="w-full max-w-[340px] sm:max-w-[350px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-300 relative print:border-none print:shadow-none">
              
              {/* Top Header */}
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-4 text-center relative">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white text-blue-900 flex items-center justify-center font-black text-sm mb-1.5 shadow-md">
                  DRM
                </div>
                <h3 className="font-black text-xs leading-tight text-white">
                  ডাঃ মুজিব-রুবি মডেল হাই স্কুল
                </h3>
                <p className="text-[10px] text-sky-200 mt-0.5">স্থাপিত: ১৯৯৮ | কোড: ১০৯২৮৩</p>
                <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  {cardType === 'student' ? 'Student Identity Card' : 'Faculty & Staff ID'}
                </div>
              </div>

              {/* Photo & Body */}
              <div className="p-5 space-y-4 text-center bg-gradient-to-b from-white via-slate-50/50 to-white">
                
                {/* Photo Frame */}
                <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-3 border-blue-600 shadow-md bg-slate-100">
                  {formData.photoUrl ? (
                    <img
                      src={formData.photoUrl}
                      alt="Student Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                      <User className="w-10 h-10 mb-1 text-slate-300" />
                      <span className="text-[9px] font-bold">ছবি আপলোড করুন</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold py-0.5">
                    রক্ত: {formData.bloodGroup}
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    {formData.name || 'শিক্ষার্থীর নাম'}
                  </h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    {cardType === 'student' ? (formData.className || 'শ্রেণী ও শাখা') : (formData.designation || 'পদবী')}
                  </p>
                </div>

                {/* Details Table */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-left text-xs space-y-1.5 font-medium">
                  {cardType === 'student' ? (
                    <>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">স্টুডেন্ট আইডি:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {existingApplication?.studentId || formData.studentId || 'DRM-2026-1042'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">রোল নম্বর:</span>
                        <span className="font-bold text-slate-900">{formData.roll || '০১'}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">শিক্ষাবর্ষ:</span>
                        <span className="font-bold text-slate-900">{formData.session || '২০২৬'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">জরুরি যোগাযোগ:</span>
                        <span className="font-bold text-blue-700">{formData.emergencyContact || formData.phone || 'অফিস'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">টিচার আইডি:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {existingApplication?.teacherId || formData.teacherId || 'TCH-2026-08'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">বিভাগ:</span>
                        <span className="font-bold text-slate-900">{formData.department || 'বিজ্ঞান'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">মোবাইল:</span>
                        <span className="font-bold text-blue-700">{formData.phone || 'অফিস'}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* QR Code & Signatures */}
                <div className="pt-2 flex items-center justify-between px-2 border-t border-slate-200">
                  <div className="text-left space-y-1">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg p-1 text-white flex items-center justify-center">
                      <QrCode className="w-full h-full" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-700 font-bold">
                      {existingApplication?.status === 'approved' ? '✓ VERIFIED' : 'PENDING'}
                    </span>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-serif italic font-bold text-blue-900 text-sm border-b border-slate-400 pb-0.5">
                      K. M. Rahman
                    </div>
                    <p className="text-[9px] font-bold text-slate-600">প্রধান শিক্ষক</p>
                  </div>
                </div>

              </div>

              {/* Bottom Strip */}
              <div className="bg-slate-900 py-1.5 text-center text-[9px] text-slate-400">
                www.drmujibrubi.edu.bd | কার্ডটি হারানো গেলে দ্রুত অফিসে যোগাযোগ করুন
              </div>

            </div>

            {/* Print Trigger */}
            <div className="w-full max-w-[350px] print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                disabled={existingApplication?.status !== 'approved'}
                className={`w-full py-3 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 ${
                  existingApplication?.status === 'approved'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>
                  {existingApplication?.status === 'approved' 
                    ? 'অনুমোদিত আইডি কার্ড প্রিন্ট / PDF সংরক্ষণ' 
                    : 'অ্যাডমিন অনুমোদনের পর প্রিন্ট সক্রিয় হবে'}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
