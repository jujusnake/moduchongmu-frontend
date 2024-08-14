/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontSize: {
      '2xs': ['0.625rem', '125%'], // 10px
      xs: ['0.688rem', '125%'], // 11px
      sm: ['0.75rem', '125%'], // 12px
      base: ['0.875rem', '125%'], // 14px
      lg: ['1rem', '125%'], // 16px
      xl: ['1.125rem', '125%'], // 18px
      '2xl': ['1.25rem', '125%'], // 20px
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      height: {
        vvh: 'var(--vvh, 100vh)',
      },
      minHeight: {
        vvh: 'var(--vvh, 100vh)',
      },
      maxWidth: {
        moduchongmu: '500px',
        'moduchongmu-padding': '452px',
      },
      colors: {
        text: {
          primary: '#292929',
          secondary: '#535353',
          tertiary: '#7B7B7B',
          aside: '#999999',
          disabled: '#E0E0E0',
          placeholder: '#D0D0D0',
          contrast: '#ffffff',
        },
        brand: {
          primary: {
            bg: '#F8FBFF',
            lighter: '#C0DEFC',
            light: '#74B5F8',
            main: '#5CA8F5',
            dark: '#4475D2',
            darker: '#36459F',
            contrastText: '#FFFFFF',
          },
        },
        functional: {
          success: {
            bg: '#F5FBF4',
            lighter: '#C1E5BC',
            light: '#6BC461',
            main: '#00AB00',
            dark: '#008B00',
            darker: '#005B00',
            contrastText: '#000000',
          },
          warning: {
            bg: '#FEF9F2',
            lighter: '#FBDBB1',
            light: '#F7C47F',
            main: '#F4AC4D',
            dark: '#EF8A0B',
            darker: '#E56F0B',
            contrastText: '#000000',
          },
          error: {
            bg: '#FFF6F8',
            lighter: '#FEC8CF',
            light: '#E3666B',
            main: '#F0212A',
            dark: '#D00024',
            darker: '#B40011',
            contrastText: '#FFFFFF',
          },
        },
        border: {
          light: '#E0E0E0',
          main: '#C0C0C0',
          dark: '#ADADAD',
        },
        bg: {
          base: '#F9F9F9',
          back: '#FFFFFF',
          front: '#F3F3F3',
        },
        card: {
          main: '#F8FBFF',
          mono: '#F0F0F0',
        },
        element: {
          disabled: '#BABABA',
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    ({ addUtilities }) => {
      addUtilities({
        '.absolute-center': {
          '@apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': '',
        },
        '.text-ellipsis-oneline': {
          '@apply overflow-hidden whitespace-nowrap text-ellipsis': '',
        },
      });
    },
  ],
};
