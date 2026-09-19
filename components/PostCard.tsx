import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <p className="eyebrow">{formatDate(post.date)}</p>
      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
      <p>{post.description}</p>
      {post.tags.length > 0 && (
        <ul className="tag-list" aria-label="Tags">
          {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      )}
    </article>
  );
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" })
    .format(new Date(`${date}T12:00:00`));
}
