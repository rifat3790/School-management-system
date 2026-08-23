'use client';

import React, { useState } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  FileText, 
  X,
  Award
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface SchoolAnthemProps {
  anthem?: {
    title?: string;
    composer?: string;
    lyrics?: string;
    audioUrl?: string;
  };
}

const DEFAULT_LYRICS = `
জ্ঞানের আলোয় উদ্ভাসিত মোদের বিদ্যালয়,
ডাঃ মুজিব-রুবি মডেল হাই স্কুল চির অক্ষয়।
সত্য ও ন্যায়ের পথে চলিব অবিরাম,
গড়িব সুন্দর এক স্বপ্নের বাংলাদেশ ধাম।

শিক্ষাগুরুদের চরণতলে পাই যে পথের দিশা,
দূর করিব আমরা মোদের সকল অন্ধ নিশা।
শৃঙ্খলা ও সাফল্যের পতাকাকে তুলে ধরি,
মানবতার সেবায় মোরা জীবন উৎসর্গ করি।
`;

export default function SchoolAnthemPlayer({ anthem }: SchoolAnthemProps) {
  const toast = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const title = anthem?.title || 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল সঙ্গীত';
  const lyrics = anthem?.lyrics || DEFAULT_LYRICS;

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      toast.success(`বাজছে: ${title}`);
    } else {
      setIsPlaying(false);
      toast.info('অডিও স্থগিত করা হয়েছে');
    }
  };

  return (
    <section className="py-10 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-b border-blue-900 relative overflow-hidden">
      
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Info */}
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center text-white shrink-0 shadow-md">
              <Music className={`w-8 h-8 text-sky-300 ${isPlaying ? 'animate-bounce' : ''}`} />
            </div>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 inline-block">
                🎵 প্রাতিষ্ঠানিক সংগীত ও প্রার্থনা
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">{title}</h3>
              <p className="text-xs text-blue-200">দৈনিক প্রাত্যহিক সমাবেশ ও বিশেষ অনুষ্ঠানে গাওয়া হয়</p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'অডিও থামান' : 'সঙ্গীত শুনুন'}</span>
            </button>

            <button
              onClick={() => setShowLyrics(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm border border-white/20 transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>সম্পূর্ণ লিরিক্স</span>
            </button>
          </div>

        </div>
      </div>

      {/* Lyrics Modal */}
      {showLyrics && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowLyrics(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                অফিসিয়াল লিরিক্স
              </span>
              <h3 className="text-lg font-black text-slate-900">{title}</h3>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center font-serif text-sm sm:text-base leading-loose whitespace-pre-line text-slate-800 font-medium">
              {lyrics.trim()}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowLyrics(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-blue-900 text-white font-bold rounded-xl text-xs transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
