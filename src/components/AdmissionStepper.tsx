'use client';

import React from 'react';
import { 
  FileEdit, 
  CreditCard, 
  FileText, 
  UserCheck, 
  CheckCircle, 
  GraduationCap 
} from 'lucide-react';

export default function AdmissionStepper() {
  const steps = [
    { step: 'ধাপ ১', title: 'অনলাইনে আবেদন', icon: FileEdit },
    { step: 'ধাপ ২', title: 'ফার্ম পেমেন্ট', icon: CreditCard },
    { step: 'ধাপ ৩', title: 'ভর্তি পরীক্ষা', icon: FileText },
    { step: 'ধাপ ৪', title: 'সাক্ষাৎকার', icon: UserCheck },
    { step: 'ধাপ ৫', title: 'ভর্তি নিশ্চিতকরণ', icon: CheckCircle },
    { step: 'ধাপ ৬', title: 'ক্লাসে যোগ', icon: GraduationCap }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            ভর্তি প্রক্রিয়া
          </h2>
        </div>

        {/* 6 Stepper Cards Horizontal Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-3 relative group hover:border-blue-300 hover:shadow-md transition flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100 group-hover:bg-blue-700 group-hover:text-white transition duration-200">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-blue-700 uppercase tracking-wide block">
                    {item.step}
                  </span>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
