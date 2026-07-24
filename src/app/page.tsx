'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import StatsCounter from '@/components/StatsCounter';
import PrincipalMessage from '@/components/PrincipalMessage';
import FeaturesGrid from '@/components/FeaturesGrid';
import { useToast } from '@/components/Toast';
import { 
  Bell, 
  ArrowRight, 
  Calendar, 
  Download, 
  Newspaper, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  CheckCircle,
  Search,
  BookOpen,
  Award,
  Cpu,
  Monitor,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { NOTICES_LIST, NEWS_LIST, EVENTS_LIST, FAQ_LIST, SCHOOL_INFO } from '@/data/schoolData';

export default function Home() {
  const toast = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const filteredFaqs = FAQ_LIST.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const topAchievers = [
    { name: 'তানভীর রশীদ', exam: 'এসএসসি ২০২৫ (বিজ্ঞান)', gpa: 'GPA 5.00 (Golden A+)', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80', quote: 'ডাঃ মুজিব-রুবি স্কুলের রোবোটিক্স ল্যাব ও শিক্ষকদের গাইডলাইনেই আমার এই সাফল্য।' },
    { name: 'ফারজানা মিমি', exam: 'এসএসসি ২০২৫ (বিজ্ঞান)', gpa: 'GPA 5.00 (Golden A+)', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80', quote: 'ডিজিটাল ক্লাসরুম ও নিয়মিত সাপ্তাহিক মডেল টেস্ট আমাকে আত্মবিশ্বাসী করেছে।' },
    { name: 'আরিফ হোসেন', exam: 'জেএসসি ২০২৪', gpa: 'GPA 5.00 (Board Rank)', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', quote: 'লাইব্রেরির সমৃদ্ধ বইয়ের সংগ্রহ ও সহ-শিক্ষা ক্লাবগুলোর অবদান অনস্বীকার্য।' },
  ];

  const campusFacilities = [
    { title: 'অ্যাডভান্সড রোবোটিক্স ও স্টেম ল্যাব', icon: Cpu, desc: 'মাইক্রোকন্ট্রোলার, ৩ডি প্রিন্টিং ও আইওটি কিট সমৃদ্ধ আধুনিক ল্যাব।' },
    { title: 'স্মার্ট মাল্টিমিডিয়া ক্লাসরুম', icon: Monitor, desc: '১০০% সিসিটিভি বেষ্টিত ও হাই-স্পিড ওয়াইফাই ক্লাসরুম।' },
    { title: 'ডিজিটাল ল্যাঙ্গুয়েজ ও আইসিটি ল্যাব', icon: Globe, desc: 'স্পোকেন ইংলিশ ও কোডিং শেখার আধুনিক কম্পিউটার ল্যাব।' },
    { title: 'নিরাপদ সিসিটিভি ও বায়োমেট্রিক ক্যাম্পাস', icon: ShieldCheck, desc: '২৪/৭ সিসিটিভি সার্ভেইল্যান্স ও রিয়েল-টাইম এসএমএস হাজিরা।' },
  ];

  return (
    <div className="space-y-0 bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stat Counter Animation */}
      <StatsCounter />

      {/* 3. Messages from Principal & Chairman */}
      <PrincipalMessage />

      {/* 4. 6 Key Features */}
      <FeaturesGrid />

      {/* 5. Wall of Fame / Top Achievers */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              কৃতি শিক্ষার্থী সম্মাননা (Wall of Fame)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">আমাদের কৃতি শিক্ষার্থীদের গৌরবময় সাফল্য</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              জাতীয় বোর্ড পরীক্ষা ও অলিম্পিয়াডে ডাঃ মুজিব-রুবি মডেল হাই স্কুলের সেরা ট্রফি ও গোল্ডেন জিপিএ-৫ অর্জনকারী মুখসমূহ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topAchievers.map((st, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:shadow-xl transition group space-y-4">
                <div className="flex items-center gap-4">
                  <img src={st.image} alt={st.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 group-hover:scale-105 transition" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{st.name}</h3>
                    <p className="text-xs text-slate-500">{st.exam}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-extrabold text-xs">
                      {st.gpa}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed bg-white p-3 rounded-2xl border border-slate-100">
                  "{st.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Smart Facilities Grid */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 bg-white/10 text-sky-300 font-bold text-xs rounded-full border border-white/20 inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              বিশ্বমানের ক্যাম্পাস সুবিধা
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">কেন আমাদের ক্যাম্পাস শেরপুরের সেরা?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campusFacilities.map((fc, idx) => {
              const Icon = fc.icon;
              return (
                <div key={idx} className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{fc.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{fc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Live Notice Board & News Showcase */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Recent Notices */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    তাৎক্ষণিক বিজ্ঞপ্তি
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-blue-600 animate-bounce" />
                    নোটিশ বোর্ড
                  </h3>
                </div>
                <Link
                  href="/notices"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
                >
                  সব নোটিশ (৫)
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {NOTICES_LIST.slice(0, 4).map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {notice.isPinned && (
                          <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            পিন্ড নোটিশ
                          </span>
                        )}
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {notice.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {notice.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 hover:text-blue-600 transition">
                        {notice.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-1">{notice.content}</p>
                    </div>

                    <button 
                      onClick={() => toast.info(`ডাউনলোড হচ্ছে: ${notice.title}`)}
                      className="shrink-0 inline-flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl transition border border-blue-200"
                    >
                      <Download className="w-3.5 h-3.5" />
                      পিডিএফ
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Events & News */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    সংবাদ ও মিডিয়া
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-emerald-600" />
                    ক্যাম্পাস নিউজ
                  </h3>
                </div>
                <Link
                  href="/news"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
                >
                  সব সংবাদ
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {NEWS_LIST.slice(0, 2).map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-200 flex gap-4">
                    <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-2">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Bottom Admission CTA Banner */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1536px] mx-auto px-4 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black px-4 py-1 rounded-full text-xs uppercase">
            <Sparkles className="w-4 h-4" />
            ২০২৬ শিক্ষাবর্ষের অনলাইন ভর্তি
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            আপনার সন্তানের উজ্জ্বল ভবিষ্যতের সূচনা হোক এখানে
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            সীমিত আসনে অনলাইন ভর্তি চলছে। এখনই ফর্ম পূরণ করে ডিজিটাল লার্নিং পরিবেশের অংশ হোন।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/admission"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition text-sm sm:text-base"
            >
              অনলাইন ভর্তি আবেদন
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
