import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    // Size limit: 10MB
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ success: false, message: 'ফাইলের আকার ১০ মেগাবাইট (10MB) এর নিচে হতে হবে' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Generate safe clean filename with timestamp & random token
    const ext = path.extname(file.name) || '.jpg';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
    const uniqueFileName = `${cleanName}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext.toLowerCase()}`;

    const filePath = path.join(uploadsDir, uniqueFileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size
    });
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'আপলোড ব্যর্থ হয়েছে' }, { status: 500 });
  }
}
