'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Download, 
  Sparkles, 
  Flag, 
  Trophy, 
  BookOpen, 
  CheckCircle2, 
  Filter,
  ArrowRight,
  PartyPopper
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  category: 'holiday' | 'exam' | 'event' | 'national';
  month: string;
  duration: string;
  description: string;
}

const ACADEMIC_EVENTS_2026: AcademicEvent[] = [
  {
    id: 'ev-1',
    title: 'নতুন শিক্ষাবর্ষের ক্লাস শুরু ও বই উৎসব',
    startDate: '১ জানুয়ারি, ২০২৬',
    category: 'event',
    month: 'জানুয়ারি',
    duration: '১ দিন',
    description: '২০২৬ শিক্ষাবর্ষের সকল শিক্ষার্থীদের মাঝে বিনামূল্যে নতুন পাঠ্যবই বিতরণ ও ওরিয়েন্টেশন।'
  },
  {
    id: 'ev-2',
    title: 'শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস',
    startDate: '২১ ফেব্রুয়ারি, ২০২৬',
    category: 'national',
    month: 'ফেব্রুয়ারি',
    duration: '১ দিন',
    description: 'প্রভাতফেরি, শহীদ মিনারে পুষ্পস্তবক অর্পণ, চিত্রাঙ্কন ও রচনা প্রতিযোগিতা।'
  },
  {
    id: 'ev-3',
    title: 'পবিত্র শব-ই-বরাত ও আন্তর্জাতিক নারী দিবস',
    startDate: '৩ মার্চ, ২০২৬',
    category: 'holiday',
    month: 'মার্চ',
    duration: '১ দিন',
    description: 'সরকারি ছুটি উপলক্ষে বিদ্যালয় বন্ধ থাকবে।'
  },
  {
    id: 'ev-4',
    title: 'পবিত্র মাহে রমজান ও ঈদুল ফিতরের ছুটি',
    startDate: '১৫ মার্চ, ২০২৬',
    endDate: '২ এপ্রিল, ২০২৬',
    category: 'holiday',
    month: 'মার্চ',
    duration: '১৯ দিন',
    description: 'রমজানুল মোবারক, লাইলাতুল কদর ও ঈদুল ফিতর উপলক্ষে দীর্ঘ ছুটি।'
  },
  {
    id: 'ev-5',
    title: 'বাংলা নববর্ষ (পহেলা বৈশাখ ১৪৩৩)',
    startDate: '১৪ এপ্রিল, ২০২৬',
    category: 'national',
    month: 'এপ্রিল',
    duration: '১ দিন',
    description: 'মঙ্গল শোভাযাত্রা, বৈশাখী মেলা ও সাংস্কৃতিক অনুষ্ঠান।'
  },
  {
    id: 'ev-6',
    title: '১ম সাময়িক ও অর্ধবার্ষিকী পরীক্ষা ২০২৬',
    startDate: '২০ মে, ২০২৬',
    endDate: '৫ জুন, ২০২৬',
    category: 'exam',
    month: 'মে',
    duration: '১৭ দিন',
    description: '৬ষ্ঠ থেকে ১০ম শ্রেণীর অর্ধবার্ষিকী ও প্রাক-নির্বাচনী পরীক্ষা অনুষ্ঠিত হবে।'
  },
  {
    id: 'ev-7',
    title: 'পবিত্র ঈদুল আযহার ছুটি',
    startDate: '২৫ মে, ২০২৬',
    endDate: '৮ জুন, ২০২৬',
    category: 'holiday',
    month: 'মে',
    duration: '১৫ দিন',
    description: 'পবিত্র ঈদুল আযহা ও গ্রীষ্মকালীন অবকাশ।'
  },
  {
    id: 'ev-8',
    title: 'অর্ধবার্ষিকী পরীক্ষার ফলাফল প্রকাশ ও অভিভাবক সমাবেশ',
    startDate: '২৫ জুন, ২০২৬',
    category: 'event',
    month: 'জুন',
    duration: '১ দিন',
    description: 'রিপোর্ট কার্ড বিতরণ ও শিক্ষার্থীদের অগ্রগতি নিয়ে মতবিনিময়।'
  },
  {
    id: 'ev-9',
    title: 'জাতীয় শোক দিবস ও আলোচনা সভা',
    startDate: '১৫ আগস্ট, ২০২৬',
    category: 'national',
    month: 'আগস্ট',
    duration: '১ দিন',
    description: 'কালো ব্যাজ ধারণ, দোয়া মাহফিল ও স্মৃতিচারণ অনুষ্ঠান।'
  },
  {
    id: 'ev-10',
    title: '১০ম শ্রেণীর টেস্ট ও প্রি-টেস্ট পরীক্ষা',
    startDate: '১০ অক্টোবর, ২০২৬',
    endDate: '২৫ অক্টোবর, ২০২৬',
    category: 'exam',
    month: 'অক্টোবর',
    duration: '১৬ দিন',
    description: 'এসএসসি পরীক্ষার্থীদের চূড়ান্ত মডেল টেস্ট পরীক্ষা।'
  },
  {
    id: 'ev-11',
    title: 'বার্ষিক মূল্যায়ন ও ফাইনাল পরীক্ষা ২০২৬',
    startDate: '১৫ নভেম্বর, ২০২৬',
    endDate: '৫ ডিসেম্বর, ২০২৬',
    category: 'exam',
    month: 'নভেম্বর',
    duration: '২১ দিন',
    description: 'সকল শ্রেণীর চূড়ান্ত বার্ষিক পরীক্ষা ও নতুন মূল্যায়ন কার্যক্রম।'
  },
  {
    id: 'ev-12',
    title: 'বার্ষিক ফলাফল প্রকাশ ও পুরস্কার বিতরণী উৎসব',
    startDate: '২৫ ডিসেম্বর, ২০২৬',
    category: 'event',
    month: 'ডিসেম্বর',
    duration: '১ দিন',
    description: 'মেধাবী শিক্ষার্থীদের মাঝে সনদ ও পুরস্কার বিতরণী অনুষ্ঠান।'
  },
];

export default function AcademicCalendarPage() {
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Countdown to Next Event
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 35,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = ACADEMIC_EVENTS_2026.filter((ev) => {
    const matchCat = selectedCategory === 'all' || ev.category === selectedCategory;
    const matchMonth = selectedMonth === 'all' || ev.month === selectedMonth;
    return matchCat && matchMonth;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-10">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-14 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <CalendarIcon className="w-3.5 h-3.5" />
            শিক্ষাবর্ষ ২০২৬
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">একাডেমিক ক্যালেন্ডার ও ছুটির তালিকা</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            ২০২৬ শিক্ষাবর্ষের সকল পরীক্ষা, জাতীয় দিবস, সরকারি ছুটি ও সাংস্কৃতিক অনুষ্ঠানের পূর্ণাঙ্গ সময়সূচি।
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Next Big Event Countdown Card */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
              📌 পরবর্তী প্রধান একাডেমিক ইভেন্ট
            </span>
            <h3 className="text-xl sm:text-2xl font-black">১ম সাময়িক ও অর্ধবার্ষিকী পরীক্ষা ২০২৬</h3>
            <p className="text-xs text-blue-200">শুরুর তারিখ: ২০ মে, ২০২৬ | প্রস্তুতি গ্রহণের নির্দেশ দেওয়া হচ্ছে</p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { label: 'দিন', val: timeLeft.days },
              { label: 'ঘন্টা', val: timeLeft.hours },
              { label: 'মিনিট', val: timeLeft.minutes },
              { label: 'সেকেন্ড', val: timeLeft.seconds },
            ].map((unit, uIdx) => (
              <div key={uIdx} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center min-w-[64px] sm:min-w-[74px] border border-white/10">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-300">
                  {unit.val.toString().padStart(2, '0')}
                </span>
                <span className="block text-[10px] text-slate-300 font-bold mt-0.5">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'all', label: 'সকল ইভেন্ট' },
              { id: 'exam', label: '🔵 পরীক্ষা ও মূল্যায়ন' },
              { id: 'holiday', label: '🔴 সরকারি ছুটি' },
              { id: 'event', label: '🟢 উৎসব ও অনুষ্ঠান' },
              { id: 'national', label: '🟡 জাতীয় দিবস' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Download PDF Button */}
          <button
            onClick={() => toast.success('একাডেমিক ক্যালেন্ডার ২০২৬ (PDF) ডাউনলোড হচ্ছে...')}
            className="w-full md:w-auto px-5 py-2.5 bg-slate-900 hover:bg-blue-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <Download className="w-4 h-4" />
            <span>ক্যালেন্ডার PDF ডাউনলোড</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400">
              <CalendarIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-sm">এই ক্যাটাগরিতে কোনো ইভেন্ট পাওয়া যায়নি</p>
            </div>
          ) : (
            filteredEvents.map((ev) => {
              const isExam = ev.category === 'exam';
              const isHoliday = ev.category === 'holiday';
              const isEvent = ev.category === 'event';
              const isNational = ev.category === 'national';

              return (
                <div
                  key={ev.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isExam
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : isHoliday
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isEvent
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {isExam && 'পরীক্ষা ও মূল্যায়ন'}
                        {isHoliday && 'সরকারি ছুটি'}
                        {isEvent && 'উৎসবাদি'}
                        {isNational && 'জাতীয় দিবস'}
                      </span>

                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {ev.duration}
                      </span>
                    </div>

                    <h4 className="font-black text-base text-slate-900 leading-snug">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {ev.startDate} {ev.endDate ? `- ${ev.endDate}` : ''}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
