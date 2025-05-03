import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    loader: "custom",
    loaderFile: './ImageLoader.tsx'
  },
  // images: { unoptimized: true } // works on both local and server
};

export default nextConfig;