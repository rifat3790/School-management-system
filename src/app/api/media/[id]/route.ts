import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Media from '@/models/Media';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return new Response('Not Found', { status: 404 });
    }

    await dbConnect();
    const media = await Media.findById(id);

    if (!media || !media.data) {
      return new Response('Media file not found', { status: 404 });
    }

    const contentType = media.contentType || 'application/octet-stream';
    const isPdf = contentType === 'application/pdf';

    return new Response(media.data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': media.size ? media.size.toString() : media.data.length.toString(),
        'Content-Disposition': isPdf ? `inline; filename="${media.filename || 'document.pdf'}"` : 'inline',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Error fetching media:', error);
    return new Response('Error loading media file', { status: 500 });
  }
}
