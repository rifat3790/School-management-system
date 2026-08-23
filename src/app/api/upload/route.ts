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

    // Validate mime type: images & PDF documents
    const validMimes = [
      'image/jpeg', 
      'image/png', 
      'image/webp', 
      'image/gif', 
      'image/svg+xml', 
      'image/avif',
      'application/pdf'
    ];
    
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage && !validMimes.includes(file.type)) {
      return NextResponse.json({ 
        success: false, 
        message: 'শুধুমাত্র ইমেজ (JPG, PNG, WebP) এবং পিডিএফ (PDF) ফাইল সমর্থিত' 
      }, { status: 400 });
    }

    // Size limit: 20MB
    const maxSizeBytes = 20 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ 
        success: false, 
        message: 'ফাইলের আকার ২০ মেগাবাইট (20MB) এর নিচে হতে হবে' 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await dbConnect();

    // Store in MongoDB Media collection
    const media = await Media.create({
      filename: file.name || (isPdf ? 'document.pdf' : 'image.jpg'),
      contentType: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
      data: buffer,
      size: file.size,
    });

    const publicUrl = `/api/media/${media._id}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      mediaId: media._id,
      fileName: file.name,
      size: file.size,
      contentType: media.contentType
    });
  } catch (error: any) {
    console.error('Database File Upload Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'ফাইল আপলোড করতে সমস্যা হয়েছে' 
    }, { status: 500 });
  }
}
