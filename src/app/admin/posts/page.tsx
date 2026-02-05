'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input } from '@heroui/react';
import { Plus, Trash2, Edit2, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/lib/toast';
import { TableSkeleton, CardSkeleton } from '@/components/ui/LoadingSkeleton';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletePost, setDeletePost] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/posts');

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []);
        toast.success('Posts loaded successfully');
      } else if (response.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to load posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error loading posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (post: Post) => {
    setDeletePost(post);
  };

  const confirmDelete = async () => {
    if (!deletePost) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/posts/${deletePost.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.slug !== deletePost.slug));
        toast.success('Post deleted successfully');
        setDeletePost(null);
      } else if (response.status === 404) {
        toast.error('Post not found');
      } else if (response.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Manage your blog posts and content
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            className="font-medium"
          >
            New Post
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="bg-slate-800/50 border border-slate-700/50 p-4">
        <Input
          isClearable
          type="text"
          placeholder="Search posts by title or description..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="w-full"
          classNames={{
            input: 'bg-slate-900/50 text-foreground',
            inputWrapper: 'bg-slate-900/50 border-slate-700/50',
          }}
        />
      </Card>

      {/* Posts List */}
      <div className="space-y-3">
        {isLoading ? (
          <TableSkeleton rows={5} columns={4} />
        ) : filteredPosts.length === 0 ? (
          <Card className="bg-slate-800/50 border border-slate-700/50 p-8 text-center">
            <p className="text-foreground/60">
              {posts.length === 0
                ? 'No posts yet. Create your first post!'
                : 'No posts match your search'}
            </p>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card
              key={post.slug}
              className="bg-slate-800/50 border border-slate-700/50 p-4 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-foreground/50">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>Slug: {post.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                      title="View post"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href={`/admin/posts/${post.slug}`}>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                      title="Edit post"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    onPress={() => handleDeletePost(post)}
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deletePost !== null}
        onOpenChange={(open) => {
          if (!open) setDeletePost(null);
        }}
        title="Delete Post"
        message={
          deletePost
            ? `Are you sure you want to delete "${deletePost.title}"? This action cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        isDestructive
      />
    </div>
  );
}
