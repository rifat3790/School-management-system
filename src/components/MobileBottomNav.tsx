'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Award, Bell, UserCheck, LayoutDashboard } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { name: 'হোম', href: '/', icon: Home },
    { name: 'একাডেমিক', href: '/academic', icon: BookOpen },
    { name: 'ফলাফল', href: '/result', icon: Award },
    { name: 'নোটিশ', href: '/notices', icon: Bell },
    { name: 'ভর্তি', href: '/admission', icon: UserCheck },
    { name: 'লগইন', href: '/login', icon: LayoutDashboard },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
              active
                ? 'text-primary font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} />
            <span className="text-[10px] tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
