'use client';

import React, { useState } from 'react';
import { CLASS_ACADEMIC_DATA } from '@/data/schoolData';
import { BookOpen, Calendar, Clock, Download, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AcademicPage() {
  const toast = useToast();
  const [activeClass, setActiveClass] = useState<string>('class-6');

  const selectedData = CLASS_ACADEMIC_DATA[activeClass] || CLASS_ACADEMIC_DATA['class-6'];

  return (
    <div className="py-12 space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            শ্রেণীভিত্তিক একাডেমি তথ্য
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">একাডেমিক কার্যক্রম ও সময়সূচি</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            ৬ষ্ঠ থেকে ১০ম শ্রেণীর বিষয়সূচি, শিক্ষক পরিচিতি, ক্লাসরুটিন এবং সিলেবাস এক জায়গায়।
          </p>
        </div>
      </section>

      {/* Class Selector Tabs */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
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
              className={`px-6 py-3 rounded-2xl text-sm font-bold shrink-0 transition-all ${
                activeClass === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary-500/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Class Details */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* Class Overview Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-primary bg-primary-50 px-2.5 py-0.5 rounded-full">
              একাডেমিক বিবরণী
            </span>
            <h2 className="text-2xl font-extrabold text-heading">{selectedData.className}</h2>
            <p className="text-sm text-paragraph flex items-center justify-center md:justify-start gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              শ্রেণী শিক্ষক: <strong className="text-slate-800">{selectedData.classTeacher}</strong> | মোট শিক্ষার্থী: <strong className="text-slate-800">{selectedData.totalStudents} জন</strong>
            </p>
          </div>

          <button
            onClick={() => toast.info(`ডাউনলোড হচ্ছে: ${selectedData.className} সিলেবাস ২০২৬`)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition-transform text-sm"
          >
            <Download className="w-4 h-4" />
            পূর্ণাঙ্গ সিলেবাস ডাউনলোড (PDF)
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-heading flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            বিষয় তালিকা ও শিক্ষকবৃন্দ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedData.subjects.map((sub, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                    কোড: {sub.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    পূর্ণমান: {sub.marks}
                  </span>
                </div>
                <h4 className="font-bold text-base text-heading">{sub.name}</h4>
                <p className="text-xs text-paragraph">বিষয় শিক্ষক: <strong className="text-slate-800">{sub.teacher}</strong></p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Routine Schedule */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-heading flex items-center gap-2">
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
                  {selectedData.routine.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-primary">{row.day}</td>
                      {row.periods.map((p, j) => (
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
