import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "../../../../src/pages/blog/category/index.astro");

describe("category/index.astro (RED)", () => {
  it("file exists", () => {
    expect(existsSync(filePath)).toBe(true);
  });

  it("imports and uses getAllCategories and CategoryList", () => {
    const src = readFileSync(filePath, "utf-8");
    expect(src).toContain("getAllCategories");
    expect(src).toContain("CategoryList");
  });
});
