import { describe, it, expect } from "vitest";
import { SITE_AVATAR, SITE_BIO, SITE_AUTHOR, SITE_SOCIAL_LINKS } from "../../src/utils/constants";
import { siteConfig } from "../../src/site.config";

describe("constants", () => {
  it("exports SITE_AVATAR as a non-empty string", () => {
    expect(typeof SITE_AVATAR).toBe("string");
    expect(SITE_AVATAR.length).toBeGreaterThan(0);
  });

  it("exports SITE_BIO as a non-empty string", () => {
    expect(typeof SITE_BIO).toBe("string");
    expect(SITE_BIO.length).toBeGreaterThan(0);
  });

  it("SITE_AVATAR reads from siteConfig.avatar", () => {
    expect(SITE_AVATAR).toBe(siteConfig.avatar);
  });

  it("SITE_BIO reads from siteConfig.bio", () => {
    expect(SITE_BIO).toBe(siteConfig.bio);
  });

  it("SITE_AUTHOR reads from siteConfig.author", () => {
    expect(SITE_AUTHOR).toBe(siteConfig.author);
  });

  it("exports SITE_SOCIAL_LINKS matching siteConfig.socialLinks", () => {
    expect(Array.isArray(SITE_SOCIAL_LINKS)).toBe(true);
    expect(SITE_SOCIAL_LINKS).toEqual(siteConfig.socialLinks);
  });
});
