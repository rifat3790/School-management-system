'use client';

import React from 'react';
import { Award, Sparkles, Star, Trophy, GraduationCap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Achiever {
  name: string;
  exam: string;
  gpa: string;
  badge?: string;
  quote?: string;
  image?: string;
  year?: string;
}

interface StarAchieversProps {
  achievers?: Achiever[];
}

const DEFAULT_ACHIEVERS: Achiever[] = [
  {
    name: 'তানভীর আহমেদ সাজিদ',
    exam: 'এসএসসি ২০২৫ (বিজ্ঞান শাখা)',
    gpa: 'জিপিএ ৫.০০ (গোল্ডেন A+)',
    badge: '🥇 বোর্ড মেধা তালিকায় ৫ম স্থান',
    quote: 'শিক্ষকদের নিবিড় পরিচর্যা এবং নিয়মিত সাপ্তাহিক মডেল টেস্ট আমার সাফল্যের মূল ভিত্তি।',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    year: '২০২৫'
  },
  {
    name: 'ফারজানা আক্তার মীম',
    exam: 'জাতীয় বিজ্ঞান অলিম্পিয়াড ২০২৫',
    gpa: '১ম স্থান (বিভাগীয় চ্যাম্পিয়ন)',
    badge: '🏆 জাতীয় পর্যায়ে স্বর্ণপদক',
    quote: 'বিদ্যালয়ের আধুনিক বিজ্ঞান ল্যাব ও শিক্ষকদের সার্বক্ষণিক দিকনির্দেশনা আমাকে অনুপ্রাণিত করেছে।',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    year: '২০২৫'
  },
  {
    name: 'মোঃ তাসফিক হাসান',
    exam: 'এসএসসি ২০২৫ (ব্যবসায় শিক্ষা)',
    gpa: 'জিপিএ ৫.০০ (A+)',
    badge: '⭐ শেরপুর জেলা সেরা ফলাফল',
    quote: 'শৃঙ্খলা এবং নিয়মানুবর্তিতাই ডাঃ মুজিব-রুবি মডেল হাই স্কুলের সবচেয়ে বড় শক্তি।',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    year: '২০২৫'
  },
  {
    name: 'নুসরাত জাহান তিশা',
    exam: 'আন্তঃস্কুল জাতীয় বিতর্ক প্রতিযোগিতা',
    gpa: 'সেরা বক্তা (জাতীয় চ্যাম্পিয়ন)',
    badge: '🎯 জাতীয় ডিবেট চ্যাম্পিয়ন',
    quote: 'ডিবেট ক্লাবের নিয়মিত সেশন এবং শিক্ষকদের সহযোগিতা আমার আত্মবিশ্বাস বৃদ্ধি করেছে।',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    year: '২০২৫'
  }
];

export default function StarAchieversSection({ achievers }: StarAchieversProps) {
  const displayList = (achievers && achievers.length > 0) ? achievers : DEFAULT_ACHIEVERS;

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            আমাদের গর্ব ও কৃতি শিক্ষার্থী
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            স্টার অ্যাচিভার্স ও কৃতি শিক্ষার্থী সম্মাননা
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            জাতীয় ও বোর্ড পরীক্ষায় অসাধারণ কৃতিত্ব অর্জনকারী ডাঃ মুজিব-রুবি মডেল হাই স্কুলের উজ্জ্বল নক্ষত্রবৃন্দ।
          </p>
        </div>

        {/* Achievers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((st, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group relative overflow-hidden"
            >
              {/* Top Shimmer Badge */}
              <div className="space-y-4">
                <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={st.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80'}
                    alt={st.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent text-white text-[9px] font-bold text-center py-0.5">
                    {st.year || '২০২৫'}
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                    {st.badge || '🌟 স্টার অ্যাচিভার'}
                  </span>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-blue-700 transition">
                    {st.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-600">{st.exam}</p>
                  <p className="text-xs font-black text-emerald-700">{st.gpa}</p>
                </div>

                {st.quote && (
                  <p className="text-[11px] text-slate-600 italic bg-white p-3 rounded-2xl border border-slate-200 leading-relaxed text-center">
                    "{st.quote}"
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-center text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ভেরিফায়েড কৃতি শিক্ষার্থী
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <Link
            href="/result"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-900 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition"
          >
            <GraduationCap className="w-4 h-4" />
            <span>বিগত বছরসমূহের সকল ফলাফল ও মেরিট লিস্ট দেখুন</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
