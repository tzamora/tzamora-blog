import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  tags: string[];
  coverImage?: string;
  excerpt?: string;
  content?: string;
};

type Frontmatter = Omit<Post, "slug" | "excerpt" | "content">;

function getPostFiles() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

function formatPost(slug: string, data: Partial<Frontmatter>, excerpt?: string): Post {
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    time: data.time,
    description: data.description ?? "",
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    excerpt,
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { data, content } = matter(source);
      return formatPost(slug, data, createExcerpt(content));
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const renderedContent = (await remark().use(html).process(content)).toString();

  return { ...formatPost(slug, data, createExcerpt(content)), content: renderedContent };
}

function createExcerpt(content: string) {
  return content.replace(/^#+\s.*$/gm, "").replace(/[*_`]/g, "").replace(/\s+/g, " ").trim().slice(0, 220);
}
