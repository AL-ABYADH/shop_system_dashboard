/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{edge,js,ts,vue,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary': 'rgba(89, 152, 115, 1)',
        'primary-opacity': 'rgba(89, 152, 115, 0.2)',
        'primary-opacity2': 'rgba(89, 152, 115, 0.6)',
        'primary-transparent': 'rgba(16, 94, 177, 0.5)',
        'secondary-first': 'rgba(81, 143, 234, 1)',
        'secondary-second': 'rgba(186, 134, 32, 1)',
        'success': 'rgba(0, 109, 62, 1)',
        'error': 'rgba(155, 55, 77, 1)',
        'background': 'rgba(248, 250, 255, 1)',
        'field-fill': 'rgba(245, 245, 255, 1)',
        'display-text': 'rgba(27, 39, 51, 1)',
        'field-label': 'rgba(128, 128, 128, 1)', 
      },
      linearGradientColors: {
        'horizontal': ['rgba(26, 112, 176, 0.2)', 'rgba(26, 112, 176, 0.8)'],
        'vertical': ['rgba(26, 112, 176, 0.2)', 'rgba(26, 112, 176, 0.8)'],
      },
      fontFamily: {
        'alexandria': ['Alexandria', 'sans'],
        'almarai': ['Almarai'],
      },
      fontSize: {
        'small': '8px',
        'medium': '13px',
        'large': '16px',
      },
    },
  },
  plugins: [
  ],
}
