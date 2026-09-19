import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "Writing by Tzamora." };

export default function BlogPage() {
  return (
    <section className="shell page-section">
      <p className="eyebrow">Writing</p>
      <h1>Blog</h1>
      <p className="lede">Notes on projects, ideas, and whatever I&apos;m figuring out.</p>
      <PostList posts={getAllPosts()} />
    </section>
  );
}
