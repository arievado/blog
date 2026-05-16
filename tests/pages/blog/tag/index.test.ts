import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "../../../../src/pages/blog/tag/index.astro");

describe("tag/index.astro (RED)", () => {
  it("file exists", () => {
    expect(existsSync(filePath)).toBe(true);
  });

  it("imports and uses getAllTags and TagCloud", () => {
    const src = readFileSync(filePath, "utf-8");
    expect(src).toContain("getAllTags");
    expect(src).toContain("TagCloud");
  });
});
