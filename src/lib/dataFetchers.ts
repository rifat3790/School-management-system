import dbConnect from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';
import Notice from '@/models/Notice';
import Teacher from '@/models/Teacher';
import Gallery from '@/models/Gallery';
import News from '@/models/News';
import Result from '@/models/Result';
import Book from '@/models/Book';
import AlumniStory from '@/models/AlumniStory';

/**
 * Safely serialize MongoDB documents to plain JSON objects for Next.js SSR
 * and sanitize any legacy third-party dummy image URLs
 */
function cleanImageUrl(url?: string): string {
  if (!url || typeof url !== 'string') return '';
  if (url.includes('unsplash.com')) return '';
  return url;
}

function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

export async function getSiteSettings() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      const created = await SiteSettings.create({});
      settings = created.toObject();
    }
    const serialized: any = serialize(settings);
    if (serialized) {
      serialized.heroImage = cleanImageUrl(serialized.heroImage);
      serialized.principalImage = cleanImageUrl(serialized.principalImage);
      serialized.chairmanImage = cleanImageUrl(serialized.chairmanImage);
    }
    return serialized;
  } catch (error) {
    console.error('getSiteSettings SSR error:', error);
    return null;
  }
}

export async function getNotices(limit?: number) {
  try {
    await dbConnect();
    let query = Notice.find().sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const notices = await query.lean();
    return serialize(notices);
  } catch (error) {
    console.error('getNotices SSR error:', error);
    return [];
  }
}

export async function getTeachers(limit?: number) {
  try {
    await dbConnect();
    let query = Teacher.find().sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const teachers = await query.lean();
    const serialized: any[] = serialize(teachers);
    return serialized.map((t) => ({ ...t, image: cleanImageUrl(t.image) }));
  } catch (error) {
    console.error('getTeachers SSR error:', error);
    return [];
  }
}

export async function getGallery(limit?: number) {
  try {
    await dbConnect();
    let query = Gallery.find().sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const gallery = await query.lean();
    const serialized: any[] = serialize(gallery);
    return serialized
      .filter((g) => g.url && !g.url.includes('unsplash.com'))
      .map((g) => ({ ...g, url: cleanImageUrl(g.url) }));
  } catch (error) {
    console.error('getGallery SSR error:', error);
    return [];
  }
}

export async function getNews(limit?: number) {
  try {
    await dbConnect();
    let query = News.find().sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const news = await query.lean();
    const serialized: any[] = serialize(news);
    return serialized.map((n) => ({ ...n, image: cleanImageUrl(n.image) }));
  } catch (error) {
    console.error('getNews SSR error:', error);
    return [];
  }
}

export async function getAlumniStories(limit?: number) {
  try {
    await dbConnect();
    let query = AlumniStory.find({ isFeatured: true }).sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const stories = await query.lean();
    const serialized: any[] = serialize(stories);
    return serialized.map((s) => ({ ...s, image: cleanImageUrl(s.image) }));
  } catch (error) {
    console.error('getAlumniStories SSR error:', error);
    return [];
  }
}

export async function getBooks(limit?: number) {
  try {
    await dbConnect();
    let query = Book.find().sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const books = await query.lean();
    return serialize(books);
  } catch (error) {
    console.error('getBooks SSR error:', error);
    return [];
  }
}

export async function getResults(roll?: string, className?: string, examType?: string) {
  try {
    await dbConnect();
    const filter: any = {};
    if (roll) filter.roll = roll.trim();
    if (className) filter.className = className.trim();
    if (examType) filter.examType = examType.trim();

    const results = await Result.find(filter).sort({ createdAt: -1 }).lean();
    return serialize(results);
  } catch (error) {
    console.error('getResults SSR error:', error);
    return [];
  }
}
