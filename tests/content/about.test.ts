import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const aboutMdPath = resolve(__dirname, "../../src/content/about.md");

describe("about.md (RED)", () => {
  it("file exists at src/content/about.md", () => {
    expect(existsSync(aboutMdPath)).toBe(true);
  });

  it("contains frontmatter with title", () => {
    const src = readFileSync(aboutMdPath, "utf-8");
    expect(src).toContain("---");
    expect(src).toContain("title:");
  });

  it("contains Markdown content sections", () => {
    const src = readFileSync(aboutMdPath, "utf-8");
    expect(src).toContain("##");
    expect(src).toMatch(/关于|数字花园/);
  });
});
