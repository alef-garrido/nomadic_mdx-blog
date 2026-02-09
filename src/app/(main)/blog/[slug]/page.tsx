import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import BlogPostLayout from "@/components/BlogPostLayout";
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
    let allPosts;

    try {
        post = getPostBySlug(slug);
        // Get all posts to generate related posts (excluding current)
        const { getAllPosts } = await import("@/lib/mdx");
        allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 4);
    } catch {
        notFound();
    }

    const relatedPosts = allPosts.map((p) => ({
        slug: p.slug,
        title: p.frontmatter.title,
        description: p.frontmatter.description,
        date: p.frontmatter.date,
    }));

    return (
        <BlogPostLayout
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            description={post.frontmatter.description}
            coverColor="from-blue-600 to-purple-600"
            relatedPosts={relatedPosts}
        >
            <MDXRemote source={post.content} components={mdxComponents} />
        </BlogPostLayout>
    );
}
