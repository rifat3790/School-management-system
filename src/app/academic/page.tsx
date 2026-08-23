'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, Download, UserCheck, Sparkles } from 'lucide-react';
import { useToast } from '@/components/Toast';

const DEFAULT_CLASSES: { [key: string]: any } = {
  'class-6': {
    className: '৬ষ্ঠ শ্রেণী',
    classTeacher: 'জনাব মোঃ আব্দুল করিম',
    totalStudents: '৭৫',
    subjects: [
      { name: 'বাংলা ১ম ও ২য় পত্র', code: '১০১-১০২', marks: '১০০', teacher: 'জনাবা রোকেয়া বেগম' },
      { name: 'ইংরেজি ১ম ও ২য় পত্র', code: '১০৭-১০৮', marks: '১০০', teacher: 'জনাব মোঃ রাসেল' },
      { name: 'গণিত', code: '১০৯', marks: '১০০', teacher: 'জনাব সুজন কুমার' },
      { name: 'বিজ্ঞান', code: '১১০', marks: '১০০', teacher: 'জনাব মোঃ রাশিদুল ইসলাম' },
      { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', code: '১৫৪', marks: '৫০', teacher: 'ইঞ্জিনিয়ার আরিফুর' },
      { name: 'বাংলাদেশ ও বিশ্বপরিচয়', code: '১৪৩', marks: '১০০', teacher: 'জনাব কামাল উদ্দিন' },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { subject: 'বাংলা', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'গণিত', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'বিজ্ঞান', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'ইংরেজি', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
      {
        day: 'সোমবার',
        periods: [
          { subject: 'ইংরেজি', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'বিজ্ঞান', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'গণিত', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'তথ্য প্রযুক্তি', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
      {
        day: 'মঙ্গলবার',
        periods: [
          { subject: 'গণিত', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'বাংলা', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'ইংরেজি', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'বিশ্বপরিচয়', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
    ],
  },
  'class-7': {
    className: '৭ম শ্রেণী',
    classTeacher: 'জনাবা তানজীনা আক্তার',
    totalStudents: '৭০',
    subjects: [
      { name: 'বাংলা', code: '১০১', marks: '১০০', teacher: 'জনাবা রোকেয়া বেগম' },
      { name: 'ইংরেজি', code: '১০৭', marks: '১০০', teacher: 'জনাবা ফারহানা ইয়াসমিন' },
      { name: 'গণিত', code: '১০৯', marks: '১০০', teacher: 'জনাবা তানজীনা আক্তার' },
      { name: 'বিজ্ঞান', code: '১১০', marks: '১০০', teacher: 'জনাব মোঃ রাশিদুল ইসলাম' },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { subject: 'ইংরেজি', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'গণিত', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'বাংলা', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'বিজ্ঞান', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
    ],
  },
  'class-8': {
    className: '৮ম শ্রেণী',
    classTeacher: 'জনাব সুজন কুমার',
    totalStudents: '৮০',
    subjects: [
      { name: 'বাংলা', code: '১০১', marks: '১০০', teacher: 'জনাবা রোকেয়া বেগম' },
      { name: 'গণিত', code: '১০৯', marks: '১০০', teacher: 'জনাব সুজন কুমার' },
      { name: 'বিজ্ঞান', code: '১১০', marks: '১০০', teacher: 'জনাব মোঃ রাশিদুল ইসলাম' },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { subject: 'গণিত', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'বিজ্ঞান', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'ইংরেজি', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'বাংলা', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
    ],
  },
  'class-9': {
    className: '৯ম শ্রেণী',
    classTeacher: 'জনাব মোঃ রাশিদুল ইসলাম',
    totalStudents: '৬৫',
    subjects: [
      { name: 'পদার্থবিজ্ঞান', code: '১৩৬', marks: '১০০', teacher: 'জনাব মোঃ আব্দুল করিম' },
      { name: 'রসায়ন', code: '১৩৭', marks: '১০০', teacher: 'জনাব মোঃ রাশিদুল ইসলাম' },
      { name: 'উচ্চতর গণিত', code: '১২৬', marks: '১০০', teacher: 'জনাব সুজন কুমার' },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { subject: 'পদার্থবিজ্ঞান', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'রসায়ন', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'উচ্চতর গণিত', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'আইসিটি', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
    ],
  },
  'class-10': {
    className: '১০ম শ্রেণী',
    classTeacher: 'জনাব মোঃ আব্দুল করিম',
    totalStudents: '৬০',
    subjects: [
      { name: 'পদার্থবিজ্ঞান', code: '১৩৬', marks: '১০০', teacher: 'জনাব মোঃ আব্দুল করিম' },
      { name: 'রসায়ন', code: '১৩৭', marks: '১০০', teacher: 'জনাব মোঃ রাশিদুল ইসলাম' },
      { name: 'উচ্চতর গণিত', code: '১২৬', marks: '১০০', teacher: 'জনাব সুজন কুমার' },
      { name: 'ইংরেজি', code: '১০৭', marks: '১০০', teacher: 'জনাবা ফারহানা ইয়াসমিন' },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { subject: 'উচ্চতর গণিত', time: '০৮:০০ - ০৮:৪৫' },
          { subject: 'পদার্থবিজ্ঞান', time: '০৮:৪৫ - ০৯:৩০' },
          { subject: 'রসায়ন', time: '০৯:৩০ - ১০:১৫' },
          { subject: 'ইংরেজি', time: '১০:৪৫ - ১১:৩০' },
        ],
      },
    ],
  },
};

export default function AcademicPage() {
  const toast = useToast();
  const [activeClass, setActiveClass] = useState<string>('class-6');
  const [academicView, setAcademicView] = useState<'routine' | 'exam' | 'subjects' | 'rules'>('routine');
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSiteSettings(data.settings);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const classData = (siteSettings?.classRoutines && siteSettings.classRoutines.length > 0 && siteSettings.classRoutines.find((c: any) => c.id === activeClass)) || DEFAULT_CLASSES[activeClass] || DEFAULT_CLASSES['class-6'];

  return (
    <div className="py-12 space-y-10 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            শ্রেণীভিত্তিক একাডেমিক তথ্য (Live Database)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">একাডেমিক কার্যক্রম ও সময়সূচি</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            ৬ষ্ঠ থেকে ১০ম শ্রেণীর বিষয়সূচি, শিক্ষক পরিচিতি, ক্লাসরুটিন এবং সিলেবাস এক জায়গায়।
          </p>
        </div>
      </section>

      {/* Class Selector Tabs */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {[
            { id: 'class-6', label: '৬ষ্ঠ শ্রেণী' },
            { id: 'class-7', label: '৭ম শ্রেণী' },
            { id: 'class-8', label: '৮ম শ্রেণী' },
            { id: 'class-9', label: '৯ম শ্রেণী' },
            { id: 'class-10', label: '১০ম শ্রেণী' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveClass(tab.id)}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                activeClass === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Class Details */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Class Overview Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              একাডেমিক বিবরণী
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">{classData.className}</h2>
            <p className="text-sm text-slate-600 flex items-center justify-center md:justify-start gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              শ্রেণী শিক্ষক: <strong className="text-slate-800">{classData.classTeacher}</strong> | মোট শিক্ষার্থী: <strong className="text-slate-800">{classData.totalStudents} জন</strong>
            </p>
          </div>

          <button
            onClick={() => toast.info(`ডাউনলোড হচ্ছে: ${classData.className} সিলেবাস ২০২৬`)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition-transform text-xs sm:text-sm"
          >
            <Download className="w-4 h-4" />
            পূর্ণাঙ্গ সিলেবাস ডাউনলোড (PDF)
          </button>
        </div>

        {/* Academic Feature Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'routine', label: '📅 দৈনিক ক্লাস রুটিন', icon: Calendar },
            { id: 'exam', label: '📝 পরীক্ষার সময়সূচি ও সিটপ্ল্যান', icon: Clock },
            { id: 'subjects', label: '📚 বিষয় ও মানবন্টন', icon: BookOpen },
            { id: 'rules', label: '⚖️ নিয়মাবলী ও ইউনিফর্ম কোড', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = (academicView || 'routine') === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAcademicView(tab.id as any)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* VIEW 1: CLASS ROUTINE */}
        {(!academicView || academicView === 'routine') && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                {classData.className} - সাপ্তাহিক ক্লাস রুটিন
              </h3>
              <button
                onClick={() => toast.success(`${classData.className} রুটিন ডাউনলোড হচ্ছে...`)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-auto transition"
              >
                <Download className="w-3.5 h-3.5" /> রুটিন PDF
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-4">দিন</th>
                      <th className="p-4">১ম পিরিয়ড (০৮:০০ - ০৮:৪৫)</th>
                      <th className="p-4">২য় পিরিয়ড (০৮:৪৫ - ০৯:৩০)</th>
                      <th className="p-4">৩য় পিরিয়ড (০৯:৩০ - ১০:১৫)</th>
                      <th className="p-4">৪র্থ পিরিয়ড (১০:৪৫ - ১১:৩০)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classData.routine?.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-blue-600">{row.day}</td>
                        {row.periods?.map((p: any, j: number) => (
                          <td key={j} className="p-4 text-xs">
                            <p className="font-bold text-slate-800">{p.subject}</p>
                            <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-slate-400" /> {p.time}
                            </p>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: EXAM SCHEDULE & SEAT PLAN */}
        {academicView === 'exam' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  ১ম সাময়িক ও অর্ধবার্ষিকী পরীক্ষার সময়সূচি ২০২৬
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">পরীক্ষার সময়: সকাল ১০:০০ টা হতে দুপুর ০১:০০ টা পর্যন্ত</p>
              </div>
              <button
                onClick={() => toast.success('পরীক্ষার পূর্ণাঙ্গ রুটিন ও সিটপ্ল্যান ডাউনলোড হচ্ছে...')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-auto transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> পরীক্ষার সিডিউল PDF
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-blue-50 text-blue-900 font-bold border-b border-blue-100">
                    <tr>
                      <th className="p-4">তারিখ ও বার</th>
                      <th className="p-4">বিষয় ও পত্র</th>
                      <th className="p-4">বিষয় কোড</th>
                      <th className="p-4">সময় ও পূর্ণমান</th>
                      <th className="p-4">পরীক্ষা কক্ষ নং</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { date: '২০ মে, ২০২৬ (বুধবার)', subject: 'বাংলা ১ম পত্র', code: '১০১', time: 'সকাল ১০:০০ - ১:০০ (১০০ মার্কস)', room: 'কক্ষ ১০১ - ১০৫' },
                      { date: '২২ মে, ২০২৬ (শুক্রবার)', subject: 'বাংলা ২য় পত্র', code: '১০২', time: 'সকাল ১০:০০ - ১:০০ (১০০ মার্কস)', room: 'কক্ষ ১০১ - ১০৫' },
                      { date: '২৫ মে, ২০২৬ (সোমবার)', subject: 'ইংরেজি ১ম পত্র', code: '১০৭', time: 'সকাল ১০:০০ - ১:০০ (১০০ মার্কস)', room: 'কক্ষ ১০১ - ১০৫' },
                      { date: '২৭ মে, ২০২৬ (বুধবার)', subject: 'ইংরেজি ২য় পত্র', code: '১০৮', time: 'সকাল ১০:০০ - ১:০০ (১০০ মার্কস)', room: 'কক্ষ ১০১ - ১০৫' },
                      { date: '৩১ মে, ২০২৬ (রবিবার)', subject: 'গণিত (বাধ্যতামূলক)', code: '১০৯', time: 'সকাল ১০:০০ - ১:০০ (১০০ মার্কস)', room: 'কক্ষ ১০১ - ১০৫' },
                      { date: '০৩ জুন, ২০২৬ (বুধবার)', subject: 'বিজ্ঞান / পদার্থবিজ্ঞান', code: '১১০ / ১৩৬', time: 'সকাল ১০:০০ - ১:০০ (১০০ মার্কস)', room: 'কক্ষ ১০১ - ১০৫' },
                      { date: '০৫ জুন, ২০২৬ (শুক্রবার)', subject: 'তথ্য ও যোগাযোগ প্রযুক্তি', code: '১৫৪', time: 'সকাল ১০:০০ - ১২:০০ (৫০ মার্কস)', room: 'কম্পিউটার ল্যাব' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{row.date}</td>
                        <td className="p-4 font-bold text-blue-700">{row.subject}</td>
                        <td className="p-4 font-mono text-slate-600">{row.code}</td>
                        <td className="p-4 text-slate-700">{row.time}</td>
                        <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">{row.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SUBJECTS & MARKS */}
        {academicView === 'subjects' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              {classData.className} - বিষয় তালিকা ও মানবন্টন
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classData.subjects?.map((sub: any, idx: number) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      কোড: {sub.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      পূর্ণমান: {sub.marks}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{sub.name}</h4>
                  <p className="text-xs text-slate-600">বিষয় শিক্ষক: <strong className="text-slate-800">{sub.teacher}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: RULES & UNIFORM CODE */}
        {academicView === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                শ্রেণীকক্ষের আচরণ ও উপস্থিতি নিয়মাবলী
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                <li>সকাল ০৭:৪৫ মিনিটের মধ্যে সকল শিক্ষার্থীকে বিদ্যালয় প্রাঙ্গণে উপস্থিত হতে হবে।</li>
                <li>দৈনিক সমাবেশে (Assembly) অংশগ্রহণ বাধ্যতামূলক।</li>
                <li>বার্ষিক পরীক্ষায় অংশগ্রহণের জন্য ন্যূনতম ৭৫% ক্লাসে উপস্থিতি আবশ্যক।</li>
                <li>অনুমতি ছাড়া অনুপস্থিত থাকলে অভিভাবকের স্বাক্ষরযুক্ত আবেদনপত্র জমা দিতে হবে।</li>
                <li>বিদ্যালয় ক্যাম্পাসে মোবাইল ফোন বা কোনো ধরনের ইলেকট্রনিক ডিভাইস আনা সম্পূর্ণ নিষিদ্ধ।</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                বিদ্যালয়ের নির্ধারিত ইউনিফর্ম কোড
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                <li><strong>ছাত্রদের ইউনিফর্ম:</strong> সাদা শার্ট, নেভি ব্লু প্যান্ট, কালো জুতো ও সাদা মোজা।</li>
                <li><strong>ছাত্রীদের ইউনিফর্ম:</strong> নেভি ব্লু ফ্রক/কুর্তি, সাদা সালোয়ার, সাদা ওড়না ও কালো জুতো।</li>
                <li>বুকের বামপাশে প্রাতিষ্ঠানিক লোগো সংবলিত ব্যাজ ও গলায় আইডি কার্ড পরিধান বাধ্যতামূলক।</li>
                <li>শীতকালে নেভি ব্লু সোয়েটার অথবা ব্লেজার পরিধান করতে হবে।</li>
              </ul>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
