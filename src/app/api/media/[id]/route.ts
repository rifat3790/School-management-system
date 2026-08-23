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
      return new Response('Image not found', { status: 404 });
    }

    return new Response(media.data, {
      status: 200,
      headers: {
        'Content-Type': media.contentType || 'image/jpeg',
        'Content-Length': media.size ? media.size.toString() : media.data.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Error fetching media:', error);
    return new Response('Error loading image', { status: 500 });
  }
}
