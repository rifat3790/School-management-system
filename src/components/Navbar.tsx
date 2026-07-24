'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  LogIn, 
  LogOut,
  Award,
  Sparkles,
  User,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userSession, setUserSession] = useState<{ email: string; role: string; dashboardUrl: string } | null>(null);
  
  const [siteSettings, setSiteSettings] = useState({
    schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
    eiin: '১৩০৯৫৪',
    code: '৪৫২০',
    established: '১৯৯৮',
    phone: '+৮৮০ ১৭০০-০০০০০',
    email: 'info@drmujibrubi.edu.bd',
    subSlogan: 'জ্ঞান • শৃঙ্খলা • সাফল্য'
  });

  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSiteSettings(data.settings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Listen to Firebase Auth state for active logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cleanEmail = user.email?.toLowerCase().trim() || '';
        const isSuperAdmin = cleanEmail === 'mdrifayethossen@gmail.com' || cleanEmail === 'admin@drmujibrubi.edu.bd';
        
        if (isSuperAdmin) {
          setUserSession({ email: cleanEmail, role: 'superadmin', dashboardUrl: '/dashboard/admin' });
          return;
        }

        try {
          const res = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: user.uid, email: user.email }),
          });
          const data = await res.json();
          if (data.success && data.user) {
            const r = data.user.role;
            const targetUrl = 
              (r === 'superadmin' || r === 'admin') ? '/dashboard/admin' :
              r === 'teacher' ? '/dashboard/teacher' :
              r === 'parent' ? '/dashboard/parent' : '/dashboard/student';

            setUserSession({ email: cleanEmail, role: r, dashboardUrl: targetUrl });
          } else {
            setUserSession({ email: cleanEmail, role: 'user', dashboardUrl: '/dashboard/student' });
          }
        } catch (e) {
          setUserSession({ email: cleanEmail, role: 'user', dashboardUrl: '/dashboard/student' });
        }
      } else {
        setUserSession(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserSession(null);
      router.push('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'শিক্ষকবৃন্দ', href: '/teachers' },
    { name: 'একাডেমিক', href: '/academic' },
    { name: 'নোটিশ', href: '/notices' },
    { name: 'সংবাদ', href: '/news' },
    { name: 'গ্যালারি', href: '/gallery' },
    { name: 'ভর্তি', href: '/admission' },
    { name: 'প্রাক্তন শিক্ষার্থী', href: '/alumni' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-[1536px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-sky-400">
              <Phone className="w-3.5 h-3.5" />
              {siteSettings.phone}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5" />
              {siteSettings.email}
            </span>
            <span className="hidden md:inline-block bg-slate-800 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-slate-700 text-slate-300">
              EIIN: {siteSettings.eiin} | কোড: {siteSettings.code}
            </span>
          </div>

          <div className="flex items-center gap-3 font-medium text-xs">
            <span className="text-sky-300 hidden lg:inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {siteSettings.subSlogan}
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-tight group-hover:text-blue-600 transition">
                {siteSettings.schoolName}
              </h1>
              <p className="text-[11px] font-semibold text-slate-500">
                স্থাপিত: {siteSettings.established} খ্রি.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive(link.href)
                    ? 'text-blue-600 bg-blue-50/80 font-black'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/result"
              className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-extrabold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              ফলাফল
            </Link>

            {userSession ? (
              <div className="flex items-center gap-2">
                <Link
                  href={userSession.dashboardUrl}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow-sm hover:bg-emerald-700 transition flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  ড্যাশবোর্ড
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition flex items-center gap-1"
                  title="লগআউট"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                লগইন
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                isActive(link.href)
                  ? 'text-blue-600 bg-blue-50 font-black'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <Link
              href="/result"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 bg-blue-600 text-white text-center rounded-xl text-xs font-bold"
            >
              ফলাফল
            </Link>
            {userSession ? (
              <>
                <Link
                  href={userSession.dashboardUrl}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 bg-emerald-600 text-white text-center rounded-xl text-xs font-bold"
                >
                  ড্যাশবোর্ড
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2.5 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold border border-rose-200"
                >
                  লগআউট
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 border border-slate-300 text-slate-700 text-center rounded-xl text-xs font-bold"
              >
                লগইন
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
