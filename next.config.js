/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache.js');

const config = {
  reactStrictMode: true,
}

const nextConfig = require('next-pwa')({
  dest: 'public',
  register: true,
  runtimeCaching,
})(config);


module.exports = nextConfig 
