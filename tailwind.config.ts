import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      roboto: ['"Roboto", sans-serif'],
      montserrat: ['"Montserrat", sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EE6C0E",
        },
      },
      backgroundImage: {
        "heading-bg": "url(/images/bg/inner-background.jpg)",
        "footer-bg": "url(/images/bg/footer-bg.jpg)",
        "subscribe-bg": "url(/images/bg/subscribe-bg.jpg)",
        "review-bg": "url(/images/bg/review-bg.jpg)",
        "map-image": "url(/images/bg/map.png)",
        "hero-bg": "url(/images/bg/hero-bg.jpg)",
      },
      screens: {
        sm: "576px", // Small - ≥576px
        md: "768px", // Medium - ≥768px
        lg: "992px", // Large - ≥992px
        xl: "1200px", // X-Large - ≥1200px
        xxl: "1400px", // XX-Large - ≥1400px
      },
      container: {
        screens: {
          sm: "540px", // Bootstrap's container-sm max-width
          md: "720px", // Bootstrap's container-md max-width
          lg: "960px", // Bootstrap's container-lg max-width
          xl: "1140px", // Bootstrap's container-xl max-width
          xxl: "1320px",
        },
      },
      boxShadow: {
        custom: "3.346px 3.716px 22.5px rgba(0, 0, 0, 0.07)",
        "custom-2": "0 0 35px rgba(0, 0, 0, 0.08)",
      },
      dropShadow: {
        custom: "-4.33px 2.5px 22.5px rgba(0, 0, 0, 0.1)",
        "custom-2": "5px 5px 12px rgba(255, 92, 65, 0.2)",
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        'bezier': 'cubic-bezier(0.42, 0, 0.58, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
