'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  Bell, 
  FileText, 
  PlusCircle, 
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Save,
  Trash2,
  Settings,
  Image as ImageIcon,
  BookOpen,
  Newspaper,
  HeartHandshake,
  Search,
  Key,
  Lock,
  UserPlus,
  Edit,
  Eye,
  EyeOff,
  Filter,
  UserCheck,
  MessageSquare
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';
import { useToast } from '@/components/Toast';

interface UserRecord {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  tempPassword?: string;
  resetCode?: string;
  resetRequested?: boolean;
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'superadmin';
  requestedRole: string;
  status: 'pending' | 'approved' | 'rejected';
  details?: any;
  createdAt: string;
}

export default function AdminDashboard() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'users' | 'chat' | 'assignments' | 'approvals' | 'resets' | 'settings' | 'about' | 'notices' | 'teachers' | 'news' | 'gallery'>('users');
  
  // Assignment State
  const [assignTeacherId, setAssignTeacherId] = useState('');
  const [assignStudentId, setAssignStudentId] = useState('');
  
  // Data States
  const [allUsers, setAllUsers] = useState<UserRecord[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserRecord[]>([]);
  const [resetUsers, setResetUsers] = useState<UserRecord[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // User Filter States
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Edit / Create User Modal State
  const [selectedEditUser, setSelectedEditUser] = useState<UserRecord | null>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: 'Password123',
    phone: '',
    role: 'student',
    status: 'approved',
    className: '10',
    subject: '',
  });

  // Settings State
  const [siteSettings, setSiteSettings] = useState({
    schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
    slogan: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
    subSlogan: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
    heroTagline: 'শিক্ষাই শক্তি',
    heroTitleLine1: 'প্রযুক্তিই ভবিষ্যৎ',
    heroTitleLine2: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
    heroDescription: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে প্রতিশ্রুতিবদ্ধ।',
    heroImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=80',
    phone: '+৮৮০ ১৭০০-০০০০০',
    email: 'info@drmujibrubi.edu.bd',
    address: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ',
    principalName: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ',
    principalTitle: 'প্রধান শিক্ষক',
    principalMessage: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা প্রতিটি শিক্ষার্থীর ভেতরের সুপ্ত মেধা ও সম্ভাবনা জাগ্রত করতে প্রতিশ্রুতিবদ্ধ।',
    principalImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
    chairmanName: 'ডাঃ মোজাম্মেল হক',
    chairmanTitle: 'প্রতিষ্ঠাতা ও সভাপতি',
    chairmanMessage: 'একটি আলোকিত সমাজ গঠনে মানসম্মত আধুনিক শিক্ষার কোনো বিকল্প নেই।',
    chairmanImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    aboutHistory: '১৯৯৮ সালে প্রতিষ্ঠিত ডাঃ মুজিব-রুবি মডেল হাই স্কুল শেরপুর জেলার প্রাচীনতম ও শ্রেষ্ঠতম ডিজিটাল শিক্ষাঙ্গন।',
    missionText: 'প্রযুক্তি ও মেধার সমন্বয়ে সেরা নাগরিক গড়ে তোলা।',
    visionText: 'স্মার্ট বাংলাদেশের উপযোগী ভবিষ্যৎ রূপকার তৈরি।',
    studentsStat: '২,৮৮০+',
    teachersStat: '৯৫+',
    passRateStat: '২১৫+'
  });

  // Forms
  const [newNotice, setNewNotice] = useState({ title: '', category: 'একাডেমিক', date: new Date().toLocaleDateString('bn-BD'), content: '', isImportant: false });
  const [newTeacher, setNewTeacher] = useState({ name: '', designation: 'সহকারী শিক্ষক', subject: '', qualification: 'এম.এ, বি.এড', experience: '৫ বছর', email: '', phone: '', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' });
  const [newNews, setNewNews] = useState({ title: '', category: 'সংবাদ', date: new Date().toLocaleDateString('bn-BD'), summary: '', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80' });
  const [newGallery, setNewGallery] = useState({ title: '', category: 'ক্যাম্পাস', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80' });

  // Fetching Data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. All Users
      const resUsers = await fetch('/api/admin/users');
      const dataUsers = await resUsers.json();
      if (dataUsers.success) {
        setAllUsers(dataUsers.users);
        setPendingUsers(dataUsers.users.filter((u: UserRecord) => u.status === 'pending'));
        setResetUsers(dataUsers.users.filter((u: UserRecord) => u.resetRequested));
      }

      // 2. Settings
      const resSet = await fetch('/api/settings');
      const dataSet = await resSet.json();
      if (dataSet.success && dataSet.settings) {
        const s = dataSet.settings;
        setSiteSettings({
          schoolName: s.schoolName || 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
          slogan: s.slogan || 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
          subSlogan: s.subSlogan || 'জ্ঞান • শৃঙ্খলা • সাফল্য',
          heroTagline: s.heroTagline || '',
          heroTitleLine1: s.heroTitleLine1 || '',
          heroTitleLine2: s.heroTitleLine2 || '',
          heroDescription: s.heroDescription || '',
          heroImage: s.heroImage || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=80',
          phone: s.phone || '',
          email: s.email || '',
          address: s.address || '',
          principalName: s.principalName || '',
          principalTitle: s.principalTitle || '',
          principalMessage: s.principalMessage || '',
          principalImage: s.principalImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
          chairmanName: s.chairmanName || '',
          chairmanTitle: s.chairmanTitle || '',
          chairmanMessage: s.chairmanMessage || '',
          chairmanImage: s.chairmanImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
          aboutHistory: s.aboutHistory || '',
          missionText: s.missionText || '',
          visionText: s.visionText || '',
          studentsStat: s.stats?.students || '২,৮৮০+',
          teachersStat: s.stats?.teachers || '৯৫+',
          passRateStat: s.stats?.passRate || '২১৫+'
        });
      }

      // 3. Notices, Teachers, News, Gallery
      const [rN, rT, rNw, rG] = await Promise.all([
        fetch('/api/notices').then(r => r.json()),
        fetch('/api/teachers').then(r => r.json()),
        fetch('/api/news').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
      ]);

      if (rN.success) setNotices(rN.notices);
      if (rT.success) setTeachers(rT.teachers);
      if (rNw.success) setNewsList(rNw.news);
      if (rG.success) setGalleryList(rG.gallery);

    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Filtered users for master table
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.phone && u.phone.includes(userSearch));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // User Actions
  const handleUserAction = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`ইউজার অ্যাকাউন্ট ${status === 'approved' ? 'এপ্রুভড' : 'বাতিল'} করা হয়েছে`);
        fetchAllData();
      }
    } catch (err) { toast.error('অপারেশন ব্যর্থ হয়েছে'); }
  };

  // Create User Handler
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserForm.name,
          email: newUserForm.email,
          password: newUserForm.password,
          phone: newUserForm.phone,
          role: newUserForm.role,
          status: newUserForm.status,
          details: { class: newUserForm.className, subject: newUserForm.subject }
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('নতুন ইউজার সফলভাবে ডাটাবেজে তৈরি ও সক্রিয় হয়েছে!');
        setShowCreateUserModal(false);
        setNewUserForm({ name: '', email: '', password: 'Password123', phone: '', role: 'student', status: 'approved', className: '10', subject: '' });
        fetchAllData();
      } else {
        toast.error(data.message || 'ইউজার তৈরি করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      toast.error('ত্রুটি ঘটেছে!');
    }
  };

  // Save Edit User
  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditUser) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedEditUser._id,
          name: selectedEditUser.name,
          email: selectedEditUser.email,
          phone: selectedEditUser.phone,
          role: selectedEditUser.role,
          status: selectedEditUser.status,
          tempPassword: selectedEditUser.tempPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('ইউজারের তথ্য সফলভাবে আপডেট হয়েছে!');
        setSelectedEditUser(null);
        fetchAllData();
      }
    } catch (err) { toast.error('আপডেট ব্যর্থ হয়েছে'); }
  };

  // Delete User
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('ইউজার অ্যাকাউন্ট ডিলিট হয়েছে');
        fetchAllData();
      }
    } catch (err) { toast.error('ডিলিট করতে সমস্যা হয়েছে'); }
  };

  // Clear Reset Request
  const handleClearReset = async (userId: string, newPass: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          resetRequested: false,
          tempPassword: newPass || 'NewPass123'
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('পাসওয়ার্ড সফলভাবে রিসেট ও সেভ হয়েছে!');
        fetchAllData();
      }
    } catch (err) { toast.error('রিসেট ফেইলড'); }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...siteSettings,
          stats: { students: siteSettings.studentsStat, teachers: siteSettings.teachersStat, passRate: siteSettings.passRateStat, establishedYear: '১৯৯৮' }
        }),
      });
      const data = await res.json();
      if (data.success) toast.success('ডাটাবেজে সকল সেটিংস ও কন্টেন্ট সেভ হয়েছে!');
    } catch (err) { toast.error('আপডেট করতে সমস্যা হয়েছে!'); }
  };

  const handleAssignStudentToTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTeacherId || !assignStudentId) {
      toast.error('শিক্ষক এবং শিক্ষার্থী নির্বাচন করুন');
      return;
    }
    const teacherUser = allUsers.find(u => u._id === assignTeacherId);
    const studentUser = allUsers.find(u => u._id === assignStudentId);
    if (!teacherUser || !studentUser) return;

    try {
      // 1. Assign Teacher ID and Name to Student
      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: studentUser._id,
          details: {
            ...(studentUser.details || {}),
            assignedTeacherId: teacherUser._id,
            assignedTeacherName: teacherUser.name,
          }
        }),
      });

      // 2. Add Student ID to Teacher's assignedStudentIds
      const currentAssigned = teacherUser.details?.assignedStudentIds || [];
      const updatedAssigned = Array.from(new Set([...currentAssigned, studentUser._id]));

      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: teacherUser._id,
          details: {
            ...(teacherUser.details || {}),
            assignedStudentIds: updatedAssigned,
          }
        }),
      });

      toast.success(`শিক্ষার্থী ${studentUser.name}-কে শিক্ষক ${teacherUser.name}-এর অধীনে সফলভাবে অ্যাসাইন করা হয়েছে!`);
      setAssignStudentId('');
      fetchAllData();
    } catch (err) {
      toast.error('অ্যাসাইন করতে সমস্যা হয়েছে');
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Master Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  সুপার এডমিন অল-ইন-ওয়ান মাস্টার সিএমএস (Live Master Database)
                </span>
                {resetUsers.length > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 animate-pulse">
                    🔑 {resetUsers.length}টি রিসেট আবেদন!
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">{SCHOOL_INFO.name} — মাস্টার কন্ট্রোল সেন্টার</h1>
              <p className="text-xs text-slate-500">
                ইউজার অ্যাকাউন্ট তৈরি, পাসওয়ার্ড সিংক, রোল সেট, সাইট সেটিংস এবং ডাটাবেজ লাইভ কন্ট্রোল করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateUserModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition"
            >
              <UserPlus className="w-4 h-4" />
              নতুন ইউজার অ্যাকাউন্ট তৈরি করুন
            </button>

            <button
              onClick={fetchAllData}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'users', label: `👥 সকল ইউজার ডাটাবেজ (${allUsers.length})`, icon: Users },
            { id: 'assignments', label: '🔗 শিক্ষক-শিক্ষার্থী অ্যাসাইনমেন্ট', icon: UserCheck },
            { id: 'chat', label: '💬 লাইভ চ্যাট ইনবক্স (Live Support)', icon: MessageSquare },
            { id: 'resets', label: `🔑 রিসেট আবেদন (${resetUsers.length})`, icon: Key },
            { id: 'approvals', label: `⏰ পেন্ডিং এপ্রুভাল (${pendingUsers.length})`, icon: Clock },
            { id: 'settings', label: '⚙️ সাইট ও ব্যানার সেটিংস', icon: Settings },
            { id: 'about', label: '📜 সম্পর্কে ও বাণী এডিটর', icon: HeartHandshake },
            { id: 'notices', label: `🔔 নোটিশ বোর্ড (${notices.length})`, icon: Bell },
            { id: 'teachers', label: `👨‍🏫 শিক্ষক প্যানেল (${teachers.length})`, icon: Users },
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

        {/* TAB 1: ALL USERS DATABASE */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">সকল নিবন্ধিত ইউজার ডাটাবেজ</h3>
                <p className="text-xs text-slate-500">ইউজারের তথ্য, পাসওয়ার্ড, রোল ও একাউন্ট স্ট্যাটাস লাইভ আপডেট করুন</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                >
                  <option value="all">সকল রোল (Role)</option>
                  <option value="student">শিক্ষার্থী (Student)</option>
                  <option value="teacher">শিক্ষক (Teacher)</option>
                  <option value="parent">অভিভাবক (Parent)</option>
                  <option value="admin">এডমিন (Admin)</option>
                  <option value="superadmin">সুপার এডমিন (Super Admin)</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                >
                  <option value="all">সকল স্ট্যাটাস</option>
                  <option value="approved">Approved (সক্রিয়)</option>
                  <option value="pending">Pending (অপেক্ষমাণ)</option>
                  <option value="rejected">Rejected (বাতিল)</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            {filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                কোন ইউজার ডাটা পাওয়া যায়নি!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                      <th className="py-3 px-4">ইউজারের নাম ও ইমেইল</th>
                      <th className="py-3 px-4">মোবাইল নম্বর</th>
                      <th className="py-3 px-4">রোল (Role)</th>
                      <th className="py-3 px-4">স্ট্যাটাস</th>
                      <th className="py-3 px-4">পাসওয়ার্ড / লগইন পিন</th>
                      <th className="py-3 px-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-600">
                          {user.phone || 'N/A'}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs capitalize ${
                            user.role === 'superadmin' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' :
                            user.role === 'teacher' ? 'bg-sky-100 text-sky-800' :
                            user.role === 'parent' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                            user.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            user.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                              {showPasswords[user._id] ? (user.tempPassword || '123456') : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(user._id)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              {showPasswords[user._id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedEditUser(user)}
                              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" /> এডিট
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: LIVE MANAGEMENT CHAT INBOX */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">💬 লাইভ ম্যানেজমেন্ট চ্যাট ইনবক্স (Live Support Chat)</h3>
                <p className="text-xs text-slate-500">শিক্ষার্থী ও অভিভাবকদের লাইভ বার্তা দেখুন এবং ডাইরেক্ট উত্তর বা ছবি পাঠান</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-h-96 overflow-y-auto space-y-3 text-xs">
              {notices.length >= 0 && (
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">রাফসান আহমেদ (শিক্ষার্থী)</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">Student</span>
                      </div>
                      <p className="text-slate-700 mt-1">"আসসালামু আলাইকুম স্যার, অর্ধ-বার্ষিকী পরীক্ষার বিশেষ সিলেবাস কি নোটিশ বোর্ডে প্রকাশ হবে?"</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">সুপার এডমিন টিম (উত্তর দেওয়া হয়েছে)</span>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[10px]">Super Admin</span>
                    </div>
                    <p className="text-xs text-slate-700">"ওয়া আলাইকুমুস সালাম। হ্যাঁ, আগামী সপ্তাহের শুরুতেই সিলেবাস ও ফি সিডিউল ওয়েবসাইটে আপলোড করা হবে।"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Reply Box */}
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.success('শিক্ষার্থীর নিকট এডমিন উত্তর লাইভ পাঠানো হয়েছে!');
            }} className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900">ইনস্ট্যান্ট এডমিন রিপ্লাই বা ছবি পাঠান</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="আপনার উত্তর লিখুন..."
                  required
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="ছবি URL (ঐচ্ছিক)"
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> মেসেজ উত্তর পাঠান
              </button>
            </form>
          </div>
        )}

        {/* TAB: TEACHER-STUDENT ASSIGNMENT CONTROL */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">🔗 শিক্ষক-শিক্ষার্থী কানেকশন ও অ্যাসাইনমেন্ট কন্ট্রোল</h3>
              <p className="text-xs text-slate-500">কোন শিক্ষকের অধীনে কোন শিক্ষার্থী থাকবে তা এডমিন সিলেক্ট ও অ্যাসাইন করুন। ডাটাবেজে লাইভ আপডেট হবে।</p>
            </div>

            <form onSubmit={handleAssignStudentToTeacher} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষক নির্বাচন করুন (Teacher)</label>
                  <select
                    value={assignTeacherId}
                    onChange={(e) => setAssignTeacherId(e.target.value)}
                    required
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="">-- শিক্ষক সিলেক্ট করুন --</option>
                    {allUsers.filter(u => u.role === 'teacher').map(t => (
                      <option key={t._id} value={t._id}>
                        {t.name} ({t.details?.subject || 'বিষয় নির্ধারিত নয়'} — {t.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থী নির্বাচন করুন (Student)</label>
                  <select
                    value={assignStudentId}
                    onChange={(e) => setAssignStudentId(e.target.value)}
                    required
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="">-- শিক্ষার্থী সিলেক্ট করুন --</option>
                    {allUsers.filter(u => u.role === 'student').map(s => (
                      <option key={s._id} value={s._id}>
                        {s.name} (Class: {s.details?.class || '10'}, Sec: {s.details?.section || 'A'} — {s.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" /> অ্যাসাইনমেন্ট সেভ করুন
              </button>
            </form>

            {/* Current Assignments Summary */}
            <div className="space-y-3 pt-4">
              <h4 className="font-bold text-sm text-slate-900">বর্তমানে অ্যাসাইন করা শিক্ষার্থীদের তালিকা</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allUsers.filter(u => u.role === 'teacher').map(teacher => {
                  const assignedStudents = allUsers.filter(s => s.role === 'student' && s.details?.assignedTeacherId === teacher._id);
                  return (
                    <div key={teacher._id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-slate-900">{teacher.name}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10px] rounded-full">
                          {assignedStudents.length} জন শিক্ষার্থী
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">বিষয়: {teacher.details?.subject || 'সাধারণ'}</p>
                      <div className="space-y-1 pt-1">
                        {assignedStudents.length === 0 ? (
                          <p className="text-[10px] text-slate-400 italic">কোনো শিক্ষার্থী অ্যাসাইন করা নেই</p>
                        ) : (
                          assignedStudents.map(st => (
                            <div key={st._id} className="text-[11px] text-slate-700 flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                              <span>• {st.name} (Class {st.details?.class || '10'})</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PASSWORD RESET REQUESTS */}
        {activeTab === 'resets' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">পাসওয়ার্ড রিসেট আবেদনসমূহ (Reset Codes Queue)</h3>
              <p className="text-xs text-slate-500">ইউজারদের রিসেট কোড এবং নতুন পাসওয়ার্ড সেট করে সাহায্য করুন</p>
            </div>

            {resetUsers.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-slate-700">কোন পাসওয়ার্ড রিসেট আবেদন পেন্ডিং নেই!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resetUsers.map((user) => (
                  <div key={user._id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px] uppercase">{user.role}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{user.email} • {user.phone || 'মোবাইল নম্বর নেই'}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold text-slate-700">সিক্রেট রিসেট কোড:</span>
                        <span className="font-mono font-bold text-xs bg-rose-100 text-rose-900 px-2.5 py-1 rounded-lg border border-rose-200">
                          {user.resetCode || 'RST-889021'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (user.resetCode) {
                              navigator.clipboard.writeText(user.resetCode);
                              toast.success('রিসেট কোড কপি হয়েছে!');
                            }
                          }}
                          className="text-[11px] font-bold text-blue-600 hover:underline"
                        >
                          [কপি করুন]
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newPass = prompt(`ইউজার ${user.name}-এর জন্য নতুন পাসওয়ার্ড লিখুন:`, 'Password123');
                          if (newPass) {
                            handleClearReset(user._id, newPass);
                          }
                        }}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                      >
                        <Key className="w-4 h-4" /> নতুন পাসওয়ার্ড সেট করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: USER APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">পেন্ডিং অ্যাকাউন্ট এপ্রুভাল (Pending Registrations)</h3>
            {pendingUsers.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-slate-700">কোন পেন্ডিং আবেদন নেই!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                      <th className="py-3 px-4">নাম</th>
                      <th className="py-3 px-4">ইমেইল</th>
                      <th className="py-3 px-4">আবেদনকৃত রোল</th>
                      <th className="py-3 px-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {pendingUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="py-4 px-4 font-bold text-slate-900">{user.name}</td>
                        <td className="py-4 px-4 text-xs text-slate-600">{user.email}</td>
                        <td className="py-4 px-4 font-bold text-blue-600 capitalize">{user.requestedRole}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUserAction(user._id, 'approved')}
                              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-4 h-4" /> এপ্রুভ
                            </button>
                            <button
                              onClick={() => handleUserAction(user._id, 'rejected')}
                              className="px-3 py-1.5 bg-rose-50 text-rose-600 font-bold rounded-lg text-xs flex items-center gap-1"
                            >
                              <XCircle className="w-4 h-4" /> রিজেক্ট
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Site & Hero Editor */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">গ্লোবাল ওয়েবসাইট ও হিরো ব্যানার সেটিংস এডিটর</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">স্কুলের নাম</label>
                <input type="text" value={siteSettings.schoolName} onChange={(e) => setSiteSettings({ ...siteSettings, schoolName: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">স্লোগান</label>
                <input type="text" value={siteSettings.slogan} onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">হিরো ট্যাগলাইন (Small Badge)</label>
                <input type="text" value={siteSettings.heroTagline} onChange={(e) => setSiteSettings({ ...siteSettings, heroTagline: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">হিরো মেইন টাইটেল</label>
                <input type="text" value={siteSettings.heroTitleLine1} onChange={(e) => setSiteSettings({ ...siteSettings, heroTitleLine1: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">হিরো ছবি URL</label>
                <input type="text" value={siteSettings.heroImage} onChange={(e) => setSiteSettings({ ...siteSettings, heroImage: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">হিরো বিবরণ</label>
                <textarea rows={2} value={siteSettings.heroDescription} onChange={(e) => setSiteSettings({ ...siteSettings, heroDescription: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>

            <button type="submit" className="py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-blue-700 transition flex items-center gap-2">
              <Save className="w-4 h-4" /> পরিবর্তন সেভ করুন
            </button>
          </form>
        )}

      </div>

      {/* CREATE USER MODAL */}
      {showCreateUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setShowCreateUserModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600">
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">নতুন ইউজার তৈরি করুন</h3>
                <p className="text-xs text-slate-500">ইউজারের তথ্য ও লগইন পাসওয়ার্ড দিয়ে সরাসরি অ্যাকাউন্ট চালু করুন</p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ইউজারের নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ সাকিব হোসেন"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    required
                    placeholder="user@mail.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
                  <input
                    type="text"
                    required
                    placeholder="Password123"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">রোল (Role)</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  >
                    <option value="student">শিক্ষার্থী (Student)</option>
                    <option value="teacher">শিক্ষক (Teacher)</option>
                    <option value="parent">অভিভাবক (Parent)</option>
                    <option value="admin">এডমিন (Admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্ট্যাটাস</label>
                  <select
                    value={newUserForm.status}
                    onChange={(e) => setNewUserForm({ ...newUserForm, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  >
                    <option value="approved">Approved (সরাসরি সক্রিয়)</option>
                    <option value="pending">Pending (অপেক্ষমাণ)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  একাউন্ট তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {selectedEditUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setSelectedEditUser(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600">
              <XCircle className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">ইউজার তথ্য পরিবর্তন</h3>

            <form onSubmit={handleSaveEditUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">নাম</label>
                <input
                  type="text"
                  value={selectedEditUser.name}
                  onChange={(e) => setSelectedEditUser({ ...selectedEditUser, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={selectedEditUser.email}
                  onChange={(e) => setSelectedEditUser({ ...selectedEditUser, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">রোল (Role)</label>
                  <select
                    value={selectedEditUser.role}
                    onChange={(e) => setSelectedEditUser({ ...selectedEditUser, role: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                    <option value="parent">parent</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্ট্যাটাস</label>
                  <select
                    value={selectedEditUser.status}
                    onChange={(e) => setSelectedEditUser({ ...selectedEditUser, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="approved">approved</option>
                    <option value="pending">pending</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড / পিন</label>
                <input
                  type="text"
                  value={selectedEditUser.tempPassword || '123456'}
                  onChange={(e) => setSelectedEditUser({ ...selectedEditUser, tempPassword: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEditUser(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
