/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#188ABC',
        lightPrimary: '#32A9DD',
        grayBg: '#252525',
        avatarBg: '#D9D9D9',
        welcomeBg: '#0B0B0B',
        orange: '#F29C1F',
        light: '#C1C1C1',
        lightGray: '#9C9898',
        gray: '#3C3C3C',
        white: '#fff',
        welcomeHeadBg: '#1E1E1E',
        textGray: '#8D8EA0',
        welcomeText: '#909090',
        cardBg: '#2D2D2D',
        inputBg: '#2c2c2c',
        textColor: '#ADADAD',
        dialogBg: '#2D2D2D',
        mainBg: '#18181c',
        disabled: '#585858',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
