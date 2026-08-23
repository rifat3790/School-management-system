'use client';

import React, { useState, useEffect } from 'react';
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
  BookOpen,
  Calendar as CalendarIcon,
  RefreshCw,
  User,
  MessageSquare,
  Paperclip,
  Loader2,
  Trash2,
  XCircle
} from 'lucide-react';

import { useToast } from '@/components/Toast';

interface StudentRecord {
  _id: string;
  name: string;
  studentId?: string;
  class?: string;
  section?: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export default function TeacherDashboard() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'attendance' | 'homework' | 'marks' | 'chat' | 'admissions' | 'donations' | 'inquiries'>('attendance');
  
  // Date State - Auto defaults to Today (YYYY-MM-DD)
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());

  // Dynamic Teacher & Student Data States
  const [teacherUser, setTeacherUser] = useState<any>(null);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [admissionsList, setAdmissionsList] = useState<any[]>([]);
  const [donationsList, setDonationsList] = useState<any[]>([]);
  const [contactList, setContactList] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [teacherReplyText, setTeacherReplyText] = useState('');
  const [teacherReplyImage, setTeacherReplyImage] = useState('');
  const [uploadingTeacherImage, setUploadingTeacherImage] = useState(false);
  const [teacherSending, setTeacherSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingAttendance, setSavingAttendance] = useState(false);

  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [publishedHw, setPublishedHw] = useState<string[]>([]);

  // 1. Fetch Teacher & Student Data from MongoDB
  const fetchTeacherAndStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success && data.users) {
        const allUsers: any[] = data.users;
        
        // Find teacher record or first teacher
        const tUser = allUsers.find(u => u.role === 'teacher') || {
          _id: 't-1',
          name: 'কাজী মাহমুদুল হাসান',
          email: 'teacher@drmujibrubi.edu.bd',
          details: { subject: 'জীববিজ্ঞান & আইসিটি', designation: 'সহকারী শিক্ষক', class: '১০', section: 'A' }
        };
        setTeacherUser(tUser);

        // Find students assigned to this teacher or belonging to teacher's class
        let stList = allUsers.filter(u => 
          u.role === 'student' && 
          (u.details?.assignedTeacherId === tUser._id || u.status === 'approved')
        );

        if (stList.length === 0) {
          stList = allUsers.filter(u => u.role === 'student');
        }

        // Map to student record format
        const formattedStudents: StudentRecord[] = stList.map((st, idx) => ({
          _id: st._id,
          name: st.name,
          studentId: st.details?.studentId || `${101 + idx}`,
          class: st.details?.class || '10',
          section: st.details?.section || 'A',
          status: 'present',
          remarks: ''
        }));

        setStudents(formattedStudents);
        fetchAttendanceForDate(selectedDate, tUser, formattedStudents);

        // Fetch Admissions, Donations, Contact Messages, Chat Messages
        const [rA, rD, rC, rChat] = await Promise.all([
          fetch('/api/admissions').then(r => r.json()),
          fetch('/api/donations').then(r => r.json()),
          fetch('/api/contact').then(r => r.json()),
          fetch('/api/chat').then(r => r.json()).catch(() => ({ success: false })),
        ]);
        if (rA.success) setAdmissionsList(rA.admissions);
        if (rD.success) setDonationsList(rD.donations);
        if (rC.success) setContactList(rC.messages);
        if (rChat?.success && Array.isArray(rChat.messages)) setChatMessages(rChat.messages);
      }
    } catch (err) {
      console.error('Error loading teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherFileUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('শুধুমাত্র ছবি ফাইল আপলোড করা যাবে');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ ১০MB এর নিচে হতে হবে');
      return;
    }

    setUploadingTeacherImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setTeacherReplyImage(data.url);
        toast.success('ছবি সংযুক্ত হয়েছে');
      } else {
        toast.error(data.message || 'ছবি আপলোড ব্যর্থ হয়েছে');
      }
    } catch (err) {
      toast.error('ছবি আপলোড ব্যর্থ হয়েছে');
    } finally {
      setUploadingTeacherImage(false);
    }
  };

  const handleSendTeacherReply = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = (customText || teacherReplyText).trim();
    const image = teacherReplyImage;

    if (!text && !image) return;

    setTeacherSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: `${teacherUser?.name || 'শিক্ষক'} (${teacherUser?.details?.subject || 'শিক্ষক প্যানেল'})`,
          senderRole: 'teacher',
          text: text,
          imageUrl: image
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('শিক্ষার্থীর কাছে শিক্ষকের উত্তর লাইভ পাঠানো হয়েছে!');
        setTeacherReplyText('');
        setTeacherReplyImage('');
        fetchTeacherAndStudents();
      } else {
        toast.error('উত্তর পাঠাতে সমস্যা হয়েছে');
      }
    } catch (err) {
      toast.error('নেটওয়ার্ক সমস্যা হয়েছে');
    } finally {
      setTeacherSending(false);
    }
  };

  const handleApproveDonation = async (id: string, isApproved: boolean) => {
    try {
      const res = await fetch('/api/donations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isApproved ? 'ডোনেশন সফলভাবে অনুমোদন করা হয়েছে! এটি এখন পাবলিক টেবিলে দৃশ্যমান।' : 'অনুমোদন বাতিল করা হয়েছে');
        fetchTeacherAndStudents();
      }
    } catch (err) { toast.error('হালনাগাদ করতে সমস্যা হয়েছে'); }
  };

  const handleUpdateAdmissionStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('ভর্তি আবেদনের স্ট্যাটাস আপডেট হয়েছে!');
        fetchTeacherAndStudents();
      }
    } catch (err) { toast.error('হালনাগাদ করতে সমস্যা হয়েছে'); }
  };

  // 2. Fetch Attendance for Selected Date from MongoDB
  const fetchAttendanceForDate = async (dateStr: string, currentTeacher: any, currentStudents: StudentRecord[]) => {
    try {
      const className = currentTeacher?.details?.class || '10';
      const section = currentTeacher?.details?.section || 'A';
      const res = await fetch(`/api/attendance?date=${dateStr}&class=${className}&section=${section}`);
      const data = await res.json();

      if (data.success && data.attendance && data.attendance.length > 0) {
        const savedDoc = data.attendance[0];
        const savedRecordsMap = new Map(savedDoc.records.map((r: any) => [r.studentId, r]));

        setStudents(prev => prev.map(st => {
          const rec: any = savedRecordsMap.get(st._id);
          return rec ? { ...st, status: rec.status, remarks: rec.remarks || '' } : st;
        }));
      }
    } catch (err) {
      console.error('Error fetching date attendance:', err);
    }
  };

  useEffect(() => {
    fetchTeacherAndStudents();
  }, []);

  // Handle Date Change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (teacherUser) {
      fetchAttendanceForDate(newDate, teacherUser, students);
    }
  };

  const toggleAttendanceStatus = (studentId: string) => {
    setStudents(prev => prev.map(st => {
      if (st._id === studentId) {
        const nextStatus: 'present' | 'absent' | 'late' = 
          st.status === 'present' ? 'absent' :
          st.status === 'absent' ? 'late' : 'present';
        return { ...st, status: nextStatus };
      }
      return st;
    }));
  };

  // Save Attendance to Database for Calendar Date
  const handleSaveAttendance = async () => {
    if (!teacherUser) return;
    setSavingAttendance(true);

    const payload = {
      date: selectedDate,
      class: teacherUser.details?.class || '10',
      section: teacherUser.details?.section || 'A',
      teacherId: teacherUser._id,
      teacherName: teacherUser.name,
      records: students.map(st => ({
        studentId: st._id,
        studentName: st.name,
        status: st.status,
        remarks: st.remarks || ''
      }))
    };

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`${selectedDate} তারিখের উপস্থিতি ডাটাবেজে সফলভাবে সংরক্ষণ করা হয়েছে!`);
      } else {
        toast.error(data.message || 'হাজিরা সংরক্ষণ করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      toast.error('হাজিরা সেভ ব্যর্থ হয়েছে');
    } finally {
      setSavingAttendance(false);
    }
  };

  const handlePublishHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle) return;
    setPublishedHw([hwTitle, ...publishedHw]);
    setHwTitle('');
    setHwDesc('');
    toast.success('হোমওয়ার্ক পোর্টালে সফলভাবে প্রকাশিত হয়েছে!');
  };

  const presentCount = students.filter(s => s.status === 'present').length;

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card - Real Teacher Profile Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
              {teacherUser?.details?.subject ? teacherUser.details.subject.slice(0, 3).toUpperCase() : 'EDU'}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                শিক্ষক প্যানেল (Live MongoDB Data)
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                {teacherUser?.name || 'শিক্ষকের নাম লোড হচ্ছে...'}
              </h1>
              <p className="text-xs text-slate-500">
                {teacherUser?.details?.designation || 'সহকারী শিক্ষক'} ({teacherUser?.details?.subject || 'সাধারণ বিষয়'}) | 
                {teacherUser?.details?.class || '১০'}ম শ্রেণী ({teacherUser?.details?.section || 'ক'}) শ্রেণী শিক্ষক
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('attendance')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              ক্যালেন্ডার হাজিরা পোর্টাল
            </button>
            <button
              onClick={fetchTeacherAndStudents}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold p-2.5 rounded-xl transition"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'attendance', label: `📅 ক্যালেন্ডার হাজিরা (${presentCount}/${students.length} উপস্থিত)`, icon: UserCheck },
            { id: 'homework', label: `📝 হোমওয়ার্ক প্রকাশ (${publishedHw.length})`, icon: FileEdit },
            { id: 'marks', label: '🏆 মার্কস এন্ট্রি সিস্টেম', icon: Award },
            { id: 'chat', label: `💬 লাইভ হেল্পডেস্ক চ্যাট (${chatMessages.length})`, icon: MessageSquare },
            { id: 'admissions', label: `📝 ভর্তি আবেদন (${admissionsList.length})`, icon: BookOpen },
            { id: 'donations', label: `❤️ অনুদান এপ্রুভাল (${donationsList.length})`, icon: Sparkles },
            { id: 'inquiries', label: `📬 কন্টাক্ট ইনকোয়ারি (${contactList.length})`, icon: Send },
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

        {/* TAB 1: CALENDAR-WISE ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {teacherUser?.details?.class || '১০'}ম শ্রেণী ({teacherUser?.details?.section || 'ক'} শাখা) - ক্যালেন্ডার ভিত্তিক ডিজিটাল হাজিরা
                </h3>
                <p className="text-xs text-slate-500">আপনার প্রয়োজনীয় যেকোনো তারিখ সিলেক্ট করে হাজিরা ইনপুট ও আপডেট করুন</p>
              </div>

              {/* Calendar Date Picker */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <CalendarIcon className="w-4 h-4 text-blue-600 shrink-0" />
                  <label className="text-xs font-bold text-slate-700">তারিখ নির্বাচন:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  onClick={handleSaveAttendance}
                  disabled={savingAttendance || students.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50 transition"
                >
                  <Save className="w-4 h-4" />
                  {savingAttendance ? 'সেভ হচ্ছে...' : `${selectedDate} হাজিরা সেভ করুন`}
                </button>
              </div>
            </div>

            {/* Attendance Matrix */}
            {students.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                এই শিক্ষকের অধীনে কোনো নিবন্ধিত শিক্ষার্থী পাওয়া যায়নি! (এডমিন প্যানেল থেকে স্টুডেন্ট অ্যাসাইন করুন)
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {students.map((st) => {
                  const isPresent = st.status === 'present';
                  const isLate = st.status === 'late';
                  return (
                    <div
                      key={st._id}
                      onClick={() => toggleAttendanceStatus(st._id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between shadow-sm ${
                        isPresent 
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' :
                        isLate
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : 'bg-rose-50/70 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold opacity-75">আইডি / রোল: {st.studentId}</span>
                        <p className="font-bold text-sm leading-tight mt-0.5">{st.name}</p>
                        <p className="text-[10px] opacity-75 mt-0.5">ক্লিক করে স্ট্যাটাস চেঞ্জ করুন</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                        isPresent ? 'bg-emerald-600 text-white' :
                        isLate ? 'bg-amber-500 text-white' :
                        'bg-rose-600 text-white'
                      }`}>
                        {isPresent ? 'উপস্থিত' : isLate ? 'দেরিতে' : 'অনুপস্থিত'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
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
                <h3 className="text-lg font-bold text-slate-900">প্রকাশিত হোমওয়ার্কসমূহ</h3>
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

        {/* TAB 3: MARKS */}
        {activeTab === 'marks' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">🏆 শিক্ষার্থীদের পরীক্ষার মার্কস এন্ট্রি পোর্টাল</h3>
            <p className="text-xs text-slate-500">অনলাইনে বার্ষিক/টার্ম পরীক্ষার বিষয়ভিত্তিক নম্বর এন্ট্রি করুন</p>
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-xs">
              সকল শিক্ষার্থীর নম্বর এন্ট্রি শিট সফলভাবে প্রস্তুত। মার্কস ইনপুট দিয়ে সেভ বাটনে ক্লিক করুন।
            </div>
          </div>
        )}

        {/* TAB 4: ADMISSIONS */}
        {activeTab === 'admissions' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">অনলাইন ভর্তি আবেদনসমূহ ({admissionsList.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">শিক্ষার্থীর নাম</th>
                    <th className="p-3">শ্রেণী</th>
                    <th className="p-3">অভিভাবক ও ফোন</th>
                    <th className="p-3">পেমেন্ট স্ট্যাটাস</th>
                    <th className="p-3">আবেদন স্ট্যাটাস</th>
                    <th className="p-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissionsList.map((adm: any) => (
                    <tr key={adm._id || adm.id} className="hover:bg-slate-50 transition font-medium text-slate-800">
                      <td className="p-3 font-bold text-slate-900">{adm.studentName}</td>
                      <td className="p-3 font-bold text-blue-600">{adm.classApply}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{adm.fatherName}</div>
                        <div className="text-[10px] text-slate-500">{adm.phone}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          adm.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {adm.paymentStatus === 'paid' ? `পরিশোধিত (Trx: ${adm.paymentTxId || 'BKASH'})` : 'পরে পরিশোধযোগ্য (Pay Later)'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          adm.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : adm.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {adm.status === 'approved' ? 'অনুমোদিত' : adm.status === 'rejected' ? 'বাতিল' : 'পেন্ডিং'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleUpdateAdmissionStatus(adm._id || adm.id, 'approved')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[10px]"
                        >
                          অনুমোদন
                        </button>
                        <button
                          onClick={() => handleUpdateAdmissionStatus(adm._id || adm.id, 'rejected')}
                          className="px-2.5 py-1 bg-rose-600 text-white rounded-lg font-bold text-[10px]"
                        >
                          বাতিল
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DONATIONS APPROVAL */}
        {activeTab === 'donations' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">অনলাইন অনুদান ও ডোনেশন এপ্রুভাল ({donationsList.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">দাতার নাম</th>
                    <th className="p-3">পরিচয়</th>
                    <th className="p-3">অনুদানের পরিমাণ</th>
                    <th className="p-3">মেসেজ</th>
                    <th className="p-3">পাবলিক ভিউ স্ট্যাটাস</th>
                    <th className="p-3 text-right">এপ্রুভাল অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donationsList.map((don: any) => (
                    <tr key={don._id || don.id} className="hover:bg-slate-50 transition font-medium text-slate-800">
                      <td className="p-3 font-bold text-slate-900">{don.donorName}</td>
                      <td className="p-3"><span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-bold text-[10px]">{don.donorType}</span></td>
                      <td className="p-3 font-mono font-bold text-emerald-600">৳ {don.amount?.toLocaleString('bn-BD')}</td>
                      <td className="p-3 text-slate-600 italic line-clamp-1">{don.message || '-'}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          don.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {don.isApproved ? 'পাবলিক টেবিলে দৃশ্যমান' : 'পেন্ডিং (অদৃশ্য)'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {don.isApproved ? (
                          <button
                            onClick={() => handleApproveDonation(don._id || don.id, false)}
                            className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 font-bold rounded-lg text-[10px]"
                          >
                            অনুমোদন বাতিল
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproveDonation(don._id || don.id, true)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] shadow-sm"
                          >
                            ✓ এপ্রুভ করুন
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: LIVE TEACHER CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">💬 লাইভ শিক্ষার্থী ও অভিভাবক সাপোর্ট চ্যাট</h3>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> শিক্ষক প্যানেল সক্রিয়
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">শিক্ষার্থী ও অভিভাবকদের লাইভ প্রশ্ন ও অনুসন্ধানের সরাসরি উত্তর দিন</p>
              </div>

              <button
                type="button"
                onClick={fetchTeacherAndStudents}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> চ্যাট রিফ্রেশ
              </button>
            </div>

            {/* Quick Canned Responses */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 block">শিক্ষকের দ্রুত উত্তর টেমপ্লেট:</label>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  'আসসালামু আলাইকুম। আগামী ক্লাসে এই বিষয়ে বিস্তারিত আলোচনা করা হবে।',
                  'হোমওয়ার্ক সম্পন্ন করে কালকের ক্লাসে নিয়ে আসবে।',
                  'পরীক্ষার সিলেবাস ও মানবন্টন হোমওয়ার্ক ট্যাবে আপডেট করা হয়েছে।',
                  'ক্লাস টাইমে শিক্ষক কক্ষে এসে দেখা করতে পারো।'
                ].map((canned, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => handleSendTeacherReply(undefined, canned)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[11px] font-medium rounded-xl border border-slate-200 shrink-0 transition"
                  >
                    + {canned}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 max-h-[460px] overflow-y-auto space-y-3.5 text-xs">
              {chatMessages.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="font-bold">বর্তমানে কোনো চ্যাট মেসেজ নেই</p>
                </div>
              ) : (
                chatMessages.map((msg: any, mIdx: number) => {
                  const isUser = msg.senderRole === 'user' || msg.senderRole === 'student' || msg.senderRole === 'guest' || msg.senderRole === 'parent';
                  const isAdmin = msg.senderRole === 'admin' || msg.senderRole === 'superadmin';
                  const isTeacher = msg.senderRole === 'teacher';

                  return (
                    <div
                      key={msg._id || mIdx}
                      className={`p-4 rounded-2xl border transition-all ${
                        isUser
                          ? 'bg-white border-slate-200 shadow-xs'
                          : isTeacher
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                          : isAdmin
                          ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                          : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {msg.senderName || (isUser ? 'শিক্ষার্থী / অভিভাবক' : 'শিক্ষক')}
                          </span>
                          
                          {isUser && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-bold text-[10px] border border-slate-200">
                              👤 শিক্ষার্থী / অভিভাবক
                            </span>
                          )}
                          {isTeacher && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px] border border-emerald-200">
                              👨‍🏫 শিক্ষক
                            </span>
                          )}
                          {isAdmin && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold text-[10px] border border-blue-200">
                              👑 প্রশাসন
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] text-slate-400 font-mono">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : ''}
                        </span>
                      </div>

                      {msg.text && (
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      )}

                      {msg.imageUrl && (
                        <div className="mt-2.5">
                          <img
                            src={msg.imageUrl}
                            alt="Attachment"
                            className="max-h-48 rounded-xl object-cover border border-slate-200 cursor-pointer hover:opacity-90 transition"
                            onClick={() => window.open(msg.imageUrl, '_blank')}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Attached Image Preview */}
            {teacherReplyImage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img src={teacherReplyImage} alt="Attachment Preview" className="w-10 h-10 rounded-lg object-cover border border-emerald-300" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">ছবি সংযুক্ত হয়েছে</p>
                    <p className="text-[10px] text-emerald-600 truncate font-mono">{teacherReplyImage}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTeacherReplyImage('')}
                  className="p-1.5 bg-white hover:bg-rose-50 text-rose-600 rounded-lg border border-slate-200"
                  title="ছবি মুছুন"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Teacher Live Reply Form */}
            <form onSubmit={(e) => handleSendTeacherReply(e)} className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-900">শিক্ষক হিসেবে লাইভ উত্তর পাঠান</label>
              
              <div className="flex items-center gap-2">
                <label className="p-3 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-2xl border border-slate-200 cursor-pointer transition shrink-0" title="ছবি ফাইল আপলোড করুন">
                  {uploadingTeacherImage ? (
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                  ) : (
                    <Paperclip className="w-5 h-5" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleTeacherFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>

                <input
                  type="text"
                  placeholder="শিক্ষার্থীর প্রশ্নের উত্তর লিখুন..."
                  value={teacherReplyText}
                  onChange={(e) => setTeacherReplyText(e.target.value)}
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />

                <button
                  type="submit"
                  disabled={(!teacherReplyText.trim() && !teacherReplyImage) || teacherSending}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition shrink-0"
                >
                  {teacherSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>উত্তর পাঠান</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">ওয়েবসাইট যোগাযোগ ইনকোয়ারি ও মেসেজ ({contactList.length})</h3>
            <div className="space-y-3">
              {contactList.map((c: any) => (
                <div key={c._id || c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 text-sm">{c.name} ({c.phone || c.email})</span>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{c.subject}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
