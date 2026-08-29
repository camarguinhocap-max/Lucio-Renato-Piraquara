import { describe, expect, it } from "vitest";
import { assertPhotoSizeOk, PhotoTooLargeError } from "./photos-storage";

describe("assertPhotoSizeOk", () => {
  it("allows photos at or under the 5MB limit", () => {
    expect(() => assertPhotoSizeOk(5 * 1024 * 1024)).not.toThrow();
    expect(() => assertPhotoSizeOk(100)).not.toThrow();
  });

  it("rejects photos over the 5MB limit", () => {
    expect(() => assertPhotoSizeOk(5 * 1024 * 1024 + 1)).toThrow(PhotoTooLargeError);
  });
});
