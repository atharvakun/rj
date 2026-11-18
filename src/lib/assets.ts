/**
 * Prefix a `public/` path with the deployment base path.
 *
 * `next/image` does not add `basePath` to `src` on its own (see the Next docs
 * on `basePath`), so files under `public/` must be referenced through this
 * helper to resolve on a project Pages site such as /rj.
 */
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export const asset = (path: string) => `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
