module.exports = {
  content: ["./node_modules/flyonui/dist/js/*.js", "./frontend/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("flyonui"), require("flyonui/plugin")],
  flyonui: {
    themes: [
      {
        dark: {
          ...require("flyonui/src/theming/themes")["dark"],
          primary: "#3A3E49",
          "primary-content": "#fff",
          secondary: "#2c2f3b",
          "secondary-content": "#fff",
          accent: "#CC913E",
          accent3: "#63697b",
          "accent-content": "#fff",
          neutral: "#3A3E49",
          "neutral-content": "#fff",
          "base-100": "#292C36",
          "base-200": "#3A3E49",
          "base-300": "#3A3E49",
          "base-content": "#b3b3b3",
          info: "#43c5d6",
          "info-content": "#3A3E49",
          success: "#4E9735",
          "success-content": "#3A3E49",
          warning: "#CC913E",
          "warning-content": "#3A3E49",
          error: "#C93B3B",
          "error-content": "#3A3E49",
        },
      },
    ],
  },
};
