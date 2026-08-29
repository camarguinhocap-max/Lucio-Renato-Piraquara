import { describe, expect, it } from "vitest";
import { isAuthorized, parseAuthorizedIds } from "./telegram-auth";

describe("parseAuthorizedIds", () => {
  it("parses a comma-separated list of ids", () => {
    expect(parseAuthorizedIds("111, 222,333")).toEqual(new Set([111, 222, 333]));
  });

  it("ignores blank entries", () => {
    expect(parseAuthorizedIds("111,,  ,222")).toEqual(new Set([111, 222]));
  });

  it("ignores non-numeric entries", () => {
    expect(parseAuthorizedIds("111,abc,222")).toEqual(new Set([111, 222]));
  });

  it("returns an empty set for an empty string", () => {
    expect(parseAuthorizedIds("")).toEqual(new Set());
  });
});

describe("isAuthorized", () => {
  it("returns true for an id in the list", () => {
    expect(isAuthorized("111,222", 222)).toBe(true);
  });

  it("returns false for an id not in the list", () => {
    expect(isAuthorized("111,222", 333)).toBe(false);
  });
});
