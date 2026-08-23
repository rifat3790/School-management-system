import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';
import Notice from '@/models/Notice';
import Teacher from '@/models/Teacher';
import News from '@/models/News';
import Gallery from '@/models/Gallery';
import Result from '@/models/Result';
import Book from '@/models/Book';
import AlumniStory from '@/models/AlumniStory';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const force = searchParams.get('force') === 'true';

    // 1. Clear & Seed ONLY if forced
    if (force) {
      await SiteSettings.deleteMany({});
      await Notice.deleteMany({});
      await Teacher.deleteMany({});
      await News.deleteMany({});
      await Gallery.deleteMany({});
      await Result.deleteMany({});
      await Book.deleteMany({});
      await AlumniStory.deleteMany({});
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
        principalMessage: 'আমাদের ডাঃ মুজিব-রুবি মডেল হাই স্কুলের ওয়েবসাইটে স্বাগতম। আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং নৈতিকতা, মানবিক মূল্যবোধ, প্রযুক্তির দক্ষতা এবং নেতৃত্বের গুণাবলী বিকাশের মাধ্যমে একজন আদর্শ নাগরিক গড়ে তোলা। আপনাদের আন্তরিক সহযোগিতা ও স্নেহ আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা।',
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
        missionText: 'গুণগত মানসম্মত শিক্ষা, সুশৃঙ্খল পরিবেশ ও আধুনিক ল্যাব সুবিধার মাধ্যমে আন্তর্জাতিক মানের নাগরিক তৈরি করা।',
        visionText: 'প্রযুক্তিনির্ভর ও নৈতিক মূল্যবোধসম্পন্ন স্মার্ট বাংলাদেশ গড়ার নেতৃত্ব দানকারী প্রজন্ম গড়ে তোলা।',
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
        },
        academicPrograms: [
          {
            title: 'বিজ্ঞান বিভাগ',
            subtitle: 'আধুনিক ল্যাব ও গবেষণামূলক পাঠদান',
            desc: 'আধুনিক পদার্থ, রসায়ন ও জীব ল্যাবের সাহায্যে বাস্তবমুখী বিজ্ঞান শিক্ষা।',
            classRange: '৯ম - ১০ম শ্রেণী',
            iconName: 'Atom',
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80'
          },
          {
            title: 'ব্যবসায় শিক্ষা বিভাগ',
            subtitle: 'বাস্তবমুখী হিসাববিজ্ঞান ও ফিন্যান্স',
            desc: 'আধুনিক ব্যবসা ও অর্থনৈতিক ব্যবস্থাপনা বিষয়ক উচ্চতর প্রস্তুতি।',
            classRange: '৯ম - ১০ম শ্রেণী',
            iconName: 'TrendingUp',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80'
          },
          {
            title: 'মানবিক বিভাগ',
            subtitle: 'সৃজনশীলতা, সাহিত্য ও সামাজিক বিজ্ঞান',
            desc: 'ভাষা, ইতিহাস, ভূগোল ও নৈতিক মূল্যবোধে সমৃদ্ধ মানবিক শিক্ষা।',
            classRange: '৯ম - ১০ম শ্রেণী',
            iconName: 'BookOpen',
            image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80'
          }
        ]
      });
    }

    // Check & Seed Results if missing
    const resultsCount = await Result.countDocuments();
    if (resultsCount === 0) {
      await Result.insertMany([
        {
          roll: '101',
          regNo: '2026900101',
          studentName: 'রাফসান আহমেদ',
          className: '১০ম শ্রেণী',
          section: 'A',
          examType: 'বার্ষিক পরীক্ষা (Annual)',
          gpa: 5.00,
          grade: 'A+',
          marks: [
            { subject: 'বাংলা', fullMarks: 100, obtained: 88, letterGrade: 'A+', point: 5.0 },
            { subject: 'ইংরেজি', fullMarks: 100, obtained: 85, letterGrade: 'A+', point: 5.0 },
            { subject: 'গণিত', fullMarks: 100, obtained: 95, letterGrade: 'A+', point: 5.0 },
            { subject: 'পদার্থবিজ্ঞান', fullMarks: 100, obtained: 92, letterGrade: 'A+', point: 5.0 },
            { subject: 'রসায়ন', fullMarks: 100, obtained: 89, letterGrade: 'A+', point: 5.0 },
            { subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', fullMarks: 50, obtained: 48, letterGrade: 'A+', point: 5.0 }
          ]
        },
        {
          roll: '102',
          regNo: '2026900102',
          studentName: 'আফরিন জাহান',
          className: '১০ম শ্রেণী',
          section: 'A',
          examType: 'বার্ষিক পরীক্ষা (Annual)',
          gpa: 4.88,
          grade: 'A',
          marks: [
            { subject: 'বাংলা', fullMarks: 100, obtained: 82, letterGrade: 'A+', point: 5.0 },
            { subject: 'ইংরেজি', fullMarks: 100, obtained: 78, letterGrade: 'A', point: 4.0 },
            { subject: 'গণিত', fullMarks: 100, obtained: 90, letterGrade: 'A+', point: 5.0 },
            { subject: 'পদার্থবিজ্ঞান', fullMarks: 100, obtained: 86, letterGrade: 'A+', point: 5.0 },
            { subject: 'রসায়ন', fullMarks: 100, obtained: 84, letterGrade: 'A', point: 4.0 },
            { subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', fullMarks: 50, obtained: 45, letterGrade: 'A+', point: 5.0 }
          ]
        }
      ]);
    }

    // Check & Seed Books if missing
    const booksCount = await Book.countDocuments();
    if (booksCount === 0) {
      await Book.insertMany([
        {
          title: 'উচ্চতর পদার্থবিজ্ঞান (তত্ত্ব ও সমাধান)',
          author: 'ড. শাহজাহান তপন',
          category: 'বিজ্ঞান',
          isbn: '978-984-33-1021-4',
          classLevel: '৯ম-১০ম শ্রেণী',
          location: 'র্যাক-১ (তাজমহল)',
          availableCopies: 12,
          totalCopies: 15
        },
        {
          title: 'সহজ বাংলা ব্যাকরণ ও নির্মিতি',
          author: 'ড. সুনীতিকুমার চট্টোপাধ্যায়',
          category: 'ভাষা ও সাহিত্য',
          isbn: '978-984-33-2045-8',
          classLevel: '৬ষ্ঠ-১০ম শ্রেণী',
          location: 'র্যাক-২ (সাহিত্য কর্নার)',
          availableCopies: 8,
          totalCopies: 10
        },
        {
          title: 'মাধ্যমিক উচ্চতর গণিত সংকলন',
          author: 'এম. এ. জব্বার',
          category: 'গণিত',
          isbn: '978-984-33-3112-9',
          classLevel: '৯ম-১০ম শ্রেণী',
          location: 'র্যাক-১ (গণিত কর্নার)',
          availableCopies: 15,
          totalCopies: 20
        },
        {
          title: 'বঙ্গবন্ধু ও বাংলাদেশের মুক্তিযুদ্ধ',
          author: 'মুনতাসীর মামুন',
          category: 'ইতিহাস',
          isbn: '978-984-33-4550-1',
          classLevel: 'সকল শ্রেণী',
          location: 'র্যাক-৩ (মুক্তিযুদ্ধ কর্নার)',
          availableCopies: 6,
          totalCopies: 6
        }
      ]);
    }

    // Check & Seed AlumniStories if missing
    const alumniCount = await AlumniStory.countDocuments();
    if (alumniCount === 0) {
      await AlumniStory.insertMany([
        {
          name: 'ইঞ্জিনিয়ার রেজওয়ান আহমেদ',
          batch: 'এসএসসি ব্যাচ ২০০৮',
          profession: 'সফটওয়্যার আর্কিটেক্ট',
          organization: 'গুগল (Google, USA)',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
          story: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলের কম্পিউটার ল্যাব এবং শিক্ষকদের বিজ্ঞানমুখী অনুপ্রেরণাই আমাকে আন্তর্জাতিক প্ল্যাটফর্মে নিয়ে এসেছে।',
          isFeatured: true
        },
        {
          name: 'ডাঃ ফারহানা কবির',
          batch: 'এসএসসি ব্যাচ ২০১১',
          profession: 'সহকারী অধ্যাপক (সার্জারি)',
          organization: 'ঢাকা মেডিকেল কলেজ ও হাসপাতাল',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          story: 'বিদ্যালয়ের বিজ্ঞান অলিম্পিয়াড এবং শৃঙ্খলাবোধ আমার চিকিৎসক হওয়ার স্বপ্নকে দৃঢ় ভিত্তি দিয়েছিল।',
          isFeatured: true
        }
      ]);
    }

    // Check & Seed Gallery if missing
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        { title: 'ক্যাম্পাস ভবন ও সবুজ প্রাঙ্গণ', category: 'ক্যাম্পাস', type: 'image', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80' },
        { title: 'আধুনিক স্মার্ট ক্লাসরুম', category: 'একাডেমিক', type: 'image', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80' },
        { title: 'উচ্চতর বিজ্ঞান ও আইসিটি ল্যাব', category: 'বিজ্ঞান মেলা', type: 'image', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80' },
        { title: 'বার্ষিক ক্রীড়া ও চ্যাম্পিয়নশিপ', category: 'ক্রীড়া', type: 'image', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80' }
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
