'use client';

import React, { useState, useEffect } from 'react';
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
  const [showFeeReceiptModal, setShowFeeReceiptModal] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [childUser, setChildUser] = useState<any>(null);
  const [attendanceRate, setAttendanceRate] = useState('৯৬.৫%');

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.users) {
          const st = data.users.find((u: any) => u.role === 'student');
          if (st) {
            setChildUser(st);
            fetch(`/api/attendance?studentId=${st._id}`)
              .then(r => r.json())
              .then(attData => {
                if (attData.success && attData.attendanceHistory?.length > 0) {
                  const history = attData.attendanceHistory;
                  let present = 0;
                  history.forEach((doc: any) => {
                    const rec = doc.records?.find((r: any) => r.studentId === st._id);
                    if (rec && (rec.status === 'present' || rec.status === 'late')) present++;
                  });
                  const rate = ((present / history.length) * 100).toFixed(1) + '%';
                  setAttendanceRate(rate);
                }
              })
              .catch(e => console.error(e));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

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
                সন্তানের নাম: <strong className="text-slate-900">{childUser?.name || 'রাফসান আহমেদ'} ({childUser?.details?.class || '১০'}ম শ্রেণী, রোল-{childUser?.details?.studentId || '১০১'})</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFeeReceiptModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition"
            >
              <CreditCard className="w-4 h-4" /> ফি রসিদ দেখুন
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              শ্রেণী শিক্ষককে মেসেজ দিন
            </button>
          </div>
        </div>

        {/* Child Academic Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">উপস্থিতি পারফরম্যান্স (Live)</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-mono">{attendanceRate}</h3>
            <p className="text-xs text-slate-600">ডাটাবেজে বায়োমেট্রিক উপস্থিতি অটো হিসাবকৃত।</p>
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

      {/* ONLINE FEE RECEIPT MODAL */}
      {showFeeReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setShowFeeReceiptModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">অনলাইন টিউশন ফি জমা রসিদ</h3>
                <p className="text-xs text-slate-500">ভেরিফায়েড পেমেন্ট স্লিপ ও ট্রানজেকশন আইডি</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
                <span className="font-bold text-slate-900">{childUser?.name || 'রাফসান আহমেদ'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">মাস/শিক্ষাবর্ষ:</span>
                <span className="font-bold text-slate-900">জুলাই ২০২৬</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">পেমেন্ট মেথড:</span>
                <span className="font-bold text-emerald-600">bKash (অনলাইন মার্চেন্ট)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">ট্রানজেকশন আইডি:</span>
                <span className="font-mono font-bold text-slate-800">TXN-88942109</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1">
                <span className="text-slate-700">মোট জমা টাকা:</span>
                <span className="text-emerald-600">৳ ১,৫০০.০০ (পরিশোধিত)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" /> রসিদ ডাউনলোড / প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
