'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Clock,
  Key
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingUser, setPendingUser] = useState<any>(null);

  const isSuperAdminEmail = (userEmail: string | null) => {
    if (!userEmail) return false;
    const clean = userEmail.toLowerCase().trim();
    return clean === 'mdrifayethossen@gmail.com' || clean === 'admin@drmujibrubi.edu.bd';
  };

  // Auto-redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (isSuperAdminEmail(user.email)) {
          router.push('/dashboard/admin');
          return;
        }
        try {
          const res = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: user.uid, email: user.email }),
          });
          const data = await res.json();
          if (data.success && data.user && data.user.status === 'approved') {
            const role = data.user.role;
            if (role === 'superadmin' || role === 'admin') router.push('/dashboard/admin');
            else if (role === 'teacher') router.push('/dashboard/teacher');
            else if (role === 'parent') router.push('/dashboard/parent');
            else router.push('/dashboard/student');
          }
        } catch (e) {
          console.error('Auto redirect check error:', e);
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPendingUser(null);
    setLoading(true);

    try {
      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Direct Super Admin bypass check
      if (isSuperAdminEmail(firebaseUser.email)) {
        // Ping verify to ensure DB updated
        await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            uid: firebaseUser.uid, 
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'Md Rifayet Hossen'
          }),
        });
        router.push('/dashboard/admin');
        return;
      }

      // 2. Verify User Status & Role from MongoDB
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          uid: firebaseUser.uid, 
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'User'
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'ইউজার অ্যাকাউন্ট পাওয়া যায়নি');
      }

      const user = data.user;

      // Check Status
      if (user.status === 'pending') {
        setPendingUser(user);
        setLoading(false);
        return;
      }

      if (user.status === 'rejected') {
        setError('আপনার একাউন্ট আবেদনটি সুপার এডমিন বাতিল (Reject) করেছেন।');
        setLoading(false);
        return;
      }

      // Redirect to specific dashboard based on active role
      if (user.role === 'superadmin' || user.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (user.role === 'teacher') {
        router.push('/dashboard/teacher');
      } else if (user.role === 'parent') {
        router.push('/dashboard/parent');
      } else {
        router.push('/dashboard/student');
      }

    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়!');
      } else {
        setError(err.message || 'লগইন করতে ব্যর্থ হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setPendingUser(null);
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;

      // Direct Super Admin Routing Check
      if (isSuperAdminEmail(firebaseUser.email)) {
        await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            uid: firebaseUser.uid, 
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'Md Rifayet Hossen'
          }),
        });
        router.push('/dashboard/admin');
        return;
      }

      // Verify Non-Super Admin User in MongoDB
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          uid: firebaseUser.uid, 
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'User'
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Redirect non-superadmin to register
        router.push(`/register?email=${encodeURIComponent(firebaseUser.email || '')}`);
        return;
      }

      const user = data.user;

      if (user.status === 'pending') {
        setPendingUser(user);
        setLoading(false);
        return;
      }

      if (user.status === 'rejected') {
        setError('আপনার একাউন্ট আবেদনটি সুপার এডমিন বাতিল (Reject) করেছেন।');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (user.role === 'superadmin' || user.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (user.role === 'teacher') {
        router.push('/dashboard/teacher');
      } else if (user.role === 'parent') {
        router.push('/dashboard/parent');
      } else {
        router.push('/dashboard/student');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'গুগল লগইন সম্পন্ন হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">লগইন করুন</h2>
          <p className="mt-2 text-sm text-slate-600">
            ডাঃ মুজিব-রুবি মডেল হাই স্কুল পোর্টালে স্বাগতম
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Pending Approval Modal / Notice */}
        {pendingUser && (
          <div className="mb-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-base text-amber-900">
              <Clock className="w-6 h-6 text-amber-600 shrink-0" />
              <span>একাউন্ট পেন্ডিং আছে! (Approval Required)</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              আপনার ইমেইল <strong className="font-semibold">{pendingUser.email}</strong> সিস্টেমে নিবন্ধিত আছে, কিন্তু 
              এখনো সুপার এডমিনের অনুমোদনের অপেক্ষায় রয়েছে। এডমিন এপ্রুভ করলে আপনি লগইন করতে পারবেন।
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                <Key className="w-3 h-3" /> পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : (
              <>
                লগইন করুন <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-4 text-xs font-semibold text-slate-400 uppercase">
            অথবা
          </span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 border border-slate-200 hover:bg-slate-50 rounded-2xl font-semibold text-slate-700 transition flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Google অ্যাকাউন্ট দিয়ে প্রবেশ করুন
        </button>

        {/* Bottom Link */}
        <div className="text-center pt-6 text-sm text-slate-600">
          নতুন ইউজার?{' '}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            একাউন্ট রেজিস্ট্রেশন রিকোয়েস্ট পাঠান
          </Link>
        </div>

      </div>
    </div>
  );
}
