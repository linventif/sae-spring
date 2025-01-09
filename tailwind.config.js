const { addDynamicIconSelectors } = require("@iconify/tailwind");
module.exports = {
  content: ["./node_modules/flyonui/dist/js/*.js", "./node_modules/flatpickr/dist/flatpickr.js", "./frontend/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("flyonui"), require("flyonui/plugin"), addDynamicIconSelectors()],
  flyonui: {
    vendors: true,
  },
};
