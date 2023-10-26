import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#FAFAFA',
        'highlight': '#4B8DEE',
        'background': '#1E2124',
        'container': '#23262A'
      },
      boxShadow: {
        'small': '1px 1px 2px 1px rgba(0, 0, 0, 0.25)',
        'normal': '2px 2px 4px 2px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}
export default config
