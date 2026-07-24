import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';
import { TEACHERS_LIST } from '@/data/schoolData';

export async function GET() {
  try {
    await dbConnect();
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, teachers });
  } catch (error: any) {
    console.error('Teachers fetch error:', error);
    const mockTeachers = TEACHERS_LIST.map(t => ({
      _id: t.id,
      name: t.name,
      designation: t.designation,
      subject: t.subject,
      qualification: t.qualification,
      experience: t.experience,
      email: t.email,
      phone: t.phone,
      image: t.image
    }));
    return NextResponse.json({ success: true, teachers: mockTeachers });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const teacher = await Teacher.create(body);
    return NextResponse.json({ success: true, teacher }, { status: 201 });
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

    await Teacher.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Teacher deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
