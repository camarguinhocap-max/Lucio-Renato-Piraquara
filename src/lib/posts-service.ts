import { getCloudflareEnvOrNull } from "./cf-env";
import { getPostById, listPosts, type Post } from "./posts-db";
import type { CategorySlug } from "./categories";

const CANONICAL_ORIGIN = "https://luciorenatopiraquara.com.br";

export async function getPostsForCategory(categoria: CategorySlug): Promise<Post[]> {
  const env = getCloudflareEnvOrNull();
  if (env) {
    return listPosts(env.DB, categoria);
  }
  const response = await fetch(`${CANONICAL_ORIGIN}/api/posts?categoria=${categoria}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for ${categoria}: ${response.status}`);
  }
  const data = (await response.json()) as { posts: Post[] };
  return data.posts;
}

export async function getPostDetail(id: number): Promise<Post | null> {
  const env = getCloudflareEnvOrNull();
  if (env) {
    return getPostById(env.DB, id);
  }
  const response = await fetch(`${CANONICAL_ORIGIN}/api/posts/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}: ${response.status}`);
  }
  return (await response.json()) as Post;
}
