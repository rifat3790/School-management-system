import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { uid, email, name } = await req.json();

    if (!uid && !email) {
      return NextResponse.json(
        { success: false, message: 'UID or Email required' },
        { status: 400 }
      );
    }

    const cleanEmail = email ? email.toLowerCase().trim() : '';
    const isSuperAdminEmail = 
      cleanEmail === 'mdrifayethossen@gmail.com' || 
      cleanEmail === 'admin@drmujibrubi.edu.bd' || 
      cleanEmail === 'admin@satkhirahighschool.edu.bd';

    await dbConnect();

    // 1. Super Admin Instant Auto-Sync
    if (isSuperAdminEmail) {
      let superUser = await User.findOne({ email: cleanEmail });
      if (!superUser) {
        superUser = await User.create({
          uid: uid || 'super-admin-uid',
          name: name || 'Md Rifayet Hossen (Super Admin)',
          email: cleanEmail,
          role: 'superadmin',
          requestedRole: 'superadmin',
          status: 'approved',
          phone: '+৮৮০ ১৭০০-০০০০০',
          details: { designation: 'প্রধান সুপার এডমিন' }
        });
      } else {
        superUser.role = 'superadmin';
        superUser.status = 'approved';
        if (uid) superUser.uid = uid;
        await superUser.save();
      }

      return NextResponse.json({
        success: true,
        user: {
          uid: superUser.uid,
          name: superUser.name,
          email: superUser.email,
          role: 'superadmin',
          requestedRole: 'superadmin',
          status: 'approved',
          details: superUser.details,
        },
      });
    }

    // 2. Search Existing User in MongoDB
    let user = await User.findOne({
      $or: [
        ...(cleanEmail ? [{ email: cleanEmail }] : []),
        ...(uid ? [{ uid }] : [])
      ]
    });

    // 3. Auto-register user in MongoDB if logged in via Firebase but not in DB yet
    if (!user && cleanEmail) {
      user = await User.create({
        uid: uid || `uid-${Date.now()}`,
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: 'student',
        requestedRole: 'student',
        status: 'approved',
        phone: '',
        details: { designation: 'শিক্ষার্থী' }
      });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'ইউজার অ্যাকাউন্ট পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        role: user.role || 'student',
        requestedRole: user.requestedRole || 'student',
        status: user.status || 'approved',
        details: user.details || {},
      },
    });
  } catch (error: any) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
