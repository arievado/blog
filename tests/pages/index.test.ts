import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(file: string): string {
  return readFileSync(resolve(__dirname, "../../src/pages", file), "utf-8");
}

describe("index.astro (CR-004 two-column layout)", () => {
  it("imports Sidebar component", () => {
    const src = readSource("index.astro");
    expect(src).toContain("Sidebar");
  });

  it("imports getAllCategories and getAllTags for stats", () => {
    const src = readSource("index.astro");
    expect(src).toContain("getAllCategories");
    expect(src).toContain("getAllTags");
  });

  it("uses two-column layout with lg:flex-row for desktop", () => {
    const src = readSource("index.astro");
    expect(src).toContain("lg:flex-row");
    expect(src).toContain("flex-1");
    expect(src).toContain("min-w-0");
  });

  it("renders PostList in the main content area", () => {
    const src = readSource("index.astro");
    expect(src).toContain("PostList");
    expect(src).toContain("posts={posts}");
  });

  it("no longer has old hero-avatar id or hero inline script", () => {
    const src = readSource("index.astro");
    expect(src).not.toContain("hero-avatar");
  });
});
