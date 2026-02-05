/**
 * Blog Post Storage Operations
 * Handles file I/O for blog posts in src/content/posts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogFrontmatter, CreateBlogPostInput, UpdateBlogPostInput } from '@/lib/types/blog';

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts');

/**
 * Convert a title to a valid slug
 * "My Blog Post" -> "My_Blog_Post" (matching existing convention)
 */
export function titleToSlug(title: string): string {
  return title
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-+/g, '_')
    .toLowerCase();
}

/**
 * Get all blog post slugs
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }
  return fs.readdirSync(POSTS_PATH).filter((file) => /\.mdx?$/.test(file));
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: data as BlogFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
  return posts;
}

/**
 * Create a new blog post
 */
export function createPost(input: CreateBlogPostInput): { slug: string; post: BlogPost } {
  const slug = titleToSlug(input.title);
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);

  // Check if file already exists
  if (fs.existsSync(fullPath)) {
    throw new Error(`Post with slug "${slug}" already exists`);
  }

  // Ensure directory exists
  if (!fs.existsSync(POSTS_PATH)) {
    fs.mkdirSync(POSTS_PATH, { recursive: true });
  }

  // Create frontmatter
  const frontmatter: BlogFrontmatter = {
    title: input.title,
    date: input.date,
    description: input.description,
  };

  // Create MDX content with frontmatter
  const mdxContent = `---
title: "${frontmatter.title}"
date: "${frontmatter.date}"
description: "${frontmatter.description}"
---

${input.content}`;

  // Write file
  fs.writeFileSync(fullPath, mdxContent, 'utf8');

  // Return the created post
  const post = getPostBySlug(slug);
  if (!post) {
    throw new Error('Failed to create post');
  }

  return { slug, post };
}

/**
 * Update an existing blog post
 */
export function updatePost(slug: string, input: UpdateBlogPostInput): BlogPost {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  // Read current post
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Merge updates
  const frontmatter: BlogFrontmatter = {
    title: input.title ?? data.title,
    date: input.date ?? data.date,
    description: input.description ?? data.description,
  };

  const newContent = input.content ?? content;

  // Create updated MDX content
  const mdxContent = `---
title: "${frontmatter.title}"
date: "${frontmatter.date}"
description: "${frontmatter.description}"
---

${newContent}`;

  // Write file
  fs.writeFileSync(fullPath, mdxContent, 'utf8');

  // Return updated post
  const post = getPostBySlug(slug);
  if (!post) {
    throw new Error('Failed to update post');
  }

  return post;
}

/**
 * Delete a blog post
 */
export function deletePost(slug: string): void {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  fs.unlinkSync(fullPath);
}

/**
 * Check if a post exists
 */
export function postExists(slug: string): boolean {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}
