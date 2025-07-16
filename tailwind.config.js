/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#EAEEF1",
        primary: {
          10: "#FFEFE3",
          20: "#FFB983",
          30: "#FF770F",
        },

        kakao: "#FEE500",
        white: "#FFFFFF",
        grey: {
          10: "#FAFAFA",
          20: "#F7F7F7",
          30: "#EEEEEE",
          40: "#E4E4E4",
          50: "#DADADA",
          60: "#BEBEBE",
          70: "#999999",
          80: "#666666",
          90: "#333333",
          100: "#222222",
        },

        type: {
          pink: "#FF7E8F",
          purple: "#AD7EFF",
          blue: "#00C0EB",
          green: "#35D12A",
        },
      },
    },
  },
  plugins: [],
};
