const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        outputStyle: "expanded",
    },
    webpack: (config, options) => {
        config.optimization.minimizer.push(
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            "imagemin-gifsicle",
                            "imagemin-mozjpeg",
                            "imagemin-pngquant",
                            "imagemin-svgo",
                        ],
                    },
                },
                generator: [
                    {
                        // You can apply generator using `?as=webp`, you can use any name and provide more options
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ["imagemin-webp"],
                        },
                    },
                ],
            })
        );

        return config;
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
