import { describe, expect, it } from "vitest";
import { getCloudflareEnv, getCloudflareEnvOrNull, runWithCloudflareEnv } from "./cf-env";

describe("cf-env", () => {
  it("getCloudflareEnvOrNull returns null outside of a request context", () => {
    expect(getCloudflareEnvOrNull()).toBeNull();
  });

  it("getCloudflareEnv throws outside of a request context", () => {
    expect(() => getCloudflareEnv()).toThrow("Cloudflare bindings not available");
  });

  it("makes the env available inside runWithCloudflareEnv, even across awaits", async () => {
    const fakeEnv = { DB: "fake" } as never;
    await runWithCloudflareEnv(fakeEnv, async () => {
      await Promise.resolve();
      expect(getCloudflareEnv()).toBe(fakeEnv);
    });
  });

  it("isolates env between two concurrent calls", async () => {
    const envA = { DB: "a" } as never;
    const envB = { DB: "b" } as never;
    let seenA: unknown;
    let seenB: unknown;

    await Promise.all([
      runWithCloudflareEnv(envA, async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        seenA = getCloudflareEnv();
      }),
      runWithCloudflareEnv(envB, async () => {
        seenB = getCloudflareEnv();
      }),
    ]);

    expect(seenA).toBe(envA);
    expect(seenB).toBe(envB);
  });
});
