import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { uid, name, email, phone, requestedRole, details } = body;

    if (!uid || !name || !email || !requestedRole) {
      return NextResponse.json(
        { success: false, message: 'সবগুলো আবশ্যক তথ্য পূরণ করুন' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'এই ইমেইল দিয়ে ইতিপূর্বে একাউন্ট খোলা হয়েছে!' },
        { status: 400 }
      );
    }

    // Special Super Admin check for mdrifayethossen@gmail.com
    const isSuperAdminEmail = cleanEmail === 'mdrifayethossen@gmail.com' || cleanEmail === 'admin@drmujibrubi.edu.bd';
    const role = isSuperAdminEmail ? 'superadmin' : requestedRole;
    const status = isSuperAdminEmail ? 'approved' : 'pending';

    const newUser = await User.create({
      uid,
      name: isSuperAdminEmail ? 'Md Rifayet Hossen (Super Admin)' : name,
      email: cleanEmail,
      phone: phone || '',
      role,
      requestedRole,
      status,
      details: details || {},
    });

    return NextResponse.json(
      {
        success: true,
        message: status === 'approved' 
          ? 'সুপার এডমিন অ্যাকাউন্ট সফলভাবে তৈরি ও সক্রিয় হয়েছে!' 
          : 'নিবন্ধন আবেদন সফল হয়েছে! সুপার এডমিনের অনুমোদনের পর আপনি লগইন করতে পারবেন।',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
