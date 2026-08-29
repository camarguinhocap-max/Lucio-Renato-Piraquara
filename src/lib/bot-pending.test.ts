import { describe, expect, it } from "vitest";
import { computeExpiry, isExpired } from "./bot-pending";

describe("computeExpiry / isExpired", () => {
  it("computes an expiry ten minutes in the future by default", () => {
    const now = 1_000_000;
    expect(computeExpiry(now)).toBe(now + 10 * 60 * 1000);
  });

  it("honors a custom TTL", () => {
    expect(computeExpiry(1000, 5000)).toBe(6000);
  });

  it("is not expired before the expiry timestamp", () => {
    expect(isExpired(2000, 1999)).toBe(false);
  });

  it("is expired at or after the expiry timestamp", () => {
    expect(isExpired(2000, 2000)).toBe(true);
    expect(isExpired(2000, 2001)).toBe(true);
  });
});
