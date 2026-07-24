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
  LayoutDashboard,
  ChevronDown
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

  const mainNavLinks = [
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1 font-medium text-sky-400">
              <Phone className="w-3 h-3" />
              {siteSettings.phone}
            </span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Mail className="w-3 h-3 text-slate-400" />
              {siteSettings.email}
            </span>
            <span className="hidden lg:inline-block bg-slate-800/90 px-2 py-0.5 rounded-md font-semibold border border-slate-700 text-slate-300 text-[10px]">
              EIIN: {siteSettings.eiin} | কোড: {siteSettings.code}
            </span>
          </div>

          <div className="flex items-center gap-3 font-medium">
            <span className="text-sky-300 hidden sm:inline-flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {siteSettings.subSlogan}
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-sm sm:text-base xl:text-lg leading-tight group-hover:text-blue-600 transition tracking-tight">
                {siteSettings.schoolName}
              </h1>
              <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500">
                স্থাপিত: {siteSettings.established} খ্রি.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Responsive for Laptops: 1024px+) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink min-w-0">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-1.5 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-bold transition-all whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 font-black shadow-xs'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/result"
              className="px-2.5 xl:px-3.5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] xl:text-xs font-extrabold shadow-sm transition flex items-center gap-1 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5" />
              ফলাফল
            </Link>

            {userSession ? (
              <div className="flex items-center gap-1.5">
                <Link
                  href={userSession.dashboardUrl}
                  className="px-3 xl:px-4 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] xl:text-xs font-extrabold shadow-sm transition flex items-center gap-1 whitespace-nowrap"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  ড্যাশবোর্ড
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 sm:p-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                  title="লগআউট"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 xl:px-4 py-1.5 sm:py-2 border border-slate-300 text-slate-700 rounded-xl text-[11px] xl:text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                লগইন
              </Link>
            )}
          </div>

          {/* Mobile & Tablet Burger Menu Button (Visible <1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/result"
              className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              ফলাফল
            </Link>
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

      {/* Mobile Drawer Navigation (Tablet & Mobile) */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl max-h-[85vh] overflow-y-auto">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                isActive(link.href)
                  ? 'text-blue-600 bg-blue-50 font-black'
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
                  className="flex-1 py-2.5 bg-emerald-600 text-white text-center rounded-xl text-xs font-bold flex items-center justify-center gap-1"
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
                className="flex-1 py-2.5 border border-slate-300 text-slate-700 text-center rounded-xl text-xs font-bold flex items-center justify-center gap-1"
              >
                <LogIn className="w-4 h-4" /> লগইন
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
