export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brutal': {
          'bg': '#F5F1E8',
          'text': '#1A1A1A',
          'accent': '#E85D4E',
          'accent2': '#4A90A4',
          'accent3': '#F4A261',
          'accent4': '#2A9D8F',
          'dark': '#1A1A1A',
        }
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #1A1A1A',
        'brutal-hover': '6px 6px 0px 0px #1A1A1A',
        'brutal-active': '2px 2px 0px 0px #1A1A1A',
      }
    },
  },
  plugins: [],
}
