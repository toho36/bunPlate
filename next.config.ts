import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features
  experimental: {
    // Optimize server components
    serverComponentsExternalPackages: ["@prisma/client"],
    // Enable ppr for better performance
    ppr: true,
    // Enable turbo mode
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Environment variables for static optimization
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === "true" && {
    async rewrites() {
      return [
        {
          source: "/analyze",
          destination: "/api/analyze",
        },
      ];
    },
  }),

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle in production
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      };
    }

    return config;
  },

  // TypeScript configuration
  typescript: {
    // Type checking is handled by separate process
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Output configuration for Vercel
  output: "standalone",

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;