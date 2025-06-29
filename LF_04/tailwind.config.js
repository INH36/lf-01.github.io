/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        header: '54px'
        
      },
      width: {
        sider: '220px',
        siderCollapsed: '64px',
      },
      colors: {
        main: '#f7fafc'
      },
      padding: {
        aside: '220px',
        asideCollapsed: '64px',
      },
      boxShadow: {
        aside: '0 0 rgb(0 0 0 / 0), 0 0 rgb(0 0 0 / 0), 2px 0 8px 0 rgb(29, 35, 41, 0.05)',
        header: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0), 0 1px 2px rgb(0, 21, 41, 0.08)'
      }
    },
  },
  plugins: [],
};
