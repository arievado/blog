import type { SocialLink } from "./types";

export const siteConfig = {
  avatar: "/images/wallhaven-k7jd2q.jpg",
  bio: "个人博客，系统化沉淀知识，输出技术文章与随笔。",
  author: "AirevaDo",
  socialLinks: [
    { name: "GitHub", url: "https://github.com/arievado", icon: "github" },
  ] satisfies SocialLink[],
} as const;
