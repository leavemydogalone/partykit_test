/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/boxgame",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
