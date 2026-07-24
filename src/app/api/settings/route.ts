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

// PUT: Update Site Settings
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json({
      success: true,
      message: 'ওয়েবসাইট সেটিংস সফলভাবে আপডেট হয়েছে!',
      settings,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
