/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                md: '860px',
            },
            colors: {
                primary: {
                    light: '#209EBC',
                    dark: '#023047',
                },
                accent: {
                    green: '#80C6B5',
                    teal: '#76E5CF',
                    sky: '#8ECAE6',
                },
            },
            gridTemplateRows: {
                mobile: '200px auto 100px',
                desktop: '200px minmax(560px, calc(100vh - 100px - 200px)) 100px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            zIndex: {
                img: '-1',
                back: '-2',
            },
        },
    },
    plugins: [],
}
