/** @type {import('tailwindcss').Config} */
export default {
    screens: {
        xsm: '375px',
        sm: '540px',
        md: '991px',
        lg: '1199px',
        xxl: '1360px',
    },
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,css,scss}",
    ],
    theme: {
        extend: {
            fontFamily: {
                robotoMono: ['Roboto Mono', 'monospace'],
            },
            colors: {
                'primary': '#B3BCBB', 
                'secondary': '#99BCC0',
                'tertiary': '#C36868',
                'black': '#000000',
                'white': '#FFFFFF',
            },
            fontSize: {
                'sm': ['1rem', {lineHeight: 'normal', fontWeight: '400'}],
                'md': ['1.5rem', {lineHeight: 'normal', fontWeight: '500'}],
                'lg': ['2rem', {lineHeight: 'normal', fontWeight: '500'}],
                'xl': ['5.625rem', {lineHeight: '92.9%', fontWeight: '700'}]
            },
            borderRadius: {
                DEFAULT: '1.25rem',
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    DEFAULT: '100%', // For mobile
                    xsm: '100%',
                    sm: '540px',
                    md: '991px',
                    lg: '1199px',
                    xxl: '1360px',
                },
            }
        },
    },
    plugins: [],
}
