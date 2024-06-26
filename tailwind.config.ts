import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'text': '#FAFAFA',
        'text-alt': '#0F1214',
        'tone-down': '#AEB3C2',
        'highlight': '#4687E9',
        'background': '#181A20',
        'container': '#1B1E24',
        'container-alt': '#272C35',
        'error': '#FF3434'
      },
      boxShadow: {
        'small': '1px 1px 2px 1px rgba(0, 0, 0, 0.25)',
        'normal': '2px 2px 4px 2px rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        'chess-icons': ['chess-icons'],
        'montserrat-alt': ['montserrat-alt']
      },
      backgroundImage: {
        'marble-tile': "url('/images/marble-tile.png')"
      },
      dropShadow: {
        'small': '1px 1px 2px rgba(0, 0, 0, 0.25)',
        'normal': '2px 2px 4px rgba(0, 0, 0, 0.35)',
        'large': '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
