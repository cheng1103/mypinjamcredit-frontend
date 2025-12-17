import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/types/locale';

const BLOG_LOCALES: Locale[] = ['en', 'ms'];
const blogDirectory = path.join(process.cwd(), 'src/content/blog');

const getLocaleDirectory = (locale: Locale) => path.join(blogDirectory, locale);

const readFileSafe = (filePath: string) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  readTime: string;
  content: string;
  language: Locale;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  readTime: string;
  language: Locale;
}

export function getAllBlogPosts(locale?: Locale): BlogPostMeta[] {
  const localesToLoad = locale ? [locale] : BLOG_LOCALES;
  const posts: BlogPostMeta[] = [];

  localesToLoad.forEach(currentLocale => {
    const dir = getLocaleDirectory(currentLocale);
    if (!fs.existsSync(dir)) {
      return;
    }
    const fileNames = fs.readdirSync(dir).filter(fileName => fileName.endsWith('.md'));

    fileNames.forEach(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dir, fileName);
      const fileContents = readFileSafe(fullPath);
      if (!fileContents) {
        return;
      }
      const { data } = matter(fileContents);

      posts.push({
        slug: data.slug || slug,
        title: data.title,
        description: data.description,
        author: data.author,
        publishedDate: data.publishedDate,
        modifiedDate: data.modifiedDate,
        category: data.category,
        tags: data.tags || [],
        image: data.image || '/blog/default.jpg',
        featured: data.featured || false,
        readTime: data.readTime,
        language: currentLocale
      });
    });
  });

  return posts.sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | null {
  const fullPath = path.join(getLocaleDirectory(locale), `${slug}.md`);
  const fileContents = readFileSafe(fullPath);
  if (!fileContents) {
    return null;
  }

  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || slug,
    title: data.title,
    description: data.description,
    author: data.author,
    publishedDate: data.publishedDate,
    modifiedDate: data.modifiedDate,
    category: data.category,
    tags: data.tags || [],
    image: data.image || '/blog/default.jpg',
    featured: data.featured || false,
    readTime: data.readTime,
    content,
    language: locale
  };
}

export function getFeaturedPosts(locale?: Locale): BlogPostMeta[] {
  const posts = getAllBlogPosts(locale);
  return posts.filter(post => post.featured).slice(0, 3);
}

export function getPostsByCategory(category: string, locale?: Locale): BlogPostMeta[] {
  const posts = getAllBlogPosts(locale);
  return posts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string, locale?: Locale): BlogPostMeta[] {
  const posts = getAllBlogPosts(locale);
  return posts.filter(post => post.tags.includes(tag));
}

export function getAllCategories(locale?: Locale): string[] {
  const allPosts = getAllBlogPosts(locale);
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories);
}

export function getAllTags(locale?: Locale): string[] {
  const allPosts = getAllBlogPosts(locale);
  const tags = new Set(allPosts.flatMap(post => post.tags));
  return Array.from(tags);
}

export function getRelatedPosts(currentSlug: string, locale: Locale, limit: number = 3): BlogPostMeta[] {
  const currentPost = getBlogPost(currentSlug, locale);
  if (!currentPost) return [];

  const allPosts = getAllBlogPosts(locale);

  // Calculate relevance score based on matching tags and category
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;

      // Same category = +3 points
      if (post.category === currentPost.category) {
        score += 3;
      }

      // Each matching tag = +1 point
      const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += matchingTags.length;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(item => item.post);
}
