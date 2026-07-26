import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';

export const dynamic = 'force-dynamic';

const DEFAULT_SETTINGS = {
  schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
  eiin: '১৩০৯৫৪',
  code: '৪৫২০',
  established: '১৯৯৮',
  slogan: 'শিক্ষাই জাতির মেরুদণ্ড, সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি',
  subSlogan: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
  phone: '+৮৮০ ১৭০০-০০০০০',
  email: 'info@drmujibrubi.edu.bd',
  address: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ',
  principalName: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ',
  principalTitle: 'প্রধান শিক্ষক',
  principalMessage: 'আমাদের ডাঃ মুজিব-রুবি মডেল হাই স্কুলের ওয়েবসাইটে স্বাগতম। আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং নৈতিকতা, মানবিক মূল্যবোধ, প্রযুক্তির দক্ষতা এবং নেতৃত্বের গুণাবলী বিকাশের মাধ্যমে একজন আদর্শ নাগরিক গড়ে তোলা। আপনাদের আন্তরিক সহযোগিতা ও স্নেহ আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা। — অধ্যক্ষ',
  chairmanName: 'ডাঃ মোজাম্মেল হক',
  chairmanTitle: 'প্রতিষ্ঠাতা ও সভাপতি',
  chairmanMessage: 'একটি আলোকিত সমাজ গঠনে মানসম্মত শিক্ষার বিকল্প নেই।',
  heroTagline: '২০২৬ শিক্ষাবর্ষে ভর্তি চলছে',
  heroTitleLine1: 'শিক্ষাই জাতির মেরুদণ্ড',
  heroTitleLine2: 'সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি',
  heroDescription: 'আমাদের বিদ্যালয় প্রতিটি শিক্ষার্থীর মধ্যে নৈতিক স্তম্ভতার সাথে আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তির মাধ্যমে আগামী দিনে তুলে ধরছি আগামী প্রজন্মের সেরা, সৃজনশীল ও সামাজিক নেতৃত্ব।',
  aboutHistory: 'প্রতিষ্ঠালগ্ন থেকেই আমাদের বিদ্যালয় মানবতা শিক্ষা, সুস্থতা, নৈতিকতা এবং প্রযুক্তিনির্ভর শিক্ষার মাধ্যমে শিক্ষার্থীদের একটি সুন্দর ভবিষ্যৎ গড়ে তুলতে কাজ করে যাচ্ছে।',
  stats: {
    students: '৩,৫০০+',
    teachers: '১৪০+',
    passRate: '৯৮%',
    establishedYear: '৩০+ বছর'
  }
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

export async function PUT(req: NextRequest) {
  return updateSettings(req);
}

export async function POST(req: NextRequest) {
  return updateSettings(req);
}
