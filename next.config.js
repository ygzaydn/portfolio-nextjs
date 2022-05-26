const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        outputStyle: "expanded",
    },
};

module.exports = nextConfig;
