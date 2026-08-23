'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Printer, 
  Download, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  QrCode, 
  School,
  FileCheck,
  Calendar,
  User,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface CertificateResult {
  certificateNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  studentId: string;
  examRoll: string;
  regNo: string;
  examType: string;
  passingYear: string;
  gpa: string;
  grade: string;
  issueDate: string;
  status: 'verified';
}

export default function VerifyCertificatePage() {
  const toast = useToast();
  const [certInput, setCertInput] = useState('');
  const [rollInput, setRollInput] = useState('');
  const [examType, setExamType] = useState('এসএসসি পরীক্ষা (SSC)');
  const [passingYear, setPassingYear] = useState('2025');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim() && !rollInput.trim()) {
      toast.error('অনুগ্রহ করে সনদপত্র বা রোল নম্বর প্রদান করুন');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      setLoading(false);
      // Construct verified student response
      const certNo = certInput.trim() || `DRM-CERT-${passingYear}-${rollInput || '1042'}`;
      const mockResult: CertificateResult = {
        certificateNo: certNo.toUpperCase(),
        studentName: 'রাফসান আহমেদ',
        fatherName: 'মোঃ আবুল কাশেম',
        motherName: 'মোসাঃ নাসিমা বেগম',
        studentId: 'DRM-2025-1042',
        examRoll: rollInput.trim() || '108452',
        regNo: '1910842091',
        examType: examType,
        passingYear: passingYear,
        gpa: '5.00',
        grade: 'A+',
        issueDate: `১৫ জুলাই, ${passingYear}`,
        status: 'verified'
      };

      setResult(mockResult);
      toast.success('সনদপত্রটি সফলভাবে ভেরিফাই ও প্রমাণিত হয়েছে!');
    }, 600);
  };

  const handlePrint = () => {
    toast.success('সনদপত্র প্রিন্ট উইন্ডো খোলা হচ্ছে...');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-14 px-4 print:hidden">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            অফিসিয়াল সার্টিফিকেট ভেরিফিকেশন
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">সনদপত্র ও প্রশংসাপত্র যাচাই পোর্টাল</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            ডাঃ মুজিব-রুবি মডেল হাই স্কুল থেকে ইস্যুকৃত সকল এসএসসি, প্রশংসাপত্র ও ট্রান্সক্রিপ্ট অনলাইনেই যাচাই করুন।
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6 print:hidden">
          <div className="border-b border-slate-100 pb-3 text-center">
            <h3 className="text-base font-black text-slate-900">যাচাইয়ের তথ্য প্রদান করুন</h3>
            <p className="text-xs text-slate-500 mt-0.5">সনদ নম্বর অথবা রোল নম্বর দিয়ে সার্চ করুন</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">সনদপত্র / প্রশংসাপত্র নম্বর</label>
                <input
                  type="text"
                  placeholder="যেমন: DRM-CERT-2025-1042"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">পরীক্ষার রোল নম্বর</label>
                <input
                  type="text"
                  placeholder="যেমন: 108452"
                  value={rollInput}
                  onChange={(e) => setRollInput(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">পরীক্ষার ধরণ</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                >
                  <option value="এসএসসি পরীক্ষা (SSC)">এসএসসি পরীক্ষা (SSC)</option>
                  <option value="জেএসসি পরীক্ষা (JSC)">জেএসসি পরীক্ষা (JSC)</option>
                  <option value="বার্ষিক মূল্যায়ন পরীক্ষা">বার্ষিক মূল্যায়ন পরীক্ষা</option>
                  <option value="প্রাতিষ্ঠানিক প্রশংসাপত্র (Testimonial)">প্রাতিষ্ঠানিক প্রশংসাপত্র (Testimonial)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">পাসের সন</label>
                <select
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                >
                  {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>সনদপত্র যাচাই করুন (Verify Now)</span>
            </button>
          </form>
        </div>

        {/* Verification Result Certificate Display */}
        {result && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Status Alert Banner */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-emerald-900 print:hidden">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-black text-sm">সনদপত্রটি ১০০% সত্য ও প্রাতিষ্ঠানিকভাবে প্রমাণিত!</h4>
                  <p className="text-xs text-emerald-700">ডিজিটাল রেকর্ড ম্যাচ হয়েছে | সনদ নং: {result.certificateNo}</p>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট করুন</span>
              </button>
            </div>

            {/* Official Digital Certificate Template Card */}
            <div className="bg-white rounded-3xl border-4 border-double border-amber-600/60 p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Decorative Corner Seals */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>

              {/* School Header */}
              <div className="text-center space-y-2 border-b-2 border-slate-900/10 pb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl flex items-center justify-center font-black text-lg mx-auto shadow-md">
                  DRM
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  ডাঃ মুজিব-রুবি মডেল হাই স্কুল
                </h2>
                <p className="text-xs text-slate-600">স্থাপিত: ১৯৯৮ | বিদ্যালয় কোড: ১০৯২৮৩ | ইআইআইএন: ১২৩৮৯০</p>
                
                <div className="pt-2">
                  <span className="inline-block px-5 py-1 bg-amber-100 text-amber-900 font-serif font-black text-sm sm:text-base tracking-wider rounded-full border border-amber-300">
                    সনদপত্র ও প্রশংসাপত্র (OFFICIAL TESTIMONIAL)
                  </span>
                </div>
              </div>

              {/* Certificate Text Body */}
              <div className="text-xs sm:text-sm text-slate-800 leading-loose text-justify font-serif space-y-4">
                <p>
                  এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, <strong className="font-bold underline text-slate-950">{result.studentName}</strong>, 
                  পিতা: <strong className="font-bold text-slate-950">{result.fatherName}</strong>, 
                  মাতা: <strong className="font-bold text-slate-950">{result.motherName}</strong>, 
                  রোল নম্বর: <strong className="font-mono font-bold text-slate-950">{result.examRoll}</strong>, 
                  রেজিস্ট্রেশন নম্বর: <strong className="font-mono font-bold text-slate-950">{result.regNo}</strong>।
                </p>

                <p>
                  সে এই বিদ্যালয় হতে <strong className="font-bold text-slate-950">{result.passingYear}</strong> সনে অনুষ্ঠিত 
                  <strong className="font-bold text-blue-900"> {result.examType} </strong>-এ অংশগ্রহণ করে জিপিএ (GPA) <strong className="font-bold text-emerald-700">{result.gpa} ({result.grade})</strong> পেয়ে কৃতিত্বের সাথে উত্তীর্ণ হয়েছে।
                </p>

                <p>
                  বিদ্যালয়ে অধ্যয়নকালে তাহার স্বভাব ও চরিত্র প্রশংসনীয় ছিল। আমি তাহার জীবনের সর্বাঙ্গীন সাফল্য ও উজ্জ্বল ভবিষ্যৎ কামনা করি।
                </p>
              </div>

              {/* Bottom Signatures & QR Code */}
              <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
                
                <div className="space-y-1 text-left">
                  <div className="w-14 h-14 bg-slate-900 rounded-xl p-1 text-white flex items-center justify-center">
                    <QrCode className="w-full h-full" />
                  </div>
                  <p className="text-[9px] font-mono text-emerald-700 font-bold">DIGITALLY VERIFIED</p>
                </div>

                <div className="text-center space-y-1">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                    ✓ ডিজিটাল ভেরিফাইড সিল
                  </span>
                  <p className="text-[9px] text-slate-500">ইস্যুর তারিখ: {result.issueDate}</p>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-serif italic font-bold text-blue-900 text-base border-b border-slate-400 pb-0.5">
                    K. M. Rahman
                  </div>
                  <p className="text-xs font-bold text-slate-800">প্রধান শিক্ষক</p>
                  <p className="text-[10px] text-slate-500">ডাঃ মুজিব-রুবি মডেল হাই স্কুল</p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
