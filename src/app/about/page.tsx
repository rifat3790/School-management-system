import React from 'react';
import { Sparkles, Target, Compass } from 'lucide-react';
import PrincipalMessage from '@/components/PrincipalMessage';
import StatsCounter from '@/components/StatsCounter';
import { getSiteSettings } from '@/lib/dataFetchers';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const schoolName = settings?.schoolName || 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল';
  const slogan = settings?.slogan || 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ';
  const eiin = settings?.eiin || '১৩০৯৫৪';
  const code = settings?.code || '৪৫২০';
  const established = settings?.established || '১৯৯৮';
  const aboutHistory = settings?.aboutHistory || 'প্রতিষ্ঠালগ্ন থেকেই আমাদের বিদ্যালয় মানবতা শিক্ষা, সুস্থতা, নৈতিকতা এবং প্রযুক্তিনির্ভর শিক্ষার মাধ্যমে শিক্ষার্থীদের একটি সুন্দর ভবিষ্যৎ গড়ে তুলতে কাজ করে যাচ্ছে।';
  const missionText = settings?.missionText || 'গুণগত মানসম্মত শিক্ষা, সুশৃঙ্খল পরিবেশ ও আধুনিক ল্যাব সুবিধার মাধ্যমে আন্তর্জাতিক মানের নাগরিক তৈরি করা।';
  const visionText = settings?.visionText || 'প্রযুক্তিনির্ভর ও নৈতিক মূল্যবোধসম্পন্ন স্মার্ট বাংলাদেশ গড়ার নেতৃত্ব দানকারী প্রজন্ম গড়ে তোলা।';

  return (
    <div className="py-12 space-y-12 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            প্রতিষ্ঠানের বিবরণ ও ইতিহাস (Live Database)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">{schoolName}</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {slogan} — {established} সাল থেকে শিক্ষার আলো ছড়িয়ে চলেছে আমাদের প্রিয় এই বিদ্যাপীঠ।
          </p>
        </div>
      </section>

      {/* History & Foundation */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src={settings?.heroImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80"}
                alt="School Campus Building"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              আমাদের ইতিহাস
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              একটি স্বপ্ন থেকে আজ দেশের অন্যতম সেরা স্মার্ট শিক্ষা নিকেতন
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutHistory}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-blue-600">ইআইআইএন (EIIN)</p>
                <p className="text-lg font-bold text-slate-900">{eiin}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-emerald-600">স্কুল কোড</p>
                <p className="text-lg font-bold text-slate-900">{code}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">আমাদের লক্ষ্য (Mission)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{missionText}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">আমাদের ভিশন (Vision)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{visionText}</p>
          </div>
        </div>
      </section>

      {/* Stats Counter (Live Database Stats) */}
      <StatsCounter stats={(settings as any)?.stats} />

      {/* Principal & Chairman Message */}
      <PrincipalMessage settings={settings} />
    </div>
  );
}
