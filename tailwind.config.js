/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,scss}"],
  theme: {
    extend: {
      colors: {
        "code-color": "#1f1f1f",
        sushi: "#8CC63F",
        "green-haze": "#009245",
      },
      animation: {
        spinY: "spinY 8s linear infinite",
        bgScrolling: "bgScrolling 2s linear infinite",
      },
      keyframes: {
        flip: {
          "0%, 100%": { transform: "rotateY(0)" },
          "49%": { transform: "rotateY(90deg)" },
          "50%": { transform: "rotateY(-90deg)" },
        },
        spinY: {
          "0%": { transform: "rotateY(0)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        bgScrolling: {
          "0%": { "background-position": "50px 50px" },
          "100%": { "background-position": "0px 0px" },
        },
        animStar: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-5000px)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "light",
  },
};
