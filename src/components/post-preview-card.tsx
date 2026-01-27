import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

interface PostPreviewCardProps {
    post: {
        slug: string;
        frontmatter: {
            title: string;
            description: string;
            date: string;
        };
    };
}

export function PostPreviewCard({ post }: PostPreviewCardProps) {
    return (
        <article className="group relative">
            <Link href={`/blog/${post.slug}`} className="block">
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2">
                        <Calendar className="w-3 h-3" />
                        <time>{post.frontmatter.date}</time>
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.frontmatter.title}
                    </h3>

                    <p className="text-sm text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                        {post.frontmatter.description}
                    </p>

                    <div className="flex items-center gap-1 text-xs font-medium text-blue-500">
                        Read <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </article>
    );
}
