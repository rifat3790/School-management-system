import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Result from '@/models/Result';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const roll = searchParams.get('roll');
    const className = searchParams.get('className');
    const examType = searchParams.get('examType');

    const filter: any = {};
    if (roll) filter.roll = roll.trim();
    if (className) filter.className = className.trim();
    if (examType) filter.examType = examType.trim();

    const results = await Result.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Results fetch error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const result = await Result.create(body);
    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, _id, ...updateData } = await req.json();
    const targetId = id || _id;
    const result = await Result.findByIdAndUpdate(targetId, updateData, { new: true });
    return NextResponse.json({ success: true, result });
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

    await Result.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Result deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
