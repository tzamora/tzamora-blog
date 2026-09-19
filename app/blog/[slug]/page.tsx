import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/PostCard";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  return post ? { title: post.title, description: post.description } : {};
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <article className="shell article">
      <header className="article-header">
        <p className="eyebrow">{formatDate(post.date)}</p>
        <h1>{post.title}</h1>
        <p className="lede">{post.description}</p>
        {post.tags.length > 0 && <ul className="tag-list">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
    </article>
  );
}
