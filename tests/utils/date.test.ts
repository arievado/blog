import { describe, it, expect } from "vitest";
import { formatDate } from "../../src/utils/date";

describe("formatDate", () => {
  it("returns YYYY-MM-DD format for a known date", () => {
    const result = formatDate(new Date("2026-05-10"));
    expect(result).toBe("2026-05-10");
  });

  it("zero-pads single-digit months and days", () => {
    const result = formatDate(new Date("2026-01-05"));
    expect(result).toBe("2026-01-05");
  });

  it("handles year/month/day boundaries correctly", () => {
    const result = formatDate(new Date("2025-12-31"));
    expect(result).toBe("2025-12-31");
  });
});
