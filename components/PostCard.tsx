import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      {post.coverImage && (
        <Link className="post-cover" href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <Image src={post.coverImage} alt="" width={720} height={360} />
        </Link>
      )}
      <div className="post-card-body">
        <p className="eyebrow">{formatDate(post.date, post.time)}</p>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.excerpt || post.description}</p>
        <Link className="show-more" href={`/blog/${post.slug}`}>Show more <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

export function formatDate(date: string, time?: string) {
  const formattedDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" })
    .format(new Date(`${date}T12:00:00`));
  return time ? `${formattedDate} · ${time}` : formattedDate;
}
