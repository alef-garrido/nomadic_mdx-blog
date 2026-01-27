import { getAllPosts } from "@/lib/mdx";
import { PostPreviewCard } from "./post-preview-card";

interface RelatedPostsProps {
    currentSlug: string;
}

export function RelatedPosts({ currentSlug }: RelatedPostsProps) {
    const allPosts = getAllPosts();
    const relatedPosts = allPosts
        .filter((post) => post.slug !== currentSlug)
        .slice(0, 3);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-8">More from the blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <PostPreviewCard key={post.slug} post={post as any} />
                ))}
            </div>
        </div>
    );
}
