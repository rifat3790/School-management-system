import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// GET: Fetch pending users
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const pendingUsers = await User.find({ status: 'pending' }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users: pendingUsers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT: Approve or reject user request
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { userId, status, assignedRole } = await req.json();

    if (!userId || !status) {
      return NextResponse.json(
        { success: false, message: 'User ID and status are required' },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    if (assignedRole) {
      updateData.role = assignedRole;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User status updated to ${status}`,
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
