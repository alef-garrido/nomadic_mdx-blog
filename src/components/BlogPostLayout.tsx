'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { ReactNode } from 'react';

interface BlogPostLayoutProps {
  title: string;
  date: string;
  description: string;
  readTime?: string;
  coverImage?: string;
  coverColor?: string;
  children: ReactNode;
  relatedPosts?: Array<{
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
  }>;
}

export default function BlogPostLayout({
  title,
  date,
  description,
  readTime = '5 min read',
  coverImage,
  coverColor = 'from-blue-600 to-purple-600',
  children,
  relatedPosts = [],
}: BlogPostLayoutProps) {
  return (
    <article className="w-full font-mono">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-blue-400 transition-colors mb-8"
        >
          ← Back to blog
        </Link>
      </div>

      {/* Hero Header with Cover */}
      <div className={`w-full bg-gradient-to-br ${coverColor} py-12 md:py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Post Meta */}
          <div className="flex items-center gap-4 text-sm text-white/80 mb-6 font-mono">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time>{date}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Post Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg font-serif">
            {title}
          </h1>

          {/* Post Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md font-mono">
            {description}
          </p>
        </div>
      </div>

      {/* Cover Image */}
      {coverImage && (
        <div className="w-full bg-slate-900/50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none font-mono">
            {children}
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="w-full bg-slate-900/50 border-t border-b border-slate-700/50 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-white font-serif">Related Posts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group cursor-pointer h-full">
                    {/* Post Card */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 h-full flex flex-col">
                      {/* Card Image */}
                      {post.image && (
                        <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Date */}
                        <div className="flex items-center gap-1 text-xs text-foreground/50 mb-3 font-mono">
                          <Calendar className="w-3 h-3" />
                          <time>{post.date}</time>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 font-serif">
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-foreground/70 mb-4 flex-grow line-clamp-3 font-mono">
                          {post.description}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                          Read more
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Branded Footer */}
      <footer className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 py-16 md:py-24 font-mono">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                <h3 className="text-lg font-bold text-white font-serif">Nomadic</h3>
              </div>
              <p className="text-sm text-foreground/60 font-mono">
                A modern blog platform for nomadic travelers sharing insights and stories from around the world.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white font-serif">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-sm text-foreground/60 hover:text-blue-400 transition-colors">
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-foreground/60 hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/club" className="text-sm text-foreground/60 hover:text-blue-400 transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white font-serif">Stay Connected</h4>
              <p className="text-sm text-foreground/60 font-mono">
                Follow our journey across the globe and join our community of nomadic explorers.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 text-foreground/60 hover:text-blue-400 flex items-center justify-center transition-colors"
                  title="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 text-foreground/60 hover:text-blue-400 flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 text-foreground/60 hover:text-blue-400 flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  /
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-700/30 mb-8" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-foreground/50">
            <p>&copy; 2026 Nomadic MDX Blog. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground/70 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground/70 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
