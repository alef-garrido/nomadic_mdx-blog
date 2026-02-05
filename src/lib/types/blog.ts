/**
 * Blog Post Types
 * Defines the structure for blog posts and related data
 */

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogPostResponse {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface CreateBlogPostInput {
  title: string;
  date: string;
  description: string;
  content: string;
}

export interface UpdateBlogPostInput {
  title?: string;
  date?: string;
  description?: string;
  content?: string;
}

export interface BlogApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
