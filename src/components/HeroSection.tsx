'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  UserCheck, 
  Award, 
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface HeroSectionProps {
  settings?: any;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tagline: settings?.heroTagline || '২০২৬ শিক্ষাবর্ষে ভর্তি চলছে',
      title1: settings?.heroTitleLine1 || 'শিক্ষাই জাতির মেরুদণ্ড',
      title2: settings?.heroTitleLine2 || 'সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি',
      description: settings?.heroDescription || 'আমাদের বিদ্যালয় প্রতিটি শিক্ষার্থীর মধ্যে নৈতিক স্তম্ভতার সাথে আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তির মাধ্যমে আগামী দিনে তুলে ধরছি আগামী প্রজন্মের সেরা, সৃজনশীল ও সামাজিক নেতৃত্ব।',
      image: settings?.heroImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80',
      badge: 'সেরা ডিজিটাল শিক্ষাঙ্গন',
      badgeIcon: ShieldCheck
    },
    {
      tagline: 'আধুনিক স্টেম ও রোবোটিক্স ল্যাব',
      title1: 'প্রযুক্তি ও উদ্ভাবনের নতুন দিগন্ত',
      title2: 'ভবিষ্যতের স্মার্ট স্কিলস ও কোডিং',
      description: 'আমাদের ক্লাসরুমে রয়েছে ৪র্থ প্রজন্মের ইন্টারেক্টিভ ডিসপ্লে, মাইক্রোকন্ট্রোলার ও ৩ডি প্রিন্টিং ল্যাব যা প্রতিটি শিক্ষার্থীকে বিশ্বমানের গবেষণায় সাহায্য করে।',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
      badge: 'রোবোটিক্স ও কোডিং ল্যাব',
      badgeIcon: Cpu
    },
    {
      tagline: 'জাতীয় ও আন্তর্জাতিক সাফল্য',
      title1: 'মেধা, ক্রীড়া ও সংস্কৃতিতে শীর্ষস্থান',
      title2: 'অলিম্পিয়াড ও চ্যাম্পিয়নশিপ বিজয়',
      description: 'জাতীয় বিজ্ঞান অলিম্পিয়াড, বিতর্ক ও বার্ষিক ক্রীড়ায় আমাদের ট্রফি অর্জন অত্র অঞ্চলের শিক্ষাঙ্গনে এক অনন্য রেকর্ড তৈরি করেছে।',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
      badge: 'জাতীয় চ্যাম্পিয়ন ট্রফি জয়ী',
      badgeIcon: Award
    }
  ];

  // Auto slide transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;

  const statsList = [
    { value: settings?.stats?.establishedYear || '৩০+ বছর', label: 'ঐতিহ্য ও সাফল্য', icon: Building2 },
    { value: settings?.stats?.students || '৩,৫০০+', label: 'শিক্ষার্থী', icon: Users },
    { value: settings?.stats?.teachers || '১৪০+', label: 'অভিজ্ঞ শিক্ষক', icon: UserCheck },
    { value: settings?.stats?.passRate || '৯৮%', label: 'বোর্ড পরীক্ষায় পাসের হার', icon: Award }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50/90 via-slate-50 to-blue-100/50 pt-8 pb-16 overflow-hidden">
      
      {/* Enhanced Slanted Polygon Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-sky-100/30 to-indigo-100/20 pointer-events-none -z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)' }}
      />

      {/* Decorative Glow Circles */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Hero Slider Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px]">
          
          {/* Left Column: Dynamic Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left transition-all duration-500">
            
            <div className="inline-flex items-center gap-2 bg-blue-100/90 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              {activeSlide.tagline}
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {activeSlide.title1}
              </h1>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-blue-700 tracking-tight leading-tight">
                {activeSlide.title2}
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium min-h-[72px]">
              {activeSlide.description}
            </p>

            {/* CTAs & Slide Controls */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/admission"
                className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-700/25 hover:scale-[1.02] transition duration-200 text-sm sm:text-base flex items-center gap-2"
              >
                <span>ভর্তি আবেদন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/about"
                className="bg-white hover:bg-slate-100 text-slate-800 font-extrabold px-7 py-3.5 rounded-2xl border border-slate-300 shadow-2xs hover:scale-[1.02] transition duration-200 text-sm sm:text-base"
              >
                আমাদের সম্পর্কে জানুন
              </Link>

              {/* Slider Manual Arrows */}
              <div className="flex items-center gap-2 ml-auto sm:ml-4">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition flex items-center justify-center shadow-2xs"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition flex items-center justify-center shadow-2xs"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-blue-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Enhanced Leaf Glassmorphic Mask Cut Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Double-Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 rounded-[55px_15px_55px_15px] blur-xl opacity-35" />
              
              {/* Main Curved Leaf Mask Frame */}
              <div className="relative rounded-[50px_15px_50px_15px] overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[4/3] sm:aspect-[14/10]">
                <img 
                  src={activeSlide.image} 
                  alt={activeSlide.title1} 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                />
                
                {/* Floating Glassmorphic Badge Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold shadow-md">
                    <BadgeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{activeSlide.badge}</h4>
                    <p className="text-[10px] font-bold text-blue-700">ডাঃ মুজিব-রুবি মডেল হাই স্কুল</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating 4 Stat Cards Overlapping below Hero Banner */}
        <div className="pt-2">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statsList.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-blue-50/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center font-bold shadow-md shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</h3>
                    <p className="text-xs text-slate-500 font-bold">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
