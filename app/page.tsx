import Link from "next/link";
import { PostList } from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">Hello, I&apos;m Tzamora</p>
        <h1>A small corner for notes, experiments, and things I make.</h1>
        <p className="lede">I write about what I&apos;m learning and share the projects that keep me curious.</p>
      </section>
      <section className="shell section" aria-labelledby="recent-posts">
        <div className="section-heading">
          <h2 id="recent-posts">Recent writing</h2>
          <Link href="/blog">All posts <span aria-hidden="true">→</span></Link>
        </div>
        <PostList posts={posts} />
      </section>
    </>
  );
}
