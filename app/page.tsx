import Image from "next/image";
import { PostList } from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="shell intro">
        <Image className="profile-image" src="/images/antonio.jpg" alt="Antonio" width={128} height={128} priority />
        <p>Hi, my name is Antonio, a humble programmer ☯️</p>
      </section>
      <section className="shell section home-posts" aria-labelledby="posts">
        <div className="section-heading">
          <h1 id="posts">Posts</h1>
        </div>
        <PostList posts={posts} />
      </section>
    </>
  );
}
