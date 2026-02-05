/**
 * Admin Blog Posts API
 * GET - List all blog posts
 * POST - Create a new blog post
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllPosts, createPost } from '@/lib/blog/storage';
import { CreateBlogPostInput, BlogApiResponse, BlogPostResponse } from '@/lib/types/blog';

/**
 * GET /api/admin/posts
 * Returns list of all blog posts with metadata
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as BlogApiResponse,
        { status: 401 }
      );
    }

    // Get all posts
    const posts = getAllPosts();

    // Convert to response format (without content)
    const response: BlogPostResponse[] = posts.map((post) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      description: post.frontmatter.description,
    }));

    return NextResponse.json(
      { success: true, data: response } as BlogApiResponse<BlogPostResponse[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' } as BlogApiResponse,
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/posts
 * Create a new blog post
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as BlogApiResponse,
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const input: CreateBlogPostInput = body;

    // Validate required fields
    if (!input.title || !input.date || !input.description || !input.content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' } as BlogApiResponse,
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format. Use YYYY-MM-DD' } as BlogApiResponse,
        { status: 400 }
      );
    }

    // Create the post
    const { slug, post } = createPost(input);

    const response: BlogPostResponse = {
      slug: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      description: post.frontmatter.description,
    };

    return NextResponse.json(
      { success: true, data: response, message: 'Post created successfully' } as BlogApiResponse<BlogPostResponse>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to create post';

    return NextResponse.json(
      { success: false, error: errorMessage } as BlogApiResponse,
      { status: 500 }
    );
  }
}
