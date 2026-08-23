'use client';

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

interface GalleryAndVirtualTourProps {
  gallery?: any[];
}

export default function GalleryAndVirtualTour({ gallery = [] }: GalleryAndVirtualTourProps) {
  const imagesToRender = gallery.slice(0, 8);

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (7/12): গ্যালারি */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
                গ্যালারি
              </h2>
              <Link href="/gallery" className="text-xs sm:text-sm font-bold text-blue-700 hover:underline">
                সব ছবি দেখুন
              </Link>
            </div>

            {/* 8 Photo Grid */}
            {imagesToRender.length === 0 ? (
              <div className="bg-slate-50 rounded-3xl p-8 text-center text-slate-500 border border-slate-200 text-sm">
                ডাটাবেজে কোনো গ্যালারি ছবি আপলোড করা নেই। এডমিন প্যানেল থেকে ছবি যোগ করুন।
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imagesToRender.map((item, idx) => (
                  <Link 
                    href="/gallery"
                    key={item._id || idx} 
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-2xs group cursor-pointer"
                  >
                    <img 
                      src={item.url || item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2">
                      <p className="text-[11px] font-extrabold text-white line-clamp-1">{item.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (5/12): ভার্চুয়াল ক্যাম্পাস ট্যুর */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] border-b border-slate-200 pb-3">
                ভার্চুয়াল ক্যাম্পাস ট্যুর
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                ভিডিওর মাধ্যমে আমাদের আধুনিক ক্যাম্পাস, ক্লাসরুম এবং শিক্ষা কার্যক্রম ঘুরে দেখুন।
              </p>
              <div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  <span>ভিডিও দেখুন</span>
                </a>
              </div>
            </div>

            {/* Video Container with Play Button */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-lg aspect-video group cursor-pointer">
              <img 
                src={imagesToRender[0]?.url || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80'} 
                alt="ডাঃ মুজিব-রুবি মডেল হাই স্কুল ভার্চুয়াল ট্যুর"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <a 
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition"
              >
                <div className="w-16 h-16 rounded-full bg-blue-700/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition duration-300">
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
