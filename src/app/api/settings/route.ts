import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';

const DEFAULT_SETTINGS = {
  schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
  eiin: '১৩০৯৫৪',
  code: '৪৫২০',
  established: '১৯৯৮',
  slogan: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
  subSlogan: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
  phone: '+৮৮০ ১৭০০-০০০০০',
  email: 'info@drmujibrubi.edu.bd',
  address: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ',
  principalName: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ',
  principalTitle: 'প্রধান শিক্ষক',
  principalMessage: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা প্রতিটি শিক্ষার্থীর ভেতরের সুপ্ত মেধা ও সম্ভাবনা জাগ্রত করতে প্রতিশ্রুতিবদ্ধ।',
  chairmanName: 'ডাঃ মোজাম্মেল হক',
  chairmanTitle: 'প্রতিষ্ঠাতা ও সভাপতি',
  chairmanMessage: 'একটি আলোকিত সমাজ গঠনে মানসম্মত আধুনিক শিক্ষার কোনো বিকল্প নেই।',
  heroTagline: 'শিক্ষাই শক্তি',
  heroTitleLine1: 'প্রযুক্তিই ভবিষ্যৎ',
  heroTitleLine2: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
  heroDescription: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে প্রতিশ্রুতিবদ্ধ।',
  stats: {
    students: '২,৮৮০+',
    teachers: '৯৫+',
    passRate: '২১৫+',
    establishedYear: '১৯৯৮'
  },
  campusFacilities: [
    { title: 'অ্যাডভান্সড রোবোটিক্স ও স্টেম ল্যাব', desc: 'মাইক্রোকন্ট্রোলার, ৩ডি প্রিন্টিং ও আইওটি কিট সমৃদ্ধ আধুনিক ল্যাব।', iconName: 'Cpu', badge: '১৫০+ সায়েন্স প্রজেক্ট' },
    { title: 'স্মার্ট মাল্টিমিডিয়া ক্লাসরুম', desc: '৭৫" ৪কে ইন্টারেক্টিভ স্মার্ট ডিসপ্লে ও হাই-স্পিড ওয়াইফাই ক্লাসরুম।', iconName: 'Monitor', badge: '৩২টি স্মার্ট রুম' },
    { title: 'ডিজিটাল ল্যাঙ্গুয়েজ ও আইসিটি ল্যাব', desc: 'স্পোকেন ইংলিশ, লিসেনিং ও কোডিং শেখার আধুনিক কম্পিউটার ল্যাব।', iconName: 'Globe', badge: '৬০টি স্মার্ট ডেস্ক' },
    { title: 'নিরাপদ সিসিটিভি ও বায়োমেট্রিক ক্যাম্পাস', desc: '২৪/৭ সিসিটিভি সার্ভেইল্যান্স ও রিয়েল-টাইম এসএমএস হাজিরা ব্যবস্থা।', iconName: 'ShieldCheck', badge: '১০০% ডিজিটাল সিকিউরিটি' }
  ],
  topAchievers: [
    { name: 'তানভীর রশীদ', exam: 'এসএসসি ২০২৫ (বিজ্ঞান)', gpa: 'GPA 5.00 (Golden A+)', quote: 'ডাঃ মুজিব-রুবি স্কুলের রোবোটিক্স ল্যাব ও শিক্ষকদের গাইডলাইনেই আমার এই সাফল্য।', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80' },
    { name: 'ফারজানা মিমি', exam: 'এসএসসি ২০২৫ (বিজ্ঞান)', gpa: 'GPA 5.00 (Golden A+)', quote: 'ডিজিটাল ক্লাসরুম ও নিয়মিত সাপ্তাহিক মডেল টেস্ট আমাকে আত্মবিশ্বাসী করেছে।', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80' },
    { name: 'আরিফ হোসেন', exam: 'জেএসসি ২০২৪', gpa: 'GPA 5.00 (Board Rank)', quote: 'লাইব্রেরির সমৃদ্ধ বইয়ের সংগ্রহ ও সহ-শিক্ষা ক্লাবগুলোর অবদান অনস্বীকার্য।', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }
  ],
  academicPrograms: [
    { title: 'বিজ্ঞান বিভাগ (Science Stream)', subtitle: 'পদার্থ, রসায়ন, জীববিজ্ঞান ও আইসিটি', desc: 'অ্যাডভান্সড প্র্যাকটিক্যাল ল্যাব সেশন, রোবোটিক্স ও স্টেম অলিম্পিয়াড ট্রেনিং প্রোগ্রাম।', classRange: 'নবম - দশম শ্রেণি', iconName: 'Atom', bgGradient: 'from-blue-500 to-indigo-600' },
    { title: 'মানবিক বিভাগ (Humanities)', subtitle: 'ইতিহাস, পৌরনীতি, অর্থনীতি ও সাহিত্য', desc: 'বিতর্ক ক্লাব, সৃজনশীল রাইটিং ওয়ার্কশপ ও সাধারণ জ্ঞান চর্চা কেন্দ্র।', classRange: 'নবম - দশম শ্রেণি', iconName: 'BookOpen', bgGradient: 'from-emerald-500 to-teal-600' },
    { title: 'ব্যবসায় শিক্ষা (Business Studies)', subtitle: 'হিসাববিজ্ঞান, ফিন্যান্স ও ব্যবসায় উদ্যোগ', desc: 'ডিজিটাল ব্যাংকিং প্র্যাকটিস, স্মার্ট এন্টারপ্রেনারশিপ ওয়ার্কশপ ও কেস স্টাডি।', classRange: 'নবম - দশম শ্রেণি', iconName: 'TrendingUp', bgGradient: 'from-amber-500 to-orange-600' },
    { title: 'জুনিয়র ফাউন্ডেশন (Junior Core)', subtitle: 'ষষ্ঠ থেকে অষ্টম শ্রেণি ভিত্তিক মানসম্মত পাঠদান', desc: 'ডিজিটাল গণিত ল্যাব, স্পোকেন ইংলিশ ক্লাস ও কোডিং মৌলিক কোর্স।', classRange: 'ষষ্ঠ - অষ্টম শ্রেণি', iconName: 'Award', bgGradient: 'from-sky-500 to-blue-600' }
  ],
  clubsAndActivities: [
    { name: 'সায়েন্স ও রোবোটিক্স ক্লাব', category: 'বিজ্ঞান ও প্রযুক্তি', desc: 'আইওটি কিট, অর্ডুইনো প্রোগ্রামিং ও জাতীয় রোবোটিক্স প্রতিযোগিতার সেরা টিম।', membersCount: '১২০+ সদস্য', iconName: 'Cpu', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80' },
    { name: 'বিতর্ক ও সাংস্কৃতিক পরিষদ', category: 'সহ-শিক্ষা', desc: 'যুক্তিনির্ভর চিন্তা ও বাচনভঙ্গি বিকাশে প্রতি সপ্তাহে অভ্যন্তরীণ বিতর্ক প্রতিযোগিতা।', membersCount: '১৫০+ সদস্য', iconName: 'Mic', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80' },
    { name: 'স্পোর্টস ও অ্যাথলেটিক্স ক্লাব', category: 'খেলাধুলা', desc: 'ফুটবল, ক্রিকেট, ব্যাডমিন্টন ও বার্ষিক আন্তঃস্কুল টুর্নামেন্ট চ্যাম্পিয়ন টিম।', membersCount: '২০০+ সদস্য', iconName: 'Trophy', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80' },
    { name: 'বয় স্কাউটস ও রেড ক্রিসেন্ট', category: 'সমাজসেবা', desc: 'শৃঙ্খলা, নেতৃত্ব, দুর্যোগ ব্যবস্থাপনা ও সেবামূলক কর্মকাণ্ডে নিবেদিত স্কোয়াড।', membersCount: '৯০+ সদস্য', iconName: 'Shield', image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=600&q=80' }
  ],
  events: [
    { title: 'বার্ষিক বিজ্ঞান মেলা ও রোবোটিক্স প্রদর্শনী ২০২৬', date: '১৫ মার্চ, ২০২৬', time: 'সকাল ০৯:০০ - বিকেল ০৪:০০', location: 'স্কুল অডিটোরিয়াম', category: 'বিজ্ঞান', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80' },
    { title: 'আন্তঃশ্রেণি বিতর্ক ও দেয়াল পত্রিকা উৎসব', date: '২৮ মার্চ, ২০২৬', time: 'সকাল ১০:০০ - দুপুর ০২:০০', location: 'সেন্ট্রাল লাইব্রেরি হল', category: 'সংস্কৃতি', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
    { title: 'প্রথম সাময়িক মডেল টেস্ট ও অভিভাবক মতবিনিময়', date: '১০ এপ্রিল, ২০২৬', time: 'সকাল ০৯:৩০ - দুপুর ০১:০০', location: 'প্রধান ক্যাম্পাস', category: 'একাডেমিক', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80' }
  ],
  testimonials: [
    { name: 'মাশরাফি আহমেদ', role: 'অভিভাবক (সপ্তম শ্রেণি)', studentName: 'তাহমিদ আহমেদ', rating: 5, text: 'স্কুলের বায়োমেট্রিক হাজিরা ও তাৎক্ষণিক মেসেজ অ্যালার্ট অভিভাবক হিসেবে আমার টেনশন অনেক কমিয়ে দিয়েছে। শিক্ষকরা খুবই আন্তরিক।', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
    { name: 'শারমিন সুলতানা', role: 'অভিভাবক (দশম শ্রেণি)', studentName: 'আফসানা সুলতানা', rating: 5, text: 'স্মার্ট ডিজিটাল ক্লাসরুম এবং অতিরিক্ত টিউটোরিয়াল ক্লাসের কারণে আমার মেয়ে এসএসসিতে গোল্ডেন এ+ প্রত্যাশী। চমৎকার ম্যানেজমেন্ট!', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'ড. কামরুল হাসান', role: 'প্রাক্তন শিক্ষার্থী (ব্যাচ ২০০৫)', studentName: 'বুয়েট সিএসই গ্রাজুয়েট', rating: 5, text: 'আজ আমি বিদেশের স্বনামধন্য প্রতিষ্ঠানে সফটওয়্যার ইঞ্জিনিয়ার। এই স্কুলের লাইব্রেরি ও সায়েন্স ল্যাবেই আমার স্বপ্নের ভিত তৈরি হয়েছিল।', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' }
  ],
  faqs: [
    { question: 'অনলাইনে কীভাবে ভর্তি ফর্ম জমা দিতে হবে?', answer: 'ওয়েবসাইটের "অনলাইন ভর্তি" পেজে গিয়ে প্রয়োজনীয় তথ্য ও কাগজপত্র আপলোড করে সহজেই ফর্ম পূরণ ও সাবমিট করা যাবে।', category: 'ভর্তি' },
    { question: 'স্কুলের ডিজিটাল হাজিরা ও মেসেজ অ্যালার্ট কীভাবে কাজ করে?', answer: 'শিক্ষার্থী ক্যাম্পাসে প্রবেশের পর আঙুলের ছাপ বা বায়োমেট্রিক পাঞ্চ করলে স্বয়ংক্রিয়ভাবে অভিভাবকের মোবাইলে উপস্থিতি বার্তা পৌঁছায়।', category: 'প্রযুক্তি' },
    { question: 'দুর্বল শিক্ষার্থীদের জন্য কি বিশেষ ক্লাসের সুযোগ রয়েছে?', answer: 'হ্যাঁ, সাপ্তাহিক মডেল টেস্টের পর দুর্বল চিহ্নিত শিক্ষার্থীদের জন্য বিনা মূল্যে বিষয়ভিত্তিক রেমিডিয়াল ও অতিরিক্ত টিউটোরিয়াল ক্লাস নেওয়া হয়।', category: 'একাডেমিক' },
    { question: 'মেধাবী ও অসচ্ছল শিক্ষার্থীদের কি বৃত্তি বা ছাড় প্রদান করা হয়?', answer: 'হ্যাঁ, প্রতি বছর মেধাবী ও অসচ্ছল শিক্ষার্থীদের জন্য শিক্ষা ফান্ড থেকে ৫০% পর্যন্ত টিউশন ফি মওকুফ ও বৃত্তি প্রদান করা হয়।', category: 'বৃত্তি' }
  ]
};

// GET: Fetch Site Settings
export async function GET() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Settings fetch error:', error);
    return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS });
  }
}

async function updateSettings(req: NextRequest) {
  try {
    await dbConnect();
    let body: any = {};
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ success: false, message: 'রিকোয়েস্ট বডি সঠিক JSON ফরম্যাটে নেই' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, message: 'রিকোয়েস্ট ডাটা অবজেক্ট হতে হবে' }, { status: 400 });
    }

    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: false }
    );

    return NextResponse.json({
      success: true,
      message: 'ওয়েবসাইট সেটিংস সফলভাবে ডাটাবেজে আপডেট হয়েছে!',
      settings,
    });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json({ success: false, message: error.message || 'ডাটাবেজ আপডেট করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}

// PUT & POST Handlers for maximum compatibility
export async function PUT(req: NextRequest) {
  return updateSettings(req);
}

export async function POST(req: NextRequest) {
  return updateSettings(req);
}



