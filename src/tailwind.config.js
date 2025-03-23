/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
    "./src/**/*.{html,js,jsx}", 
    ],
    theme: {
    extend: {
        colors: {
            'custom-light': white, // Custom light mode background color
            'custom-dark': '#2B273F',  // Custom dark mode background color
        },
    },
    },
    plugins: [],
};
