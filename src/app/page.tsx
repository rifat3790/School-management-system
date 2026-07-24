'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import StatsCounter from '@/components/StatsCounter';
import PrincipalMessage from '@/components/PrincipalMessage';
import FeaturesGrid from '@/components/FeaturesGrid';
import AcademicPrograms from '@/components/AcademicPrograms';
import ClubsSection from '@/components/ClubsSection';
import EventsSection from '@/components/EventsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
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
  Globe,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { NOTICES_LIST, NEWS_LIST, FAQ_LIST } from '@/data/schoolData';

export default function Home() {
  const toast = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('সব');

  const [notices, setNotices] = useState<any[]>(NOTICES_LIST);
  const [newsList, setNewsList] = useState<any[]>(NEWS_LIST);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    // 1. Fetch notices
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.notices && data.notices.length > 0) {
          setNotices(data.notices);
        }
      })
      .catch(err => console.error(err));

    // 2. Fetch news
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.news && data.news.length > 0) {
          setNewsList(data.news);
        }
      })
      .catch(err => console.error(err));

    // 3. Fetch Site Settings for all dynamic home sections
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSiteSettings(data.settings);
        }
      })
      .catch(err => console.error(err));
  }, []);

  // FAQs source (Dynamic from settings or fallback to static)
  const faqsSource = siteSettings?.faqs && siteSettings.faqs.length > 0 ? siteSettings.faqs : FAQ_LIST;

  const faqCategories: string[] = ['সব', ...(Array.from(new Set(faqsSource.map((f: any) => String(f.category || 'সাধারণ')))) as string[])];



  const filteredFaqs = faqsSource.filter((faq: any) => {
    const matchesSearch = (faq.question || '').toLowerCase().includes(faqSearch.toLowerCase()) ||
                          (faq.answer || '').toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = activeFaqCategory === 'সব' || faq.category === activeFaqCategory;
    return matchesSearch && matchesCategory;
  });

  // Top Achievers (100% Dynamic from Database)
  const topAchievers = siteSettings?.topAchievers || [];

  // Campus Facilities (100% Dynamic from Database)
  const campusFacilities = siteSettings?.campusFacilities || [];


  return (
    <div className="space-y-0 bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section (Light Theme & Dynamic Stats) */}
      <HeroSection />

      {/* 2. Messages from Principal & Chairman */}
      <PrincipalMessage />

      {/* 3. Academic Programs & Curriculum Showcase (NEW Dynamic Section) */}
      <AcademicPrograms programs={siteSettings?.academicPrograms} />

      {/* 4. Live Notice Board & News Showcase */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Recent Notices */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    তাৎক্ষণিক বিজ্ঞপ্তি
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-blue-600 animate-bounce" />
                    নোটিশ বোর্ড
                  </h3>
                </div>
                <Link
                  href="/notices"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs"
                >
                  সব নোটিশ ({notices.length})
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {notices.slice(0, 4).map((notice: any) => (
                  <div
                    key={notice._id || notice.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {(notice.isPinned || notice.isImportant) && (
                          <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                            জরুরি নোটিশ
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          {notice.category}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
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
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-3.5 py-2 rounded-xl transition border border-blue-200/80 shadow-xs"
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
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    সংবাদ ও মিডিয়া
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-emerald-600" />
                    ক্যাম্পাস নিউজ
                  </h3>
                </div>
                <Link
                  href="/news"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs"
                >
                  সব সংবাদ
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {newsList.slice(0, 2).map((item: any) => (
                  <div key={item._id || item.id} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex gap-4 hover:shadow-md transition">
                    <img src={item.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80'} alt={item.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-2 hover:text-blue-600 transition">{item.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. 6 Key Features */}
      <FeaturesGrid />

      {/* 6. Smart Campus STEM & Facilities Grid (Light Theme Redesign) */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-full border border-blue-200 inline-flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              বিশ্বমানের ক্যাম্পাস সুবিধা
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">কেন আমাদের ক্যাম্পাস শেরপুরের সেরা?</h2>
            <p className="text-slate-600 text-sm">
              আধুনিক শিক্ষা উপকরণ, সায়েন্স ল্যাব ও বিশ্বমানের ডিজিটাল লার্নিং পরিকাঠামো।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campusFacilities.map((fc: any, idx: number) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 hover:bg-white hover:shadow-xl transition duration-300 space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition">{fc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{fc.desc}</p>
                </div>
                {fc.badge && (
                  <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-[10px] border border-blue-200">
                    {fc.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Wall of Fame / Top Achievers Honor Roll */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 font-extrabold text-xs rounded-full border border-amber-200 inline-flex items-center gap-1.5 shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              কৃতি শিক্ষার্থী সম্মাননা (Wall of Fame)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">আমাদের কৃতি শিক্ষার্থীদের গৌরবময় সাফল্য</h2>
            <p className="text-slate-600 text-sm">
              জাতীয় বোর্ড পরীক্ষা ও অলিম্পিয়াডে ডাঃ মুজিব-রুবি মডেল হাই স্কুলের সেরা ট্রফি ও গোল্ডেন জিপিএ-৫ অর্জনকারী মুখসমূহ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topAchievers.map((st: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/90 hover:shadow-xl transition duration-300 group space-y-4">
                <div className="flex items-center gap-4">
                  <img src={st.image} alt={st.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 group-hover:scale-105 transition shadow-xs" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{st.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{st.exam}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-extrabold text-xs">
                      {st.gpa}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  "{st.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Campus Clubs & Life (NEW Dynamic Section) */}
      <ClubsSection clubs={siteSettings?.clubsAndActivities} />

      {/* 9. Upcoming Academic Events & Calendar (NEW Dynamic Section) */}
      <EventsSection events={siteSettings?.events} />

      {/* 10. Parent & Alumni Testimonials (NEW Dynamic Section) */}
      <TestimonialsSection testimonials={siteSettings?.testimonials} />

      {/* 11. Interactive FAQ Accordion with Category Filter & Search */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-sky-50 text-sky-700 font-extrabold text-xs rounded-full border border-sky-200 inline-flex items-center gap-1.5 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              সাধারণ জিজ্ঞাসা ও সাহায্য
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">আপনার প্রশ্ন, আমাদের উত্তর</h2>
            <p className="text-slate-600 text-sm">
              ভর্তি, হাজিরা, একাডেমিক পদ্ধতি ও ফি সংক্রান্ত প্রয়োজনীয় তথ্যাবলি।
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="যে কোনো প্রশ্ন খুঁজুন (যেমন: ভর্তি, ফি, হাজিরা)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {faqCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFaqCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                    activeFaqCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq: any, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">
                        ?
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {openFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-slate-500 py-6">কোনো প্রশ্ন পাওয়া যায়নি।</p>
            )}
          </div>

        </div>
      </section>

      {/* 12. Bottom Admission CTA Banner (Light Premium Design) */}
      <section className="py-14 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 text-slate-900 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-[1536px] mx-auto px-4 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-extrabold px-4 py-1.5 rounded-full text-xs uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            ২০২৬ শিক্ষাবর্ষের অনলাইন ভর্তি চলছে
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            আপনার সন্তানের উজ্জ্বল ভবিষ্যতের সূচনা হোক এখানে
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            সীমিত আসনে অনলাইন ভর্তি কার্যক্রম শুরু হয়েছে। আজই ভর্তি ফর্ম পূরণ করে মেধা ও প্রযুক্তির সেরা ক্যাম্পাসে অংশ নিন।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/admission"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 hover:scale-105 transition text-sm sm:text-base flex items-center gap-2"
            >
              <span>অনলাইন ভর্তি আবেদন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-50 text-slate-800 font-extrabold px-8 py-3.5 rounded-2xl border border-slate-200 shadow-sm transition text-sm sm:text-base"
            >
              যোগাযোগ করুণ
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
