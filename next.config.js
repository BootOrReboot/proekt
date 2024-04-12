/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  i18n: {
    locales: ["mk", "al"],
    defaultLocale: "mk",
  },
  ...nextConfig,
};
