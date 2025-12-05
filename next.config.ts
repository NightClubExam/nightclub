import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/file-bucket/**",
      },
    ],
  },
  /* Hvis intet virker prøv at ændre filformat til simpelshop */
};

export default nextConfig;
