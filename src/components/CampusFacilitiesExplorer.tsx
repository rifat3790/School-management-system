'use client';

import React, { useState } from 'react';
import { 
  Laptop, 
  FlaskConical, 
  BookOpen, 
  Tv, 
  Trophy, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Wifi, 
  Bus
} from 'lucide-react';
import Link from 'next/link';

interface Facility {
  title: string;
  desc: string;
  badge: string;
  iconName?: string;
  image?: string;
}

interface FacilitiesProps {
  facilities?: Facility[];
}

const DEFAULT_FACILITIES: Facility[] = [
  {
    title: 'স্মার্ট আইসিটি ও রোবোটিক্স ল্যাব',
    desc: '৬০টি আধুনিক হাই-স্পিড কম্পিউটার, ব্রডব্যান্ড ইন্টারনেট এবং পাইথন ও প্রোগ্রামিং শেখার পূর্ণাঙ্গ সুযোগ।',
    badge: '৬০+ কম্পিউটার ও রোবোটিক্স কিট',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    iconName: 'Laptop'
  },
  {
    title: 'আধুনিক পদার্থ, রসায়ন ও জীববিজ্ঞান ল্যাব',
    desc: 'আধুনিক যন্ত্রপাতি, টেস্ট টিউব, মাইক্রোস্কোপ ও রাসায়নিক সংবলিত হাতে-কলমে বিজ্ঞান গবেষণার ল্যাব।',
    badge: 'আন্তর্জাতিক মানের ল্যাব সরঞ্জাম',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
    iconName: 'FlaskConical'
  },
  {
    title: 'ডিজিটাল ই-লাইব্রেরী ও রিডিং লাউঞ্জ',
    desc: '১০,০০০+ একাডেমিক বই, রেফারেন্স গাইড, ই-বুক এবং শান্ত পরিবেশে অধ্যয়নের সুব্যবস্থা।',
    badge: '১০,০০০+ বই ও রিসার্চ কর্নার',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80',
    iconName: 'BookOpen'
  },
  {
    title: 'মাল্টিমিডিয়া স্মার্ট ক্লাসরুম',
    desc: 'ইন্টারেক্টিভ ডিজিটাল বোর্ড ও প্রজেক্টরের মাধ্যমে ভিজ্যুয়াল লার্নিং ও স্মার্ট অ্যানিমেশন ক্লাস।',
    badge: 'ডিজিটাল প্রজেক্টর ও সাউন্ড সিস্টেম',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    iconName: 'Tv'
  },
  {
    title: 'বিশাল খেলার মাঠ ও স্পোর্টস কমপ্লেক্স',
    desc: 'ক্রিকেট, ফুটবল, ব্যাডমিন্টন ও অ্যাথলেটিক্স চর্চার জন্য সুপ্রশস্ত সবুজ খেলার মাঠ।',
    badge: 'আন্তর্জাতিক মানের খেলার মাঠ',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
    iconName: 'Trophy'
  },
  {
    title: '২৪/৭ সিসিটিভি ও নিরাপদ ক্যাম্পাস',
    desc: 'পুরো ক্যাম্পাস সিসিটিভি ক্যামেরার আওতাধীন এবং নিরাপদ বিশুদ্ধ খাবার পানি ও জেনারেটর ব্যাকআপ।',
    badge: '১০০% নিরাপদ ও সুরক্ষিত ক্যাম্পাস',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80',
    iconName: 'ShieldCheck'
  }
];

export default function CampusFacilitiesExplorer({ facilities }: FacilitiesProps) {
  const displayList = (facilities && facilities.length > 0) ? facilities : DEFAULT_FACILITIES;
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            বিশ্বমানের অবকাঠামো ও পরিবেশ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            আধুনিক ক্যাম্পাস ও গবেষণাগার সুবিধাসমূহ
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            শিক্ষার্থীদের আধুনিক জ্ঞান-বিজ্ঞানে সমৃদ্ধ করতে ডাঃ মুজিব-রুবি মডেল হাই স্কুলে রয়েছে সর্বাধুনিক ল্যাব ও অবকাঠামোগত সুযোগ।
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={item.image || DEFAULT_FACILITIES[idx % DEFAULT_FACILITIES.length].image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-blue-400/30">
                  {item.badge}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-blue-700 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> সার্বক্ষণিক সক্রিয় সুবিধা
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
