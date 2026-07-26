'use client';

import React from 'react';
import Link from 'next/link';
import { 
  UserPlus, 
  Volume2, 
  Calendar, 
  FileCheck, 
  Download, 
  GraduationCap 
} from 'lucide-react';

interface QuickLinksSectionProps {
  settings?: any;
}

export default function QuickLinksSection({ settings }: QuickLinksSectionProps) {
  const defaultLinks = [
    {
      title: 'ভর্তি তথ্য',
      actionText: 'বিস্তারিত দেখুন',
      href: '/admission',
      icon: UserPlus,
      bgIconColor: 'bg-blue-100 text-blue-600',
      borderColor: 'hover:border-blue-300'
    },
    {
      title: 'সর্বশেষ নোটিশ',
      actionText: 'নোটিশ দেখুন',
      href: '/notices',
      icon: Volume2,
      bgIconColor: 'bg-rose-100 text-rose-600',
      borderColor: 'hover:border-rose-300'
    },
    {
      title: 'একাডেমিক ক্যালেন্ডার',
      actionText: 'ডাউনলোড করুন',
      href: '/academic',
      icon: Calendar,
      bgIconColor: 'bg-emerald-100 text-emerald-600',
      borderColor: 'hover:border-emerald-300'
    },
    {
      title: 'অনলাইন ফলাফল',
      actionText: 'ফলাফল দেখুন',
      href: '/result',
      icon: FileCheck,
      bgIconColor: 'bg-purple-100 text-purple-600',
      borderColor: 'hover:border-purple-300'
    },
    {
      title: 'প্রস্পেক্টাস ডাউনলোড',
      actionText: 'ডাউনলোড করুন',
      href: '/academic',
      icon: Download,
      bgIconColor: 'bg-cyan-100 text-cyan-600',
      borderColor: 'hover:border-cyan-300'
    },
    {
      title: 'বৃত্তির তথ্য',
      actionText: 'বিস্তারিত দেখুন',
      href: '/academic',
      icon: GraduationCap,
      bgIconColor: 'bg-amber-100 text-amber-600',
      borderColor: 'hover:border-amber-300'
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
            দ্রুত লিংক
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {defaultLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className={`bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs ${item.borderColor} hover:shadow-md transition duration-200 text-center space-y-3 group flex flex-col items-center justify-between`}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bgIconColor} flex items-center justify-center font-bold group-hover:scale-110 transition duration-200 shadow-2xs`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 mt-1">
                    {item.actionText}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
