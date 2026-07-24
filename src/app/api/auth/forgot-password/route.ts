import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

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
      message: `পাসওয়ার্ড রিসেট আবেদন সফল হয়েছে! আপনার রিসেট কোড (${resetCode}) সুপার এডমিন প্যানেলে জমা হয়েছে। এডমিনের সাথে যোগাযোগ করে নতুন পাসওয়ার্ড সেট করে নিন।`,
      resetCode,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
