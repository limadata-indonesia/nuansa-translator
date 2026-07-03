/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/sitemap.xml", destination: "/sitemap_index.xml", permanent: true },
    ];
  },
};

export default nextConfig;
