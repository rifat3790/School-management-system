import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// POST: Request a password reset code
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'ইমেইল প্রদান করা আবশ্যক' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'এই ইমেইল দিয়ে কোনো একাউন্ট খুঁজে পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    // Generate random 6-digit reset code
    const resetCode = 'RST-' + Math.floor(100000 + Math.random() * 900000);
    user.resetCode = resetCode;
    user.resetRequested = true;
    await user.save();

    return NextResponse.json({
      success: true,
      message: `পাসওয়ার্ড রিসেট আবেদন সফল হয়েছে! আপনার ৬ ডিজিটের রিসেট কোড (${resetCode}) সুপার এডমিন প্যানেলে জমা হয়েছে। এডমিনের থেকে কোড নিয়ে পাসওয়ার্ড সেভ করুন।`,
      resetCode,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Verify reset code and update password
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { email, resetCode, newPassword } = await req.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'ইমেইল, রিসেট কোড এবং নতুন পাসওয়ার্ড প্রদান করুন' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = resetCode.trim().toUpperCase();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json({ success: false, message: 'ইউজার অ্যাকাউন্ট পাওয়া যায়নি' }, { status: 404 });
    }

    if (!user.resetRequested || user.resetCode?.toUpperCase() !== cleanCode) {
      return NextResponse.json(
        { success: false, message: 'রিসেট কোডটি সঠিক নয় অথবা মেয়াদ উত্তীর্ণ হয়েছে!' },
        { status: 400 }
      );
    }

    // Update password & clear reset request flags
    user.tempPassword = newPassword;
    user.resetRequested = false;
    user.resetCode = '';
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'আপনার নতুন পাসওয়ার্ড সফলভাবে সেভ হয়েছে! এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
