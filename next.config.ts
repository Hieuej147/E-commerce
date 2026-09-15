import type { NextConfig } from "next";

const customStorageUrl =
  process.env.STORAGE_PUBLIC_URL || process.env.NEXT_PUBLIC_STORAGE_URL;
let customStorageHost: string | null = null;
if (customStorageUrl) {
  try {
    customStorageHost = new URL(customStorageUrl).hostname;
  } catch {}
}

const rawBackendUrl = (
  process.env.BACKEND_API_URL || "http://api-gateway:3000"
).replace(/\/+$/, "");
const backendOrigin = rawBackendUrl.replace(/\/v1\/?$/, "");
const backendApiV1 = `${backendOrigin}/v1`;

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["three"],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "api.hieudev.click",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      ...(customStorageHost
        ? [{ protocol: "https", hostname: customStorageHost } as const]
        : []),
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendApiV1}/:path*`,
      },
      {
        source: "/v1/media/:path*",
        destination: `${backendApiV1}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
