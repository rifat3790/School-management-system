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

        {/* Subjects Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            বিষয় তালিকা ও শিক্ষকবৃন্দ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classData.subjects?.map((sub: any, idx: number) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
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

        {/* Weekly Routine Schedule */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            দৈনিক ক্লাস রুটিন
          </h3>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">দিন</th>
                    <th className="p-4">১ম পিরিয়ড</th>
                    <th className="p-4">২য় পিরিয়ড</th>
                    <th className="p-4">৩য় পিরিয়ড</th>
                    <th className="p-4">৪র্থ পিরিয়ড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classData.routine?.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-blue-600">{row.day}</td>
                      {row.periods?.map((p: any, j: number) => (
                        <td key={j} className="p-4 text-xs">
                          <p className="font-bold text-slate-800">{p.subject}</p>
                          <p className="text-slate-500 text-[11px] flex items-center gap-1">
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

      </section>
    </div>
  );
}
