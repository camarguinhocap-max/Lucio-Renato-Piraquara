import { AsyncLocalStorage } from "node:async_hooks";

const storage = new AsyncLocalStorage<Env>();

export function runWithCloudflareEnv<T>(env: Env, fn: () => T | Promise<T>): T | Promise<T> {
  return storage.run(env, fn);
}

export function getCloudflareEnvOrNull(): Env | null {
  return storage.getStore() ?? null;
}

export function getCloudflareEnv(): Env {
  const env = storage.getStore();
  if (!env) {
    throw new Error("Cloudflare bindings not available outside of a request");
  }
  return env;
}
