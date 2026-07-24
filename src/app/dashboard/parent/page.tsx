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
  FileText,
  UserCheck,
  Clock,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

import { useToast } from '@/components/Toast';

export default function ParentDashboard() {
  const toast = useToast();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFeeReceiptModal, setShowFeeReceiptModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const [msgText, setMsgText] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [childUser, setChildUser] = useState<any>(null);
  const [attendanceRate, setAttendanceRate] = useState('৯৬.৫%');

  // Leave Form State
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'অসুস্থতা জনিত ছুটি'
  });
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);

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

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.startDate || !leaveForm.reason) {
      toast.error('ছুটির তারিখ ও কারণ প্রদান করুন');
      return;
    }
    setLeaveApplications([...leaveApplications, { ...leaveForm, status: 'পেন্ডিং এপ্রুভাল', date: new Date().toLocaleDateString('bn-BD') }]);
    setLeaveForm({ startDate: '', endDate: '', reason: '', type: 'অসুস্থতা জনিত ছুটি' });
    setShowLeaveModal(false);
    toast.success('সন্তানের ছুটি আবেদন শ্রেণী শিক্ষকের নিকট প্রেরিত হয়েছে!');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Glassmorphic Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-blue-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Parent Info Container */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                <Users className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full">
                    অভিভাবক প্যানেল (Parent Zone)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> একাউন্ট ভেরিফায়েড
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  মোঃ জহিরুল ইসলাম
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  সন্তানের নাম: <strong className="text-slate-900 font-bold">{childUser?.name || 'রাফসান আহমেদ (সাকিব)'}</strong> 
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-2 font-semibold">
                    {childUser?.details?.class || '১০'}ম শ্রেণী (রোল-{childUser?.details?.studentId || '১০১'}, বিজ্ঞান শাখা)
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setShowLeaveModal(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4" /> অনলাইন ছুটি আবেদন
              </button>

              <button
                onClick={() => setShowFeeReceiptModal(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" /> ফি রসিদ দেখুন
              </button>

              <button
                onClick={() => setShowMessageModal(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" /> শ্রেণী শিক্ষককে মেসেজ দিন
              </button>
            </div>
          </div>
        </div>

        {/* Child Academic Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">উপস্থিতি পারফরম্যান্স (Live)</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-emerald-600 font-mono tracking-tight">{attendanceRate}</h3>
              <p className="text-xs text-slate-600 mt-1">ডাটাবেজে বায়োমেট্রিক উপস্থিতি অটো হিসাবকৃত।</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">সর্বশেষ পরীক্ষা জিপিএ</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-blue-600 font-mono tracking-tight">5.00 (A+)</h3>
              <p className="text-xs text-slate-600 mt-1">বার্ষিক পরীক্ষা ২০২৫ বিজ্ঞান বিভাগ (মেধা স্থান: ১ম)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3 relative overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">টিউশন ফি স্ট্যাটাস</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">পরিশোধিত <span className="text-xs text-emerald-600 font-mono font-bold">(৳০ বকেয়া)</span></h3>
              <p className="text-xs text-slate-600 mt-1">অনলাইন বিকাশ/রকেটে জুলাই মাসের ফি জমা সম্পন্ন।</p>
            </div>
          </div>
        </div>

        {/* Leave Requests & Sent Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Leave Applications History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-600" />
                সন্তানের ছুটি আবেদনের তালিকা
              </h3>
              <button
                onClick={() => setShowLeaveModal(true)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200"
              >
                + নতুন আবেদন
              </button>
            </div>

            {leaveApplications.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                <p className="text-xs font-bold text-slate-600">এখনো কোনো ছুটির আবেদন জমা দেওয়া হয়নি</p>
                <p className="text-[11px] text-slate-400">জরুরি প্রয়োজন বা অসুস্থতায় অনলাইন থেকে ছুটি আবেদন করুন</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaveApplications.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">{item.type}</span>
                      <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px]">{item.status}</span>
                    </div>
                    <p className="text-slate-600">তারিখ: {item.startDate} থেকে {item.endDate || item.startDate}</p>
                    <p className="text-slate-500 font-medium">কারণ: {item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Teacher Support Inbox */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                শ্রেণী শিক্ষকের নিকট প্রেরিত বার্তা
              </h3>
              <button
                onClick={() => setShowMessageModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200"
              >
                + মেসেজ দিন
              </button>
            </div>

            {sentMessages.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                <p className="text-xs font-bold text-slate-600">শ্রেণী শিক্ষকের কাছে মেসেজ পাঠাননি</p>
                <p className="text-[11px] text-slate-400">পড়াশোনা বা উপস্থিতির তথ্যের জন্য সরাসরি মেসেজ দিন</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sentMessages.map((msg, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                    <span className="font-bold">"{msg}"</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded font-bold text-[10px]">ডেলিভার্ড</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* LEAVE APPLICATION MODAL */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setShowLeaveModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">অনলাইন ছুটি আবেদন ফরম</h3>
                <p className="text-xs text-slate-500">সন্তানের অনুপস্থিতির জন্য শ্রেণী শিক্ষকের অনুমোদন নিন</p>
              </div>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ছুটির ধরন</label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="অসুস্থতা জনিত ছুটি">অসুস্থতা জনিত ছুটি</option>
                  <option value="পারিবারিক জরুরি ছুটি">পারিবারিক জরুরি ছুটি</option>
                  <option value="জরুরি কাজ জনিত ছুটি">জরুরি কাজ জনিত ছুটি</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শুরুর তারিখ</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শেষের তারিখ</label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ছুটির বিস্তারিত কারণ</label>
                <textarea
                  rows={3}
                  required
                  placeholder="যেমন: জ্বর থাকার কারণে ২ দিন বিদ্যালয়ে উপস্থিত হতে পারছে না..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> আবেদন জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <span className="font-bold text-slate-900">{childUser?.name || 'রাফসান আহমেদ (সাকিব)'}</span>
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
