/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: { max: "767px" },
            md: { min: "768px", max: "1023px" },
            lg: { min: "1024px", max: "1279px" },
            xl: { min: "1280px", max: "1535px" },
            "2xl": { min: "1536px" },
        },
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
