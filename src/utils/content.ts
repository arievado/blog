import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { Category, Tag } from "../types";

export type Post = CollectionEntry<"blog">;

export async function getAllPosts(): Promise<Post[]> {
  const posts: Post[] = await getCollection("blog");
  return posts
    .filter((p: Post) => !p.data.draft)
    .sort((a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts: Post[] = await getCollection("blog");
  return posts.find((p: Post) => p.id === slug);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.category === category);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.tags.includes(tag));
}

export async function getAllCategories(): Promise<Category[]> {
  const posts = await getAllPosts();
  const countMap = new Map<string, number>();
  for (const p of posts) {
    countMap.set(p.data.category, (countMap.get(p.data.category) || 0) + 1);
  }
  return Array.from(countMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts();
  const countMap = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      countMap.set(tag, (countMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(countMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function groupPostsByYear(posts: Post[]): Map<number, Post[]> {
  const grouped = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getFullYear();
    const list = grouped.get(year) || [];
    list.push(post);
    grouped.set(year, list);
  }
  return grouped;
}
