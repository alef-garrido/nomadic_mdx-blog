'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Card, Input, Textarea, Tabs, Tab } from '@heroui/react';
import { ArrowLeft, Save, Code2, Eye, Bold, Italic, Heading1, Heading2, List, ListOrdered, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/lib/toast';
import { TableSkeleton } from '@/components/ui/LoadingSkeleton';

interface PostData {
  title: string;
  date: string;
  description: string;
  content: string;
}

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const isEditMode = slug && slug !== 'new';

  const [post, setPost] = useState<PostData>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    content: '',
  });

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTab, setSelectedTab] = useState('edit');

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [isEditMode, slug]);

  const fetchPost = async () => {
    if (!slug) return;

    try {
      const response = await fetch(`/api/admin/posts/${slug}`);

      if (response.ok) {
        const _data = await response.json();
        setPost({
          title: data.data.frontmatter.title,
          date: data.data.frontmatter.date,
          description: data.data.frontmatter.description,
          content: data.data.content,
        });
      } else if (response.status === 404) {
        toast.error('Post not found');
        router.push('/admin/posts');
      } else if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        router.push('/login');
      } else {
        toast.error('Failed to load post');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Error loading post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('mdx-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = post.content.substring(start, end) || 'text';
    const newContent =
      post.content.substring(0, start) +
      before +
      selectedText +
      after +
      post.content.substring(end);

    setPost({ ...post, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleSave = async () => {
    if (!post.title.trim()) {
      toast.error('Post title is required');
      return;
    }

    if (!post.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      toast.error('Date must be in YYYY-MM-DD format');
      return;
    }

    if (!post.description.trim()) {
      toast.error('Post description is required');
      return;
    }

    if (!post.content.trim()) {
      toast.error('Post content is required');
      return;
    }

    try {
      setIsSaving(true);
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode ? `/api/admin/posts/${slug}` : '/api/admin/posts';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (response.ok || response.status === 201) {
        const _data = await response.json();
        toast.success(
          isEditMode ? 'Post updated successfully' : 'Post created successfully'
        );
        router.push('/admin/posts');
      } else if (response.status === 400) {
        const _data = await response.json();
        toast.error(data.error || 'Invalid post data');
      } else if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        router.push('/login');
      } else if (response.status === 404) {
        toast.error('Post not found');
      } else {
        toast.error(isEditMode ? 'Failed to update post' : 'Failed to create post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Error saving post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Loading Post...</h1>
        </div>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button isIconOnly variant="light" className="text-foreground/60">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditMode ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="text-sm text-foreground/60 mt-1">
              {isEditMode
                ? 'Update your blog post content'
                : 'Create a new blog post'}
            </p>
          </div>
        </div>
        <Button
          color="primary"
          startContent={<Save className="w-4 h-4" />}
          onPress={handleSave}
          isLoading={isSaving}
          className="font-medium"
        >
          {isEditMode ? 'Update' : 'Create'} Post
        </Button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Title */}
        <Card className="bg-slate-800/50 border border-slate-700/50 p-6">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Post Title
          </label>
          <Input
            type="text"
            placeholder="Enter post title"
            value={post.title}
            onValueChange={(value) => setPost({ ...post, title: value })}
            classNames={{
              input: 'bg-slate-900/50 text-foreground',
              inputWrapper: 'bg-slate-900/50 border-slate-700/50',
            }}
          />
        </Card>

        {/* Date and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-800/50 border border-slate-700/50 p-6">
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Date (YYYY-MM-DD)
            </label>
            <Input
              type="date"
              value={post.date}
              onValueChange={(value) => setPost({ ...post, date: value })}
              classNames={{
                input: 'bg-slate-900/50 text-foreground',
                inputWrapper: 'bg-slate-900/50 border-slate-700/50',
              }}
            />
          </Card>

          <Card className="bg-slate-800/50 border border-slate-700/50 p-6">
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Slug (auto-generated)
            </label>
            <Input
              type="text"
              value={post.title
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '_')
                .toLowerCase()}
              disabled
              classNames={{
                input: 'bg-slate-900/50 text-foreground/60',
                inputWrapper: 'bg-slate-900/50 border-slate-700/50',
              }}
            />
          </Card>
        </div>

        {/* Description */}
        <Card className="bg-slate-800/50 border border-slate-700/50 p-6">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Description (Short summary)
          </label>
          <Textarea
            placeholder="Enter a short description of your post"
            value={post.description}
            onValueChange={(value) => setPost({ ...post, description: value })}
            minRows={2}
            classNames={{
              input: 'bg-slate-900/50 text-foreground',
              inputWrapper: 'bg-slate-900/50 border-slate-700/50',
            }}
          />
        </Card>

        {/* Content Editor with Tabs */}
        <Card className="bg-slate-800/50 border border-slate-700/50 p-6">
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Content (MDX Format)
          </label>

          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
            classNames={{
              tabList: 'gap-6 w-full border-b border-slate-700/50',
              cursor: 'w-full bg-blue-500',
              tab: 'max-w-fit px-0 h-12',
              tabContent: 'group-data-[selected=true]:text-blue-400',
            }}
            className="w-full"
          >
            {/* Edit Tab */}
            <Tab
              key="edit"
              title={
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span>Edit</span>
                </div>
              }
            >
              <div className="space-y-3 pt-4 w-full">
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('**', '**')}
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('*', '*')}
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <div className="border-r border-slate-700/50" />
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('# ', '\n')}
                    title="Heading 1"
                  >
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('## ', '\n')}
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </Button>
                  <div className="border-r border-slate-700/50" />
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('- ', '\n')}
                    title="Bullet list"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('1. ', '\n')}
                    title="Numbered list"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  <div className="border-r border-slate-700/50" />
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('[', '](url)')}
                    title="Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-slate-800 hover:bg-slate-700"
                    onPress={() => insertMarkdown('```\n', '\n```')}
                    title="Code block"
                  >
                    <Code2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Editor Textarea */}
                <Textarea
                  id="mdx-content"
                  placeholder="Enter your post content in MDX format..."
                  value={post.content}
                  onValueChange={(value) => setPost({ ...post, content: value })}
                  minRows={30}
                  maxRows={50}
                  fullWidth
                  classNames={{
                    base: 'w-full',
                    input: 'font-mono text-sm bg-transparent text-foreground resize-none',
                    inputWrapper: 'bg-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 transition-colors',
                    innerWrapper: 'bg-slate-900/50',
                  }}
                />

                <p className="text-xs text-foreground/50">
                  💡 Tip: Use markdown syntax (#, ##, ###, **, *, -, [], etc.) for formatting. Supports JSX components.
                </p>
              </div>
            </Tab>

            {/* Preview Tab */}
            <Tab
              key="preview"
              title={
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </div>
              }
            >
              <div className="pt-4 w-full">
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <div className="space-y-4 text-foreground/80">
                    {post.content ? (
                      post.content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('# ')) {
                          return (
                            <h1 key={idx} className="text-3xl font-bold text-foreground">
                              {paragraph.replace(/^# /, '')}
                            </h1>
                          );
                        } else if (paragraph.startsWith('## ')) {
                          return (
                            <h2 key={idx} className="text-2xl font-bold text-foreground mt-4">
                              {paragraph.replace(/^## /, '')}
                            </h2>
                          );
                        } else if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={idx} className="text-xl font-bold text-foreground mt-3">
                              {paragraph.replace(/^### /, '')}
                            </h3>
                          );
                        } else if (paragraph.startsWith('- ')) {
                          return (
                            <ul key={idx} className="list-disc list-inside space-y-1">
                              {paragraph.split('\n').map((item, i) => (
                                <li key={i}>{item.replace(/^- /, '')}</li>
                              ))}
                            </ul>
                          );
                        } else if (paragraph.startsWith('```')) {
                          return (
                            <pre key={idx} className="bg-black/30 p-3 rounded border border-slate-700/50 overflow-x-auto">
                              <code className="text-sm font-mono">
                                {paragraph.replace(/```/g, '')}
                              </code>
                            </pre>
                          );
                        } else if (paragraph.trim()) {
                          return (
                            <p key={idx} className="leading-relaxed">
                              {paragraph}
                            </p>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <p className="text-slate-500 italic">No content to preview</p>
                    )}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end pt-4">
          <Link href="/admin/posts">
            <Button variant="bordered" className="border-slate-700/50">
              Cancel
            </Button>
          </Link>
          <Button
            color="primary"
            startContent={<Save className="w-4 h-4" />}
            onPress={handleSave}
            isLoading={isSaving}
            className="font-medium"
          >
            {isEditMode ? 'Update' : 'Create'} Post
          </Button>
        </div>
      </div>
    </div>
  );
}
