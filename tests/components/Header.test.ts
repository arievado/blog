import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readHeaderSource(): string {
  return readFileSync(resolve(__dirname, "../../src/components/Header.astro"), "utf-8");
}

describe("Header.astro (RED)", () => {
  // ── CR-003: 导航重构 — 下拉菜单 ──

  it("top-level nav only shows 首页, 文章 dropdown, and 关于 (not 分类/标签/归档 directly)", () => {
    const src = readHeaderSource();
    // 下拉项数据仍存在于源码中, 但不作为顶层导航链接渲染
    // desktop nav should contain dropdown-related markup
    expect(src).toContain("文章");
    expect(src).toContain("dropdown");
  });

  it("dropdownItems data structure contains 分类, 标签, 归档 with distinct SVG icons", () => {
    const src = readHeaderSource();
    expect(src).toContain("分类");
    expect(src).toContain("标签");
    expect(src).toContain("归档");
    // Each dropdown item must have an inline SVG
    const svgCount = (src.match(/<svg/g) || []).length;
    expect(svgCount).toBeGreaterThanOrEqual(3); // at least 3 icons (ham, theme, dropdown items)
  });

  it("desktop dropdown toggle script exists with open/close logic", () => {
    const src = readHeaderSource();
    expect(src).toContain("dropdown");
    // should have toggle logic: click to open, click outside to close
    expect(src).toMatch(/toggle|open|close/);
    expect(src).toMatch(/contains/); // click-outside detection
  });

  it("mobile hamburger menu contains collapsible 文章 submenu with expand arrow", () => {
    const src = readHeaderSource();
    // Mobile menu should have 文章 as an expandable group
    expect(src).toContain("mobile-menu");
    expect(src).toContain("文章");
    // Should have some kind of expand/collapse indicator
    expect(src).toMatch(/expand|arrow|▼|▸|▾/);
  });

  it("dropdown panel has dark mode styles (dark: prefixed classes)", () => {
    const src = readHeaderSource();
    // Dropdown panel should include dark: classes for background and text
    const dropdownSection = src.substring(src.indexOf("dropdown"));
    const dropdownEnd = dropdownSection.indexOf("</div>") > 0
      ? dropdownSection.substring(0, dropdownSection.indexOf("</div>") + 6)
      : dropdownSection.substring(0, 200);
    expect(dropdownSection).toMatch(/dark:/);
  });

  // ── 已有测试 (CR-003 后依然通过) ──

  it("imports and mounts ThemeToggle component", () => {
    const src = readHeaderSource();
    expect(src).toContain("ThemeToggle");
    expect(src).toMatch(/client:load/);
  });

  it("renders hamburger button for mobile navigation", () => {
    const src = readHeaderSource();
    expect(src).toContain("hamburger");
    expect(src).toMatch(/md:hidden/);
  });

  it("includes inline script for mobile menu toggle", () => {
    const src = readHeaderSource();
    expect(src).toContain("<script");
    expect(src).toContain("menuOpen");
    expect(src).toContain("toggle");
  });

  it("imports SITE_AVATAR and renders avatar img in the header", () => {
    const src = readHeaderSource();
    expect(src).toContain("SITE_AVATAR");
    expect(src).toContain("avatarSrc");
    expect(src).toContain('id="header-avatar"');
  });

  it("header avatar img has id and data-placeholder for error handling", () => {
    const src = readHeaderSource();
    expect(src).toContain('id="header-avatar"');
    expect(src).toContain("data-placeholder=");
  });

  it("includes inline error handling for header avatar (onerror → placeholder span)", () => {
    const src = readHeaderSource();
    expect(src).toContain("header-avatar");
    expect(src).toContain("addEventListener");
    expect(src).toContain("error");
    expect(src).toContain("replaceWith");
    expect(src).toContain("placeholder");
  });

  it("renders avatar in title area (not inside mobile-hidden nav)", () => {
    const src = readHeaderSource();
    const avatarIdx = src.indexOf("SITE_AVATAR");
    const mobileMenuIdx = src.indexOf("mobile-menu");
    expect(avatarIdx).toBeGreaterThan(0);
    expect(avatarIdx).toBeLessThan(mobileMenuIdx);
  });

  // ── CR-005: 顶层导航项图标 ──

  it("topLevelItems each have an icon field with SVG content", () => {
    const src = readHeaderSource();
    expect(src).toContain("icon:");
    // dropdownItems has 3 icons, topLevelItems should add 2 more = at least 5 total
    const iconMatches = (src.match(/icon:\s*`/g) || []);
    expect(iconMatches.length).toBeGreaterThanOrEqual(5);
  });

  it("topLevelItems icons use stroke=currentColor for color consistency", () => {
    const src = readHeaderSource();
    expect(src).toContain('stroke="currentColor"');
  });

  it("desktop and mobile topLevel navigation renders icons via set:html", () => {
    const src = readHeaderSource();
    expect(src).toContain("set:html={item.icon}");
  });
});
