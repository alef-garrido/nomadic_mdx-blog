import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "src/content/posts");

export function getPostSlugs() {
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
}

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure all frontmatter data is serializable for React (especially Dates)
    if (data.date instanceof Date) {
        data.date = data.date.toISOString().split("T")[0];
    }

    return { slug: realSlug, frontmatter: data, content };
}

export function getAllPosts() {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
    return posts;
}

export function getHeadings(content: string) {
    const headingLines = content.split("\n").filter((line) => line.match(/^##?\s/));

    return headingLines.map((line) => {
        const text = line.replace(/^##?\s/, "");
        const level = line.startsWith("##") ? 2 : 1;
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        return { text, level, id };
    });
}
