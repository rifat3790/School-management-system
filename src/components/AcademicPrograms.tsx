'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Atom, 
  BookOpen, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface Program {
  title: string;
  subtitle: string;
  desc: string;
  classRange: string;
  iconName: string;
  bgGradient?: string;
}

interface AcademicProgramsProps {
  programs?: Program[];
}

export default function AcademicPrograms({ programs = [] }: AcademicProgramsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-7 h-7 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-7 h-7 text-emerald-600" />;
      case 'TrendingUp': return <TrendingUp className="w-7 h-7 text-amber-600" />;
      case 'Award': return <Award className="w-7 h-7 text-sky-600" />;
      default: return <GraduationCap className="w-7 h-7 text-blue-600" />;
    }
  };

  const defaultPrograms: Program[] = [
    { title: 'বিজ্ঞান বিভাগ (Science Stream)', subtitle: 'পদার্থ, রসায়ন, জীববিজ্ঞান ও আইসিটি', desc: 'অ্যাডভান্সড প্র্যাকটিক্যাল ল্যাব সেশন, রোবোটিক্স ও স্টেম অলিম্পিয়াড ট্রেনিং প্রোগ্রাম।', classRange: 'নবম - দশম শ্রেণি', iconName: 'Atom', bgGradient: 'from-blue-50 to-indigo-50/50' },
    { title: 'মানবিক বিভাগ (Humanities)', subtitle: 'ইতিহাস, পৌরনীতি, অর্থনীতি ও সাহিত্য', desc: 'বিতর্ক ক্লাব, সৃজনশীল রাইটিং ওয়ার্কশপ ও সাধারণ জ্ঞান চর্চা কেন্দ্র।', classRange: 'নবম - দশম শ্রেণি', iconName: 'BookOpen', bgGradient: 'from-emerald-50 to-teal-50/50' },
    { title: 'ব্যবসায় শিক্ষা (Business Studies)', subtitle: 'হিসাববিজ্ঞান, ফিন্যান্স ও ব্যবসায় উদ্যোগ', desc: 'ডিজিটাল ব্যাংকিং প্র্যাকটিস, স্মার্ট এন্টারপ্রেনারশিপ ওয়ার্কশপ ও কেস স্টাডি।', classRange: 'নবম - দশম শ্রেণি', iconName: 'TrendingUp', bgGradient: 'from-amber-50 to-orange-50/50' },
    { title: 'জুনিয়র ফাউন্ডেশন (Junior Core)', subtitle: 'ষষ্ঠ থেকে অষ্টম শ্রেণি ভিত্তিক মানসম্মত পাঠদান', desc: 'ডিজিটাল গণিত ল্যাব, স্পোকেন ইংলিশ ক্লাস ও কোডিং মৌলিক কোর্স।', classRange: 'ষষ্ঠ - অষ্টম শ্রেণি', iconName: 'Award', bgGradient: 'from-sky-50 to-blue-50/50' }
  ];

  const list = programs.length > 0 ? programs : defaultPrograms;

  return (
    <section className="py-16 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Decorative Light Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full filter blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            একাডেমিক কারিকুলাম ও শাখা
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            আন্তর্জাতিক মানের বিশ্বস্ত শিক্ষা প্রোগ্রাম
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            মেধা বিকাশ, জাতীয় কারিকুলাম ও আধুনিক প্রযুক্তিগত দক্ষতার সমন্বয়ে আমাদের সমৃদ্ধ শিক্ষা কার্যক্রম।
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((prog, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between space-y-5 group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:scale-110 transition">
                    {getIcon(prog.iconName)}
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-bold text-[11px] border border-slate-200">
                    {prog.classRange}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600">
                    {prog.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {prog.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ১০০% সিলেবাস কভারেজ
                </span>
                <Link href="/academic" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition">
                  বিস্তারিত <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
