'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Printer, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Phone, 
  Calendar, 
  Droplet, 
  GraduationCap,
  Award,
  QrCode,
  School,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function IdCardPortal() {
  const toast = useToast();
  const [cardType, setCardType] = useState<'student' | 'teacher'>('student');

  // Student Form State
  const [studentData, setStudentData] = useState({
    name: 'মোঃ তানভীর হাসান',
    studentId: 'DRM-2026-1042',
    className: '১০ম শ্রেণী (বিজ্ঞান শাখা)',
    roll: '০৫',
    session: '২০২৬',
    bloodGroup: 'B+',
    phone: '০১৭৮৯-৪৫৬১২৩',
    dob: '১৫ মার্চ, ২০১০',
    emergencyContact: '০১৮১২-৯৮৭৬৫৪',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80'
  });

  // Teacher Form State
  const [teacherData, setTeacherData] = useState({
    name: 'কাজী মাহমুদুল হাসান',
    teacherId: 'TCH-2026-08',
    designation: 'সহকারী শিক্ষক (জীববিজ্ঞান ও আইসিটি)',
    department: 'বিজ্ঞান বিভাগ',
    joiningDate: '১২ জানুয়ারি, ২০১৯',
    bloodGroup: 'O+',
    phone: '০১৭৫৫-১১২২৩৩',
    email: 'teacher@drmujibrubi.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
  });

  const handlePrint = () => {
    toast.success('আইডি কার্ড প্রিন্টিং উইন্ডো খোলা হচ্ছে...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-10">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-14 px-4 print:hidden">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <CreditCard className="w-3.5 h-3.5" />
            ডিজিটাল আইডেন্টিটি পোর্টাল
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">ডিজিটাল আইডি কার্ড জেনারেটর</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            ডাঃ মুজিব-রুবি মডেল হাই স্কুলের শিক্ষার্থী ও শিক্ষকদের জন্য প্রাতিষ্ঠানিক ডিজিটাল স্মার্ট আইডি কার্ড প্রিভিউ ও প্রিন্ট।
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Toggle Bar */}
        <div className="flex items-center justify-center gap-3 print:hidden">
          <button
            onClick={() => setCardType('student')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              cardType === 'student'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            শিক্ষার্থী আইডি কার্ড
          </button>
          <button
            onClick={() => setCardType('teacher')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              cardType === 'teacher'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            শিক্ষক ও স্টাফ আইডি কার্ড
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Customizer Controls */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 print:hidden">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {cardType === 'student' ? 'শিক্ষার্থীর তথ্য কাস্টমাইজ করুন' : 'শিক্ষকের তথ্য কাস্টমাইজ করুন'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">তথ্য পরিবর্তন করলে ডানপাশের কার্ডে লাইভ আপডেট হবে</p>
            </div>

            {cardType === 'student' ? (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিক্ষার্থীর নাম</label>
                  <input
                    type="text"
                    value={studentData.name}
                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">স্টুডেন্ট আইডি</label>
                    <input
                      type="text"
                      value={studentData.studentId}
                      onChange={(e) => setStudentData({ ...studentData, studentId: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">রোল নম্বর</label>
                    <input
                      type="text"
                      value={studentData.roll}
                      onChange={(e) => setStudentData({ ...studentData, roll: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">শ্রেণী ও শাখা</label>
                  <input
                    type="text"
                    value={studentData.className}
                    onChange={(e) => setStudentData({ ...studentData, className: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">রক্তের গ্রুপ</label>
                    <select
                      value={studentData.bloodGroup}
                      onChange={(e) => setStudentData({ ...studentData, bloodGroup: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">শিক্ষাবর্ষ</label>
                    <input
                      type="text"
                      value={studentData.session}
                      onChange={(e) => setStudentData({ ...studentData, session: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">অভিভাবকের মোবাইল নম্বর</label>
                  <input
                    type="text"
                    value={studentData.emergencyContact}
                    onChange={(e) => setStudentData({ ...studentData, emergencyContact: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিক্ষকের পূর্ণ নাম</label>
                  <input
                    type="text"
                    value={teacherData.name}
                    onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">টিচার আইডি</label>
                    <input
                      type="text"
                      value={teacherData.teacherId}
                      onChange={(e) => setTeacherData({ ...teacherData, teacherId: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">রক্তের গ্রুপ</label>
                    <select
                      value={teacherData.bloodGroup}
                      onChange={(e) => setTeacherData({ ...teacherData, bloodGroup: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">পদবী ও বিষয়</label>
                  <input
                    type="text"
                    value={teacherData.designation}
                    onChange={(e) => setTeacherData({ ...teacherData, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    value={teacherData.phone}
                    onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handlePrint}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>আইডি কার্ড প্রিন্ট / PDF সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>

          {/* Right Card: High-Definition Printable ID Card Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
            
            {/* ID Card Front & Back Wrapper */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-300 relative print:border-none print:shadow-none">
              
              {/* Top School Header */}
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-4 text-center relative">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white text-blue-900 flex items-center justify-center font-black text-sm mb-1.5 shadow-md">
                  DRM
                </div>
                <h3 className="font-black text-xs leading-tight text-white">
                  ডাঃ মুজিব-রুবি মডেল হাই স্কুল
                </h3>
                <p className="text-[10px] text-sky-200 mt-0.5">স্থাপিত: ১৯৯৮ | কোড: ১০৯২৮৩</p>
                <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  {cardType === 'student' ? 'Student Identity Card' : 'Faculty & Staff ID'}
                </div>
              </div>

              {/* Photo & Body */}
              <div className="p-5 space-y-4 text-center bg-gradient-to-b from-white via-slate-50/50 to-white">
                
                {/* Photo Frame */}
                <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-3 border-blue-600 shadow-md">
                  <img
                    src={cardType === 'student' ? studentData.photoUrl : teacherData.photoUrl}
                    alt="Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold py-0.5">
                    {cardType === 'student' ? studentData.bloodGroup : teacherData.bloodGroup}
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    {cardType === 'student' ? studentData.name : teacherData.name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    {cardType === 'student' ? studentData.className : teacherData.designation}
                  </p>
                </div>

                {/* Details Table */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-left text-xs space-y-1.5 font-medium">
                  {cardType === 'student' ? (
                    <>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">স্টুডেন্ট আইডি:</span>
                        <span className="font-mono font-bold text-slate-900">{studentData.studentId}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">রোল নম্বর:</span>
                        <span className="font-bold text-slate-900">{studentData.roll}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">শিক্ষাবর্ষ:</span>
                        <span className="font-bold text-slate-900">{studentData.session}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">জরুরি যোগাযোগ:</span>
                        <span className="font-bold text-blue-700">{studentData.emergencyContact}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">টিচার আইডি:</span>
                        <span className="font-mono font-bold text-slate-900">{teacherData.teacherId}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500 font-bold">বিভাগ:</span>
                        <span className="font-bold text-slate-900">{teacherData.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">মোবাইল:</span>
                        <span className="font-bold text-blue-700">{teacherData.phone}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* QR Code & Signatures */}
                <div className="pt-2 flex items-center justify-between px-2 border-t border-slate-200">
                  <div className="text-left space-y-1">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg p-1 text-white flex items-center justify-center">
                      <QrCode className="w-full h-full" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">VERIFIED ID</span>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-serif italic font-bold text-blue-900 text-sm border-b border-slate-400 pb-0.5">
                      K. M. Rahman
                    </div>
                    <p className="text-[9px] font-bold text-slate-600">প্রধান শিক্ষক</p>
                  </div>
                </div>

              </div>

              {/* Bottom Strip */}
              <div className="bg-slate-900 py-1.5 text-center text-[9px] text-slate-400">
                www.drmujibrubi.edu.bd | কার্ডটি হারানো গেলে দ্রুত অফিসে যোগাযোগ করুন
              </div>

            </div>

            <p className="text-xs text-slate-400 text-center max-w-sm print:hidden">
              💡 কার্ডটি স্বয়ংক্রিয়ভাবে স্ট্যান্ডার্ড কার্ড সাইজে প্রিন্ট উপযোগীভাবে ফরম্যাট করা রয়েছে।
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
