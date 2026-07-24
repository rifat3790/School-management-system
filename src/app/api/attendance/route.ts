import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';

// GET: Fetch attendance by date, class, section, or studentId
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const className = searchParams.get('class');
    const section = searchParams.get('section');
    const studentId = searchParams.get('studentId');
    const teacherId = searchParams.get('teacherId');

    const query: any = {};
    if (date) query.date = date;
    if (className) query.class = className;
    if (section) query.section = section;
    if (teacherId) query.teacherId = teacherId;

    if (studentId) {
      // Find all attendance entries where records array contains this studentId
      const records = await Attendance.find({
        'records.studentId': studentId
      }).sort({ date: -1 });

      return NextResponse.json({ success: true, attendanceHistory: records });
    }

    const attendanceRecords = await Attendance.find(query).sort({ date: -1 });
    return NextResponse.json({ success: true, attendance: attendanceRecords });
  } catch (error: any) {
    console.error('Attendance GET error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST/PUT: Save or update attendance for a specific date & class/section
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { date, class: className, section, teacherId, teacherName, records } = body;

    if (!date || !className || !section || !records) {
      return NextResponse.json(
        { success: false, message: 'তারিখ, শ্রেণী, শাখা এবং শিক্ষার্থীদের উপস্থিতি ডাটা আবশ্যক' },
        { status: 400 }
      );
    }

    // Upsert attendance document for date + class + section
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { date, class: className, section },
      {
        date,
        class: className,
        section,
        teacherId: teacherId || '',
        teacherName: teacherName || '',
        records
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: `${date} তারিখের উপস্থিতি সফলভাবে ডাটাবেজে সংরক্ষণ করা হয়েছে!`,
      attendance: updatedAttendance
    });
  } catch (error: any) {
    console.error('Attendance POST error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
