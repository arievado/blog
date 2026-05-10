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

  it("contains nav links to at least 4 target pages", () => {
    const src = readSource("Sidebar.astro");
    expect(src).toContain("/archive/");
    expect(src).toContain("/about/");
    expect(src).toContain("/blog/category/");
    expect(src).toContain("/blog/tag/");
    expect(src).toContain("/friends/");
    expect(src).toContain("navItems");
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
});
