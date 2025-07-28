import { describe, it, expect } from "vitest";
import { formatNumber } from "./numberFormatter";

describe("formatNumber", () => {
  it("should return the number as a string for numbers less than 1000", () => {
    expect(formatNumber(999)).toBe("999");
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(123)).toBe("123");
  });

  it("should format numbers in the thousands with a 'K'", () => {
    expect(formatNumber(1000)).toBe("1.0K");
    expect(formatNumber(1550)).toBe("1.6K");
    expect(formatNumber(123456)).toBe("123.5K");
    expect(formatNumber(999999)).toBe("1000.0K");
  });

  it("should format numbers in the millions with an 'M'", () => {
    expect(formatNumber(1000000)).toBe("1.00M");
    expect(formatNumber(1550000)).toBe("1.55M");
    expect(formatNumber(123456789)).toBe("123.46M");
  });

  it("should handle edge cases correctly based on its logic", () => {
    expect(formatNumber(999.9)).toBe("999.9");

    expect(formatNumber(1499)).toBe("1.5K");

    expect(formatNumber(999999.9)).toBe("1000.0K");
  });
});
