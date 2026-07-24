'use client';

import React, { useState } from 'react';
import { 
  UserCheck, 
  FileEdit, 
  Award, 
  Users, 
  CheckCircle2, 
  PlusCircle,
  Save,
  Sparkles,
  Clock,
  Send,
  BookOpen
} from 'lucide-react';

import { useToast } from '@/components/Toast';

export default function TeacherDashboard() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'attendance' | 'homework' | 'marks'>('attendance');
  
  // Class 10 Attendance State
  const [students, setStudents] = useState([
    { roll: '১০১', name: 'রাফসান আহমেদ', present: true },
    { roll: '১০২', name: 'মোঃ ফাহিম রশীদ', present: true },
    { roll: '১০৩', name: 'মোসাম্মাৎ তানিয়া সুলতানা', present: true },
    { roll: '১০৪', name: 'আরিফ হোসেন মেহরাব', present: false },
    { roll: '১০৫', name: 'সাদিয়া আক্তার মিম', present: true },
    { roll: '১০৬', name: 'মোঃ তানভীর হাসান', present: true },
    { roll: '১০৭', name: 'ফারজানা ইয়াসমিন', present: true },
    { roll: '১০৮', name: 'নাহিয়ান মেহজাবীন', present: true },
  ]);

  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [publishedHw, setPublishedHw] = useState<string[]>([]);

  const toggleAttendance = (index: number) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handlePublishHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle) return;
    setPublishedHw([hwTitle, ...publishedHw]);
    setHwTitle('');
    setHwDesc('');
    toast.success('হোমওয়ার্ক পোর্টালে সফলভাবে প্রকাশিত হয়েছে!');
  };

  const presentCount = students.filter(s => s.present).length;

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
              ICT
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                শিক্ষক প্যানেল (Faculty Control)
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">নুসরাত জাহান তানিয়া</h1>
              <p className="text-xs text-slate-500">
                সহকারী শিক্ষক (আইসিটি ও রোবোটিক্স) | ১০ম শ্রেণী (ক) শ্রেণী শিক্ষক
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('attendance')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition"
            >
              আজকের ডিজিটাল হাজিরা
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'attendance', label: `ডিজিটাল হাজিরা ইনপুট (${presentCount}/${students.length})`, icon: UserCheck },
            { id: 'homework', label: `হোমওয়ার্ক প্রকাশ (${publishedHw.length})`, icon: FileEdit },
            { id: 'marks', label: 'মার্কস এন্ট্রি সিস্টেম', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition ${
                  active 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">১০ম শ্রেণী (ক শাখা) - দৈনিক বায়োমেট্রিক হাজিরা ম্যাট্রিক্স</h3>
                <p className="text-xs text-slate-500">আজকের তারিখ: {new Date().toLocaleDateString('bn-BD')}</p>
              </div>
              <button
                onClick={() => toast.success('ডিজিটাল হাজিরা ডাটাবেজে সংরক্ষিত হয়েছে!')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" /> হাজিরা সেভ করুন
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {students.map((st, idx) => (
                <div
                  key={st.roll}
                  onClick={() => toggleAttendance(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    st.present 
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                      : 'bg-rose-50/60 border-rose-200 text-rose-900'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold opacity-75">রোল: {st.roll}</span>
                    <p className="font-bold text-sm">{st.name}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${st.present ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                    {st.present ? 'উপস্থিত' : 'অনুপস্থিত'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HOMEWORK */}
        {activeTab === 'homework' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <form onSubmit={handlePublishHomework} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">নতুন হোমওয়ার্ক প্রকাশ করুন</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">হোমওয়ার্কের বিষয়বস্তু/শিরোনাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: আইসিটি চ্যাপ্টার ৩ এর ব্যবহারিক সমাধান"
                    value={hwTitle}
                    onChange={(e) => setHwTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={3}
                    placeholder="শিক্ষার্থীদের জন্য নির্দেশনাবলী..."
                    value={hwDesc}
                    onChange={(e) => setHwDesc(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                  <Send className="w-4 h-4" /> হোমওয়ার্ক প্রকাশ করুন
                </button>
              </form>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">আজকে প্রকাশিত হোমওয়ার্কসমূহ</h3>
                {publishedHw.length === 0 ? (
                  <p className="text-xs text-slate-500">এখনো কোনো হোমওয়ার্ক পোস্ট করা হয়নি।</p>
                ) : (
                  <div className="space-y-2">
                    {publishedHw.map((item, idx) => (
                      <div key={idx} className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs font-bold text-blue-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
