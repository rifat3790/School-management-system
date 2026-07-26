'use client';

import React from 'react';
import Link from 'next/link';

interface TeachersGridSectionProps {
  teachers?: any[];
}

export default function TeachersGridSection({ teachers }: TeachersGridSectionProps) {
  const fallbackTeachers = [
    {
      name: 'জনাব মোঃ আব্দুল করিম',
      designation: 'প্রধান শিক্ষক',
      subject: 'পদার্থবিজ্ঞান',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    },
    {
      name: 'জনাবা তানজীনা আক্তার',
      designation: 'সহকারী প্রধান শিক্ষক',
      subject: 'গণিত',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
      name: 'জনাব মোঃ রাশিদুল ইসলাম',
      designation: 'জ্যেষ্ঠ শিক্ষক (বিজ্ঞান)',
      subject: 'রসায়ন',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
    },
    {
      name: 'জনাব সুজন কুমার',
      designation: 'জ্যেষ্ঠ শিক্ষক (গণিত)',
      subject: 'উচ্চতর গণিত',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    },
    {
      name: 'জনাবা ফারহানা ইয়াসমিন',
      designation: 'জ্যেষ্ঠ শিক্ষক (ইংরেজি)',
      subject: 'ইংরেজি',
      image: 'https://images.unsplash.com/photo-1580894732413-87ce4924c393?w=400&q=80'
    },
    {
      name: 'জনাব শেখ হাবিবুর রহমান',
      designation: 'শারীরিক শিক্ষা শিক্ষক',
      subject: 'ক্রীড়া',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
    }
  ];

  const listToRender = teachers && teachers.length > 0 ? teachers.slice(0, 6) : fallbackTeachers;

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {listToRender.map((teacher, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition group text-center flex flex-col justify-between"
            >
              <div className="h-44 overflow-hidden bg-slate-100">
                <img 
                  src={teacher.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'} 
                  alt={teacher.name} 
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
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
