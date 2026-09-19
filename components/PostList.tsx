import type { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return <p>No posts yet. Check back soon.</p>;
  return <div className="post-list">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div>;
}
