export interface CloudflareEnvStorage {
  run<T>(env: Env, fn: () => T | Promise<T>): T | Promise<T>;
  getStore(): Env | undefined;
}

let storageImpl: CloudflareEnvStorage | null = null;

export function setCloudflareEnvStorage(impl: CloudflareEnvStorage): void {
  storageImpl = impl;
}

export function runWithCloudflareEnv<T>(env: Env, fn: () => T | Promise<T>): T | Promise<T> {
  if (!storageImpl) {
    return fn();
  }
  return storageImpl.run(env, fn);
}

export function getCloudflareEnvOrNull(): Env | null {
  return storageImpl?.getStore() ?? null;
}

export function getCloudflareEnv(): Env {
  const env = storageImpl?.getStore();
  if (!env) {
    throw new Error("Cloudflare bindings not available outside of a request");
  }
  return env;
}
