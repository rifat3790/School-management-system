'use client';

import React, { useState } from 'react';
import { ALUMNI_STORIES, AlumniStory } from '@/data/schoolData';
import { GraduationCap, Briefcase, HeartHandshake, Users, Sparkles, UserPlus, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AlumniPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'stories' | 'register' | 'donation'>('stories');
  const [regSuccess, setRegSuccess] = useState(false);

  // Alumni Form State
  const [form, setForm] = useState({
    name: '',
    batch: '2015',
    profession: '',
    organization: '',
    phone: '',
    email: '',
  });

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
  };

  return (
    <div className="py-12 space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            প্রাক্তন শিক্ষার্থী নেটওয়ার্ক
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">অ্যালুমনি অ্যাসোসিয়েশন পোর্টাল</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            ১৯৯৫ সাল থেকে বর্তমান সময় পর্যন্ত সকল ব্যাচের প্রাক্তন শিক্ষার্থীদের মিলনমেলা ও নেটওয়ার্ক।
          </p>
        </div>
      </section>

      {/* Tabs Switcher */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          {[
            { id: 'stories', label: 'সাফল্যের গল্প' },
            { id: 'register', label: 'অ্যালুমনি রেজিস্ট্রেশন' },
            { id: 'donation', label: 'স্কুল ফান্ড ডোনেশন' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stories Tab */}
      {activeTab === 'stories' && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALUMNI_STORIES.map((story) => (
              <div
                key={story.id}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shadow-md"
                  />
                  <div>
                    <span className="text-xs font-bold text-primary bg-primary-50 px-2 py-0.5 rounded-md">
                      {story.batch}
                    </span>
                    <h3 className="text-lg font-bold text-heading mt-1">{story.name}</h3>
                    <p className="text-xs text-paragraph">{story.profession} — <strong className="text-slate-800">{story.organization}</strong></p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                  "{story.story}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Register Tab */}
      {activeTab === 'register' && (
        <section className="max-w-2xl mx-auto px-4 lg:px-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            {!regSuccess ? (
              <form onSubmit={handleRegSubmit} className="space-y-4 text-xs sm:text-sm">
                <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  প্রাক্তন শিক্ষার্থী নিবন্ধন ফরম
                </h3>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="যেমন: ইঞ্জিনিয়ার রেজওয়ান আহমেদ"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">এসএসসি পাসের বছর (ব্যাচ) *</label>
                  <input
                    type="text"
                    required
                    value={form.batch}
                    onChange={(e) => setForm({ ...form, batch: e.target.value })}
                    placeholder="যেমন: 2012"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বর্তমান পেশা</label>
                    <input
                      type="text"
                      value={form.profession}
                      onChange={(e) => setForm({ ...form, profession: e.target.value })}
                      placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম</label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="যেমন: Google / BUET"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="01712345678"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform"
                >
                  রেজিস্ট্রেশন জমা দিন
                </button>
              </form>
            ) : (
              <div className="text-center space-y-3 py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-heading">নিবন্ধন সফল হয়েছে!</h3>
                <p className="text-xs text-paragraph">
                  আপনাকে ডাঃ মুজিব-রুবি মডেল হাই স্কুল অ্যালুমনি ডিরেক্টরিতে অন্তর্ভুক্ত করা হয়েছে।
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Donation Tab */}
      {activeTab === 'donation' && (
        <section className="max-w-2xl mx-auto px-4 lg:px-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 text-center">
            <HeartHandshake className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-bold text-heading">স্কুল উন্নয়ন ও স্কলারশিপ ফান্ডে অবদান রাখুন</h3>
            <p className="text-xs sm:text-sm text-paragraph leading-relaxed">
              মেধাবী ও অসচ্ছল শিক্ষার্থীদের জন্য শিক্ষাবৃত্তি এবং আধুনিক রোবোটিক্স সায়েন্স ল্যাব সম্প্রসারণে আপনার অনুদান গুরুত্বপূর্ণ ভুমিকা রাখবে।
            </p>
            <button
              onClick={() => toast.info('অনলাইন পেমেন্ট গেটওয়ে চালুকৃত ডোনেশন পোর্টাল খুলছে...')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform text-sm"
            >
              অনলাইনে অনুদান প্রদান করুন (bKash / Nagad / Card)
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
