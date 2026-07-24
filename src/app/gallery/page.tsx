'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  url: string;
}

export default function GalleryPage() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'ক্যাম্পাস', 'ক্রীড়া', 'বিজ্ঞান মেলা', 'সাংস্কৃতিক', 'পুরস্কার বিতরণ'];

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.gallery) setGalleryList(data.gallery);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = galleryList.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="py-12 space-y-12 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            ফটো গ্যালারি ও ক্যাম্পাস মেমোরি (Live Database)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">আমাদের ফটো ও মিডিয়া গ্যালারি</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            বিভিন্ন ইভেন্ট, স্পোর্টস, সাংস্কৃতিক আয়োজন ও বিজ্ঞান মেলার অ্যালবামসমূহ।
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'সব ছবি' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-slate-500">গ্যালারি লোড হচ্ছে...</div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            কোনো ছবি পাওয়া যায়নি!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedMedia(item)}
                className="relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200 cursor-pointer group bg-slate-900 aspect-video sm:aspect-square"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-between text-white">
                  <span className="self-end p-2 rounded-full bg-white/20 backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="px-2 py-0.5 bg-blue-600 rounded-md text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm mt-1 leading-snug">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full max-h-[75vh] object-contain" />
            <div className="p-6 bg-slate-900 text-white space-y-1">
              <span className="text-xs font-bold text-blue-400">{selectedMedia.category}</span>
              <h3 className="text-lg font-bold">{selectedMedia.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
