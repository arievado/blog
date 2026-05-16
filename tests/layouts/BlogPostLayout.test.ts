import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(): string {
  return readFileSync(resolve(__dirname, "../../src/layouts/BlogPostLayout.astro"), "utf-8");
}

describe("BlogPostLayout image error handling (RED)", () => {
  it("has inline script handling img error events", () => {
    const src = readSource();
    expect(src).toContain("addEventListener");
    expect(src).toMatch(/error/);
    expect(src).toMatch(/img/);
  });

  it("replaces broken images with placeholder text", () => {
    const src = readSource();
    expect(src).toContain("图片未找到");
    expect(src).toMatch(/replaceWith|insertAdjacent|parentNode/);
  });
});
