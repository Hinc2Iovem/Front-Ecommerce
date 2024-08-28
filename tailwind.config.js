/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        normal: "400",
        medium: "500",
        bold: "700",
      },
      colors: {
        primary: {
          ["marine-blue"]: "hsl(213, 96%, 18%)",
          ["purplish-blue"]: "hsl(243, 100%, 62%)",
          ["pastel-blue"]: "hsl(228, 100%, 84%)",
          ["light-blue"]: "hsl(206, 94%, 87%)",
          ["strawberry-red"]: " hsl(354, 84%, 57%)",
          ["pale-orange"]: "hsl(25, 100%, 94%)",
          orange: "hsl(26, 100%, 55%)",
        },
        neutral: {
          ["cool-gray"]: "hsl(231, 11%, 63%)",
          ["light-gray"]: "hsl(229, 24%, 87%)",
          ["very-dark-blue"]: "hsl(220, 13%, 13%)",
          ["dark-grayish-blue"]: "hsl(219, 9%, 45%)",
          ["grayish-blue"]: "hsl(220, 14%, 75%)",
          ["light-grayish-blue"]: "hsl(223, 64%, 98%)",
          ["bg-lightbox-black"]: "hsl(0, 0%, 0%)",
          magnolia: "hsl(217, 100%, 97%)",
          alabaster: " hsl(231, 100%, 99%)",
          white: "hsl(0, 0%, 100%)",
        },
      },
    },
  },
  plugins: [],
};
