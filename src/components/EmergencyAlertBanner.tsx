'use client';

import React from 'react';
import { Bell, Sparkles, AlertCircle, ArrowRight, Volume2 } from 'lucide-react';
import Link from 'next/link';

interface EmergencyAlertProps {
  alert?: {
    enabled?: boolean;
    badge?: string;
    text?: string;
    link?: string;
  };
}

export default function EmergencyAlertBanner({ alert }: EmergencyAlertProps) {
  if (!alert || alert.enabled === false || !alert.text) {
    return null;
  }

  const badgeType = alert.badge || 'জরুরি ঘোষণা';
  const isUrgent = badgeType.includes('জরুরি');
  const isGoodNews = badgeType.includes('সুখবর') || badgeType.includes('ভর্তি');

  return (
    <div className={`w-full py-2.5 px-4 text-xs font-bold transition-all border-b shadow-xs ${
      isUrgent
        ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white border-rose-800'
        : isGoodNews
        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border-emerald-800'
        : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border-blue-900'
    }`}>
      <div className="max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Left Ticker */}
        <div className="flex items-center gap-2.5 overflow-hidden w-full sm:w-auto">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider bg-white text-slate-900 shrink-0 shadow-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            {badgeType}
          </span>

          <p className="truncate text-xs sm:text-sm font-semibold tracking-wide">
            {alert.text}
          </p>
        </div>

        {/* Right Action Link */}
        {alert.link && (
          <Link
            href={alert.link}
            className="shrink-0 bg-white/20 hover:bg-white text-white hover:text-slate-900 px-3.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1"
          >
            <span>বিস্তারিত দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}

      </div>
    </div>
  );
}
