import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function readSource(file: string): string {
  return readFileSync(resolve(__dirname, "../../src/components", file), "utf-8");
}

describe("PostCard.astro (RED)", () => {
  it("title element has line-clamp-1 or truncate class for long titles", () => {
    const src = readSource("PostCard.astro");
    // The h2 title should have truncation
    expect(src).toMatch(/line-clamp-1|truncate/);
  });
});
