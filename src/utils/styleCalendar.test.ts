import { describe, it, expect } from "vitest";
import { getVolatilityColor } from "./styleCalendar";

describe("getVolatilityColor", () => {
  it("should return emerald for low volatility", () => {
    expect(getVolatilityColor(1.0)).toBe("bg-emerald-400 hover:bg-emerald-500");
    expect(getVolatilityColor(1.49)).toBe(
      "bg-emerald-400 hover:bg-emerald-500"
    );
  });

  it("should return amber for medium volatility", () => {
    expect(getVolatilityColor(1.5)).toBe("bg-amber-400 hover:bg-amber-500");
    expect(getVolatilityColor(2.49)).toBe("bg-amber-400 hover:bg-amber-500");
  });

  it("should return red for high volatility", () => {
    expect(getVolatilityColor(2.5)).toBe("bg-red-400 hover:bg-red-500");
    expect(getVolatilityColor(5.0)).toBe("bg-red-400 hover:bg-red-500");
  });
});
