import { describe, it, expect } from "vitest";
import { siteConfig } from "../../src/site.config";

describe("site.config", () => {
  it("exports siteConfig with avatar, bio, author as non-empty strings", () => {
    expect(typeof siteConfig.avatar).toBe("string");
    expect(siteConfig.avatar.length).toBeGreaterThan(0);
    expect(typeof siteConfig.bio).toBe("string");
    expect(siteConfig.bio.length).toBeGreaterThan(0);
    expect(typeof siteConfig.author).toBe("string");
    expect(siteConfig.author.length).toBeGreaterThan(0);
  });

  it("exports socialLinks as an array with name, url, icon fields", () => {
    expect(Array.isArray(siteConfig.socialLinks)).toBe(true);
    expect(siteConfig.socialLinks.length).toBeGreaterThan(0);
    for (const link of siteConfig.socialLinks) {
      expect(typeof link.name).toBe("string");
      expect(link.name.length).toBeGreaterThan(0);
      expect(typeof link.url).toBe("string");
      expect(link.url.length).toBeGreaterThan(0);
      expect(typeof link.icon).toBe("string");
      expect(link.icon.length).toBeGreaterThan(0);
    }
  });
});
