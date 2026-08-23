'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validMimes.includes(file.type)) {
      toast.error('শুধুমাত্র JPG, PNG, WebP বা GIF ছবি আপলোড করুন');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ ১২MB এর বেশি হওয়া যাবে না');
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
        toast.success('ছবি সরাসরি ডাটাবেজে আপলোড হয়েছে!');
      } else {
        toast.error(data.message || 'আপলোড ব্যর্থ হয়েছে');
      }
    } catch (err: any) {
      console.error('Upload Error:', err);
      toast.error('আপলোড করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।');
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
        <label className="block text-xs font-bold text-slate-700">{label}</label>
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

      <div>
        {value ? (
          /* Uploaded Preview Card */
          <div className="relative rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-3 flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={value}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ছবি আপলোড সম্পন্ন
                </span>
                <p className="text-[11px] font-mono text-slate-600 truncate mt-1">{value}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition"
              >
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'নতুন ছবি দিন'}
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-xl transition"
                title="ছবি মুছে ফেলুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Upload Drop Area */
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
              uploading
                ? 'border-blue-400 bg-blue-50/50'
                : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 bg-slate-50/50'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
                <p className="text-xs font-bold text-blue-700">ছবি ডাটাবেজে আপলোড হচ্ছে...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 py-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-blue-700 hover:underline">
                    ক্লিক করে ছবি আপলোড করুন
                  </span>
                  <span className="text-xs text-slate-500"> অথবা ফাইলটি ড্র্যাগ করুন</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  সাপোর্টেড ফরম্যাট: JPG, PNG, WebP, GIF (সর্বোচ্চ ১২MB)
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
