/**
 * Admin Blog Post Detail API
 * GET - Get specific blog post
 * PUT - Update blog post
 * DELETE - Delete blog post
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getPostBySlug, updatePost, deletePost } from '@/lib/blog/storage';
import { UpdateBlogPostInput, BlogApiResponse, BlogPost } from '@/lib/types/blog';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/posts/[id]
 * Returns a specific blog post with full content
 */
export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as BlogApiResponse,
        { status: 401 }
      );
    }

    // Get the post
    const post = getPostBySlug(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' } as BlogApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: post } as BlogApiResponse<BlogPost>,
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' } as BlogApiResponse,
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/posts/[id]
 * Update a specific blog post
 */
export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params;

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
    const input: UpdateBlogPostInput = body;

    // Validate date format if provided
    if (input.date && !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format. Use YYYY-MM-DD' } as BlogApiResponse,
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = updatePost(id, input);

    return NextResponse.json(
      { success: true, data: updatedPost, message: 'Post updated successfully' } as BlogApiResponse<BlogPost>,
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update post' } as BlogApiResponse,
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/posts/[id]
 * Delete a specific blog post
 */
export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as BlogApiResponse,
        { status: 401 }
      );
    }

    // Delete the post
    deletePost(id);

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' } as BlogApiResponse,
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' } as BlogApiResponse,
      { status: 500 }
    );
  }
}
