'use client';

import React, { useState, useEffect } from 'react';
import { Quote, UserCheck, ShieldCheck } from 'lucide-react';

export default function PrincipalMessage() {
  const [settings, setSettings] = useState({
    principalName: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ',
    principalTitle: 'প্রধান শিক্ষক',
    principalMessage: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা প্রতিটি শিক্ষার্থীর ভেতরের সুপ্ত মেধা ও সম্ভাবনা জাগ্রত করতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য শুধুমাত্র পুঁথিগত বিদ্যা নয়, বরং আধুনিক বিজ্ঞান ও প্রযুক্তি নির্ভর শিক্ষা প্রদানের মাধ্যমে শিক্ষার্থীদের বিশ্বমানের নাগরিক হিসেবে গড়ে তোলা।',
    principalImage: '',
    chairmanName: 'ডাঃ মোজাম্মেল হক',
    chairmanTitle: 'প্রতিষ্ঠাতা ও সভাপতি',
    chairmanMessage: 'একটি আলোকিত সমাজ গঠনে মানসম্মত আধুনিক শিক্ষার কোনো বিকল্প নেই। আমাদের স্কুলটি ১৯৯৮ সাল থেকে অত্যন্ত নিষ্ঠা ও সুনামের সাথে শেরপুর জেলার শিক্ষাঙ্গনে অন্যতম সেরা স্থান ধরে রেখেছে।',
    chairmanImage: ''
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            নেতৃত্ব ও নির্দেশনা
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            পরিচালনা পর্ষদের বাণী
          </h2>
        </div>

        {/* 2 Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Principal Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <Quote className="w-20 h-20 text-blue-50 absolute -right-4 -bottom-4 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                {settings.principalImage ? (
                  <img 
                    src={settings.principalImage} 
                    alt={settings.principalName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-2 border-blue-600">
                    {settings.principalName?.charAt(0) || 'P'}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{settings.principalName}</h3>
                  <p className="text-xs font-bold text-blue-600">{settings.principalTitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{settings.principalMessage}"
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <UserCheck className="w-4 h-4 text-emerald-500" /> ভেরিফায়েড প্রোফাইল
              </span>
            </div>
          </div>

          {/* Chairman Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <Quote className="w-20 h-20 text-sky-50 absolute -right-4 -bottom-4 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                {settings.chairmanImage ? (
                  <img 
                    src={settings.chairmanImage} 
                    alt={settings.chairmanName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xl border-2 border-sky-500">
                    {settings.chairmanName?.charAt(0) || 'C'}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{settings.chairmanName}</h3>
                  <p className="text-xs font-bold text-sky-600">{settings.chairmanTitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{settings.chairmanMessage}"
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> বোর্ড অফ গভর্নরস
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
