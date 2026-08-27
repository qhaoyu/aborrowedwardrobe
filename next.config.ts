import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // No Cloudflare Images binding is configured in wrangler.jsonc, so the
    // OpenNext adapter's /_next/image route has nothing to optimize with —
    // every request still runs through the Worker (fetch + content-type
    // sniff) before streaming the original file back unchanged. With dozens
    // of distinct photos now rendered across the shop (print picker, prints
    // library, product galleries), that per-image Worker round trip is what
    // tipped a page over Cloudflare's resource limit. Skip the route
    // entirely: `next/image` falls back to the plain `src` URL, served
    // directly from the ASSETS binding like any other static file.
    unoptimized: true,
  },
};

export default nextConfig;

// Enables Cloudflare bindings (env vars, KV, R2, etc.) inside `next dev`.
// No-op in production — the actual Worker is built separately via
// `npm run cf:build` / `npm run cf:deploy`.
initOpenNextCloudflareForDev();
