'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Search, Filter, Download, Calendar, FileText, Pin, X, Eye, Sparkles } from 'lucide-react';

interface NoticeItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  pdfUrl?: string;
  isImportant?: boolean;
  content: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [activeModalNotice, setActiveModalNotice] = useState<NoticeItem | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'একাডেমিক', 'পরীক্ষা', 'ভর্তি', 'জরুরি'];

  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.notices) {
          setNotices(data.notices);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || n.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-12 space-y-10 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            অফিসিয়াল নোটিশ বোর্ড (MongoDB Live Data)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">বিদ্যালয় সংক্রান্ত সকল নোটিশ</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            পরীক্ষার সময়সূচি, ছুটি, ভর্তি ও একাডেমি সংক্রান্ত আপডেট রিয়েল-টাইমে প্রকাশ করা হয়।
          </p>
        </div>
      </section>

      {/* Controls: Search & Category Filter */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নোটিশ খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> বিভাগ:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'সব নোটিশ' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notices Grid */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-slate-500">ডাটাবেজ থেকে লোডিং হচ্ছে...</div>
        ) : filteredNotices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            কোন নোটিশ পাওয়া যায়নি!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((n) => (
              <div
                key={n._id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 relative"
              >
                {n.isImportant && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                    <Pin className="w-3 h-3" /> জরুরি
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{n.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-blue-600 font-bold">{n.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition leading-snug">
                    {n.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {n.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalNotice(n)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> বিস্তারিত পড়ুন
                  </button>

                  {n.pdfUrl ? (
                    <a
                      href={n.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
                      title="পিডিএফ ফাইল ডাউনলোড"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>পিডিএফ</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">পিডিএফ নেই</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Notice Preview Modal */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModalNotice(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-full">
                {activeModalNotice.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 pt-2">{activeModalNotice.title}</h2>
              <p className="text-xs text-slate-400">প্রকাশের তারিখ: {activeModalNotice.date}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-700 leading-relaxed border border-slate-100">
              {activeModalNotice.content}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              {activeModalNotice.pdfUrl ? (
                <a
                  href={activeModalNotice.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" /> মূল পিডিএফ ডাউনলোড করুন
                </a>
              ) : <div />}

              <button
                onClick={() => setActiveModalNotice(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
