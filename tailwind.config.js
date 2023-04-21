module.exports = {
  mode: 'jit',
  purge: [
    './react-app/src/**/*.html',
    './react-app/src/**/*.js',
    './react-app/src/**/*.jsx',
    './react-app/src/**/*.ts',
    './react-app/src/**/*.tsx',
    './react-app/public/index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F2F9F9',
          200: '#D8EFF1',
          300: '#BEE5E9',
          400: '#8DCFD9',
          500: '#5CBBCC',
          600: '#53AAB5',
          700: '#377476',
          800: '#2A5656',
          900: '#1D3A3A',
        },
        secondary: {
          100: '#F9F9F9',
          200: '#F2F2F2',
          300: '#E6E6E6',
          400: '#BFBFBF',
          500: '#999999',
          600: '#8C8C8C',
          700: '#5E5E5E',
          800: '#474747',
          900: '#303030',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
