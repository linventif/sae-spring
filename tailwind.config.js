const { addDynamicIconSelectors } = require("@iconify/tailwind");
module.exports = {
  /*

    <script src="/node_modules/lodash/lodash.js"></script>
    <script src="/node_modules/dropzone/dist/dropzone-min.js"></script>
    <script src="/node_modules/flyonui/flyonui.js"></script>
    <script src="/node_modules/fullcalendar/index.global.js"></script>
    <script src="/node_modules/flatpickr/dist/flatpickr.js"></script>
   */
  content: [
    "./node_modules/flyonui/dist/js/*.js",
    "./node_modules/flatpickr/dist/*.js",
    "./node_modules/fullcalendar/dist/*.js",
    "./node_modules/dropzone/dist/*.js",
    "./node_modules/lodash/*.js",
    "./frontend/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("flyonui"), require("flyonui/plugin"), addDynamicIconSelectors()],
  flyonui: {
    vendors: true,
  },
};
