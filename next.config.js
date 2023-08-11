const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        outputStyle: "expanded",
    },

    rewrites: async () => {
        return [
            {
                source: "/cv",
                destination: "/cv.html",
            },
        ];
    },
};

module.exports = nextConfig;
