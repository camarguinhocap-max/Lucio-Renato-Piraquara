// Guard against importing Node.js APIs in browser
let storage: any = null;

function getStorage() {
  if (storage === null && typeof globalThis !== "undefined") {
    // Try to initialize AsyncLocalStorage only in Node.js
    try {
      if (typeof require !== "undefined") {
        const { AsyncLocalStorage } = require("node:async_hooks");
        storage = new AsyncLocalStorage<Env>();
      } else {
        storage = false; // Mark as unavailable
      }
    } catch (_e) {
      storage = false; // Mark as unavailable
    }
  }
  return storage || null;
}

export function runWithCloudflareEnv<T>(env: Env, fn: () => T | Promise<T>): T | Promise<T> {
  const s = getStorage();
  if (!s) {
    return fn();
  }
  return s.run(env, fn);
}

export function getCloudflareEnvOrNull(): Env | null {
  const s = getStorage();
  if (!s) {
    return null;
  }
  return s.getStore() ?? null;
}

export function getCloudflareEnv(): Env {
  const s = getStorage();
  if (!s) {
    throw new Error("Cloudflare bindings not available in browser environment");
  }
  const env = s.getStore();
  if (!env) {
    throw new Error("Cloudflare bindings not available outside of a request");
  }
  return env;
}
