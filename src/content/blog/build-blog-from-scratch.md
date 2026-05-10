---
title: "从零搭建个人博客：一个后端开发者的前端踩坑记"
date: 2026-05-10
category: 前端
tags: ["Astro", "博客", "GitHub Pages", "静态站点", "教程"]
description: "记录从零搭建个人博客数字花园的完整过程——技术选型、开发流程、踩坑记录，适合想自己建站的初学者。"
---

## 为什么要自己建博客

作为一个后端开发者，我的笔记散落在 Notion、Obsidian、本地 Markdown 文件和各种笔记工具里。每次想找回一个曾经记录过的知识点，都要在几个工具之间来回翻——这种体验很糟糕。

我想要的是：

1. **写完即发布**：本地写 Markdown，`git push` 就上线，零额外操作
2. **内容可控**：文章是我的，数据是我的，不依赖任何第三方平台
3. **零成本**：不租服务器，不买数据库
4. **能搜索**：自己的笔记能全文检索

市面上现成的博客平台做不到这些，那就自己造一个。

## 技术选型：每个选择都有原因

### 为什么不选 WordPress / Hexo / Hugo？

WordPress 需要服务器和数据库，不合"零成本"目标。Hexo 和 Hugo 都是优秀的静态站点生成器，但我想用一个能**直接 import Markdown、有类型安全**的框架——Astro 的 Content Collections 用 Zod 校验 frontmatter，写错字段构建直接报错，对内容质量有保障。

### 最终选型

| 层面 | 选择 | 一句话理由 |
|------|------|-----------|
| 框架 | Astro | 默认零 JS 输出，Markdown 一等支持 |
| 样式 | TailwindCSS | 原子化 CSS，自带暗色模式 |
| 搜索 | Pagefind | 构建时生成索引，零运行时依赖 |
| 评论 | Giscus | 基于 GitHub Discussions，免费 |
| 部署 | GitHub Pages | 免费，push 即部署 |

**核心原则**：选最适合内容的，不选最热门的。

## 项目初始化：搭骨架

第一步是用 `pnpm create astro@latest` 初始化项目。Astro 会问你几个问题——选 Empty 模板 + TypeScript 就行。

然后安装必要的依赖：

```bash
pnpm add @astrojs/tailwind @astrojs/preact tailwindcss preact
pnpm add @astrojs/sitemap   # 自动生成 sitemap，SEO 必备
```

这里有个细节：为什么装 Preact 而不是 React？因为**暗色模式切换按钮**需要一个 UI 框架来管理状态，但它只是一个按钮——为了一个按钮引入 React 全家桶太浪费了。Preact 只有 3KB 大小，API 几乎和 React 一样，是这个场景的最佳选择。Astro 把这叫做"群岛架构"——页面的 99% 是纯 HTML，只在需要交互的小岛上引入 JS。

接下来按设计文档创建目录结构：

```
src/
├── components/   # 可复用的 UI 组件
├── content/      # Markdown 文章（核心！）
│   ├── blog/     # 博客文章
│   └── config.ts # Content Collections Schema
├── layouts/      # 页面布局骨架
├── pages/        # 路由页面（Astro 文件路由）
├── styles/       # 全局样式
├── types/        # TypeScript 类型定义
└── utils/        # 工具函数
```

## 核心开发：从数据到页面

整个博客的数据流非常简单：

```
Markdown 文件 → Zod Schema 校验 → 查询/排序工具函数 → Astro 页面渲染 → 静态 HTML
```

**没有数据库，没有后端，没有 API。** 所有文章都是 `src/content/blog/` 下的 `.md` 文件，构建时 Astro 把它们变成 HTML。

### 第一步：定义文章格式

在 `src/content/config.ts` 里用 Zod 定义每篇文章必须包含的字段：

```ts
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string().min(1).max(100),    // 标题，不能为空
    date: z.date(),                        // 发布日期
    category: z.string().default("未分类"), // 分类，不填就是"未分类"
    tags: z.array(z.string()).default([]), // 标签，可以多个
    description: z.string().min(1),        // 摘要，列表页展示
    draft: z.boolean().default(false),     // 草稿不发布
  }),
});
```

写完文章 `git push` 之后，构建流程会自动校验——如果某篇文章的 frontmatter 少了必填字段，构建直接报错，不会上线一个有问题的页面。

### 第二步：构建页面

Astro 使用**文件路由**——`src/pages/` 下的文件路径就是 URL 路径：

- `src/pages/index.astro` → 首页 `/`
- `src/pages/blog/[...slug].astro` → 文章详情 `/blog/文章名/`
- `src/pages/archive.astro` → 归档 `/archive/`
- `src/pages/about.astro` → 关于 `/about/`

每个 `.astro` 文件分为两部分：顶部的 `---` 区域写逻辑（查询数据），下面写 HTML 模板。

## 踩坑记录：这些问题花了我不少时间

### 坑一：GitHub 链接跳转 404

**问题**：点页面底部的 GitHub 链接，跳到了 `https://github.com/username`，404。

**原因**：项目初始化时 `GITHUB_USERNAME` 常量写了占位符 `"username"`，忘记替换成真实的用户名。而且这个配置分散在两个地方——`src/utils/constants.ts` 和 `src/content/about.md`，改漏了一个。

**教训**：像用户名、站点 URL 这种被多处引用的配置，应该**只在一个地方定义**，其他地方 import 它。后续可以考虑抽到环境变量里。

### 坑二：日期格式不统一

**问题**：产品文档要求日期格式是 `YYYY-MM-DD`（如 `2026-05-10`），但 `formatDate` 函数最初用了 JavaScript 的 `toLocaleDateString("zh-CN")`，输出的是 `2026/05/10`。

**原因**：`toLocaleDateString` 的行为依赖运行环境，不同 Node 版本、不同 locale 设置输出可能不一样。

**教训**：日期这种需要精确格式的场景，**手动拼接字符串**比依赖 `toLocaleDateString` 更可靠。

```ts
// ❌ 不可靠
date.toLocaleDateString("zh-CN")  // "2026/05/10"

// ✅ 可预测
const y = date.getFullYear();
const m = String(date.getMonth() + 1).padStart(2, "0");
const d = String(date.getDate()).padStart(2, "0");
return `${y}-${m}-${d}`;  // 永远是 "2026-05-10"
```

### 坑三：文章分类必填导致构建失败

**问题**：写文章时忘了写 `category` 字段，构建直接报错。

**原因**：Zod Schema 里 `category` 最初定义成了必填字段：`z.string().min(1)`。

**解决**：改成 `z.string().default("未分类")`，不填分类的文章自动归入"未分类"——宽容一点，不要因为漏了一个分类就让整站构建失败。

### 坑四：TypeScript 类型检查的教训（给初学者的友情提醒）

这是最容易绊倒新手的点。Astro 项目开启了 `strict` TypeScript 检查，编辑器的红色波浪线会毫不留情。几个关键习惯：

1. **`import.meta.env` 需要声明**：在 `src/env.d.ts` 里声明你用了哪些环境变量，否则 TS 不认
2. **Astro 文件的 Props 需要接口**：每个接收参数的组件都要写 `interface Props { ... }`
3. **构建前跑 `astro check`**：很多类型错误只有构建时才能发现，不要等到 push 之后

## 部署上线：push 就完事

配置 GitHub Actions，监听 `main` 分支的 push 事件：

```yaml
# .github/workflows/deploy.yml 核心步骤
steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v2
  - run: pnpm install && pnpm build
  - uses: peaceiris/actions-gh-pages@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      publish_dir: ./dist
```

现在的工作流是：

1. 本地写 Markdown
2. `git commit && git push`
3. GitHub Actions 自动 `pnpm build`
4. 构建产物推送到 `gh-pages` 分支
5. 博客更新

整个过程不到 2 分钟，写完就发布。

## 目前的状态与后续计划

当前博客已经上线，具备：

- 文章列表 + 详情展示
- 分类 / 标签双维度组织
- 按年月归档
- 暗色 / 浅色模式切换
- 响应式布局（手机 / 平板 / 桌面）
- 代码高亮（Shiki）

下一步要做的：

- **全文搜索**（Pagefind 集成）
- **评论系统**（Giscus）
- **SEO 完善**（OG 图片、lighthouse 上 90）
- **性能优化**（图片懒加载、字体优化）

## 总结

对于一个后端开发者来说，搭一个博客的前端部分没有想象中那么可怕。Astro 的核心理念"写 HTML、需要交互才加 JS"降低了心智负担，TailwindCSS 让你不用想 class 命名，GitHub Pages + Actions 解决了部署问题。

如果你也想搭自己的博客，我的建议是：**先上线最小可用版本，再慢慢迭代。** 不要一开始就想把所有功能做完——搜索、评论、暗色模式这些都可以后续加，第一优先级是能写文章、能被人看到。

---

_这个博客本身是开源的，代码在 [GitHub](https://github.com/arievado/blog) 上。有问题欢迎提 Issue。_
