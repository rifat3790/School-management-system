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
  Sparkles,
  LayoutDashboard,
  Search,
  Facebook,
  Youtube,
  UserCheck
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

  const mainNavLinks = [
    { name: 'হোম', href: '/' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'একাডেমিক', href: '/academic' },
    { name: 'শিক্ষাঙ্গন', href: '/teachers' },
    { name: 'ভর্তি', href: '/admission' },
    { name: 'নোটিশ', href: '/notices' },
    { name: 'ফলাফল', href: '/result' },
    { name: 'গ্যালারী', href: '/gallery' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. Top Utility Header Bar (#0B2545 Dark Navy) */}
      <div className="bg-[#0B2545] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-2">
          
          {/* Left Info */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <span className="bg-blue-600/90 text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] inline-flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              ২০২৬ শিক্ষাবর্ষে ভর্তি চলছে
            </span>

            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              হটলাইন: {siteSettings.phone}
            </span>

            <span className="hidden md:flex items-center gap-1.5 text-slate-300 font-medium">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              {siteSettings.email}
            </span>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="hidden lg:flex items-center gap-2.5 border-r border-slate-700/80 pr-3 text-slate-200">
              <Link href="/academic-calendar" className="hover:text-amber-300 transition">
                📅 ক্যালেন্ডার ২০২৬
              </Link>
              <span className="text-slate-500">•</span>
              <Link href="/id-card" className="hover:text-sky-300 transition">
                🪪 আইডি কার্ড
              </Link>
              <span className="text-slate-500">•</span>
              <Link href="/fee-calculator" className="hover:text-emerald-300 transition">
                💰 ফি ক্যালকুলেটর
              </Link>
              <span className="text-slate-500">•</span>
              <Link href="/verify-certificate" className="hover:text-blue-300 transition">
                🎓 সনদ যাচাই
              </Link>
            </div>

            <div className="hidden sm:flex items-center gap-2.5 border-r border-slate-700/80 pr-3 text-slate-200">
              <Link href="/login" className="hover:text-blue-300 transition flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                অভিভাবক ও শিক্ষার্থী পোর্টাল
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <a href="#" className="hover:text-blue-400 transition" title="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="hover:text-red-400 transition" title="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Crest Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-md shadow-blue-900/20 group-hover:scale-105 transition border border-blue-700/50">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h1 className="font-extrabold text-slate-900 text-base sm:text-lg xl:text-xl leading-tight group-hover:text-blue-700 transition tracking-tight">
                  {siteSettings.schoolName}
                </h1>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500">
                  EIIN: {siteSettings.eiin} | কোড: {siteSettings.code}
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink min-w-0">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive(link.href)
                      ? 'text-blue-700 bg-blue-50 font-extrabold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Search & Auth */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button 
                onClick={() => router.push('/notices')} 
                className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-xl transition"
                title="খুঁজুন"
              >
                <Search className="w-5 h-5" />
              </button>

              {userSession ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    href={userSession.dashboardUrl}
                    className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-extrabold shadow-sm transition flex items-center gap-1"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    ড্যাশবোর্ড
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition"
                    title="লগআউট"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-3.5 py-2 border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  লগইন
                </Link>
              )}
            </div>

            {/* Burger Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl max-h-[85vh] overflow-y-auto">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                  isActive(link.href)
                    ? 'text-blue-700 bg-blue-50 font-black'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              {userSession ? (
                <>
                  <Link
                    href={userSession.dashboardUrl}
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2.5 bg-blue-700 text-white text-center rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ড
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-2.5 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 flex items-center justify-center gap-1"
                  >
                    <LogOut className="w-4 h-4" /> লগআউট
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 bg-blue-600 text-white text-center rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <LogIn className="w-4 h-4" /> লগইন
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
