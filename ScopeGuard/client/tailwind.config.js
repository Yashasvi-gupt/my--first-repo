export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f5f7fa',
        panel: '#ffffff',
        primary: '#064e68',
        accent: '#0f9ea7',
        warning: '#d97706',
        danger: '#9b1c1c',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 28, 37, 0.08)',
      },
    },
  },
  plugins: [],
};
