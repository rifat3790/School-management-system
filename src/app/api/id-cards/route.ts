import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import IdCard from '@/models/IdCard';

export const dynamic = 'force-dynamic';

// GET: Fetch ID Card submissions
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    const id = searchParams.get('id');

    if (id) {
      const record = await IdCard.findById(id);
      return NextResponse.json({ success: true, idCard: record });
    }

    if (userEmail) {
      const cleanEmail = userEmail.toLowerCase().trim();
      const record = await IdCard.findOne({ userEmail: cleanEmail }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, idCard: record });
    }

    // Default: fetch all for admin
    const list = await IdCard.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, list });
  } catch (error: any) {
    console.error('ID Card GET error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST: Submit or Update ID Card Request
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userEmail, cardType, name, photoUrl } = body;

    if (!userEmail || !cardType || !name) {
      return NextResponse.json({ success: false, message: 'প্রয়োজনীয় তথ্য অসম্পূর্ণ রয়েছে' }, { status: 400 });
    }

    const cleanEmail = userEmail.toLowerCase().trim();

    // Check if user already submitted an ID card
    let record = await IdCard.findOne({ userEmail: cleanEmail });

    if (record) {
      // Update existing application
      record.cardType = cardType;
      record.name = name;
      record.studentId = body.studentId || record.studentId;
      record.teacherId = body.teacherId || record.teacherId;
      record.className = body.className || record.className;
      record.roll = body.roll || record.roll;
      record.section = body.section || record.section;
      record.session = body.session || record.session;
      record.bloodGroup = body.bloodGroup || record.bloodGroup;
      record.dob = body.dob || record.dob;
      record.phone = body.phone || record.phone;
      record.emergencyContact = body.emergencyContact || record.emergencyContact;
      record.designation = body.designation || record.designation;
      record.department = body.department || record.department;
      record.joiningDate = body.joiningDate || record.joiningDate;
      if (photoUrl) record.photoUrl = photoUrl;
      record.status = 'pending'; // Re-request pending review
      await record.save();

      return NextResponse.json({
        success: true,
        message: 'আইডি কার্ডের আবেদন সফলভাবে আপডেট হয়েছে এবং পর্যালোচনার জন্য জমা হয়েছে!',
        idCard: record
      });
    }

    // Create new
    const newRecord = await IdCard.create({
      userId: body.userId || '',
      userEmail: cleanEmail,
      cardType,
      name,
      studentId: body.studentId || `DRM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      teacherId: body.teacherId || `TCH-2026-${Math.floor(10 + Math.random() * 90)}`,
      className: body.className || '',
      roll: body.roll || '',
      section: body.section || '',
      session: body.session || '২০২৬',
      bloodGroup: body.bloodGroup || 'B+',
      dob: body.dob || '',
      phone: body.phone || '',
      emergencyContact: body.emergencyContact || '',
      designation: body.designation || '',
      department: body.department || '',
      joiningDate: body.joiningDate || '',
      photoUrl: photoUrl || '',
      status: 'pending'
    });

    return NextResponse.json({
      success: true,
      message: 'আইডি কার্ডের আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন কর্তৃক অনুমোদিত হলে প্রিন্ট করতে পারবেন।',
      idCard: newRecord
    });
  } catch (error: any) {
    console.error('ID Card POST error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Admin Approve or Reject ID Card
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'আইডি ও স্ট্যাটাস প্রদান করুন' }, { status: 400 });
    }

    const updated = await IdCard.findByIdAndUpdate(
      id,
      { status, adminNotes: adminNotes || '' },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: 'আবেদনটি খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `আইডি কার্ডের স্ট্যাটাস সফলভাবে '${status === 'approved' ? 'অনুমোদিত (Approved)' : 'বাতিল (Rejected)'}' করা হয়েছে!`,
      idCard: updated
    });
  } catch (error: any) {
    console.error('ID Card PUT error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE: Delete an ID Card application
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'আইডি প্রদান করুন' }, { status: 400 });
    }

    await IdCard.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'আইডি কার্ড আবেদনটি ডাটাবেজ থেকে মুছে ফেলা হয়েছে' });
  } catch (error: any) {
    console.error('ID Card DELETE error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
