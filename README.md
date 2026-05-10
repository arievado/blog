# 数字花园

基于 [Astro](https://astro.build) 构建的个人知识博客——系统化沉淀知识，串联思考，输出技术文章与随笔。

## 技术栈

- **框架**: Astro (静态站点生成)
- **样式**: TailwindCSS
- **搜索**: Pagefind (构建时索引)
- **评论**: Giscus (GitHub Discussions)
- **部署**: GitHub Pages

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 写作

所有文章存放在 `src/content/blog/` 目录，Markdown 格式，通过 frontmatter 声明元数据：

```yaml
---
title: "文章标题"
date: 2026-05-10
category: 分类名
tags: ["标签1", "标签2"]
description: "文章摘要，用于列表展示和 SEO"
draft: false  # true 表示草稿，不发布
---
```

## 部署

推送 `main` 分支 → GitHub Actions 自动构建并部署到 GitHub Pages。

## License

MIT
