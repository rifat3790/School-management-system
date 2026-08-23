'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  CreditCard, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Bus, 
  Laptop, 
  FlaskConical, 
  Trophy, 
  Receipt,
  Download,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/Toast';

const CLASS_BASE_FEES: Record<string, { name: string; admission: number; monthly: number; exam: number }> = {
  '6': { name: '৬ষ্ঠ শ্রেণী', admission: 2500, monthly: 600, exam: 800 },
  '7': { name: '৭ম শ্রেণী', admission: 2500, monthly: 650, exam: 800 },
  '8': { name: '৮ম শ্রেণী', admission: 3000, monthly: 700, exam: 1000 },
  '9': { name: '৯ম শ্রেণী (বিজ্ঞান/মানবিক/ব্যবসায়)', admission: 3500, monthly: 850, exam: 1200 },
  '10': { name: '১০ম শ্রেণী (এসএসসি ব্যাচ)', admission: 3500, monthly: 900, exam: 1500 },
};

export default function FeeCalculatorPage() {
  const toast = useToast();
  
  // Calculator State
  const [selectedClass, setSelectedClass] = useState<string>('9');
  const [waiverType, setWaiverType] = useState<string>('none'); // 'none' | 'gpa5' | 'sibling' | 'poor'
  const [transportZone, setTransportZone] = useState<number>(0); // 0, 800, 1200, 1500
  const [includeIctLab, setIncludeIctLab] = useState<boolean>(true);
  const [includeScienceLab, setIncludeScienceLab] = useState<boolean>(true);
  const [includeSportsClub, setIncludeSportsClub] = useState<boolean>(false);

  const base = CLASS_BASE_FEES[selectedClass];

  // Calculate Waiver Percentage
  let waiverPercent = 0;
  if (waiverType === 'gpa5') waiverPercent = 50; // 50% waiver on monthly tuition
  else if (waiverType === 'sibling') waiverPercent = 25; // 25% waiver
  else if (waiverType === 'poor') waiverPercent = 75; // 75% waiver

  const adjustedMonthlyTuition = Math.round(base.monthly * (1 - waiverPercent / 100));
  
  const additionalMonthly = 
    transportZone + 
    (includeIctLab ? 200 : 0) + 
    (includeScienceLab ? 300 : 0) + 
    (includeSportsClub ? 100 : 0);

  const totalMonthlyPayable = adjustedMonthlyTuition + additionalMonthly;
  const annualTotalEstimate = base.admission + (totalMonthlyPayable * 12) + (base.exam * 2);

  const handlePrintReceipt = () => {
    toast.success('ফি ভাউচার প্রিন্ট করা হচ্ছে...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-14 px-4 print:hidden">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Calculator className="w-3.5 h-3.5" />
            স্বচ্ছ ও আধুনিক ফি হিসাব
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">টিউশন ফি ও খরচ ক্যালকুলেটর</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            শ্রেণী, বিষয় ও অতিরিক্ত সুবিধাসমূহ নির্বাচন করে শিক্ষাবর্ষের সঠিক মাসিক ও বার্ষিক ফি তাৎক্ষণিক হিসাব করুন।
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Fee Calculator Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                ধাপ ১: শ্রেণী ও স্কলারশিপ নির্বাচন করুন
              </h3>
            </div>

            {/* Class Selector Buttons */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">শিক্ষার্থীর শ্রেণী:</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {Object.keys(CLASS_BASE_FEES).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border text-center ${
                      selectedClass === cls
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {CLASS_BASE_FEES[cls].name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scholarship / Waiver Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">বৃত্তি বা বিশেষ ছাড় (Waiver):</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'none', label: 'সাধারণ শিক্ষার্থী (কোনো ছাড় নেই)', desc: 'স্বাভাবিক ফি প্রযোজ্য' },
                  { id: 'gpa5', label: 'জিপিএ ৫.০০ মেধাবৃত্তি (৫০% ছাড়)', desc: 'মাসিক বেতনে ৫০% ওয়েভার' },
                  { id: 'sibling', label: 'সহোদর ভাই/বোন ছাড় (২৫% ছাড়)', desc: 'একই স্কুলের ২য় শিক্ষার্থী' },
                  { id: 'poor', label: 'দরিদ্র ও এতিম তহবিল (৭৫% ছাড়)', desc: 'বিশেষ ফান্ড সহায়তা' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setWaiverType(item.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                      waiverType === item.id
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-900">{item.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-slate-100 pb-3 pt-2">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Bus className="w-5 h-5 text-indigo-600" />
                ধাপ ২: পরিবহন ও অতিরিক্ত সুবিধা (ঐচ্ছিক)
              </h3>
            </div>

            {/* Transport Option */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">স্কুল বাস পরিবহন সুবিধা:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'প্রয়োজন নেই', cost: 0 },
                  { label: 'জোন ১ (১-৩ কিমি)', cost: 800 },
                  { label: 'জোন ২ (৩-৬ কিমি)', cost: 1200 },
                  { label: 'জোন ৩ (৬+ কিমি)', cost: 1500 },
                ].map((zone, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTransportZone(zone.cost)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition text-center ${
                      transportZone === zone.cost
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <p>{zone.label}</p>
                    <p className={`text-[10px] mt-0.5 ${transportZone === zone.cost ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {zone.cost > 0 ? `৳${zone.cost}/মাস` : '৳০'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Facilities */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 block">অন্যান্য বিশেষ ল্যাব ও ক্লাব:</label>
              
              <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition">
                <div className="flex items-center gap-3">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">স্মার্ট কম্পিউটার ও আইসিটি ল্যাব ফি</p>
                    <p className="text-[10px] text-slate-500">হাতে-কলমে কোডিং ও প্র্যাক্টিক্যাল ক্লাস</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">৳২০০/মাস</span>
                  <input
                    type="checkbox"
                    checked={includeIctLab}
                    onChange={(e) => setIncludeIctLab(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition">
                <div className="flex items-center gap-3">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">বিজ্ঞানাগার ও রসায়ন/পদার্থ ল্যাব ফি</p>
                    <p className="text-[10px] text-slate-500">৯ম ও ১০ম শ্রেণীর বিশেষ প্র্যাক্টিক্যাল</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">৳৩০০/মাস</span>
                  <input
                    type="checkbox"
                    checked={includeScienceLab}
                    onChange={(e) => setIncludeScienceLab(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">স্পোর্টস, ডিবেট ও রোবোটিক্স ক্লাব</p>
                    <p className="text-[10px] text-slate-500">বিশেষ সহশিক্ষা কার্যক্রম</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">৳১০০/মাস</span>
                  <input
                    type="checkbox"
                    checked={includeSportsClub}
                    onChange={(e) => setIncludeSportsClub(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </label>
            </div>

          </div>

          {/* Right Receipt & Total Estimate (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Printable Official Fee Voucher */}
            <div className="bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden p-6 sm:p-7 space-y-5">
              
              {/* Receipt Header */}
              <div className="text-center border-b border-dashed border-slate-300 pb-4 space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full">
                  OFFICIAL FEE ESTIMATE
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  ডাঃ মুজিব-রুবি মডেল হাই স্কুল
                </h3>
                <p className="text-xs text-slate-500">শিক্ষাবর্ষ: ২০২৬ | {base.name}</p>
              </div>

              {/* Monthly Breakdown List */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>মূল মাসিক বেতন ({base.name}):</span>
                  <span className="font-bold text-slate-900">৳{base.monthly}</span>
                </div>

                {waiverPercent > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl">
                    <span>বিশেষ ওয়েভার ({waiverPercent}% ছাড়):</span>
                    <span>- ৳{base.monthly - adjustedMonthlyTuition}</span>
                  </div>
                )}

                {transportZone > 0 && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span>স্কুল বাস পরিবহন ফি:</span>
                    <span className="font-bold text-slate-900">৳{transportZone}</span>
                  </div>
                )}

                {includeIctLab && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span>কম্পিউটার ও আইসিটি ল্যাব:</span>
                    <span className="font-bold text-slate-900">৳২০০</span>
                  </div>
                )}

                {includeScienceLab && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span>সায়েন্স প্র্যাক্টিক্যাল ল্যাব:</span>
                    <span className="font-bold text-slate-900">৳৩০০</span>
                  </div>
                )}

                {includeSportsClub && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span>স্পোর্টস ও সহশিক্ষা ক্লাব:</span>
                    <span className="font-bold text-slate-900">৳১০০</span>
                  </div>
                )}

                {/* Monthly Subtotal */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-black text-blue-900">
                  <span>প্রতি মাসের মোট প্রদেয়:</span>
                  <span>৳{totalMonthlyPayable.toLocaleString()}</span>
                </div>
              </div>

              {/* One-time & Exam Fees */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-medium">
                <div className="flex justify-between text-slate-600">
                  <span>ভর্তি / বার্ষিক সেশন ফি (এককালীন):</span>
                  <span className="font-bold text-slate-900">৳{base.admission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>পরীক্ষার ফি (বছরে ২টি সেমিস্টার):</span>
                  <span className="font-bold text-slate-900">৳{(base.exam * 2).toLocaleString()}</span>
                </div>
              </div>

              {/* Annual Grand Total Box */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-5 rounded-2xl shadow-md text-center space-y-1">
                <p className="text-xs text-sky-200 font-bold">সম্পূর্ণ শিক্ষাবর্ষের সর্বমোট সম্ভাব্য খরচ</p>
                <p className="text-2xl sm:text-3xl font-black text-amber-300">
                  ৳{annualTotalEstimate.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400">১২ মাসের বেতন + ভর্তি ফি + পরীক্ষার ফি অন্তর্ভুক্ত</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 print:hidden">
                <button
                  onClick={handlePrintReceipt}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>ফি রশিদ প্রিন্ট / সেভ করুন</span>
                </button>

                <Link
                  href="/admission"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>অনলাইনে সরাসরি ভর্তি আবেদন করুন</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
