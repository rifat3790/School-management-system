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

          {/* Right Column: Victory Trophy Photo */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" 
                alt="ডাঃ মুজিব-রুবি মডেল হাই স্কুলের সাফল্য ও ট্রফি"
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
