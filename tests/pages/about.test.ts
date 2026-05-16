import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(): string {
  return readFileSync(resolve(__dirname, "../../src/pages/about.astro"), "utf-8");
}

describe("about.astro (RED)", () => {
  it("imports content from about.md instead of hardcoded HTML", () => {
    const src = readSource();
    expect(src).toContain("about.md");
    expect(src).toContain("Content");
  });

  it("uses frontmatter for page title", () => {
    const src = readSource();
    expect(src).toContain("frontmatter");
  });
});
