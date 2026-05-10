import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readHeaderSource(): string {
  return readFileSync(resolve(__dirname, "../../src/components/Header.astro"), "utf-8");
}

describe("Header.astro (RED)", () => {
  it("contains nav links for 分类 and 标签", () => {
    const src = readHeaderSource();
    expect(src).toContain("分类");
    expect(src).toContain("标签");
    expect(src).toContain("/blog/category/");
    expect(src).toContain("/blog/tag/");
  });

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
    // Should contain <script> with menu toggle logic
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
    // The avatar img should appear BEFORE the hamburger/mobile-menu section
    const avatarIdx = src.indexOf("SITE_AVATAR");
    const mobileMenuIdx = src.indexOf("mobile-menu");
    expect(avatarIdx).toBeGreaterThan(0);
    expect(avatarIdx).toBeLessThan(mobileMenuIdx);
  });
});
