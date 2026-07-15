/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Canonical host is the apex domain. Without this, www serves the same
      // content with a 200 and GSC reports every page as a duplicate.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nuansatranslator.com" }],
        destination: "https://nuansatranslator.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
