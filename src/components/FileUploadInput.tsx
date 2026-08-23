'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Loader2, CheckCircle2, Eye, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/Toast';

interface FileUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  helperText?: string;
}

export default function FileUploadInput({
  label,
  value,
  onChange,
  accept = '.pdf,application/pdf',
  helperText = 'সমর্থিত ফরম্যাট: PDF ফাইল (সর্বোচ্চ ২০MB)'
}: FileUploadInputProps) {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;

    if (accept.includes('pdf') && !file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('অনুগ্রহ করে শুধুমাত্র PDF ফাইল আপলোড করুন');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ ২০MB এর নিচে হতে হবে');
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
        toast.success('পিডিএফ ফাইল সফলভাবে আপলোড হয়েছে!');
      } else {
        toast.error(data.message || 'ফাইল আপলোড করতে সমস্যা হয়েছে');
      }
    } catch (err: any) {
      toast.error('ফাইল আপলোড ব্যর্থ হয়েছে');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        {value && (
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> পিডিএফ সংযুক্ত আছে
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">পিডিএফ ডকুমেন্ট ফাইল</p>
              <p className="text-[10px] text-slate-500 truncate font-mono">{value}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> দেখুন
            </a>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${uploading ? 'animate-spin' : ''}`} /> পরিবর্তন
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition"
              title="মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
            isDragOver
              ? 'border-blue-500 bg-blue-50/60 scale-[1.01]'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/80 hover:bg-white'
          }`}
        >
          {uploading ? (
            <div className="py-2 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-xs font-bold text-slate-700">পিডিএফ আপলোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-blue-600">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">
                ক্লিক করে <span className="text-blue-600">পিডিএফ ফাইল আপলোড করুন</span> অথবা ড্র্যাগ করুন
              </p>
              <p className="text-[11px] text-slate-400">{helperText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
