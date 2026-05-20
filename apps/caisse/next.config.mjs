/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@weza/ui", "@weza/api-client", "@weza/types", "@weza/design-tokens"],
};

export default nextConfig;
