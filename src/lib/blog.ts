import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

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
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

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
        readTime: data.readTime
      };
    });

  // Sort by published date (newest first)
  return allPosts.sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
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
      content
    };
  } catch (error) {
    return null;
  }
}

export function getFeaturedPosts(): BlogPostMeta[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.featured).slice(0, 3);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tags = new Set(allPosts.flatMap(post => post.tags));
  return Array.from(tags);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllBlogPosts();

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
