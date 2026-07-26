import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';
import Notice from '@/models/Notice';
import Teacher from '@/models/Teacher';
import News from '@/models/News';
import Gallery from '@/models/Gallery';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const force = searchParams.get('force') === 'true';

    // Only seed IF force=true or IF database settings do not exist yet!
    const existingSettings = await SiteSettings.findOne();
    if (existingSettings && !force) {
      return NextResponse.json({
        success: true,
        message: 'ডাটাবেজে ইতোমধ্যে তথ্য সংরক্ষিত রয়েছে। নতুন কন্টেন্ট মুছে ফেলা হয়নি।',
      });
    }

    // 1. Clear & Seed Site Settings ONLY if forced or empty
    if (force) {
      await SiteSettings.deleteMany({});
      await Notice.deleteMany({});
      await Teacher.deleteMany({});
      await News.deleteMany({});
      await Gallery.deleteMany({});
    }

    // Check & Create SiteSettings if missing
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
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
        principalImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        chairmanName: 'ডাঃ মোজাম্মেল হক',
        chairmanTitle: 'প্রতিষ্ঠাতা ও সভাপতি',
        chairmanMessage: 'একটি আলোকিত সমাজ গঠনে সুশিক্ষার বিকল্প নেই। ডাঃ মুজিব-রুবি মডেল হাই স্কুল ১৯৯৮ সাল থেকে অত্যন্ত নিষ্ঠা ও সুনামের সাথে শিক্ষাঙ্গনে শীর্ষ স্থান ধরে রেখেছে।',
        chairmanImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
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
        },
        socialLinks: {
          facebook: 'https://facebook.com',
          youtube: 'https://youtube.com',
          whatsapp: 'https://wa.me/8801700000000'
        }
      });
    }

    // Check & Seed Notices if missing
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany([
        {
          title: 'অর্ধবার্ষিক পরীক্ষার রুটিন প্রকাশ',
          category: 'পরীক্ষা',
          date: '২৬ মে',
          pdfUrl: '#',
          isImportant: true,
          content: '২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক পরীক্ষার চূড়ান্ত সময়সূচি পোর্টালে প্রকাশ করা হয়েছে।'
        },
        {
          title: '২০২৬ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি',
          category: 'ভর্তি',
          date: '২০ মে',
          pdfUrl: '#',
          isImportant: true,
          content: '৬ষ্ঠ থেকে ৯ষ্ঠ শ্রেণীতে ভর্তির অনলাইন আবেদন জমা নেওয়া হচ্ছে।'
        },
        {
          title: 'স্বাধীনতা দিবস উপলক্ষে সাংস্কৃতিক অনুষ্ঠান',
          category: 'ইভেন্ট',
          date: '১৫ মে',
          pdfUrl: '#',
          isImportant: false,
          content: 'সকল শিক্ষার্থীদের উপস্থিতিতে মনোরম সাংস্কৃতিক ও কবিতা আবৃত্তি অনুষ্ঠিত হবে।'
        }
      ]);
    }

    // Check & Seed Teachers if missing
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      await Teacher.insertMany([
        {
          name: 'জনাব মোঃ আব্দুল করিম',
          designation: 'প্রধান শিক্ষক',
          subject: 'পদার্থবিজ্ঞান (পিএইচডি)',
          qualification: 'এম.এসসি, পিএইচডি (ঢাবি)',
          experience: '২২ বছর',
          email: 'principal@drmujibrubi.edu.bd',
          phone: '+৮৮০ ১৭০০-০০০০০',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
        },
        {
          name: 'জনাবা তানজীনা আক্তার',
          designation: 'সহকারী প্রধান শিক্ষক',
          subject: 'গণিত',
          qualification: 'এম.এসসি (গণিত, জাবি)',
          experience: '১৮ বছর',
          email: 'tanjina@drmujibrubi.edu.bd',
          phone: '+৮৮০ ১৭০০-০০০২০',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
        }
      ]);
    }

    // Check & Seed Gallery if missing
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        { title: 'ক্যাম্পাস ভবন ও সুদৃশ্য বাগান', category: 'ক্যাম্পাস', type: 'image', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80' },
        { title: 'স্মার্ট ক্লাসরুমে পাঠদান', category: 'একাডেমিক', type: 'image', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80' }
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'ডাটাবেজ সিড সম্পন্ন হয়েছে।'
    });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
