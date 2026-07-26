'use client';

import React from 'react';
import { 
  UserCheck, 
  Monitor, 
  Cpu, 
  BookOpen, 
  Trophy, 
  ShieldCheck, 
  FileText, 
  GraduationCap 
} from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    { title: 'অভিজ্ঞ শিক্ষক মণ্ডলী', icon: UserCheck },
    { title: 'স্মার্ট ক্লাসরুম', icon: Monitor },
    { title: 'বিজ্ঞান ও কম্পিউটার ল্যাব', icon: Cpu },
    { title: 'ডিজিটাল লাইব্রেরী', icon: BookOpen },
    { title: 'খেলাধুলা ও সাংস্কৃতিক কার্যক্রম', icon: Trophy },
    { title: 'নিরাপদ ক্যাম্পাস', icon: ShieldCheck },
    { title: 'নিয়মিত মূল্যায়ন', icon: FileText },
    { title: 'আধুনিক শিক্ষা ব্যবস্থা', icon: GraduationCap }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            কেন আমাদের বিদ্যালয়?
          </h2>
        </div>

        {/* 8 Feature Grid Cards matching image design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition duration-200 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
