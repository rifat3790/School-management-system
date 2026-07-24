'use client';

import React from 'react';
import { 
  Users, 
  MonitorPlay, 
  FlaskConical, 
  BookMarked, 
  Trophy, 
  Music, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Users,
      title: 'অভিজ্ঞ ও দক্ষ শিক্ষক',
      desc: 'ঢাকা বিশ্ববিদ্যালয় ও বুয়েটের মতো শীর্ষ প্রতিষ্ঠানের উচ্চ ডিগ্রিধারী ও প্রশিক্ষিত শিক্ষকবৃন্দ।',
      gradient: 'from-blue-500 to-indigo-600',
      badge: '৪৫+ শিক্ষক',
      link: '/teachers',
    },
    {
      icon: MonitorPlay,
      title: 'ডিজিটাল স্মার্ট শ্রেণিকক্ষ',
      desc: 'প্রতিটি ক্লাসে ৭৫ ইঞ্চি ৪কে ইন্টারেক্টিভ ডিসপ্লে বোর্ডের সাহায্যে থ্রিডি অ্যানিমেশন পাঠদান।',
      gradient: 'from-sky-400 to-blue-600',
      badge: '৩২টি স্মার্ট বোর্ড',
      link: '/academic',
    },
    {
      icon: FlaskConical,
      title: 'আধুনিক বিজ্ঞানাগার ও রোবোটিক্স',
      desc: 'পদার্থ, রসায়ন, জীববিজ্ঞান ও আধুনিক রোবোটিক্স কিট সমৃদ্ধ আন্তর্জাতিক মানের পৃথক ল্যাব।',
      gradient: 'from-emerald-500 to-teal-700',
      badge: '৩টি পৃথক ল্যাব',
      link: '/academic',
    },
    {
      icon: BookMarked,
      title: 'ডিজিটাল ও সমৃদ্ধ লাইব্রেরি',
      desc: '৫,০০০+ রেফারেন্স বই, ই-বুক এবং শান্ত পরিবেশ সম্বলিত রিডিং রুম ব্যবস্থা।',
      gradient: 'from-purple-500 to-indigo-600',
      badge: '৫০০০+ পুস্তক',
      link: '/library',
    },
    {
      icon: Trophy,
      title: 'খেলাধুলা ও শারীরিক শিক্ষা',
      desc: 'বিশাল খেলার মাঠ, ক্রিকেট, ফুটবল ক্লাব এবং পেশাদার শারীরিক শিক্ষা প্রশিক্ষক।',
      gradient: 'from-amber-400 to-orange-500',
      badge: 'স্পোর্টস কমপ্লেক্স',
      link: '/news',
    },
    {
      icon: Music,
      title: 'সাংস্কৃতিক ও সহ-পাঠ্যক্রম',
      desc: 'বিতর্ক ক্লাব, সঙ্গীত, নৃত্য, স্কাউটিং এবং বার্ষিক দেয়াল পত্রিকা প্রকাশনা।',
      gradient: 'from-rose-500 to-red-600',
      badge: '৭টি সক্রিয় ক্লাব',
      link: '/gallery',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-50 text-secondary-600 text-xs font-bold border border-secondary-200">
            <Sparkles className="w-3.5 h-3.5" />
            কেন ডাঃ মুজিব-রুবি মডেল হাই স্কুল সেরা?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-heading">
            প্রতিষ্ঠানের বিশেষ বৈশিষ্ট্যসমূহ
          </h2>
          <p className="text-paragraph text-sm md:text-base">
            শিক্ষার্থীদের আন্তর্জাতিক মানের মেধা বিকাশ ও শারীরিক-মানসিক গঠনের অনন্য পরিবেশ।
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group glass-card p-6 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-heading mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-paragraph text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-secondary-600 transition-colors"
                  >
                    বিস্তারিত দেখুন
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
