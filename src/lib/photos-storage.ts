const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB

export class PhotoTooLargeError extends Error {
  constructor(byteLength: number) {
    super(`Photo is ${byteLength} bytes, over the ${MAX_PHOTO_BYTES} byte limit`);
    this.name = "PhotoTooLargeError";
  }
}

export function assertPhotoSizeOk(byteLength: number): void {
  if (byteLength > MAX_PHOTO_BYTES) {
    throw new PhotoTooLargeError(byteLength);
  }
}

export async function uploadPhoto(namespace: KVNamespace, bytes: ArrayBuffer, contentType: string): Promise<string> {
  assertPhotoSizeOk(bytes.byteLength);
  const key = `${crypto.randomUUID()}.jpg`;
  await namespace.put(key, bytes, { metadata: { contentType } });
  return `/fotos/${key}`;
}

export async function deletePhoto(namespace: KVNamespace, fotoUrl: string): Promise<void> {
  const key = fotoUrl.replace(/^\/fotos\//, "");
  await namespace.delete(key);
}
