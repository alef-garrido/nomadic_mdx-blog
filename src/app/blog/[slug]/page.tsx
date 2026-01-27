import { getPostBySlug, getPostSlugs, getHeadings } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedPosts } from "@/components/related-posts";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

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

    const headings = getHeadings(post.content);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-blue-400 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to blog
            </Link>

            <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
                <article className="min-w-0">
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
                        <MDXRemote
                            source={post.content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                    rehypePlugins: [rehypeSlug],
                                },
                            }}
                        />
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

                    <RelatedPosts currentSlug={slug} />
                </article>

                <aside className="hidden lg:block">
                    <TableOfContents headings={headings} />
                </aside>
            </div>
        </div>
    );
}
