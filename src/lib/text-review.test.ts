import { describe, expect, it, vi } from "vitest";
import { reviewText, textsDiffer } from "./text-review";

describe("textsDiffer", () => {
  it("treats whitespace-only differences as equal", () => {
    expect(textsDiffer("um texto  aqui", "um texto aqui")).toBe(false);
  });

  it("detects real content differences", () => {
    expect(textsDiffer("um texto aqui", "outro texto aqui")).toBe(true);
  });
});

describe("reviewText", () => {
  it("returns the corrected text on success", async () => {
    const fakeAi = { run: vi.fn().mockResolvedValue({ response: "Texto corrigido." }) } as unknown as Ai;
    expect(await reviewText(fakeAi, "texto com erro")).toBe("Texto corrigido.");
  });

  it("falls back to the original text when the AI call throws", async () => {
    const fakeAi = { run: vi.fn().mockRejectedValue(new Error("boom")) } as unknown as Ai;
    expect(await reviewText(fakeAi, "texto original")).toBe("texto original");
  });

  it("falls back to the original text when the response has no usable text", async () => {
    const fakeAi = { run: vi.fn().mockResolvedValue({}) } as unknown as Ai;
    expect(await reviewText(fakeAi, "texto original")).toBe("texto original");
  });
});
