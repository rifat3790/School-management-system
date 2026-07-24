'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  PhoneCall,
  Sparkles,
  Send,
  XCircle,
  FileText
} from 'lucide-react';

import { useToast } from '@/components/Toast';

export default function ParentDashboard() {
  const toast = useToast();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    setSentMessages([...sentMessages, msgText]);
    setMsgText('');
    setShowMessageModal(false);
    toast.success('শ্রেণী শিক্ষকের কাছে মেসেজ সফলভাবে প্রেরিত হয়েছে!');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xl shadow-md">
              অভিভাবক
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                নিবন্ধিত অভিভাবক প্যানেল (Parent Zone)
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">মোঃ জহিরুল ইসলাম</h1>
              <p className="text-xs text-slate-500">
                সন্তানের নাম: <strong className="text-slate-900">রাফসান আহমেদ (১০ম শ্রেণী, রোল-১০১, বিজ্ঞান)</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowMessageModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4" />
            শ্রেণী শিক্ষককে মেসেজ দিন
          </button>
        </div>

        {/* Child Academic Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">উপস্থিতি পারফরম্যান্স</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-mono">৯৬.৫%</h3>
            <p className="text-xs text-slate-600">এই মাসে ১ দিন অনুপস্থিতি রেকর্ড হয়েছে।</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">সর্বশেষ পরীক্ষা জিপিএ</span>
            <h3 className="text-2xl font-extrabold text-blue-600 font-mono">5.00 (A+)</h3>
            <p className="text-xs text-slate-600">বার্ষিক পরীক্ষা ২০২৫ বিজ্ঞান বিভাগ (মেধা স্থান: ১ম)</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">টিউশন ফি স্ট্যাটাস</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-mono">পরিশোধিত (৳০ বকেয়া)</h3>
            <p className="text-xs text-slate-600">অনলাইন বিকাশ/রকেটে ফি জমা সম্পন্ন।</p>
          </div>
        </div>

        {/* Notice & Message Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">শ্রেণী শিক্ষকের নিকট প্রেরিত মেসেজসমূহ</h3>
          {sentMessages.length === 0 ? (
            <p className="text-xs text-slate-500">এখনো কোনো মেসেজ পাঠানো হয়নি।</p>
          ) : (
            <div className="space-y-2">
              {sentMessages.map((msg, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>"{msg}"</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">ডেলিভার্ড</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MESSAGE MODAL */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setShowMessageModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <XCircle className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">শ্রেণী শিক্ষককে মেসেজ পাঠান</h3>
            <p className="text-xs text-slate-500">শিক্ষক: নুসরাত জাহান তানিয়া (১০ম শ্রেণী ক শাখা)</p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea
                rows={4}
                required
                placeholder="আপনার বিষয় বা অনুসন্ধান লিখুন..."
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> মেসেজ পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
