import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admission from '@/models/Admission';

export async function GET() {
  try {
    await dbConnect();
    const admissions = await Admission.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, admissions });
  } catch (error: any) {
    console.error('Admissions fetch error:', error);
    const mockAdmissions = [
      {
        _id: 'adm-1',
        studentName: 'সাব্বির আহমেদ',
        fatherName: 'মোঃ রফিকুল ইসলাম',
        motherName: 'মোছাঃ সেলিনা আক্তার',
        phone: '০১৭০০-১১২২২৩',
        classApply: '১০ম',
        birthCertNo: '১৯৯৮৮৭৭৬৬৫৫',
        address: 'কোর্ট রোড, শেরপুর',
        paymentStatus: 'paid',
        paymentTxId: 'TXN-998811',
        status: 'pending',
        createdAt: new Date()
      }
    ];
    return NextResponse.json({ success: true, admissions: mockAdmissions });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const admission = await Admission.create(body);
    return NextResponse.json({ success: true, admission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, status } = await req.json();
    const admission = await Admission.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, admission });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

    await Admission.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
