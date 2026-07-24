'use client';

import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Tag, User, MessageCircle, ArrowRight, Sparkles, X, Send, Printer } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  content: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<string[]>([
    'আমাদের স্কুলের রোবোটিক্স টিমের এই সাফল্যে আমরা অত্যন্ত গর্বিত!',
    'নতুন ডিজিটাল বোর্ডগুলো আসায় ক্লাস করতে অনেক সুবিধা হচ্ছে।'
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.news) {
          setNewsList(data.news);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, commentInput]);
    setCommentInput('');
  };

  return (
    <div className="py-12 space-y-12 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            সংবাদ ও ইভেন্ট মিডিয়া (Live Database)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">ক্যাম্পাস সংবাদ ও ইনোভেশন</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            ডাঃ মুজিব-রুবি মডেল হাই স্কুলের সাফল্য, উৎসব, খেলাধুলা ও শিক্ষার্থীদের অর্জনের লাইভ খবর।
          </p>
        </div>
      </section>

      {/* Main News Articles Grid */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-slate-500">ডাটাবেজ থেকে লোড হচ্ছে...</div>
        ) : newsList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            কোনো সংবাদ পাওয়া যায়নি!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((article) => (
              <div
                key={article._id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 text-blue-600 font-semibold">
                        <User className="w-3.5 h-3.5" />
                        {article.author || 'এডমিন'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-slate-200 hover:border-blue-600"
                  >
                    <span>সম্পূর্ণ নিবন্ধ পড়ুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                {selectedArticle.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-blue-600" /> পিডিএফ প্রিন্ট / ডাউনলোড
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedArticle.title}</h2>
            
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-64 object-cover rounded-2xl" />

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>{selectedArticle.summary}</p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">মন্তব্যসমূহ ({comments.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments.map((c, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="আপনার মন্তব্য লিখুন..."
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> পাঠান
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
