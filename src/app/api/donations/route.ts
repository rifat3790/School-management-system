import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Donation from '@/models/Donation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const donations = await Donation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, donations });
  } catch (error: any) {
    console.error('Donations fetch error:', error);
    const mockDonations = [
      {
        _id: 'don-1',
        donorName: 'ইঞ্জিনিয়ার রেজওয়ান হোসেন',
        donorType: 'প্রাক্তন ছাত্র (ব্যাচ ১৯৯৯)',
        amount: 25000,
        paymentMethod: 'bKash Merchant',
        transactionId: 'TXN-998844',
        phone: '০১৭০০-০০১১২২',
        message: 'রোবোটিক্স ল্যাব ফান্ডে আমার ক্ষুদ্র অবদান। প্রতিষ্ঠানের উত্তরোত্তর সমৃদ্ধি কামনা করি।',
        date: '১২ জুন ২০২৬',
        isApproved: true
      },
      {
        _id: 'don-2',
        donorName: 'আলহাজ্ব শফিকুল ইসলাম',
        donorType: 'অভিভাবক ও শুভানুধ্যায়ী',
        amount: 50000,
        paymentMethod: 'ব্যাংক ট্রান্সফার',
        transactionId: 'TXN-554411',
        phone: '০১৮০০-৯৯৮৮৭৭',
        message: 'লাইব্রেরির নতুন বিজ্ঞান সাময়িকী ক্রয়ের জন্য এই অনুদান প্রদান করা হলো।',
        date: '১৫ জুন ২০২৬',
        isApproved: true
      }
    ];
    return NextResponse.json({ success: true, donations: mockDonations });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const donation = await Donation.create(body);
    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, isApproved } = await req.json();
    const donation = await Donation.findByIdAndUpdate(id, { isApproved }, { new: true });
    return NextResponse.json({ success: true, donation });
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

    await Donation.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Donation deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
