


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         inter: ["Inter", "sans-serif"], // Add Inter font
//       },
//       fontSize: {
//         '14px': '14px', // Custom font size
//       },
//       fontWeight: {
//         '500': '500', // Custom font weight
//       },
//       lineHeight: {
//         '21px': '21px', // Custom line height
//       },
//     },
//   },
  
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Add Inter font
      },
      fontSize: {
        '14px': '14px', // Custom font size
      },
      fontWeight: {
        '500': '500', // Custom font weight
      },
      lineHeight: {
        '21px': '21px', // Custom line height
      },
    },
  },
  screens: {
    'sm': '414px',
    'md': '768px',
    'lg': '1439px' // <-- Missing 'px' here caused the issue
  },
  plugins: [],
};