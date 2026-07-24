'use client';

import React, { useState } from 'react';
import { LIBRARY_BOOKS, LibraryBook } from '@/data/schoolData';
import { BookOpen, Search, Filter, BookMarked, CheckCircle2, AlertCircle, Sparkles, Calculator } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function LibraryPage() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lateDays, setLateDays] = useState<number>(0);

  const categories = ['all', ...Array.from(new Set(LIBRARY_BOOKS.map((b) => b.category)))];

  const filteredBooks = LIBRARY_BOOKS.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search);
    const matchesCat = selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const calculatedFine = lateDays * 5; // 5 taka fine per late day

  return (
    <div className="py-12 space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            ডিজিটাল ই-লাইব্রেরি সিস্টেম
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">কেন্দ্রীয় লাইব্রেরি ও বুক ক্যাটালগ</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            ৫০০০+ পাঠ্যপুস্তক, রেফারেন্স গাইড ও সাহিত্য বইয়ের ক্যাটালগ অনুসন্ধান করুন।
          </p>
        </div>
      </section>

      {/* Controls & Search */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="glass-card p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="বইয়ের নাম, লেখক বা ISBN খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 shrink-0">ক্যাটাগরি:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'সব বই' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="glass-card rounded-3xl p-6 border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-primary-50 text-primary px-2.5 py-0.5 rounded-md">
                    {book.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">ISBN: {book.isbn}</span>
                </div>

                <h3 className="font-bold text-base text-heading leading-snug">{book.title}</h3>
                <p className="text-xs text-paragraph">লেখক: <strong className="text-slate-800">{book.author}</strong></p>
                <p className="text-xs text-slate-500">উপযোগী: {book.classLevel}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">সেলফ অবস্থান:</span>
                  <strong className="text-primary font-mono">{book.location}</strong>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  book.availableCopies > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {book.availableCopies > 0 ? `মজুদ: ${book.availableCopies} টি` : 'স্টক শেষ'}
                </span>
                <button
                  disabled={book.availableCopies === 0}
                  onClick={() => toast.success(`ইস্যু রিকোয়েস্ট জমা হয়েছে: ${book.title}`)}
                  className="bg-primary text-white disabled:opacity-40 hover:bg-primary-700 font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm"
                >
                  ইস্যু রিকোয়েস্ট
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fine Calculator Section */}
      <section className="max-w-2xl mx-auto px-4 lg:px-8">
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
          <h3 className="text-lg font-bold text-heading flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            লাইব্রেরি বই ফেরতে বিলম্ব জরিমানা ক্যালকুলেটর
          </h3>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <label className="font-bold text-slate-700">বিলম্বিত দিন সংখ্যা:</label>
            <input
              type="number"
              min={0}
              max={60}
              value={lateDays}
              onChange={(e) => setLateDays(parseInt(e.target.value) || 0)}
              className="w-24 p-2 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono font-bold text-slate-900"
            />
            <span>দিন</span>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>মোট জরিমানা (প্রতি দিন ৫ টাকা হার):</span>
            <strong className="text-lg font-black font-mono text-amber-600">৳ {calculatedFine}.০০ টাকা</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
