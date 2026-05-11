import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(file: string): string {
  return readFileSync(resolve(__dirname, "../../src/components", file), "utf-8");
}

describe("Sidebar.astro (RED)", () => {
  it("imports SITE_AVATAR, SITE_AUTHOR, SITE_BIO, SITE_SOCIAL_LINKS from constants", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("SITE_AVATAR");
    expect(src).toContain("SITE_AUTHOR");
    expect(src).toContain("SITE_BIO");
    expect(src).toContain("SITE_SOCIAL_LINKS");
  });

  it("declares Props interface with postCount, categoryCount, tagCount", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("postCount");
    expect(src).toContain("categoryCount");
    expect(src).toContain("tagCount");
    expect(src).toMatch(/Props|props/i);
  });

  it("renders social link anchors with target=_blank", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain('target="_blank"');
    expect(src).toContain("SITE_SOCIAL_LINKS");
  });

  it("contains nav links for 首页/关于/友链 only (no 分类/标签/归档)", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("/about/");
    expect(src).toContain("/friends/");
    expect(src).toContain("navItems");
    // 分类/标签/归档 should NOT be in sidebar nav (they're in Header dropdown)
    expect(src).not.toMatch(/\/blog\/category\//);
    expect(src).not.toMatch(/\/blog\/tag\//);
    expect(src).not.toMatch(/\/archive\//);
  });

  it("nav items each have an icon field with SVG", () => {
    const src = readSource("Sidebar.astro");
    // The navItems should include icon fields
    expect(src).toContain("icon:");
    // Should use set:html or Fragment for icon rendering
    expect(src).toMatch(/set:html=\{item\.icon\}/);
    // Should NOT use dash decoration anymore
    expect(src).not.toContain("—");
  });

  it("has avatar img with rounded-full class and inline error handling script", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("rounded-full");
    expect(src).toContain("sidebar-avatar");
    expect(src).toContain('addEventListener("error"');
    expect(src).toContain("placeholder");
    expect(src).toContain("SITE_AVATAR");
  });

  it("uses dark: variants for dark mode support", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("dark:");
  });

  it("renders stats as card with vertical dividers (CR-006)", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("篇文章");
    expect(src).toContain("个分类");
    expect(src).toContain("个标签");
    // Card-style container with background and rounded corners
    expect(src).toMatch(/rounded.*bg-|bg-.*rounded/);
    // Vertical bar separators between items (not &middot;)
    expect(src).not.toContain("&middot;");
    // Numbers should be large and bold
    expect(src).toContain("text-lg");
    expect(src).toContain("font-bold");
  });
});
