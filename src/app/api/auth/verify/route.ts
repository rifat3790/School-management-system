import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

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
    const isSuperAdminEmail = cleanEmail === 'mdrifayethossen@gmail.com' || cleanEmail === 'admin@drmujibrubi.edu.bd';

    // Super Admin Instant Bypass
    if (isSuperAdminEmail) {
      try {
        await dbConnect();
        let user = await User.findOne({ email: cleanEmail });
        if (!user) {
          user = await User.create({
            uid: uid || 'super-admin-uid',
            name: name || 'Md Rifayet Hossen',
            email: cleanEmail,
            role: 'superadmin',
            requestedRole: 'superadmin',
            status: 'approved',
            phone: '+৮৮০ ১৭০০-০০০-০০০',
            details: { designation: 'প্রধান সুপার এডমিন' }
          });
        } else {
          user.role = 'superadmin';
          user.status = 'approved';
          if (uid) user.uid = uid;
          await user.save();
        }
      } catch (dbErr) {
        console.error('Super admin DB sync error:', dbErr);
      }

      return NextResponse.json({
        success: true,
        user: {
          uid: uid || 'super-admin-uid',
          name: name || 'Md Rifayet Hossen',
          email: cleanEmail,
          role: 'superadmin',
          requestedRole: 'superadmin',
          status: 'approved',
          details: { designation: 'প্রধান সুপার এডমিন' },
        },
      });
    }

    // Normal User DB Verification
    await dbConnect();

    const user = await User.findOne({
      $or: [
        ...(cleanEmail ? [{ email: cleanEmail }] : []),
        ...(uid ? [{ uid }] : [])
      ]
    });

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
        role: user.role,
        requestedRole: user.requestedRole,
        status: user.status,
        details: user.details,
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
