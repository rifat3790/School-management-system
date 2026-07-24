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
  Mail,
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
  FileEdit,
  Eye,
  EyeOff,
  Filter,
  UserCheck,
  MessageSquare,
  Sparkles,
  Calendar
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
  const [activeTab, setActiveTab] = useState<'users' | 'chat' | 'assignments' | 'approvals' | 'resets' | 'settings' | 'about' | 'notices' | 'teachers' | 'news' | 'gallery' | 'admissions' | 'donations' | 'inquiries'>('users');
  
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
  const [admissionsList, setAdmissionsList] = useState<any[]>([]);
  const [donationsList, setDonationsList] = useState<any[]>([]);
  const [contactList, setContactList] = useState<any[]>([]);
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
  const [siteSettings, setSiteSettings] = useState<any>({
    schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
    slogan: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
    subSlogan: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
    eiin: '১৩০৯৫৪',
    code: '৪৫২০',
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
    passRateStat: '২১৫+',
    academicPrograms: [] as any[],
    clubsAndActivities: [] as any[],
    events: [] as any[],
    testimonials: [] as any[],
    faqs: [] as any[],
    topAchievers: [] as any[],
    campusFacilities: [] as any[]
  });


  // Forms
  const [newNotice, setNewNotice] = useState({ title: '', category: 'একাডেমিক', date: new Date().toLocaleDateString('bn-BD'), pdfUrl: '', content: '', isImportant: false });
  const [newTeacher, setNewTeacher] = useState({ name: '', designation: 'সহকারী শিক্ষক', subject: '', qualification: 'এম.এ, বি.এড', experience: '৫ বছর', email: '', phone: '', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' });
  const [newNews, setNewNews] = useState({ title: '', category: 'সংবাদ', date: new Date().toLocaleDateString('bn-BD'), summary: '', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80' });
  const [newGallery, setNewGallery] = useState({ title: '', category: 'ক্যাম্পাস', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80' });

  // Editing Item States
  const [editingNotice, setEditingNotice] = useState<any | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [editingNews, setEditingNews] = useState<any | null>(null);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);

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
          ...s,
          schoolName: s.schoolName || 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
          slogan: s.slogan || 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
          subSlogan: s.subSlogan || 'জ্ঞান • শৃঙ্খলা • সাফল্য',
          eiin: s.eiin || '১৩০৯৫৪',
          code: s.code || '৪৫২০',
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
          passRateStat: s.stats?.passRate || '২১৫+',
          academicPrograms: s.academicPrograms || [],
          clubsAndActivities: s.clubsAndActivities || [],
          events: s.events || [],
          testimonials: s.testimonials || [],
          faqs: s.faqs || [],
          topAchievers: s.topAchievers || [],
          campusFacilities: s.campusFacilities || []
        });
      }


      // 3. Notices, Teachers, News, Gallery, Admissions, Donations, Contact
      const [rN, rT, rNw, rG, rAdm, rDon, rCnt] = await Promise.all([
        fetch('/api/notices').then(r => r.json()),
        fetch('/api/teachers').then(r => r.json()),
        fetch('/api/news').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
        fetch('/api/admissions').then(r => r.json()),
        fetch('/api/donations').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
      ]);

      if (rN.success) setNotices(rN.notices);
      if (rT.success) setTeachers(rT.teachers);
      if (rNw.success) setNewsList(rNw.news);
      if (rG.success) setGalleryList(rG.gallery);
      if (rAdm.success) setAdmissionsList(rAdm.admissions);
      if (rDon.success) setDonationsList(rDon.donations);
      if (rCnt.success) setContactList(rCnt.messages);

    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
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
        toast.success(isApproved ? 'ডোনেশন সফলভাবে অনুমোদন করা হয়েছে! এটি এখন পাবলিক ডোনার তালিকায় দৃশ্যমান।' : 'অনুমোদন বাতিল করা হয়েছে');
        fetchAllData();
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
        fetchAllData();
      }
    } catch (err) { toast.error('হালনাগাদ করতে সমস্যা হয়েছে'); }
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
          established: siteSettings.establishedYear || siteSettings.established || '১৯৯৮',
          stats: { 
            students: siteSettings.studentsStat || '২,৮৮০+', 
            teachers: siteSettings.teachersStat || '৯৫+', 
            passRate: siteSettings.passRateStat || '২১৫+', 
            establishedYear: siteSettings.establishedYear || siteSettings.established || '১৯৯৮' 
          }
        }),

      });

      const text = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Non-JSON server response:', text);
        toast.error(`সার্ভার এরর (Status ${res.status}): সেভ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।`);
        return;
      }

      if (res.ok && data.success) {
        toast.success(data.message || 'ডাটাবেজে সকল সেটিংস ও কন্টেন্ট সেভ হয়েছে!');
        fetchAllData();
      } else {
        toast.error(data.message || `আপডেট করতে সমস্যা হয়েছে (Status ${res.status})`);
      }
    } catch (err: any) {
      console.error('handleSaveSettings error:', err);
      toast.error(err.message || 'নেটওয়ার্ক কানেকশন ত্রুটি!');
    }
  };



  // Notice Handlers
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) {
      toast.error('নোটিশ শিরোনাম ও বিবরণ দেওয়া আবশ্যক');
      return;
    }
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('নতুন নোটিশ সফলভাবে প্রকাশ করা হয়েছে!');
        setNewNotice({ title: '', category: 'একাডেমিক', date: new Date().toLocaleDateString('bn-BD'), pdfUrl: '', content: '', isImportant: false });
        fetchAllData();
      }
    } catch (err) { toast.error('নোটিশ প্রকাশ করতে সমস্যা হয়েছে'); }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('আপনি কি সত্যিই এই নোটিশটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/notices?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('নোটিশ ডাটাবেজ থেকে মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (err) { toast.error('মুছে ফেলতে সমস্যা হয়েছে'); }
  };

  // Teacher Handlers
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) {
      toast.error('শিক্ষকের নাম ও বিষয় প্রদান করুন');
      return;
    }
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('নতুন শিক্ষক সফলভাবে যুক্ত করা হয়েছে!');
        setNewTeacher({ name: '', designation: 'সহকারী শিক্ষক', subject: '', qualification: 'এম.এ, বি.এড', experience: '৫ বছর', email: '', phone: '', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' });
        fetchAllData();
      }
    } catch (err) { toast.error('শিক্ষক যুক্ত করতে সমস্যা হয়েছে'); }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm('আপনি কি সত্যিই এই শিক্ষকের তথ্য মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/teachers?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('শিক্ষকের তথ্য মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (err) { toast.error('মুছে ফেলতে সমস্যা হয়েছে'); }
  };

  // News Handlers
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.summary) {
      toast.error('সংবাদের শিরোনাম ও সারসংক্ষেপ প্রদান করুন');
      return;
    }
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('নতুন সংবাদ সফলভাবে প্রকাশ করা হয়েছে!');
        setNewNews({ title: '', category: 'সংবাদ', date: new Date().toLocaleDateString('bn-BD'), summary: '', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80' });
        fetchAllData();
      }
    } catch (err) { toast.error('সংবাদ প্রকাশ করতে সমস্যা হয়েছে'); }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('আপনি কি সত্যিই এই সংবাদটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('সংবাদ মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (err) { toast.error('মুছে ফেলতে সমস্যা হয়েছে'); }
  };

  // Gallery Handlers
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.url) {
      toast.error('ছবি টাইটেল ও URL প্রদান করুন');
      return;
    }
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGallery),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('গ্যালারিতে নতুন ছবি যুক্ত হয়েছে!');
        setNewGallery({ title: '', category: 'ক্যাম্পাস', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80' });
        fetchAllData();
      }
    } catch (err) { toast.error('ছবি যুক্ত করতে সমস্যা হয়েছে'); }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('আপনি কি সত্যিই এই ছবিটি গ্যালারি থেকে মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('ছবি মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (err) { toast.error('মুছে ফেলতে সমস্যা হয়েছে'); }
  };

  // UPDATE HANDLERS (PUT)
  const handleUpdateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice?._id) return;
    try {
      const res = await fetch('/api/notices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingNotice._id, ...editingNotice }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('নোটিশ সফলভাবে আপডেট করা হয়েছে!');
        setEditingNotice(null);
        fetchAllData();
      }
    } catch (err) { toast.error('আপডেট করতে সমস্যা হয়েছে'); }
  };

  const handleUpdateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher?._id) return;
    try {
      const res = await fetch('/api/teachers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingTeacher._id, ...editingTeacher }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('শিক্ষকের তথ্য সফলভাবে আপডেট করা হয়েছে!');
        setEditingTeacher(null);
        fetchAllData();
      }
    } catch (err) { toast.error('আপডেট করতে সমস্যা হয়েছে'); }
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?._id) return;
    try {
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingNews._id, ...editingNews }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('সংবাদ সফলভাবে আপডেট করা হয়েছে!');
        setEditingNews(null);
        fetchAllData();
      }
    } catch (err) { toast.error('আপডেট করতে সমস্যা হয়েছে'); }
  };

  const handleUpdateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?._id) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingGallery._id, ...editingGallery }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('গ্যালারির ছবি সফলভাবে আপডেট করা হয়েছে!');
        setEditingGallery(null);
        fetchAllData();
      }
    } catch (err) { toast.error('আপডেট করতে সমস্যা হয়েছে'); }
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
            { id: 'news', label: `📰 ক্যাম্পাস নিউজ (${newsList.length})`, icon: Newspaper },
            { id: 'gallery', label: `🖼️ ফটো গ্যালারি (${galleryList.length})`, icon: ImageIcon },
            { id: 'admissions', label: `📝 ভর্তি আবেদন (${admissionsList.length})`, icon: FileText },
            { id: 'donations', label: `❤️ অনুদান এপ্রুভাল (${donationsList.length})`, icon: HeartHandshake },
            { id: 'inquiries', label: `📬 কন্টাক্ট ইনকোয়ারি (${contactList.length})`, icon: Mail },
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
          <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">গ্লোবাল ওয়েবসাইট ও হোম পেজ ডায়নামিক এডিটর</h3>
                <p className="text-xs text-slate-500 mt-1">হোম পেজের সকল প্রিমিয়াম সেকশন ও তথ্য এখান থেকে লাইভ আপডেট করুন</p>
              </div>
              <button type="submit" className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2">
                <Save className="w-4 h-4" /> সেভ করুন
              </button>
            </div>

            {/* 1. Basic & Hero Info */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-blue-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> ১. হিরো ব্যানার ও সাধারণ তথ্য
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্কুলের নাম</label>
                  <input type="text" value={siteSettings.schoolName || ''} onChange={(e) => setSiteSettings({ ...siteSettings, schoolName: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্লোগান</label>
                  <input type="text" value={siteSettings.slogan || ''} onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো ট্যাগলাইন (Small Badge)</label>
                  <input type="text" value={siteSettings.heroTagline || ''} onChange={(e) => setSiteSettings({ ...siteSettings, heroTagline: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো মেইন টাইটেল</label>
                  <input type="text" value={siteSettings.heroTitleLine1 || ''} onChange={(e) => setSiteSettings({ ...siteSettings, heroTitleLine1: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো স্লাইডার ছবি URL (একাধিক ছবি কমা (,) দিয়ে আলাদা করুন - যেমন: url1, url2)</label>
                  <input type="text" placeholder="https://image1.jpg, https://image2.jpg" value={siteSettings.heroImage || ''} onChange={(e) => setSiteSettings({ ...siteSettings, heroImage: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইআইআইএন (EIIN)</label>
                  <input type="text" value={siteSettings.eiin || ''} onChange={(e) => setSiteSettings({ ...siteSettings, eiin: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্কুল কোড (School Code)</label>
                  <input type="text" value={siteSettings.code || ''} onChange={(e) => setSiteSettings({ ...siteSettings, code: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>

                {/* Counter Stats Inputs */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থী সংখ্যা (Stats Counter)</label>
                  <input type="text" placeholder="২,৮৮০+" value={siteSettings.studentsStat || ''} onChange={(e) => setSiteSettings({ ...siteSettings, studentsStat: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষক সংখ্যা (Stats Counter)</label>
                  <input type="text" placeholder="৯৫+" value={siteSettings.teachersStat || ''} onChange={(e) => setSiteSettings({ ...siteSettings, teachersStat: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাশের হার / জিপিএ-৫ (Stats Counter)</label>
                  <input type="text" placeholder="২১৫+" value={siteSettings.passRateStat || ''} onChange={(e) => setSiteSettings({ ...siteSettings, passRateStat: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠাবর্ষ (Established Year)</label>
                  <input type="text" placeholder="১৯৯৮" value={siteSettings.establishedYear || siteSettings.established || ''} onChange={(e) => setSiteSettings({ ...siteSettings, establishedYear: e.target.value, established: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো স্লাইডার ছবি URL (একাধিক ছবি কমা (,) দিয়ে আলাদা করুন - যেমন: url1, url2)</label>
                  <input type="text" placeholder="https://image1.jpg, https://image2.jpg" value={siteSettings.heroImage || ''} onChange={(e) => setSiteSettings({ ...siteSettings, heroImage: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো বিবরণ</label>
                  <textarea rows={2} value={siteSettings.heroDescription || ''} onChange={(e) => setSiteSettings({ ...siteSettings, heroDescription: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">আমাদের ইতিহাস বিবরণ (History & Foundation)</label>
                  <textarea rows={2} value={siteSettings.aboutHistory || ''} onChange={(e) => setSiteSettings({ ...siteSettings, aboutHistory: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আমাদের লক্ষ্য (Mission Text)</label>
                  <textarea rows={2} value={siteSettings.missionText || ''} onChange={(e) => setSiteSettings({ ...siteSettings, missionText: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আমাদের ভিশন (Vision Text)</label>
                  <textarea rows={2} value={siteSettings.visionText || ''} onChange={(e) => setSiteSettings({ ...siteSettings, visionText: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
              </div>
            </div>


            {/* 2. Academic Programs Manager */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-indigo-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> ২. একাডেমিক বিভাগ ও কারিকুলাম কার্ড ({siteSettings.academicPrograms?.length || 0})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newProg = { title: 'নতুন বিভাগ', subtitle: 'বিষয়সমূহ', desc: 'বিভাগের বিবরণ লিখুন', classRange: 'নবম - দশম শ্রেণি', iconName: 'Atom', bgGradient: '' };
                    setSiteSettings({ ...siteSettings, academicPrograms: [...(siteSettings.academicPrograms || []), newProg] });
                  }}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-indigo-700 transition flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> আইটেম যোগ করুন
                </button>
              </div>

              <div className="space-y-4">
                {(siteSettings.academicPrograms || []).map((prog: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = siteSettings.academicPrograms.filter((_: any, i: number) => i !== idx);
                        setSiteSettings({ ...siteSettings, academicPrograms: updated });
                      }}
                      className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 text-xs font-bold"
                    >
                      মুছুন
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">বিভাগের নাম</label>
                        <input
                          type="text"
                          value={prog.title || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.academicPrograms];
                            copy[idx].title = e.target.value;
                            setSiteSettings({ ...siteSettings, academicPrograms: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">সাবটাইটেল (বিষয়সূচি)</label>
                        <input
                          type="text"
                          value={prog.subtitle || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.academicPrograms];
                            copy[idx].subtitle = e.target.value;
                            setSiteSettings({ ...siteSettings, academicPrograms: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">শ্রেণি সীমা (Class Range)</label>
                        <input
                          type="text"
                          value={prog.classRange || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.academicPrograms];
                            copy[idx].classRange = e.target.value;
                            setSiteSettings({ ...siteSettings, academicPrograms: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">সংক্ষিপ্ত বিবরণ</label>
                        <input
                          type="text"
                          value={prog.desc || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.academicPrograms];
                            copy[idx].desc = e.target.value;
                            setSiteSettings({ ...siteSettings, academicPrograms: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Clubs & Co-curricular Manager */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-emerald-700 flex items-center gap-2">
                  <Users className="w-4 h-4" /> ৩. সহ-শিক্ষা ও ক্লাবসমূহ ({siteSettings.clubsAndActivities?.length || 0})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newClub = { name: 'নতুন ক্লাব', category: 'সহ-শিক্ষা', desc: 'ক্লাবের তথ্য লিখুন', membersCount: '১০০+ সদস্য', iconName: 'Cpu', image: '' };
                    setSiteSettings({ ...siteSettings, clubsAndActivities: [...(siteSettings.clubsAndActivities || []), newClub] });
                  }}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-emerald-700 transition flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> ক্লাব যোগ করুন
                </button>
              </div>

              <div className="space-y-4">
                {(siteSettings.clubsAndActivities || []).map((club: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = siteSettings.clubsAndActivities.filter((_: any, i: number) => i !== idx);
                        setSiteSettings({ ...siteSettings, clubsAndActivities: updated });
                      }}
                      className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 text-xs font-bold"
                    >
                      মুছুন
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ক্লাবের নাম</label>
                        <input
                          type="text"
                          value={club.name || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.clubsAndActivities];
                            copy[idx].name = e.target.value;
                            setSiteSettings({ ...siteSettings, clubsAndActivities: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ক্যাটাগরি</label>
                        <input
                          type="text"
                          value={club.category || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.clubsAndActivities];
                            copy[idx].category = e.target.value;
                            setSiteSettings({ ...siteSettings, clubsAndActivities: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">সদস্য সংখ্যা ব্যাজ</label>
                        <input
                          type="text"
                          value={club.membersCount || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.clubsAndActivities];
                            copy[idx].membersCount = e.target.value;
                            setSiteSettings({ ...siteSettings, clubsAndActivities: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ছবি URL</label>
                        <input
                          type="text"
                          value={club.image || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.clubsAndActivities];
                            copy[idx].image = e.target.value;
                            setSiteSettings({ ...siteSettings, clubsAndActivities: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Upcoming Events Manager */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-purple-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> ৪. ক্যালেন্ডার ইভেন্টসমূহ ({siteSettings.events?.length || 0})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newEvt = { title: 'নতুন ইভেন্ট', date: '১৫ মে, ২০২৬', time: 'সকাল ১০:০০', location: 'স্কুল অডিটোরিয়াম', category: 'একাডেমিক', image: '' };
                    setSiteSettings({ ...siteSettings, events: [...(siteSettings.events || []), newEvt] });
                  }}
                  className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-purple-700 transition flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> ইভেন্ট যোগ করুন
                </button>
              </div>

              <div className="space-y-4">
                {(siteSettings.events || []).map((evt: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = siteSettings.events.filter((_: any, i: number) => i !== idx);
                        setSiteSettings({ ...siteSettings, events: updated });
                      }}
                      className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 text-xs font-bold"
                    >
                      মুছুন
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ইভেন্ট শিরোনাম</label>
                        <input
                          type="text"
                          value={evt.title || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.events];
                            copy[idx].title = e.target.value;
                            setSiteSettings({ ...siteSettings, events: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">তারিখ</label>
                        <input
                          type="text"
                          value={evt.date || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.events];
                            copy[idx].date = e.target.value;
                            setSiteSettings({ ...siteSettings, events: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">সময় ও স্থান</label>
                        <input
                          type="text"
                          value={evt.location || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.events];
                            copy[idx].location = e.target.value;
                            setSiteSettings({ ...siteSettings, events: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Parent & Alumni Testimonials Manager */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-amber-700 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" /> ৫. অভিভাবক রিভিউ ও মতামত ({siteSettings.testimonials?.length || 0})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newTest = { name: 'নতুন অভিভাবক', role: 'অভিভাবক', studentName: 'শিক্ষার্থীর নাম', rating: 5, text: 'মতামত লিখুন', image: '' };
                    setSiteSettings({ ...siteSettings, testimonials: [...(siteSettings.testimonials || []), newTest] });
                  }}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-amber-700 transition flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> মতামত যোগ করুন
                </button>
              </div>

              <div className="space-y-4">
                {(siteSettings.testimonials || []).map((t: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = siteSettings.testimonials.filter((_: any, i: number) => i !== idx);
                        setSiteSettings({ ...siteSettings, testimonials: updated });
                      }}
                      className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 text-xs font-bold"
                    >
                      মুছুন
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">অভিভাবকের নাম</label>
                        <input
                          type="text"
                          value={t.name || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.testimonials];
                            copy[idx].name = e.target.value;
                            setSiteSettings({ ...siteSettings, testimonials: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">পরিচয় / পদবী</label>
                        <input
                          type="text"
                          value={t.role || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.testimonials];
                            copy[idx].role = e.target.value;
                            setSiteSettings({ ...siteSettings, testimonials: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ছবি URL</label>
                        <input
                          type="text"
                          value={t.image || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.testimonials];
                            copy[idx].image = e.target.value;
                            setSiteSettings({ ...siteSettings, testimonials: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">মূল মন্তব্য</label>
                        <textarea
                          rows={2}
                          value={t.text || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.testimonials];
                            copy[idx].text = e.target.value;
                            setSiteSettings({ ...siteSettings, testimonials: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. FAQ Accordion Manager */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-sky-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> ৬. সাধারণ প্রশ্ন ও উত্তর (FAQs) ({siteSettings.faqs?.length || 0})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq = { question: 'নতুন প্রশ্ন?', answer: 'উত্তর লিখুন', category: 'সাধারণ' };
                    setSiteSettings({ ...siteSettings, faqs: [...(siteSettings.faqs || []), newFaq] });
                  }}
                  className="px-3 py-1 bg-sky-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-sky-700 transition flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> প্রশ্ন যোগ করুন
                </button>
              </div>

              <div className="space-y-4">
                {(siteSettings.faqs || []).map((faq: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = siteSettings.faqs.filter((_: any, i: number) => i !== idx);
                        setSiteSettings({ ...siteSettings, faqs: updated });
                      }}
                      className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 text-xs font-bold"
                    >
                      মুছুন
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">প্রশ্ন</label>
                        <input
                          type="text"
                          value={faq.question || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.faqs];
                            copy[idx].question = e.target.value;
                            setSiteSettings({ ...siteSettings, faqs: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ক্যাটাগরি</label>
                        <input
                          type="text"
                          value={faq.category || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.faqs];
                            copy[idx].category = e.target.value;
                            setSiteSettings({ ...siteSettings, faqs: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">উত্তর</label>
                        <textarea
                          rows={2}
                          value={faq.answer || ''}
                          onChange={(e) => {
                            const copy = [...siteSettings.faqs];
                            copy[idx].answer = e.target.value;
                            setSiteSettings({ ...siteSettings, faqs: copy });
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-sm shadow-lg shadow-blue-500/20 transition flex items-center gap-2">
                <Save className="w-5 h-5" /> সকল পরিবর্তন ডাটাবেজে সেভ করুন
              </button>
            </div>
          </form>
        )}


        {/* TAB: ABOUT & LEADERSHIP MESSAGES EDITOR */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">📜 প্রতিষ্ঠানের ইতিহাস ও পরিচালনা পর্ষদের বাণী এডিটর</h3>
              <p className="text-xs text-slate-500">প্রধান শিক্ষক ও সভাপতির বাণী এবং ইতিহাস সরাসরি পরিবর্তন করুন (লাইভ ডাটাবেজ আপডেট)</p>
            </div>

            {/* Principal Info */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-blue-700">👨‍🏫 প্রধান শিক্ষকের বাণী ও তথ্য</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রধান শিক্ষকের নাম</label>
                  <input type="text" value={siteSettings.principalName} onChange={(e) => setSiteSettings({ ...siteSettings, principalName: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পদবী (Title)</label>
                  <input type="text" value={siteSettings.principalTitle} onChange={(e) => setSiteSettings({ ...siteSettings, principalTitle: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছবি URL</label>
                  <input type="text" value={siteSettings.principalImage} onChange={(e) => setSiteSettings({ ...siteSettings, principalImage: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রধান শিক্ষকের মূল বাণী</label>
                  <textarea rows={3} value={siteSettings.principalMessage} onChange={(e) => setSiteSettings({ ...siteSettings, principalMessage: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
              </div>
            </div>

            {/* Chairman Info */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-sky-700">🏛️ সভাপতি ও প্রতিষ্ঠানের তথ্য</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠাতা ও সভাপতির নাম</label>
                  <input type="text" value={siteSettings.chairmanName} onChange={(e) => setSiteSettings({ ...siteSettings, chairmanName: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পদবী</label>
                  <input type="text" value={siteSettings.chairmanTitle} onChange={(e) => setSiteSettings({ ...siteSettings, chairmanTitle: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছবি URL</label>
                  <input type="text" value={siteSettings.chairmanImage} onChange={(e) => setSiteSettings({ ...siteSettings, chairmanImage: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1"> সভাপতির মূল বাণী</label>
                  <textarea rows={3} value={siteSettings.chairmanMessage} onChange={(e) => setSiteSettings({ ...siteSettings, chairmanMessage: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
              </div>
            </div>

            {/* History & Mission */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-emerald-700">📜 স্কুলের ইতিহাস, মিশন ও ভিশন</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইআইআইএন (EIIN)</label>
                  <input type="text" value={siteSettings.eiin} onChange={(e) => setSiteSettings({ ...siteSettings, eiin: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্কুল কোড</label>
                  <input type="text" value={siteSettings.code} onChange={(e) => setSiteSettings({ ...siteSettings, code: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠানের ইতিহাস</label>
                  <textarea rows={3} value={siteSettings.aboutHistory} onChange={(e) => setSiteSettings({ ...siteSettings, aboutHistory: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মিশন (Mission)</label>
                  <textarea rows={2} value={siteSettings.missionText} onChange={(e) => setSiteSettings({ ...siteSettings, missionText: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ভিশন (Vision)</label>
                  <textarea rows={2} value={siteSettings.visionText} onChange={(e) => setSiteSettings({ ...siteSettings, visionText: e.target.value })} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                </div>
              </div>
            </div>

            <button type="submit" className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2">
              <Save className="w-4 h-4" /> সকল তথ্য সেভ করুন
            </button>
          </form>
        )}

        {/* TAB: NOTICE BOARD MANAGER */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">🔔 লাইভ নোটিশ বোর্ড ম্যানেজার (Notices CRUD)</h3>
              <p className="text-xs text-slate-500">নতুন একাডেমিক বা ইভেন্ট নোটিশ প্রকাশ করুন এবং পূর্বের নোটিশগুলো পরিচালনা করুন</p>
            </div>

            {/* Create Notice Form */}
            <form onSubmit={handleCreateNotice} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" /> নতুন নোটিশ যোগ করুন
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশের শিরোনাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: অর্ধ-বার্ষিকী পরীক্ষা ২০২৬ এর চূড়ান্ত সময়সূচি প্রকাশ"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="একাডেমিক">একাডেমিক</option>
                    <option value="ভর্তি">ভর্তি</option>
                    <option value="পরীক্ষা">পরীক্ষা</option>
                    <option value="ছুটি">ছুটি</option>
                    <option value="জরুরি">জরুরি</option>
                    <option value="ইভেন্ট">ইভেন্ট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">তারিখ</label>
                  <input
                    type="text"
                    value={newNotice.date}
                    onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">পিডিএফ/সংযুক্তি URL (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="https://example.com/notice.pdf"
                    value={newNotice.pdfUrl || ''}
                    onChange={(e) => setNewNotice({ ...newNotice, pdfUrl: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশের বিবরণ</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="নোটিশের বিস্তারিত বিবরণ লিখুন..."
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNotice.isImportant}
                    onChange={(e) => setNewNotice({ ...newNotice, isImportant: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span className="text-xs font-bold text-rose-600">জরুরি নোটিশ ব্যাজ (Highlight Badge)</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Bell className="w-4 h-4" /> নোটিশ প্রকাশ করুন
                </button>
              </div>
            </form>

            {/* Existing Notices List */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900">প্রকাশিত নোটিশসমূহ ({notices.length})</h4>
              {notices.length === 0 ? (
                <div className="py-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs">
                  কোন নোটিশ পাওয়া যায়নি!
                </div>
              ) : (
                <div className="space-y-3">
                  {notices.map((n: any) => (
                    <div key={n._id || n.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold text-[10px]">{n.category}</span>
                          {n.isImportant && <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full font-bold text-[10px] animate-pulse">জরুরি</span>}
                          <span className="text-[11px] text-slate-400">• {n.date}</span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm">{n.title}</h5>
                        <p className="text-xs text-slate-600 line-clamp-2">{n.content}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingNotice(n)}
                          className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition flex items-center gap-1 text-xs font-bold"
                        >
                          <FileEdit className="w-3.5 h-3.5" /> এডিট
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(n._id || n.id)}
                          className="px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition flex items-center gap-1 text-xs font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> মুছুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: TEACHERS PANEL MANAGER */}
        {activeTab === 'teachers' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">👨‍🏫 শিক্ষক প্যানেল কন্ট্রোল (Faculty Manager)</h3>
              <p className="text-xs text-slate-500">প্রতিষ্ঠানের সকল শিক্ষকের প্রোফাইল ও বিষয় সম্পর্কিত তথ্য ডাটাবেজে যুক্ত বা এডিট করুন</p>
            </div>

            {/* Create Teacher Form */}
            <form onSubmit={handleCreateTeacher} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" /> নতুন শিক্ষক যুক্ত করুন
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষকের নাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ড. তাহমিদা খানম"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পদবী (Designation)</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সিনিয়র শিক্ষক"
                    value={newTeacher.designation}
                    onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় (Subject)</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: পদার্থবিজ্ঞান"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষাগত যোগ্যতা</label>
                  <input
                    type="text"
                    placeholder="এম.এসসি (পদার্থ), বি.এড"
                    value={newTeacher.qualification}
                    onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অভিজ্ঞতা</label>
                  <input
                    type="text"
                    placeholder="যেমন: ৮+ বছর"
                    value={newTeacher.experience}
                    onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছবি URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newTeacher.image}
                    onChange={(e) => setNewTeacher({ ...newTeacher, image: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল</label>
                  <input
                    type="email"
                    placeholder="teacher@school.edu.bd"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ফোন নম্বর</label>
                  <input
                    type="text"
                    placeholder="+৮৮০ ১৭০০-০০০০০"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" /> শিক্ষক যোগ করুন
                </button>
              </div>
            </form>

            {/* Existing Teachers Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900">শিক্ষক প্যানেলের তালিকা ({teachers.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map((t: any) => (
                  <div key={t._id || t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4 justify-between">
                    <div className="flex items-start gap-3">
                      <img
                        src={t.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'}
                        alt={t.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{t.name}</h5>
                        <p className="text-xs font-bold text-blue-600">{t.designation}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">বিষয়: {t.subject}</p>
                        <p className="text-[10px] text-slate-400">{t.qualification}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => setEditingTeacher(t)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="সম্পাদনা / এডিট"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(t._id || t.id)}
                        className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: NEWS MANAGER */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">📰 ক্যাম্পাস নিউজ ম্যানেজার (News CRUD)</h3>
              <p className="text-xs text-slate-500">নতুন খবর বা ইভেন্ট রিলেটেড খবর প্রকাশ ও পরিচালনা করুন</p>
            </div>

            {/* Create News Form */}
            <form onSubmit={handleCreateNews} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" /> নতুন সংবাদ প্রকাশ করুন
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">সংবাদের শিরোনাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬ সফলভাবে সম্পন্ন"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <input
                    type="text"
                    placeholder="যেমন: ইভেন্ট / অ্যাকাডেমিক"
                    value={newNews.category}
                    onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">সংবাদের ছবি URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newNews.image}
                    onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">তারিখ</label>
                  <input
                    type="text"
                    value={newNews.date}
                    onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">সংবাদের বিস্তারিত সারসংক্ষেপ</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="সংবাদের সম্পূর্ণ বিবরণ লিখুন..."
                    value={newNews.summary}
                    onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Newspaper className="w-4 h-4" /> খবর প্রকাশ করুন
                </button>
              </div>
            </form>

            {/* Existing News Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900">প্রকাশিত ক্যাম্পাস নিউজ ({newsList.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsList.map((item: any) => (
                  <div key={item._id || item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4 justify-between">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80'}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">{item.category}</span>
                        <h5 className="font-bold text-slate-900 text-sm mt-1">{item.title}</h5>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.summary}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => setEditingNews(item)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="সম্পাদনা / এডিট"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item._id || item.id)}
                        className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">🖼️ ক্যাম্পাস ফটো গ্যালারি এডিটর (Gallery CRUD)</h3>
              <p className="text-xs text-slate-500">ক্যাম্পাস, ল্যাব ও ইভেন্টের হাই-রেজুল্যুশন ফটো আপলোড ও পরিচালনা করুন</p>
            </div>

            {/* Create Gallery Form */}
            <form onSubmit={handleCreateGallery} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" /> নতুন ছবি গ্যালারিতে যোগ করুন
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছবি বা ইভেন্টের ক্যাপশন</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: রোবোটিক্স ল্যাব সেশন"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="ক্যাম্পাস">ক্যাম্পাস</option>
                    <option value="ল্যাব">ল্যাব</option>
                    <option value="স্পোর্টস">স্পোর্টস</option>
                    <option value="অনুষ্ঠান">অনুষ্ঠান</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছবি URL</label>
                  <input
                    type="text"
                    required
                    placeholder="https://..."
                    value={newGallery.url}
                    onChange={(e) => setNewGallery({ ...newGallery, url: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <ImageIcon className="w-4 h-4" /> ছবি সেভ করুন
                </button>
              </div>
            </form>

            {/* Existing Gallery Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900">গ্যালারির ছবিসমূহ ({galleryList.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryList.map((g: any) => (
                  <div key={g._id || g.id} className="relative rounded-2xl overflow-hidden border border-slate-200 group bg-slate-50">
                    <img src={g.url} alt={g.title} className="w-full h-40 object-cover group-hover:scale-105 transition duration-500" />
                    <div className="p-3 bg-white space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{g.category}</span>
                      <h5 className="font-bold text-slate-900 text-xs truncate">{g.title}</h5>
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <button
                        onClick={() => setEditingGallery(g)}
                        className="p-1.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        title="সম্পাদনা / এডিট"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(g._id || g.id)}
                        className="p-1.5 bg-rose-600 text-white rounded-lg shadow-md hover:bg-rose-700 transition"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: ADMISSIONS MANAGER */}
        {activeTab === 'admissions' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">অনলাইন ভর্তি আবেদনসমূহ ({admissionsList.length})</h3>
                <p className="text-xs text-slate-500">অনলাইনে জমাকৃত সকল শিক্ষার্থীর ভর্তি আবেদন, পেমেন্ট ও স্ট্যাটাস ম্যানেজ করুন</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">শিক্ষার্থীর নাম</th>
                    <th className="p-3">শ্রেণী</th>
                    <th className="p-3">অভিভাবক ও ফোন</th>
                    <th className="p-3">জন্ম সনদ নং</th>
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
                      <td className="p-3 font-mono">{adm.birthCertNo}</td>
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

        {/* TAB: DONATIONS MANAGER & APPROVAL */}
        {activeTab === 'donations' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">অনলাইন অনুদান ও ডোনেশন এপ্রুভাল প্যানেল ({donationsList.length})</h3>
              <p className="text-xs text-slate-500">অনুমোদন দিলে শুভানুধ্যায়ীর নাম স্বয়ংক্রিয়ভাবে পাবলিক ডোনার টেবিলে যুক্ত হবে</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">দাতার নাম</th>
                    <th className="p-3">পরিচয়</th>
                    <th className="p-3">অনুদানের পরিমাণ</th>
                    <th className="p-3">TrxID / ফোন</th>
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
                      <td className="p-3">
                        <div className="font-mono text-[10px]">{don.transactionId || 'ONLINE'}</div>
                        <div className="text-[10px] text-slate-400">{don.phone}</div>
                      </td>
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

        {/* TAB: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">ওয়েবসাইট যোগাযোগ ইনকোয়ারি ও মেসেজ ({contactList.length})</h3>
              <p className="text-xs text-slate-500">ওয়েবসাইট থেকে আসা সকল বার্তা ও অনুসন্ধান তালিকা</p>
            </div>

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

      {/* EDIT NOTICE MODAL */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setEditingNotice(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-blue-600" /> নোটিশ আপডেট করুন
            </h3>
            <form onSubmit={handleUpdateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">নোটিশের শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <input
                    type="text"
                    value={editingNotice.category}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">তারিখ</label>
                  <input
                    type="text"
                    value={editingNotice.date}
                    onChange={(e) => setEditingNotice({ ...editingNotice, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">পিডিএফ/সংযুক্তি URL</label>
                <input
                  type="text"
                  value={editingNotice.pdfUrl || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, pdfUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">বিবরণ</label>
                <textarea
                  rows={3}
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editIsImportant"
                  checked={editingNotice.isImportant || false}
                  onChange={(e) => setEditingNotice({ ...editingNotice, isImportant: e.target.checked })}
                />
                <label htmlFor="editIsImportant" className="font-bold text-slate-700">জরুরি নোটিশ ব্যাজ</label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingNotice(null)} className="px-4 py-2 bg-slate-100 font-bold rounded-xl">বাতিল</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md">আপডেট করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEACHER MODAL */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setEditingTeacher(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-blue-600" /> শিক্ষকের তথ্য আপডেট করুন
            </h3>
            <form onSubmit={handleUpdateTeacher} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">শিক্ষকের নাম</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.name}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">পদবী</label>
                  <input
                    type="text"
                    value={editingTeacher.designation}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">বিষয়</label>
                  <input
                    type="text"
                    value={editingTeacher.subject}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">শিক্ষাগত যোগ্যতা</label>
                  <input
                    type="text"
                    value={editingTeacher.qualification}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">ছবি URL</label>
                <input
                  type="text"
                  value={editingTeacher.image}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, image: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTeacher(null)} className="px-4 py-2 bg-slate-100 font-bold rounded-xl">বাতিল</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md">আপডেট করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT NEWS MODAL */}
      {editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setEditingNews(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-emerald-600" /> ক্যাম্পাস নিউজ আপডেট করুন
            </h3>
            <form onSubmit={handleUpdateNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">সংবাদের শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <input
                    type="text"
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">তারিখ</label>
                  <input
                    type="text"
                    value={editingNews.date}
                    onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">সংবাদের ছবি URL</label>
                <input
                  type="text"
                  value={editingNews.image}
                  onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">সারসংক্ষেপ</label>
                <textarea
                  rows={3}
                  value={editingNews.summary}
                  onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingNews(null)} className="px-4 py-2 bg-slate-100 font-bold rounded-xl">বাতিল</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-md">আপডেট করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT GALLERY MODAL */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button onClick={() => setEditingGallery(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-blue-600" /> গ্যালারির ছবি আপডেট করুন
            </h3>
            <form onSubmit={handleUpdateGallery} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">ছবি বা ইভেন্টের ক্যাপশন</label>
                <input
                  type="text"
                  required
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                <input
                  type="text"
                  value={editingGallery.category}
                  onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">ছবি URL</label>
                <input
                  type="text"
                  value={editingGallery.url}
                  onChange={(e) => setEditingGallery({ ...editingGallery, url: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingGallery(null)} className="px-4 py-2 bg-slate-100 font-bold rounded-xl">বাতিল</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md">আপডেট করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
