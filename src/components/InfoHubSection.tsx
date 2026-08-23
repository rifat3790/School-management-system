'use client';

import React from 'react';
import Link from 'next/link';

import { Atom, TrendingUp, BookOpen, GraduationCap } from 'lucide-react';

interface InfoHubSectionProps {
  notices?: any[];
  events?: any[];
  academicPrograms?: any[];
}

export default function InfoHubSection({ notices = [], events = [], academicPrograms = [] }: InfoHubSectionProps) {
  const departmentsToRender = academicPrograms.length > 0
    ? academicPrograms
    : [
        {
          title: 'বিজ্ঞান বিভাগ',
          subtitle: 'আধুনিক ল্যাব ও গবেষণামূলক শিক্ষা।',
          icon: Atom,
          color: 'from-blue-600 to-indigo-600',
        },
        {
          title: 'ব্যবসায় শিক্ষা বিভাগ',
          subtitle: 'বাস্তবমুখী ও ব্যবহারিক অর্থনৈতিক শিক্ষা।',
          icon: TrendingUp,
          color: 'from-emerald-600 to-teal-600',
        },
        {
          title: 'মানবিক বিভাগ',
          subtitle: 'সৃজনশীলতা, সমাজবিজ্ঞান ও মানবিক মূল্যবোধ।',
          icon: BookOpen,
          color: 'from-amber-600 to-orange-600',
        }
      ];

  const noticeListToRender = notices.slice(0, 5).map(n => {
    let day = '০১';
    let month = 'মে';
    if (n.date && typeof n.date === 'string') {
      const parts = n.date.split(' ');
      if (parts.length >= 2) {
        day = parts[0];
        month = parts[1];
      } else {
        day = n.date;
      }
    } else if (n.createdAt) {
      const d = new Date(n.createdAt);
      day = d.getDate().toString();
      month = d.toLocaleString('bn-BD', { month: 'short' });
    }
    return {
      _id: n._id,
      day,
      month,
      title: n.title,
      href: '/notices'
    };
  });

  const eventListToRender = events.slice(0, 5).map(e => ({
    day: e.day || e.date?.split(' ')[0] || '১৫',
    month: e.month || e.date?.split(' ')[1] || 'মে',
    title: e.title
  }));

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: একাডেমিক বিভাগ */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] border-b border-slate-200 pb-2.5">
              একাডেমিক বিভাগ
            </h2>

            <div className="space-y-4">
              {departmentsToRender.map((dept, idx) => {
                const Icon = dept.icon || GraduationCap;
                return (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex items-center gap-4 group">
                    {dept.image ? (
                      <img 
                        src={dept.image} 
                        alt={dept.title} 
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color || 'from-blue-600 to-indigo-600'} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition">
                        {dept.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-0.5">
                        {dept.subtitle || dept.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: সর্বশেষ নোটিশ */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2545]">
                সর্বশেষ নোটিশ
              </h2>
              <Link href="/notices" className="text-xs font-bold text-blue-700 hover:underline">
                সব নোটিশ দেখুন
              </Link>
            </div>

            <div className="space-y-3">
              {noticeListToRender.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 italic">
                  কোনো নোটিশ পাওয়া যায়নি
                </div>
              ) : (
                noticeListToRender.map((notice, idx) => (
                  <div key={notice._id || idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 hover:bg-white hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-100/80 border border-blue-200 flex flex-col items-center justify-center shrink-0">
                        <span className="text-sm font-black text-blue-800 leading-none">{notice.day}</span>
                        <span className="text-[10px] font-bold text-blue-600 leading-none mt-0.5">{notice.month}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 hover:text-blue-700 transition">
                          {notice.title}
                        </h4>
                        <Link href={notice.href} className="text-[11px] font-bold text-blue-600 hover:underline">
                          বিস্তারিত দেখুন
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 3: আসন্ন অনুষ্ঠান */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2545]">
                আসন্ন অনুষ্ঠান
              </h2>
              <Link href="/notices" className="text-xs font-bold text-emerald-700 hover:underline">
                সব অনুষ্ঠান দেখুন
              </Link>
            </div>

            <div className="space-y-3">
              {eventListToRender.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 italic">
                  কোনো আসন্ন অনুষ্ঠান তালিকাভুক্ত নেই
                </div>
              ) : (
                eventListToRender.map((event, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 hover:bg-white hover:shadow-md transition">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/80 border border-emerald-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-sm font-black text-emerald-800 leading-none">{event.day}</span>
                      <span className="text-[10px] font-bold text-emerald-600 leading-none mt-0.5">{event.month}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {event.title}
                      </h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
