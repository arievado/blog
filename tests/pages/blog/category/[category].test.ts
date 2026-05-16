import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(): string {
  return readFileSync(resolve(__dirname, "../../../../src/pages/blog/category/[category].astro"), "utf-8");
}

describe("[category].astro empty state (RED)", () => {
  it("shows friendly message when no posts exist in category", () => {
    const src = readSource();
    expect(src).toMatch(/暂无文章|该分类下暂无/);
  });

  it("conditionally renders empty state vs PostList", () => {
    const src = readSource();
    expect(src).toContain("posts.length");
  });
});
