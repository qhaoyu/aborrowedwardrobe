import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Enables Cloudflare bindings (env vars, KV, R2, etc.) inside `next dev`.
// No-op in production — the actual Worker is built separately via
// `npm run cf:build` / `npm run cf:deploy`.
initOpenNextCloudflareForDev();
