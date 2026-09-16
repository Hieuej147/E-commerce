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

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com https://static.cloudflareinsights.com https://js.stripe.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https: wss:;
  frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com https://js.stripe.com https://hooks.stripe.com;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
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
