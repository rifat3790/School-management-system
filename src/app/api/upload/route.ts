import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Media from '@/models/Media';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'কোনো ফাইল পাওয়া যায়নি' }, { status: 400 });
    }

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json({ success: false, message: 'শুধুমাত্র ইমেজ ফাইল (JPG, PNG, WebP, GIF, SVG) সমর্থিত' }, { status: 400 });
    }

    // Size limit: 12MB
    const maxSizeBytes = 12 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ success: false, message: 'ফাইলের আকার ১২ মেগাবাইট (12MB) এর নিচে হতে হবে' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await dbConnect();

    // Store in MongoDB Media collection
    const media = await Media.create({
      filename: file.name || 'image.jpg',
      contentType: file.type || 'image/jpeg',
      data: buffer,
      size: file.size,
    });

    const publicUrl = `/api/media/${media._id}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      mediaId: media._id,
      fileName: file.name,
      size: file.size
    });
  } catch (error: any) {
    console.error('Database File Upload Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'ছবি আপলোড করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}
