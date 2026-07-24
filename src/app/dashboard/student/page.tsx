'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Award, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Bell, 
  Sparkles,
  Download,
  Upload,
  Printer,
  RefreshCw,
  User,
  ShieldCheck
} from 'lucide-react';

import { useToast } from '@/components/Toast';

export default function StudentDashboard() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'routine' | 'assignments' | 'result'>('overview');
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  const [studentUser, setStudentUser] = useState<any>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real student data and attendance history from MongoDB
  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const resUsers = await fetch('/api/admin/users');
      const dataUsers = await resUsers.json();
      
      if (dataUsers.success && dataUsers.users) {
        const allUsers: any[] = dataUsers.users;
        const stUser = allUsers.find(u => u.role === 'student') || {
          _id: 'st-1',
          name: 'রাফসান আহমেদ (সাকিব)',
          email: 'rafsan@school.edu.bd',
          details: {
            studentId: '১০১',
            class: '১০',
            section: 'ক',
            assignedTeacherName: 'কাজী মাহমুদুল হাসান (জীববিজ্ঞান ও আইসিটি)'
          }
        };

        setStudentUser(stUser);

        // Fetch student's attendance records from database
        const resAtt = await fetch(`/api/attendance?studentId=${stUser._id}`);
        const dataAtt = await resAtt.json();
        if (dataAtt.success && dataAtt.attendanceHistory) {
          setAttendanceHistory(dataAtt.attendanceHistory);
        }
      }
    } catch (err) {
      console.error('Error fetching student dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Calculate attendance rate dynamically
  const totalClasses = attendanceHistory.length;
  let presentClasses = 0;
  attendanceHistory.forEach(attDoc => {
    const rec = attDoc.records?.find((r: any) => r.studentId === studentUser?._id);
    if (rec && (rec.status === 'present' || rec.status === 'late')) {
      presentClasses++;
    }
  });

  const attendanceRate = totalClasses > 0 
    ? ((presentClasses / totalClasses) * 100).toFixed(1) + '%' 
    : '১০০%';

  const dailyRoutine = [
    { time: '০৯:০০ AM - ০৯:৪৫ AM', subject: 'উচ্চতর গণিত', teacher: 'প্রফেসর এম. এ. মজিদ', room: 'ক্লাস ১০১' },
    { time: '০৯:৪৫ AM - ১০:৩০ AM', subject: 'পদার্থবিজ্ঞান', teacher: 'ইঞ্জিঃ রফিকুল ইসলাম', room: 'পদার্থ ল্যাব' },
    { time: '১০:৩০ AM - ১১:১৫ AM', subject: 'রসায়ন', teacher: 'ড. ফারহানা হক', room: 'রসায়ন ল্যাব' },
    { time: '১১:১৫ AM - ১২:০০ PM', subject: 'ইংরেজি ১ম পত্র', teacher: 'আহমেদ হাসান', room: 'ক্লাস ১০১' },
    { time: '১২:০০ PM - ১২:৪৫ PM', subject: 'টিফিন ও নামাজের বিরতি', teacher: '-', room: 'ক্যান্টিন/মসজিদ' },
    { time: '১২:৪৫ PM - ০১:৩০ PM', subject: 'আইসিটি ও রোবোটিক্স', teacher: 'কাজী মাহমুদুল হাসান', room: 'কম্পিউটার ল্যাব' },
  ];

  const assignments = [
    { id: 1, subject: 'পদার্থবিজ্ঞান', title: 'গতির সমীকরণ ও নিউটনের সূত্রসমূহের ব্যবহারিক প্রয়োগ', dueDate: '২৮ জুলাই ২০২৬', status: 'জমা দেওয়া হয়েছে' },
    { id: 2, subject: 'উচ্চতর গণিত', title: 'ত্রিকোণমিতি ও স্থানাংক জ্যামিতির সমীকরণ সমাধান', dueDate: '৩০ জুলাই ২০২৬', status: 'পেন্ডিং' },
    { id: 3, subject: 'আইসিটি', title: 'HTML5 ও CSS3 দিয়ে তৈরি ওয়েবসাইট প্রজেক্ট জমা', dueDate: '০২ আগস্ট ২০২৬', status: 'পেন্ডিং' },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Student Header Card - Real Database Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
              {studentUser?.details?.studentId || '১০১'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  নিবন্ধিত স্টুডেন্ট পোর্টাল (Live MongoDB Data)
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  GPA 5.00 (A+)
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                {studentUser?.name || 'শিক্ষার্থীর নাম লোড হচ্ছে...'}
              </h1>
              <p className="text-xs text-slate-500">
                {studentUser?.details?.class || '১০'}ম শ্রেণী ({studentUser?.details?.section || 'ক'} শাখা) | 
                স্টুডেন্ট আইডি/রোল: {studentUser?.details?.studentId || '১০১'} | ইমেইল: {studentUser?.email}
              </p>
              {studentUser?.details?.assignedTeacherName && (
                <p className="text-xs text-blue-600 font-bold mt-1">
                  👨‍🏫 নির্ধারিত শ্রেণী শিক্ষক: {studentUser.details.assignedTeacherName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <button
              onClick={() => setShowIdCardModal(true)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> ডিজিটাল আইডি কার্ড
            </button>

            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
              <span className="text-slate-500 block">উপস্থিতির হার</span>
              <span className="text-emerald-600 text-base font-extrabold">{attendanceRate}</span>
            </div>
            <button
              onClick={fetchStudentData}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold p-3 rounded-2xl transition"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: '✨ ওভারভিউ ও সামারি', icon: Sparkles },
            { id: 'attendance', label: `📅 ক্যালেন্ডার হাজিরা হিস্টোরি (${attendanceHistory.length} দিন)`, icon: CalendarIcon },
            { id: 'routine', label: '⏰ আজকের ক্লাস রুটিন', icon: Clock },
            { id: 'assignments', label: `📝 হোমওয়ার্ক ও এসাইনমেন্ট (${assignments.length})`, icon: BookOpen },
            { id: 'result', label: '🏆 পরীক্ষার মার্কশীট ও ফলাফল', icon: Award },
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
                  <Clock className="w-5 h-5 text-blue-600" /> আজকের ক্লাসের সময়সূচি
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
                    <p className="text-blue-700 mt-1">আগামী ১৫ জুন ২০২৬ থেকে শুরু হবে। বিস্তারিত সময়সূচি প্রকাশিত হয়েছে।</p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                    <p className="font-bold text-emerald-900">ডিজিটাল হাজিরা রেকর্ডিং</p>
                    <p className="text-emerald-700 mt-1">মোট {totalClasses} দিন হাজিরার মধ্যে আপনি {presentClasses} দিন উপস্থিত ছিলেন।</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALENDAR ATTENDANCE HISTORY */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">📅 আপনার ক্যালেন্ডার ভিত্তিক ডিজিটাল হাজিরা ইতিহাস</h3>
              <p className="text-xs text-slate-500">ডাটাবেজে শিক্ষক কর্তৃক এন্ট্রি করা আপনার প্রতিদিনের ডিজিটাল হাজিরা রেকর্ড</p>
            </div>

            {attendanceHistory.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                ডাটাবেজে আপনার জন্য এখনো কোনো ক্যালেন্ডার হাজিরা রেকর্ড এন্ট্রি করা হয়নি। শিক্ষক হাজিরা এন্ট্রি করলে এখানে সরাসরি দেখতে পাবেন।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                      <th className="py-3 px-4">তারিখ (YYYY-MM-DD)</th>
                      <th className="py-3 px-4">শ্রেণী ও শাখা</th>
                      <th className="py-3 px-4">দায়িত্বপ্রাপ্ত শিক্ষক</th>
                      <th className="py-3 px-4">হাজিরা স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {attendanceHistory.map((attDoc) => {
                      const rec = attDoc.records?.find((r: any) => r.studentId === studentUser?._id);
                      const status = rec?.status || 'present';
                      return (
                        <tr key={attDoc._id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-bold text-blue-600 text-xs">{attDoc.date}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 text-xs">{attDoc.class}ম (শাখা {attDoc.section})</td>
                          <td className="py-3.5 px-4 text-xs text-slate-600">{attDoc.teacherName || 'শ্রেণী শিক্ষক'}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              status === 'present' ? 'bg-emerald-100 text-emerald-800' :
                              status === 'late' ? 'bg-amber-100 text-amber-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {status === 'present' ? 'উপস্থিত' : status === 'late' ? 'দেরিতে' : 'অনুপস্থিত'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ROUTINE */}
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

        {/* TAB 4: ASSIGNMENTS */}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RESULT */}
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
                <span>শিক্ষার্থীর নাম: {studentUser?.name || 'রাফসান আহমেদ'}</span>
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

      {/* DIGITAL STUDENT ID CARD MODAL */}
      {showIdCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl border border-slate-200 relative text-center">
            <button onClick={() => setShowIdCardModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">
              ✕
            </button>

            {/* ID Card Header Badge */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 mx-auto flex items-center justify-center font-bold border border-white/20">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-sm font-black tracking-wide uppercase">ডাঃ মুজিব-রুবি মডেল হাই স্কুল</h3>
              <p className="text-[10px] text-sky-300 font-bold">ডিজিটাল স্টুডেন্ট পরিচয়পত্র (EIIN: ১৩০৯৫৪)</p>
            </div>

            {/* Photo & Details */}
            <div className="space-y-3 pt-2">
              <div className="w-24 h-24 rounded-2xl mx-auto border-4 border-blue-600 shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
                <User className="w-12 h-12 text-slate-400" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-slate-900">{studentUser?.name || 'রাফসান আহমেদ'}</h4>
                <p className="text-xs font-bold text-blue-600">শ্রেণী: {studentUser?.details?.class || '১০'}ম ({studentUser?.details?.section || 'ক'} শাখা)</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono font-bold space-y-1">
                <p className="text-slate-700">রোল/আইডি: {studentUser?.details?.studentId || '১০১'}</p>
                <p className="text-slate-500 text-[11px]">মেয়াদ: ২০২৬-২০২৭ শিক্ষাবর্ষ</p>
                <p className="text-emerald-700 text-[10px]">স্ট্যাটাস: ভেরিফায়েড একটিভ স্টুডেন্ট</p>
              </div>

              {/* Barcode / QR Simulation */}
              <div className="py-2 bg-slate-100 rounded-xl border border-dashed border-slate-300">
                <div className="w-32 h-8 bg-slate-900 mx-auto rounded flex items-center justify-center text-[10px] font-mono text-white tracking-widest">
                  |||||| || | |||| ||
                </div>
                <p className="text-[9px] text-slate-400 mt-1">ক্যাম্পাস বায়োমেট্রিক ও লাইব্রেরি গেট স্ক্যানার</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> প্রিন্ট আইডি কার্ড
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
