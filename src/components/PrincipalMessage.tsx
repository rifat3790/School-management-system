'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PrincipalMessageProps {
  settings?: any;
}

export default function PrincipalMessage({ settings }: PrincipalMessageProps) {
  const principalName = settings?.principalName || 'প্রফেসর মোহাম্মদ আব্দুর রশীদ';
  const principalTitle = settings?.principalTitle || 'প্রধান শিক্ষক';
  const principalMessage = settings?.principalMessage || 'আমাদের ডাঃ মুজিব-রুবি মডেল হাই স্কুলের ওয়েবসাইটে স্বাগতম। আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং নৈতিকতা, মানবিক মূল্যবোধ, প্রযুক্তির দক্ষতা এবং নেতৃত্বের গুণাবলী বিকাশের মাধ্যমে একজন আদর্শ নাগরিক গড়ে তোলা। আপনাদের আন্তরিক সহযোগিতা ও স্নেহ আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা।';
  const principalImage = settings?.principalImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';
  const aboutHistory = settings?.aboutHistory || 'প্রতিষ্ঠালগ্ন থেকেই আমাদের বিদ্যালয় মানবতা শিক্ষা, সুস্থতা, নৈতিকতা এবং প্রযুক্তিনির্ভর শিক্ষার মাধ্যমে শিক্ষার্থীদের একটি সুন্দর ভবিষ্যৎ গড়ে তুলতে কাজ করে যাচ্ছে।';

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Card: অধ্যক্ষের শুভেচ্ছা */}
          <div className="bg-slate-50/90 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] border-b border-slate-200 pb-3">
                অধ্যক্ষের শুভেচ্ছা
              </h2>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img 
                  src={principalImage} 
                  alt={principalName}
                  className="w-32 h-40 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                />
                
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900">
                    প্রিয় শিক্ষার্থী, অভিভাবক ও শুভানুধ্যায়ীগণ,
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{principalMessage}"
                  </p>
                  <p className="text-xs font-black text-slate-800">
                    — {principalName} ({principalTitle})
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
              >
                <span>আরও পড়ুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Card: আমাদের সম্পর্কে */}
          <div className="bg-slate-50/90 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] border-b border-slate-200 pb-3">
                আমাদের সম্পর্কে
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {aboutHistory}
              </p>

              {/* 4 Checklist Items */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>মানসম্মত শিক্ষা</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>নৈতিক চরিত্র গঠন</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>প্রযুক্তি দক্ষতা</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>নেতৃত্ব বিকাশ</span>
                </div>
              </div>
            </div>

            {/* Campus Preview Photo */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-36 bg-slate-100">
              <img 
                src={settings?.heroImage?.split(/[\n,]+/)?.[0]?.trim() || principalImage} 
                alt="ডাঃ মুজিব-রুবি মডেল হাই স্কুল ক্যাম্পাস"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
