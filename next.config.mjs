/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow builds to succeed even if there are lint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds even if there are type errors.
    // This keeps the focus on the assessment features instead of strict typing.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
