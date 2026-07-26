'use client';

import React from 'react';
import Link from 'next/link';

interface InfoHubSectionProps {
  notices?: any[];
  events?: any[];
}

export default function InfoHubSection({ notices, events }: InfoHubSectionProps) {
  const departments = [
    {
      title: 'বিজ্ঞান বিভাগ',
      subtitle: 'আধুনিক ল্যাব ও গবেষণামূলক শিক্ষা।',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80'
    },
    {
      title: 'ব্যবসায় শিক্ষা বিভাগ',
      subtitle: 'বাস্তবমুখী ও ব্যবহারিক শিক্ষা।',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80'
    },
    {
      title: 'মানবিক বিভাগ',
      subtitle: 'সৃজনশীলতা, সমাজবিজ্ঞান ও মানবিক মূল্যবোধের শিক্ষা।',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80'
    }
  ];

  const defaultNotices = [
    { day: '২৬', month: 'মে', title: 'অর্ধবার্ষিক পরীক্ষার রুটিন প্রকাশ', href: '/notices' },
    { day: '২০', month: 'মে', title: '২০২৬ शिक्षাবর্ষের ভর্তি বিজ্ঞপ্তি', href: '/notices' },
    { day: '১৫', month: 'মে', title: 'স্বাধীনতা দিবস উপলক্ষে সাংস্কৃতিক অনুষ্ঠান', href: '/notices' },
    { day: '১০', month: 'মে', title: 'বৃষ্টির আবহাওয়া উপলক্ষে ছুটি', href: '/notices' },
    { day: '০৫', month: 'মে', title: 'ক্লাস রুটিন আপডেট', href: '/notices' }
  ];

  const defaultEvents = [
    { day: '০৬', month: 'জুন', title: 'বিজ্ঞান মেলা' },
    { day: '১২', month: 'জুন', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা' },
    { day: '২০', month: 'জুন', title: 'সাংস্কৃতিক অনুষ্ঠান' },
    { day: '২৫', month: 'জুন', title: 'বিতর্ক প্রতিযোগিতা' },
    { day: '৩০', month: 'জুন', title: 'অভিভাবক সমাবেশ' }
  ];

  const noticeListToRender = notices && notices.length > 0 
    ? notices.slice(0, 5).map(n => ({
        day: n.date ? n.date.split(' ')[0] : '২৬',
        month: n.date ? n.date.split(' ')[1] || 'মে' : 'মে',
        title: n.title,
        href: '/notices'
      }))
    : defaultNotices;

  const eventListToRender = events && events.length > 0
    ? events.slice(0, 5).map(e => ({
        day: e.day || '০৬',
        month: e.month || 'জুন',
        title: e.title
      }))
    : defaultEvents;

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
              {departments.map((dept, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex items-center gap-4 group">
                  <img 
                    src={dept.image} 
                    alt={dept.title} 
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition">
                      {dept.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-0.5">
                      {dept.subtitle}
                    </p>
                  </div>
                </div>
              ))}
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
              {noticeListToRender.map((notice, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 hover:bg-white hover:shadow-md transition">
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
              ))}
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
              {eventListToRender.map((event, idx) => (
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
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
