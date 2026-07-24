'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Youtube, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState({
    schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
    eiin: '১৩০৯৫৪',
    code: '৪৫২০',
    established: '১৯৯৮',
    phone: '+৮৮০ ১৭০০-০০০০০',
    email: 'info@drmujibrubi.edu.bd',
    address: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ',
    slogan: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSiteSettings(data.settings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <footer className="bg-slate-100/90 text-slate-700 pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: School Branding */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-xl">{siteSettings.schoolName}</h2>
                <p className="text-xs font-semibold text-slate-500">EIIN: {siteSettings.eiin} | স্কুল কোড: {siteSettings.code}</p>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              "{siteSettings.slogan}" — শেরপুর অঞ্চলের সেরা ডিজিটাল শিক্ষা প্রতিষ্ঠান হিসেবে আমাদের পথচলা।
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-xs flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 shadow-xs flex items-center justify-center transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-bold text-base border-l-4 border-blue-600 pl-3">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'আমাদের সম্পর্কে', href: '/about' },
                { label: 'শিক্ষকবৃন্দ', href: '/teachers' },
                { label: 'একাডেমিক', href: '/academic' },
                { label: 'নোটিশ বোর্ড', href: '/notices' },
                { label: 'সংবাদ ও গ্যালারি', href: '/news' },
                { label: 'অনলাইন ভর্তি', href: '/admission' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-blue-600 transition flex items-center gap-1.5 font-medium text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-bold text-base border-l-4 border-blue-600 pl-3">ডিজিটাল পোর্টাল</h3>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              <li><Link href="/login" className="hover:text-blue-600 transition">শিক্ষার্থী লগইন</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 transition">শিক্ষক লগইন</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 transition">অভিভাবক প্যানেল</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 transition">এডমিন কন্ট্রোল</Link></li>
              <li><Link href="/result" className="hover:text-blue-600 transition">পরীক্ষার ফলাফল</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-bold text-base border-l-4 border-blue-600 pl-3">যোগাযোগ</h3>
            <div className="space-y-3 text-sm text-slate-600 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{siteSettings.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} {siteSettings.schoolName}। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1">
            <span>স্মার্ট ডিজিটাল স্কুল ম্যানেজমেন্ট সিস্টেম</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

