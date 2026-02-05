import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Calendar, ChevronRight } from "lucide-react";

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Latest Posts
            </h1>

            <div className="space-y-8">
                {posts.map((post) => (
                    <article key={post.slug} className="group relative">
                        <Link href={`/blog/${post.slug}`} className="block">
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="flex items-center gap-2 text-sm text-foreground/50 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <time>{post.frontmatter.date}</time>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                                    {post.frontmatter.title}
                                </h2>

                                <p className="text-foreground/70 leading-relaxed mb-4">
                                    {post.frontmatter.description}
                                </p>

                                <div className="flex items-center gap-1 text-sm font-medium text-blue-500">
                                    Read more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
