'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Users, 
  Trophy, 
  Calendar, 
  FileEdit, 
  Award, 
  PhoneCall, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SettingsData {
  heroTagline: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  stats: {
    students: string;
    teachers: string;
    passRate: string;
    establishedYear: string;
  };
}

export default function HeroSection() {
  const [settings, setSettings] = useState<SettingsData>({
    heroTagline: 'শিক্ষাই শক্তি',
    heroTitleLine1: 'প্রযুক্তিই ভবিষ্যৎ',
    heroTitleLine2: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
    heroDescription: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে প্রতিশ্রুতিবদ্ধ।',
    stats: {
      students: '২,৮৮০+',
      teachers: '৯৫+',
      passRate: '২১৫+',
      establishedYear: '১৯৯৮'
    }
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-blue-50/40 pt-8 pb-16 overflow-hidden">
      
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-6 space-y-6 z-10 text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>{settings.heroTagline}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
                {settings.heroTitleLine1}
              </h1>
              {settings.heroTitleLine2 && (
                <span className="block text-2xl sm:text-3xl font-extrabold text-blue-600 mt-2">
                  {settings.heroTitleLine2}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              {settings.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              
              <Link 
                href="/admission"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition flex items-center gap-2 group"
              >
                <FileEdit className="w-4 h-4" />
                <span>ভর্তি আবেদন করুন</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>

              <Link 
                href="/result"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-200 shadow-sm transition flex items-center gap-2 hover:border-slate-300"
              >
                <Award className="w-4 h-4 text-blue-600" />
                <span>ফলাফল দেখুন</span>
              </Link>

              <Link 
                href="/contact"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-200 shadow-sm transition flex items-center gap-2 hover:border-slate-300"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>যোগাযোগ করুন</span>
              </Link>

            </div>

          </div>

          {/* Right Column: High-Res School Building Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img 
                src={(settings as any).heroImage || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=80"} 
                alt="ডাঃ মুজিব-রুবি মডেল হাই স্কুল বিল্ডিং"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              {/* Badge on Photo */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">ডাঃ মুজিব-রুবি মডেল হাই স্কুল</h3>
                  <p className="text-xs text-slate-200">স্মার্ট ক্লাসরুম, ল্যাব ও সবুজ ক্যাম্পাস</p>
                </div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-xs font-bold">
                  EIIN: ১৩০৯৫৪
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Floating Stats Bar */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-slate-200/50 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-4 first:pl-0">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                {settings.stats.students}
              </h4>
              <p className="text-xs font-bold text-slate-500 mt-0.5">শিক্ষার্থী</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                {settings.stats.teachers}
              </h4>
              <p className="text-xs font-bold text-slate-500 mt-0.5">শিক্ষক-শিক্ষিকা</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                {settings.stats.passRate}
              </h4>
              <p className="text-xs font-bold text-slate-500 mt-0.5">এসএসসি জিপিএ-৫</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                {settings.stats.establishedYear}
              </h4>
              <p className="text-xs font-bold text-slate-500 mt-0.5">প্রতিষ্ঠাবর্ষ</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
