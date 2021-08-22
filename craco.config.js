// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};

// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
