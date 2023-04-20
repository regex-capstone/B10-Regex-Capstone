/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    content: [
        "./pages/p/analytics.{js,jsx,ts,tsx}",
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"
    ],
    important: '#__next',
    theme: {
        extend: {},
    },
    plugins: [],
}