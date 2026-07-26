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

    // 1. Clear & Seed Site Settings for ডাঃ মুজিব-রুবি মডেল হাই স্কুল
    await SiteSettings.deleteMany({});
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

    // 2. Seed Notices with exact Date Badges
    await Notice.deleteMany({});
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
      },
      {
        title: 'বৃষ্টির আবহাওয়া উপলক্ষে ছুটি',
        category: 'জরুরি',
        date: '১০ মে',
        pdfUrl: '#',
        isImportant: false,
        content: 'ভারী বর্ষণের কারণে আগামীকালের সকল পাঠদান স্থগিত করা হলো।'
      },
      {
        title: 'ক্লাস রুটিন আপডেট',
        category: 'একাডেমিক',
        date: '০৫ মে',
        pdfUrl: '#',
        isImportant: false,
        content: 'নতুন সংশোধিত ক্লাস রুটিন ডাউনলোড করে অনুসরণের নির্দেশ দেওয়া হলো।'
      }
    ]);

    // 3. Seed Teachers list
    await Teacher.deleteMany({});
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
      },
      {
        name: 'জনাব মোঃ রাশিদুল ইসলাম',
        designation: 'জ্যেষ্ঠ শিক্ষক (বিজ্ঞান)',
        subject: 'রসায়ন',
        qualification: 'এম.এসসি (রসায়ন, ঢাবি)',
        experience: '১৬ বছর',
        email: 'rashidul@drmujibrubi.edu.bd',
        phone: '+৮৮০ ১৭০০-০০০৩০',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
      },
      {
        name: 'জনাব সুজন কুমার',
        designation: 'জ্যেষ্ঠ শিক্ষক (গণিত)',
        subject: 'উচ্চতর গণিত',
        qualification: 'এম.এসসি (গণিত)',
        experience: '১৪ বছর',
        email: 'sujan@drmujibrubi.edu.bd',
        phone: '+৮৮০ ১৭০০-০০০৪০',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
      },
      {
        name: 'জনাবা ফারহানা ইয়াসমিন',
        designation: 'জ্যেষ্ঠ শিক্ষক (ইংরেজি)',
        subject: 'ইংরেজি সাহিত্য',
        qualification: 'এম.এ (ইংরেজি, চবি)',
        experience: '১২ বছর',
        email: 'farhana@drmujibrubi.edu.bd',
        phone: '+৮৮০ ১৭০০-০০০৫০',
        image: 'https://images.unsplash.com/photo-1580894732413-87ce4924c393?w=400&q=80'
      },
      {
        name: 'জনাব শেখ হাবিবুর রহমান',
        designation: 'শারীরিক শিক্ষা শিক্ষক',
        subject: 'ক্রীড়া ও পিটি',
        qualification: 'বি.পি.এড',
        experience: '১০ বছর',
        email: 'habibur@drmujibrubi.edu.bd',
        phone: '+৮৮০ ১৭০০-০০০৬০',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
      }
    ]);

    // 4. Seed News
    await News.deleteMany({});
    await News.insertMany([
      {
        title: 'জাতীয় বিজ্ঞান অলিম্পিয়াডে ডাঃ মুজিব-রুবি মডেল হাই স্কুল চ্যাম্পিয়ন',
        category: 'সাফল্য',
        date: '১৮ মে, ২০২৬',
        author: 'আইসিটি সেল',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
        summary: 'জাতীয় বিজ্ঞান ও রোবোটিক্স অলিম্পিয়াডে আমাদের শিক্ষার্থীরা ১ম স্থান অধিকার করে স্বর্ণপদক লাভ করেছে।',
        content: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলের শিক্ষার্থীরা আবারও জাতীয় মেধা তালিকায় শীর্ষে স্থান অর্জন করেছে।'
      },
      {
        title: 'ক্যাম্পাসে স্মার্ট রোবোটিক্স ল্যাব ও ডিজিটাল লাইব্রেরী উদ্বোধন',
        category: 'প্রযুক্তি',
        date: '১২ মে, ২০২৬',
        author: 'মিডিয়া ক্লাব',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
        summary: 'শিক্ষার্থীদের বিশ্বমানের গবেষণায় যুক্ত করতে আধুনিক রোবোটিক্স কিট ও ডিজিটাল টাচ স্ক্রিন লাইব্রেরী চালু করা হয়েছে।',
        content: 'আধুনিক প্রযুক্তিতে শিক্ষা বিস্তারে এটি এক বৈপ্লবিক সংযোজন।'
      }
    ]);

    // 5. Seed Gallery Items matching the 8 grid items
    await Gallery.deleteMany({});
    await Gallery.insertMany([
      { title: 'ক্যাম্পাস ভবন ও সুদৃশ্য বাগান', category: 'ক্যাম্পাস', type: 'image', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80' },
      { title: 'স্মার্ট ক্লাসরুমে পাঠদান', category: 'একাডেমিক', type: 'image', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80' },
      { title: 'বিজ্ঞান ও রসায়ন ল্যাব পরীক্ষা', category: 'বিজ্ঞান ল্যাব', type: 'image', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80' },
      { title: 'জাতীয় চ্যাম্পিয়নশিপ ট্রফি গ্রহণ', category: 'পুরস্কার', type: 'image', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80' },
      { title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা', category: 'ক্রীড়া', type: 'image', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80' },
      { title: 'কম্পিউটার ও আইসিটি ল্যাব', category: 'প্রযুক্তি', type: 'image', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80' },
      { title: 'সাংস্কৃতিক সন্ধ্যা ও নাটক', category: 'সাংস্কৃতিক', type: 'image', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80' },
      { title: 'শিক্ষক ও পরিচালনা পর্ষদ', category: 'ক্যাম্পাস', type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80' }
    ]);

    return NextResponse.json({
      success: true,
      message: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলের ডাটাবেজ সফলভাবে আপডেট ও সিড করা হয়েছে!'
    });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
