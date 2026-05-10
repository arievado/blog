export interface ArticleFrontmatter {
  title: string;
  date: Date;
  updated?: Date;
  category: string;
  tags: string[];
  description: string;
  draft: boolean;
}

export interface PostListItem {
  slug: string;
  frontmatter: ArticleFrontmatter;
}

export interface Category {
  name: string;
  count: number;
}

export interface Tag {
  name: string;
  count: number;
}

export type Theme = "light" | "dark";

export interface FriendLink {
  name: string;
  url: string;
  avatar?: string;
  description?: string;
}
