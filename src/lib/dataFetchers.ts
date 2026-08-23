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
 */
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
    return serialize(settings);
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
    return serialize(teachers);
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
    return serialize(gallery);
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
    return serialize(news);
  } catch (error) {
    console.error('getNews SSR error:', error);
    return [];
  }
}

export async function getAlumniStories() {
  try {
    await dbConnect();
    const stories = await AlumniStory.find().sort({ createdAt: -1 }).lean();
    return serialize(stories);
  } catch (error) {
    console.error('getAlumniStories SSR error:', error);
    return [];
  }
}

export async function getBooks() {
  try {
    await dbConnect();
    const books = await Book.find().sort({ createdAt: -1 }).lean();
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
