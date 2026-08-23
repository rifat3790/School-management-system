'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserCheck, 
  Upload, 
  CreditCard, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import ImageUploadInput from '@/components/ImageUploadInput';

export default function AdmissionPage() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    birthReg: '',
    gender: 'ছেলে',
    desiredClass: '৬ষ্ঠ শ্রেণী',
    prevSchool: '',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    photoUrl: '',
    birthCertUrl: '',
    paymentMethod: 'bKash',
    trxId: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.studentName || !formData.dob)) {
      toast.warning('অনুগ্রহ করে শিক্ষার্থীর নাম ও জন্মতারিখ প্রদান করুন।');
      return;
    }
    if (step === 2 && (!formData.fatherName || !formData.guardianPhone)) {
      toast.warning('অনুগ্রহ করে অভিভাবকের নাম ও ফোন নম্বর প্রদান করুন।');
      return;
    }
    setStep(step + 1);
  };

  const [payLater, setPayLater] = useState(false);
  const paymentNumber = '01952321390';

  const copyPaymentNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    toast.success(`মার্চেন্ট নম্বর ${paymentNumber} ক্লিপবোর্ডে কপি করা হয়েছে!`);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const appNo = `ADM-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplicationId(appNo);

    try {
      await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: formData.studentName,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          phone: formData.guardianPhone,
          classApply: formData.desiredClass,
          birthCertNo: formData.birthReg || '',
          address: formData.address || '',
          photoUrl: formData.photoUrl || '',
          birthCertUrl: formData.birthCertUrl || '',
          paymentStatus: payLater ? 'pay_later' : 'paid',
          paymentTxId: payLater ? 'PAY_LATER' : (formData.trxId || 'TXN-BKASH'),
          status: 'pending'
        })
      });
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="py-12 space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ২০২৬ শিক্ষাবর্ষের অনলাইন ভর্তি
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">ডিজিটাল ভর্তি আবেদন পোর্টাল</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            সহজ ৫টি ধাপে অনলাইনে আপনার সন্তানের ভর্তি ফর্ম পূরণ ও ফি প্রদান করে আবেদন সম্পন্ন করুন।
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 lg:px-8">
        {!submitted ? (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            
            {/* Step Wizard Progress Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-6 text-xs sm:text-sm font-bold">
              {[
                { num: 1, title: 'শিক্ষার্থীর তথ্য' },
                { num: 2, title: 'অভিভাবকের তথ্য' },
                { num: 3, title: 'ডকুমেন্ট আপলোড' },
                { num: 4, title: 'ফি প্রদান ও জমা' },
              ].map((st) => (
                <div
                  key={st.num}
                  className={`flex items-center gap-2 ${
                    step >= st.num ? 'text-primary' : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans ${
                      step >= st.num
                        ? 'bg-primary text-white font-bold'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {st.num}
                  </span>
                  <span className="hidden sm:inline">{st.title}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-6">
              
              {/* STEP 1: Student Info */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-primary" />
                    শিক্ষার্থীর ব্যক্তিগত তথ্য
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => handleChange('studentName', e.target.value)}
                        placeholder="যেমন: তানজিম আহমেদ"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">জন্ম তারিখ *</label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">জন্ম নিবন্ধন নম্বর (১৭ ডিজিট)</label>
                      <input
                        type="text"
                        value={formData.birthReg}
                        onChange={(e) => handleChange('birthReg', e.target.value)}
                        placeholder="যেমন: 20121234567890123"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">আবেদনকৃত শ্রেণী *</label>
                      <select
                        value={formData.desiredClass}
                        onChange={(e) => handleChange('desiredClass', e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      >
                        <option value="৬ষ্ঠ শ্রেণী">৬ষ্ঠ শ্রেণী</option>
                        <option value="৭ম শ্রেণী">৭ম শ্রেণী</option>
                        <option value="৮ম শ্রেণী">৮ম শ্রেণী</option>
                        <option value="৯ম শ্রেণী">৯ম শ্রেণী (বিজ্ঞান)</option>
                        <option value="১০ম শ্রেণী">১০ম শ্রেণী (বিজ্ঞান)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">পূর্ববর্তী স্কুলের নাম</label>
                      <input
                        type="text"
                        value={formData.prevSchool}
                        onChange={(e) => handleChange('prevSchool', e.target.value)}
                        placeholder="যেমন: মডেল প্রাইমারি স্কুল"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Guardian Info */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-secondary" />
                    অভিভাবকের তথ্য
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">পিতার নাম *</label>
                      <input
                        type="text"
                        required
                        value={formData.fatherName}
                        onChange={(e) => handleChange('fatherName', e.target.value)}
                        placeholder="যেমন: মোঃ জহিরুল ইসলাম"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">মাতার নাম *</label>
                      <input
                        type="text"
                        required
                        value={formData.motherName}
                        onChange={(e) => handleChange('motherName', e.target.value)}
                        placeholder="যেমন: নাসরিন সুলতানা"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">অভিভাবকের মোবাইল নম্বর *</label>
                      <input
                        type="tel"
                        required
                        value={formData.guardianPhone}
                        onChange={(e) => handleChange('guardianPhone', e.target.value)}
                        placeholder="যেমন: 01712345678"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">অভিভাবকের ইমেইল</label>
                      <input
                        type="email"
                        value={formData.guardianEmail}
                        onChange={(e) => handleChange('guardianEmail', e.target.value)}
                        placeholder="guardian@example.com"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">বর্তমান ঠিকানা</label>
                      <textarea
                        rows={2}
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Documents Upload */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-500" />
                    প্রয়োজনীয় ডকুমেন্টস আপলোড
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <ImageUploadInput
                      label="শিক্ষার্থীর পাসপোর্ট সাইজ ছবি আপলোড (300x300 px - সর্বোচ্চ ১০MB)"
                      value={formData.photoUrl}
                      onChange={(url) => handleChange('photoUrl', url)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Payment */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    ভর্তি আবেদন ফি পরিশোধ (৫০০ টাকা)
                  </h3>

                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-extrabold text-sm">অফিশিয়াল পেমেন্ট মার্চেন্ট নম্বর: <span className="font-mono text-base text-blue-700">01952321390</span></p>
                      <button
                        type="button"
                        onClick={copyPaymentNumber}
                        className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px] hover:bg-emerald-700 transition"
                      >
                        কপি করুন
                      </button>
                    </div>
                    <p className="text-[11px] text-emerald-800">আবেদন ফি: ৫০০.০০ টাকা (bKash / Nagad Personal/Merchant এর মাধ্যমে সেন্ড মানি করুন)।</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="payLaterCheck"
                        checked={payLater}
                        onChange={(e) => setPayLater(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label htmlFor="payLaterCheck" className="font-bold text-xs text-slate-800 cursor-pointer">
                        পরে ফি পরিশোধ করব (Pay Later Option)
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-6">টিক দিলে আপনি এখন বিনামূল্যে আবেদন জমা দিতে পারবেন এবং পরে প্রতিষ্ঠানে জমা দিতে পারবেন।</p>
                  </div>

                  {!payLater && (
                    <>
                      <div className="grid grid-cols-3 gap-3">
                        {['bKash', 'Nagad', 'Rocket'].map((pm) => (
                          <button
                            type="button"
                            key={pm}
                            onClick={() => handleChange('paymentMethod', pm)}
                            className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                              formData.paymentMethod === pm
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {pm}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">
                          {formData.paymentMethod} ট্রানজেকশন আইডি (TrxID) *
                        </label>
                        <input
                          type="text"
                          required={!payLater}
                          value={formData.trxId}
                          onChange={(e) => handleChange('trxId', e.target.value)}
                          placeholder="যেমন: BK90823471"
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none text-xs sm:text-sm font-mono"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Wizard Nav Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    পূর্ববর্তী ধাপ
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1 px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-700 shadow-md"
                  >
                    পরবর্তী ধাপ
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-8 py-3 rounded-xl text-sm font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-xl hover:scale-105 transition-transform"
                  >
                    আবেদন সম্পূর্ণ করুন
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                )}
              </div>

            </form>

          </div>
        ) : (
          /* Submission Success Application Form Card */
          <div className="glass-card rounded-3xl p-8 border border-emerald-300 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300" id="printable-marksheet">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-heading">আবেদন সফলভাবে গৃহীত হয়েছে!</h2>
              <p className="text-xs text-paragraph">ডাঃ মুজিব-রুবি মডেল হাই স্কুল — ২০২৬ শিক্ষাবর্ষ</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">আবেদন আইডি (Application ID):</span>
                <span className="font-extrabold text-primary font-mono text-base">{applicationId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
                <span className="font-bold text-slate-800">{formData.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">আবেদনকৃত শ্রেণী:</span>
                <span className="font-bold text-slate-800">{formData.desiredClass}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">অভিভাবকের মোবাইল:</span>
                <span className="font-bold text-slate-800">{formData.guardianPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">পেমেন্ট স্ট্যাটাস:</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  পরিশোধিত (TrxID: {formData.trxId || 'BK90823471'})
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-primary-700 text-xs sm:text-sm"
              >
                <Printer className="w-4 h-4" />
                আবেদন পত্র প্রিন্ট করুন
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm"
              >
                নতুন আবেদন করুন
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
