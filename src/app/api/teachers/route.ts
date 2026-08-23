import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    const sanitized = teachers.map((t: any) => {
      const obj = t.toObject ? t.toObject() : t;
      if (obj.image && obj.image.includes('unsplash.com')) obj.image = '';
      return obj;
    });
    return NextResponse.json({ success: true, teachers: sanitized });
  } catch (error: any) {
    console.error('Teachers fetch error:', error);
    return NextResponse.json({ success: false, teachers: [], message: error.message }, { status: 500 });
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

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, teacher });
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
