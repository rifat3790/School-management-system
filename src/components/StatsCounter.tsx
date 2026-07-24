'use client';

import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Trophy, Calendar, Sparkles } from 'lucide-react';

interface StatsProps {
  stats?: {
    students?: string;
    teachers?: string;
    passRate?: string;
    establishedYear?: string;
  };
}

export default function StatsCounter({ stats: propStats }: StatsProps) {
  const [liveStats, setLiveStats] = useState({
    students: '২,৮৮০+',
    teachers: '৯৫+',
    passRate: '২১৫+',
    establishedYear: '১৯৯৮'
  });

  useEffect(() => {
    if (propStats) {
      setLiveStats({
        students: propStats.students || '২,৮৮০+',
        teachers: propStats.teachers || '৯৫+',
        passRate: propStats.passRate || '২১৫+',
        establishedYear: propStats.establishedYear || '১৯৯৮'
      });
      return;
    }

    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings && data.settings.stats) {
          setLiveStats({
            students: data.settings.stats.students || '২,৮৮০+',
            teachers: data.settings.stats.teachers || '৯৫+',
            passRate: data.settings.stats.passRate || '২১৫+',
            establishedYear: data.settings.stats.establishedYear || '১৯৯৮'
          });
        }
      })
      .catch((err) => console.error(err));
  }, [propStats]);

  const statsItems = [
    {
      icon: Users,
      value: liveStats.students,
      label: 'মোট শিক্ষার্থী',
      subtext: '৬ষ্ঠ থেকে ১০ম শ্রেণী',
      emoji: '👨‍🎓',
      bgGradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: GraduationCap,
      value: liveStats.teachers,
      label: 'অভিজ্ঞ শিক্ষক-শিক্ষিকা',
      subtext: 'উচ্চ ডিগ্রিধারী বিশেষজ্ঞ',
      emoji: '👩‍🏫',
      bgGradient: 'from-sky-400 to-blue-600',
    },
    {
      icon: Trophy,
      value: liveStats.passRate,
      label: 'এসএসসি জিপিএ-৫ / পাশের হার',
      subtext: 'উৎকর্ষের গৌরবময় স্মারক',
      emoji: '🏆',
      bgGradient: 'from-amber-400 to-orange-500',
    },
    {
      icon: Calendar,
      value: liveStats.establishedYear,
      label: 'প্রতিষ্ঠাবর্ষ',
      subtext: 'গৌরবময় দীর্ঘ পথচলা',
      emoji: '📖',
      bgGradient: 'from-emerald-500 to-teal-700',
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group glass-card p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden border border-slate-200/80"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${stat.bgGradient} text-white flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl select-none">{stat.emoji}</span>
                </div>

                <div>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-1 font-sans">
                    {stat.value}
                  </h3>
                  <p className="font-bold text-base text-slate-800">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{stat.subtext}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    লাইভ ডাটাবেজ তথ্য
                  </span>
                  <span>লাইভ আপডেট</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
