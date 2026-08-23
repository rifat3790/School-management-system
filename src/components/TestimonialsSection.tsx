'use client';

import React from 'react';
import { 
  Star, 
  Quote, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  studentName: string;
  rating: number;
  text: string;
  image?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const defaultTestimonials: Testimonial[] = [
    { name: 'মাশরাফি আহমেদ', role: 'অভিভাবক (সপ্তম শ্রেণি)', studentName: 'তাহমিদ আহমেদ', rating: 5, text: 'স্কুলের বায়োমেট্রিক হাজিরা ও তাৎক্ষণিক মেসেজ অ্যালার্ট অভিভাবক হিসেবে আমার টেনশন অনেক কমিয়ে দিয়েছে। শিক্ষকরা খুবই আন্তরিক।', image: '' },
    { name: 'শারমিন সুলতানা', role: 'অভিভাবক (দশম শ্রেণি)', studentName: 'আফসানা সুলতানা', rating: 5, text: 'স্মার্ট ডিজিটাল ক্লাসরুম এবং অতিরিক্ত টিউটোরিয়াল ক্লাসের কারণে আমার মেয়ে এসএসসিতে গোল্ডেন এ+ প্রত্যাশী। চমৎকার ম্যানেজমেন্ট!', image: '' },
    { name: 'ড. কামরুল হাসান', role: 'প্রাক্তন শিক্ষার্থী (ব্যাচ ২০০৫)', studentName: 'বুয়েট সিএসই গ্রাজুয়েট', rating: 5, text: 'আজ আমি বিদেশের স্বনামধন্য প্রতিষ্ঠানে সফটওয়্যার ইঞ্জিনিয়ার। এই স্কুলের লাইব্রেরি ও সায়েন্স ল্যাবেই আমার স্বপ্নের ভিত তৈরি হয়েছিল।', image: '' }
  ];

  const list = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
            অভিভাবক ও অ্যালুমনাই মতামত
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            আমাদের প্রতি অভিভাবকদের আস্থা ও অভিজ্ঞতা
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            দীর্ঘ দুই দশকের শিক্ষাসেবা ও ডিজিটাল রূপান্তরের সুফল হিসেবে অভিভাবকদের মূল্যবান মতামত।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md shadow-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition duration-300"
            >
              <Quote className="w-20 h-20 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none group-hover:text-blue-50 transition duration-300" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500 shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-xs">
                      {item.name ? item.name.charAt(0) : 'U'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                    <p className="text-xs font-semibold text-blue-600">{item.role}</p>
                  </div>
                </div>

                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200" title="ভেরিফায়েড">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
