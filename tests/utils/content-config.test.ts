import { describe, it, expect, vi } from "vitest";

// Use async mock factory to import zod (transitive dependency) at mock time
vi.mock("astro:content", async () => {
  const { z } = await import("zod");
  return {
    defineCollection: vi.fn((opts: Record<string, unknown>) => opts),
    z,
  };
});

vi.mock("astro/loaders", () => ({
  glob: vi.fn(),
}));

describe("blog collection schema", () => {
  it("defaults category to '未分类' when omitted", async () => {
    const { collections } = await import("../../src/content.config");
    const blog = collections.blog as { schema: { parse: (data: unknown) => Record<string, unknown> } };
    const result = blog.schema.parse({
      title: "Test Post",
      date: new Date("2026-05-10"),
      description: "A test post description",
    });

    expect(result.category).toBe("未分类");
  });

  it("keeps explicitly provided category value", async () => {
    const { collections } = await import("../../src/content.config");
    const blog = collections.blog as { schema: { parse: (data: unknown) => Record<string, unknown> } };
    const result = blog.schema.parse({
      title: "Test Post",
      date: new Date("2026-05-10"),
      category: "技术笔记",
      description: "A test post description",
    });

    expect(result.category).toBe("技术笔记");
  });

  it("defaults tags and draft when omitted", async () => {
    const { collections } = await import("../../src/content.config");
    const blog = collections.blog as { schema: { parse: (data: unknown) => Record<string, unknown> } };
    const result = blog.schema.parse({
      title: "Test Post",
      date: new Date("2026-05-10"),
      category: "技术笔记",
      description: "A test post description",
    });

    expect(result.tags).toEqual([]);
    expect(result.draft).toBe(false);
  });
});
