import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["pbs.twimg.com"], // Add the domain here
  },
};

export default nextConfig;
