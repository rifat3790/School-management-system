'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Mic, 
  Trophy, 
  Shield, 
  Users, 
  Sparkles, 
  ArrowRight,
  Compass
} from 'lucide-react';

interface Club {
  name: string;
  category: string;
  desc: string;
  membersCount: string;
  iconName: string;
  image: string;
}

interface ClubsSectionProps {
  clubs?: Club[];
}

export default function ClubsSection({ clubs = [] }: ClubsSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Mic': return <Mic className="w-5 h-5 text-rose-600" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-600" />;
      default: return <Compass className="w-5 h-5 text-blue-600" />;
    }
  };

  const defaultClubs: Club[] = [
    { name: 'সায়েন্স ও রোবোটিক্স ক্লাব', category: 'বিজ্ঞান ও প্রযুক্তি', desc: 'আইওটি কিট, অর্ডুইনো প্রোগ্রামিং ও জাতীয় রোবোটিক্স প্রতিযোগিতার সেরা টিম।', membersCount: '১২০+ সদস্য', iconName: 'Cpu', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80' },
    { name: 'বিতর্ক ও সাংস্কৃতিক পরিষদ', category: 'সহ-শিক্ষা', desc: 'যুক্তিনির্ভর চিন্তা ও বাচনভঙ্গি বিকাশে প্রতি সপ্তাহে অভ্যন্তরীণ বিতর্ক প্রতিযোগিতা।', membersCount: '১৫০+ সদস্য', iconName: 'Mic', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80' },
    { name: 'স্পোর্টস ও অ্যাথলেটিক্স ক্লাব', category: 'খেলাধুলা', desc: 'ফুটবল, ক্রিকেট, ব্যাডমিন্টন ও বার্ষিক আন্তঃস্কুল টুর্নামেন্ট চ্যাম্পিয়ন টিম।', membersCount: '২০০+ সদস্য', iconName: 'Trophy', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80' },
    { name: 'বয় স্কাউটস ও রেড ক্রিসেন্ট', category: 'সমাজসেবা', desc: 'শৃঙ্খলা, নেতৃত্ব, দুর্যোগ ব্যবস্থাপনা ও সেবামূলক কর্মকাণ্ডে নিবেদিত স্কোয়াড।', membersCount: '৯০+ সদস্য', iconName: 'Shield', image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=600&q=80' }
  ];

  const list = clubs.length > 0 ? clubs : defaultClubs;

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200 shadow-xs">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              সহ-শিক্ষা ও ক্লাব অ্যাক্টিভিটি
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              অনিন্দ্য সুন্দর ক্যাম্পাস লাইফ ও ক্লাবসমূহ
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              পুঁথিগত শিক্ষার বাইরে নেতৃত্ব, সৃজনশীলতা ও টিমওয়ার্ক গড়ে তোলার জন্য সক্রিয় সহ-শিক্ষা ক্লাব।
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 px-5 py-2.5 bg-white text-slate-800 hover:text-blue-600 border border-slate-200 rounded-2xl font-bold text-xs shadow-xs hover:border-slate-300 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            ক্লাবে যুক্ত হোন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((club, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={club.image} 
                  alt={club.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-extrabold text-slate-800 shadow-xs border border-white">
                  {club.category}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                  <span className="text-xs font-bold bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/20">
                    {club.membersCount}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                      {getIcon(club.iconName)}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition">
                      {club.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {club.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>সাপ্তাহিক সেশন</span>
                  <span className="group-hover:translate-x-1 transition">অংশ নিন &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
