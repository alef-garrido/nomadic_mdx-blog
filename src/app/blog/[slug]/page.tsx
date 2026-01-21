import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx?$/, ""),
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post;

    try {
        post = getPostBySlug(slug);
    } catch (e) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto py-12">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-blue-400 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to blog
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-4 text-sm text-foreground/50 mb-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time>{post.frontmatter.date}</time>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    {post.frontmatter.title}
                </h1>

                <p className="text-xl text-foreground/60 italic border-l-4 border-blue-500 pl-6 py-2">
                    {post.frontmatter.description}
                </p>
            </header>

            <div className="prose prose-invert max-w-none">
                <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            <footer className="mt-16 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground/50">
                        Thanks for reading!
                    </div>
                    <div className="flex gap-4">
                        {/* Social links placeholder */}
                    </div>
                </div>
            </footer>
        </article>
    );
}
