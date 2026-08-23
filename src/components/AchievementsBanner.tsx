'use client';

import React from 'react';
import { Award, Trophy, Medal, Crown } from 'lucide-react';

interface AchievementsBannerProps {
  settings?: any;
}

export default function AchievementsBanner({ settings }: AchievementsBannerProps) {
  const stats = [
    { title: settings?.stats?.passRate || '৯৮%', label: 'এসএসসি পাসের হার', icon: Award },
    { title: '৪৫০+', label: 'জিপিএ-৫ প্রাপ্ত', icon: Crown },
    { title: '১২০+', label: 'জাতীয় পুরস্কার', icon: Trophy },
    { title: settings?.stats?.establishedYear || '৩০+ বছর', label: 'শিক্ষা সেবার ঐতিহ্য', icon: Medal }
  ];

  return (
    <section className="py-16 bg-[#0B1B3D] text-white relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & 4 Stats */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight border-l-4 border-amber-400 pl-4">
              আমাদের অর্জনসমূহ
            </h2>

            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {stats.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold shrink-0 border border-amber-400/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-amber-400">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-300">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Victory Trophy Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full bg-gradient-to-br from-amber-500/20 via-blue-900/40 to-slate-900/80 rounded-3xl p-8 border border-amber-400/30 shadow-2xl backdrop-blur-md text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-amber-400">জাতীয় শ্রেষ্ঠ শিক্ষাপ্রতিষ্ঠান স্বীকৃতি</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                বিজ্ঞান অলিম্পিয়াড, বিতর্ক ও বোর্ড পরীক্ষায় শতভাগ পাসের অনন্য গৌরব। সৃজনশীল শিক্ষা ও মেধা বিকাশের শ্রেষ্ঠ পদকপ্রাপ্ত প্রতিষ্ঠান।
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold border border-amber-400/30">
                  ★ চ্যাম্পিয়ন অ্যাওয়ার্ড জয়ী
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
