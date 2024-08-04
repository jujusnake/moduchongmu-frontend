/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.688rem', '125%'],
      sm: ['0.75rem', '125%'],
      base: ['0.875rem', '125%'],
      lg: ['1rem', '125%'],
      xl: ['1.125rem', '125%'],
    },
    extend: {
      colors: {
        text: {
          primary: '#292929',
          secondary: '#535353',
          tertiary: '#7B7B7B',
          aside: '#999999',
          disabled: '#E0E0E0',
          placeholder: '#D0D0D0',
        },
        brand: {
          primary: {
            bg: '#F8FBFF',
            lighter: '#C0DEFC',
            light: '#74B5F8',
            main: '#74B5F8',
            dark: '#4475D2',
            darker: '#36459F',
            contrastText: '#FFFFFF',
          },
        },
      },
    },
  },
  plugins: [],
};
