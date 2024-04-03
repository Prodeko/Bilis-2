import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          25: 'rgb(241 244 248 / 100%)',
          50: 'rgb(229 234 240 / 100%)',
          100: 'rgb(189 201 218 / 100%)',
          200: 'rgb(189 201 218 / 100%)',
          300: 'rgb(106 133 168 / 100%)',
          400: 'rgb(72 107 151 / 100%)',
          500: 'rgb(31 83 137 / 100%)',
          600: 'rgb(23 76 128 / 100%)',
          700: 'rgb(10 66 117 / 100%)',
          800: 'rgb(3 57 105 / 100%)',
          900: 'rgb(0 41 81 / 100%)',
        },
        neutral: colors.slate,
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.red,
      },
      keyframes: {
        'push-in-right': {
          '0%': { right: '0%' },
          '50%': { right: '-100%' },
          '100%': { right: '0%' },
        },
      },
      animation: {
        'push-in-right': 'push-in-right 2s 1',
      },
      backgroundImage: {
        handshake: "url('/images/handshake.png')",
      },
      plugins: [
        tailwindScrollbar({preferredStrategy: "pseudoelements", nocompatible: true})]
      ,
    },
  },
} satisfies Config;
