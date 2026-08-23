'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, Image as ImageIcon, Loader2, Link2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
  placeholder = 'ছবি আপলোড করুন অথবা ড্র্যাগ করে আনুন...',
  className = '',
}: ImageUploadInputProps) {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validMimes.includes(file.type)) {
      toast.error('শুধুমাত্র JPG, PNG, WebP বা GIF ছবি আপলোড করুন');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ ১০MB এর বেশি হওয়া যাবে না');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        onChange(data.url);
        toast.success('ছবি সফলভাবে আপলোড হয়েছে!');
      } else {
        toast.error(data.message || 'আপলোড ব্যর্থ হয়েছে');
      }
    } catch (err: any) {
      console.error('Upload Error:', err);
      toast.error('সার্ভার এরর: আপলোড করা সম্ভব হয়নি');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">{label}</label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <Link2 className="w-3 h-3" />
            {showUrlInput ? 'ফাইল আপলোড মোড' : 'লিংক / URL লিখুন'}
          </button>
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {showUrlInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ছবির লিংক বা URL লিখুন (যেমন: /uploads/img.webp)"
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:border-blue-600 focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
              title="মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div>
          {value ? (
            /* Uploaded Preview Card */
            <div className="relative rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-2.5 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=200&q=80';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> ছবি আপলোড করা হয়েছে
                  </span>
                  <p className="text-[11px] font-mono text-slate-600 truncate mt-0.5">{value}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition"
                >
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'পরিবর্তন'}
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-xl transition"
                  title="ছবি মুছে ফেলুন"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Upload Drop Area */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
                uploading
                  ? 'border-blue-400 bg-blue-50/50'
                  : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 bg-slate-50/50'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center justify-center py-2 space-y-2">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  <p className="text-xs font-bold text-blue-700">ছবি আপলোড ও প্রসেসিং হচ্ছে...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-blue-700 hover:underline">
                      ক্লিক করে ছবি আপলোড করুন
                    </span>
                    <span className="text-xs text-slate-500"> অথবা ফাইলটি এখানে ড্র্যাগ করুন</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">
                    সাপোর্টেড ফরম্যাট: JPG, PNG, WebP (সর্বোচ্চ ১০MB)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
