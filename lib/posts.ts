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
  description: string;
  tags: string[];
  content?: string;
};

type Frontmatter = Omit<Post, "slug" | "content">;

function getPostFiles() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

function formatPost(slug: string, data: Partial<Frontmatter>): Post {
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      return formatPost(slug, matter(source).data);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const renderedContent = (await remark().use(html).process(content)).toString();

  return { ...formatPost(slug, data), content: renderedContent };
}
