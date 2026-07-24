'use client';

import React, { useState } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  Calendar, 
  Award, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Bell, 
  Sparkles,
  Download,
  Upload,
  Printer
} from 'lucide-react';

import { useToast } from '@/components/Toast';

export default function StudentDashboard() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'routine' | 'assignments' | 'result' | 'fees'>('overview');

  const studentInfo = {
    name: 'রাফসান আহমেদ (সাকিব)',
    roll: '১০১',
    regNo: '২০২৬৯০০১০১',
    className: '১০ম শ্রেণী',
    section: 'ক শাখা (বিজ্ঞান)',
    attendanceRate: '৯৬.৫%',
    paidFees: '৳ ৪,৫০০',
    dueFees: '৳ ০.০০',
    gpa: '৫.০০ (A+)'
  };

  const dailyRoutine = [
    { time: '০৯:০০ AM - ০৯:৪৫ AM', subject: 'উচ্চতর গণিত', teacher: 'প্রফেসর এম. এ. মজিদ', room: 'ক্লাস ১০১' },
    { time: '০৯:৪৫ AM - ১০:৩০ AM', subject: 'পদার্থবিজ্ঞান', teacher: 'ইঞ্জিঃ রফিকুল ইসলাম', room: 'পদার্থ ল্যাব' },
    { time: '১০:৩০ AM - ১১:১৫ AM', subject: 'রসায়ন', teacher: 'ড. ফারহানা হক', room: 'রসায়ন ল্যাব' },
    { time: '১১:১৫ AM - ১২:০০ PM', subject: 'ইংরেজি ১ম পত্র', teacher: 'আহমেদ হাসান', room: 'ক্লাস ১০১' },
    { time: '১২:০০ PM - ১২:৪৫ PM', subject: 'টিফিন ও নামাজের বিরতি', teacher: '-', room: 'ক্যান্টিন/মসজিদ' },
    { time: '১২:৪৫ PM - ০১:৩০ PM', subject: 'আইসিটি ও রোবোটিক্স', teacher: 'তানভীর আহমেদ', room: 'কম্পিউটার ল্যাব' },
  ];

  const assignments = [
    { id: 1, subject: 'পদার্থবিজ্ঞান', title: 'গতির সমীকরণ ও নিউটনের সূত্রসমূহের ব্যবহারিক প্রয়োগ', dueDate: '২৮ জুলাই ২০২৬', status: 'জমা দেওয়া হয়েছে', marks: '১০/১০' },
    { id: 2, subject: 'উচ্চতর গণিত', title: 'ত্রিকোণমিতি ও স্থানাংক জ্যামিতির সমীকরণ সমাধান', dueDate: '৩০ জুলাই ২০২৬', status: 'পেন্ডিং', marks: '-' },
    { id: 3, subject: 'আইসিটি', title: 'HTML5 ও CSS3 দিয়ে তৈরি ওয়েবসাইট প্রজেক্ট জমা', dueDate: '০২ আগস্ট ২০২৬', status: 'পেন্ডিং', marks: '-' },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Student Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
              ১০১
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  নিবন্ধিত স্টুডেন্ট পোর্টাল
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  GPA {studentInfo.gpa}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">{studentInfo.name}</h1>
              <p className="text-xs text-slate-500">
                {studentInfo.className} ({studentInfo.section}) | রোল: {studentInfo.roll} | রেজি: {studentInfo.regNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
              <span className="text-slate-500 block">উপস্থিতির হার</span>
              <span className="text-emerald-600 text-base font-extrabold">{studentInfo.attendanceRate}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
              <span className="text-slate-500 block">বকেয়া ফি</span>
              <span className="text-blue-600 text-base font-extrabold">{studentInfo.dueFees}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'ওভারভিউ ও ড্যাশবোর্ড', icon: Sparkles },
            { id: 'routine', label: 'আজকের ক্লাস রুটিন', icon: Clock },
            { id: 'assignments', label: `হোমওয়ার্ক ও এসাইনমেন্ট (${assignments.length})`, icon: BookOpen },
            { id: 'result', label: 'পরীক্ষার মার্কশীট ও ফলাফল', icon: Award },
            { id: 'fees', label: 'ফি ও পেমেন্ট রসিদ', icon: CreditCard },
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

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> আজকের সমসাময়িক ক্লাস সিডিউল
                </h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {dailyRoutine.slice(0, 4).map((r, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{r.subject}</p>
                        <p className="text-slate-500">{r.teacher} • {r.room}</p>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 font-bold text-slate-700 rounded-lg">{r.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">এক নজরে একাডেমিয়া</h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
                    <p className="font-bold text-blue-900">অর্ধ-বার্ষিকী পরীক্ষা ২০২৬</p>
                    <p className="text-blue-700 mt-1">আগামী ১৫ আগস্ট থেকে শুরু হবে। রুটিন প্রকাশিত হয়েছে।</p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                    <p className="font-bold text-emerald-900">উপস্থিতি স্ট্যাটাস</p>
                    <p className="text-emerald-700 mt-1">চলতি মাসে ১৮ কর্মদিবসের মধ্যে ১৮ দিনই উপস্থিত।</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROUTINE */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">১০ম শ্রেণী - ক শাখা দৈনিক ক্লাস রুটিন</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                    <th className="py-3 px-4">সময়সূচি</th>
                    <th className="py-3 px-4">বিষয়</th>
                    <th className="py-3 px-4">শিক্ষক</th>
                    <th className="py-3 px-4">কক্ষ / ল্যাব</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {dailyRoutine.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-blue-600 text-xs">{r.time}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{r.subject}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">{r.teacher}</td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-500">{r.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">চলতি হোমওয়ার্ক ও প্রজেক্ট এসাইনমেন্ট</h3>
            <div className="space-y-4">
              {assignments.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold text-xs">{item.subject}</span>
                      <span className="text-xs text-slate-500">জমার শেষ তারিখ: {item.dueDate}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'জমা দেওয়া হয়েছে' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                    {item.status === 'পেন্ডিং' && (
                      <button 
                        onClick={() => toast.success('এসাইনমেন্ট ফাইল আপলোড সফল হয়েছে!')}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" /> ফাইল জমা দিন
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESULT */}
        {activeTab === 'result' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">সর্বশেষ বার্ষিক পরীক্ষার ফলাফল (Academic Marksheet)</h3>
              <button onClick={() => window.print()} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5">
                <Printer className="w-4 h-4" /> প্রিন্ট মার্কশীট
              </button>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-4">
              <div className="flex justify-between font-bold text-sm border-b pb-3">
                <span>শিক্ষার্থীর নাম: {studentInfo.name}</span>
                <span className="text-blue-600">মেধা স্থান: ১ম (Class Rank: 1st)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-bold">
                <div className="bg-white p-3 rounded-xl border">মোট নম্বর: ৮৯২</div>
                <div className="bg-white p-3 rounded-xl border text-emerald-600">GPA: 5.00</div>
                <div className="bg-white p-3 rounded-xl border text-blue-600">গ্রেড: A+ (উত্তীর্ণ)</div>
                <div className="bg-white p-3 rounded-xl border text-purple-600">অবস্থান: সেরা ১%</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
