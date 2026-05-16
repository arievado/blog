import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(): string {
  return readFileSync(resolve(__dirname, "../../../src/pages/blog/[...slug].astro"), "utf-8");
}

describe("[...slug].astro slug uniqueness (RED)", () => {
  it("has slug duplicate detection logic in getStaticPaths", () => {
    const src = readSource();
    expect(src).toContain("Slug 重复");
    expect(src).toMatch(/Map|Set|seen/);
  });

  it("throws error when duplicate slugs are detected", () => {
    const src = readSource();
    expect(src).toContain("throw new Error");
    expect(src).toContain("slug");
  });
});
