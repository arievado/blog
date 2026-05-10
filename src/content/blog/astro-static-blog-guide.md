---
title: "使用 Astro 搭建零成本个人博客"
date: 2026-05-10
category: 前端
tags: ["Astro", "博客", "GitHub Pages", "静态站点"]
description: "从零开始使用 Astro 搭建个人博客并部署到 GitHub Pages 的完整指南，包含 TailwindCSS、Pagefind 搜索、Giscus 评论的集成。"
draft: true
---

## 为什么选 Astro

Astro 是当前内容型站点的最佳选择：

- 默认输出零 JavaScript，首页加载 < 1s
- Markdown / MDX 一等支持
- 群岛架构——可以只在一个组件上引入 React / Vue / Preact
- 开箱即用的图片优化、sitemap 生成

## 技术栈总览

| 层面 | 选择 |
|------|------|
| 框架 | Astro |
| 样式 | TailwindCSS |
| 搜索 | Pagefind |
| 评论 | Giscus |
| 部署 | GitHub Pages |

## 项目初始化

```bash
pnpm create astro@latest .
pnpm add @astrojs/tailwind @astrojs/preact tailwindcss preact
```

## 内容管理

所有文章放在 `src/content/blog/` 目录，通过 frontmatter 声明元数据：

```yaml
---
title: "文章标题"
date: 2026-05-10
category: 分类
tags: ["标签1", "标签2"]
description: "文章摘要"
---
```

## 部署

GitHub Actions 监听 main 分支 push → `astro build` → 部署到 `gh-pages` 分支。

---

_这篇是草稿，后续补充更多细节。_
