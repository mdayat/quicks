/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      inherit: "inherit",
      primary: {
        1: "#2F80ED",
        2: "#4F4F4F",
        3: "#828282",
        4: "#E0E0E0",
      },
      indicator: {
        1: "#F8B76B",
        2: "#8785FF",
        3: "#EB5757",
        4: "#F2C94C",
      },
      chats: {
        1: "#FCEED3",
        "1-top": "#E5A443",
        2: "#EEDCFF",
        "2-top": "#9B51E0",
        3: "#D2F2EA",
        "3-top": "#43B78D",
      },
      stickers: {
        1: "#39F3FF",
        2: "#FDCFA4",
        3: "#F9E9C3",
        4: "#AFEBDB",
        5: "#CBF1C2",
        6: "#CFCEF9",
        7: "#F9E0FD",
      },
    },
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      animation: {
        rotation: "rotation 1s linear infinite",
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
