
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom WealthVeda colors
        "wealthveda-indigo": "hsl(var(--wealthveda-indigo))",
        "wealthveda-teal": "hsl(var(--wealthveda-teal))",
        "wealthveda-saffron": "hsl(var(--wealthveda-saffron))",
        // Brand colors directly available
        "royal-blue": "#1A73E8",
        "saffron-orange": "#FFA726",
        "ivory-white": "#FDF6EC",
        "mint-green": "#B2DFDB",
        "teal": "#009688",
        "charcoal": "#2D2D2D",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "mandala-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "mandala-spin": "mandala-spin 30s linear infinite",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FFA726, #FF7043)',
        'gradient-cool': 'linear-gradient(135deg, #1A73E8, #009688)',
        'gradient-light': 'linear-gradient(135deg, #FDF6EC, #FFFFFF)',
        'festive-diwali': 'url("/images/diwali-pattern.png")',
        'festive-holi': 'url("/images/holi-pattern.png")',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
