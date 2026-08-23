'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Facebook, 
  Youtube, 
  Twitter,
  Instagram,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [settings, setSettings] = useState<any>({
    schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
    eiin: '১৩০৯৫৪',
    code: '৪৫২০',
    established: '১৯৯৮',
    phone: '+৮৮০ ১৭০০-০০০০০',
    email: 'info@drmujibrubi.edu.bd',
    address: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#0B2545] text-slate-200 pt-16 pb-8 border-t border-blue-900">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: যোগাযোগ করুন */}
          <div className="space-y-4">
            <h3 className="text-white font-black text-lg border-l-4 border-blue-500 pl-3">
              যোগাযোগ করুন
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span>www.drmujibrubi.edu.bd</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-sky-500 text-white flex items-center justify-center transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-pink-600 text-white flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: দ্রুত লিংক */}
          <div className="space-y-4">
            <h3 className="text-white font-black text-lg border-l-4 border-blue-500 pl-3">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
              {[
                { label: 'হোম', href: '/' },
                { label: 'আমাদের সম্পর্কে', href: '/about' },
                { label: 'একাডেমিক', href: '/academic' },
                { label: 'শিক্ষকবৃন্দ', href: '/teachers' },
                { label: 'নোটিশ', href: '/notices' },
                { label: 'ফলাফল', href: '/result' },
                { label: 'গ্যালারি', href: '/gallery' },
                { label: 'যোগাযোগ', href: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-blue-400 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: গুরুত্বপূর্ণ সেবা ও পোর্টাল */}
          <div className="space-y-4">
            <h3 className="text-white font-black text-lg border-l-4 border-blue-500 pl-3">
              ডিজিটাল সেবা ও পোর্টাল
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
              <li><Link href="/academic-calendar" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> ক্যালেন্ডার ও ছুটির তালিকা ২০২৬</Link></li>
              <li><Link href="/id-card" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> ডিজিটাল আইডি কার্ড পোর্টাল</Link></li>
              <li><Link href="/fee-calculator" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> টিউশন ফি ও খরচ ক্যালকুলেটর</Link></li>
              <li><Link href="/verify-certificate" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> সনদপত্র ও প্রশংসাপত্র যাচাই</Link></li>
              <li><Link href="/admission" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> অনলাইন ভর্তি আবেদন</Link></li>
              <li><Link href="/library" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> ডিজিটাল ই-লাইব্রেরী</Link></li>
              <li><Link href="/alumni" className="hover:text-blue-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-blue-400" /> প্রাক্তন শিক্ষার্থী পরিষদ (Alumni)</Link></li>
            </ul>
          </div>

          {/* Column 4: নিউজলেটার সাবস্ক্রাইব করুন & Shield Crest Logo */}
          <div className="space-y-5">
            <h3 className="text-white font-black text-lg border-l-4 border-blue-500 pl-3">
              নিউজলেটার সাবস্ক্রাইব করুন
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              নিয়মিত আপডেট পেতে আপনার ইমেইল দিন
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="আপনার ইমেইল অ্যাড্রেস..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                {subscribed ? 'ধন্যবাদ! সাবস্ক্রাইব সম্পন্ন' : 'সাবস্ক্রাইব করুন'}
              </button>
            </form>

            {/* Shield Crest Logo Box */}
            <div className="pt-2 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white leading-tight">{settings.schoolName}</h4>
                <p className="text-[10px] font-bold text-slate-400">স্থাপিত: {settings.established} খ্রি.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত | {settings.schoolName}</p>
        </div>

      </div>
    </footer>
  );
}
