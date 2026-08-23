'use client';

import React from 'react';
import Link from 'next/link';

interface TeachersGridSectionProps {
  teachers?: any[];
}

export default function TeachersGridSection({ teachers = [] }: TeachersGridSectionProps) {
  const listToRender = teachers.slice(0, 6);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
            আমাদের শিক্ষকবৃন্দ
          </h2>
          <Link href="/teachers" className="text-xs sm:text-sm font-bold text-blue-700 hover:underline">
            সব শিক্ষক দেখুন
          </Link>
        </div>

        {/* 6 Teacher Cards Grid */}
        {listToRender.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-slate-500 border border-slate-200 text-sm">
            ডাটাবেজে কোনো শিক্ষকের তথ্য অন্তর্ভুক্ত নেই। এডমিন প্যানেল থেকে শিক্ষক যোগ করুন।
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {listToRender.map((teacher, idx) => (
              <div 
                key={teacher._id || idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition group text-center flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={teacher.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'} 
                    alt={teacher.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-3.5 space-y-1">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-blue-700 transition">
                    {teacher.name}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500 line-clamp-1">
                    {teacher.designation}
                  </p>
                  {teacher.subject && (
                    <p className="text-[10px] text-blue-600 font-semibold line-clamp-1">
                      {teacher.subject}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
