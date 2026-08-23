'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface EventItem {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

interface EventsSectionProps {
  events?: EventItem[];
}

export default function EventsSection({ events = [] }: EventsSectionProps) {
  const defaultEvents: EventItem[] = [
    { title: 'বার্ষিক বিজ্ঞান মেলা ও রোবোটিক্স প্রদর্শনী ২০২৬', date: '১৫ মার্চ, ২০২৬', time: 'সকাল ০৯:০০ - বিকেল ০৪:০০', location: 'স্কুল অডিটোরিয়াম', category: 'বিজ্ঞান' },
    { title: 'আন্তঃশ্রেণি বিতর্ক ও দেয়াল পত্রিকা উৎসব', date: '২৮ মার্চ, ২০২৬', time: 'সকাল ১০:০০ - দুপুর ০২:০০', location: 'সেন্ট্রাল লাইব্রেরি হল', category: 'সংস্কৃতি' },
    { title: 'প্রথম সাময়িক মডেল টেস্ট ও অভিভাবক মতবিনিময়', date: '১০ এপ্রিল, ২০২৬', time: 'সকাল ০৯:৩০ - দুপুর ০১:০০', location: 'প্রধান ক্যাম্পাস', category: 'একাডেমিক' }
  ];

  const list = events.length > 0 ? events : defaultEvents;


  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              একাডেমিক ক্যালেন্ডার ও সমসূচি
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              আসন্ন ক্যাম্পাস ইভেন্ট ও অনুষ্ঠানসমূহ
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              পরীক্ষা, সংস্কৃতি, প্রতিযোগিতা ও অভিভাবক সমাবেশের সময়সূচি সম্পর্কে প্রতিনিয়ত আপডেট থাকুন।
            </p>
          </div>

          <Link
            href="/notices"
            className="shrink-0 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-bold text-xs shadow-md transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>সব ইভেন্ট দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((evt, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                {evt.image ? (
                  <img 
                    src={evt.image} 
                    alt={evt.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="text-center p-6 space-y-1 text-white">
                    <Calendar className="w-10 h-10 text-sky-400 mx-auto" />
                    <span className="text-xs font-bold text-sky-200">{evt.category} ইভেন্ট</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl text-center shadow-md border border-white">
                  <span className="block text-[10px] font-black uppercase text-blue-600">আসন্ন</span>
                  <span className="block text-xs font-extrabold text-slate-900">{evt.date}</span>
                </div>

                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                  {evt.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    মুক্ত নিবন্ধন
                  </span>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    ক্যালেন্ডারে যোগ করুন &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
