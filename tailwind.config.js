module.exports = {
  content: ["./node_modules/flyonui/dist/js/*.js", "./frontend/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("flyonui"), require("flyonui/plugin")],
  flyonui: {
    vendors: true,
  },
};
