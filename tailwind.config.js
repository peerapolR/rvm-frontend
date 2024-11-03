import { nextui } from "@nextui-org/theme";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,jsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "revomed-primary": "#004D7D",
        "revomed-primary-dark": "#0A2B40",
        "revomed-primary-light1": "#64A3CB",
        "revomed-primary-light2": "#CDECFF",
        "revomed-primary-light3": "#EDF6FF",
        "revomed-primary-blue": "#006EB3",

        "revomed-secondary": "#DC818D",
        "revomed-secondary-dark": "#BA5865",
        "revomed-secondary-light1": "#FDAEB8",
        "revomed-secondary-light2": "#FFECEE",
        "revomed-secondary-light3": "#fce5e7",

        "revomed-black": "#14142A",
        "revomed-white": "#FCFCFC",
        "revomed-grey": "#6F7489",
        "revomed-red": "#F74E3B",
        "revomed-aqua": "#1796A7",
        "revomed-blue": "#47A6FF",
        "revomed-yellow": "#FFBF12",
        "revomed-green": "#22AD49",

        "revomed-dark-grey": "#545867",
        "revomed-light-grey1": "#ABB1C1",
        "revomed-light-grey2": "#E0E3EB",
        "revomed-light-grey3": "#EFF1F7",
        "revomed-light-grey4": "#F3F5FB",
        "revomed-light-red": "#FFDAD6",
      },
      fontFamily: {
        sans: [
          "LINESeedSans",
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32',
          },
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {
            hoverOpacity: 1,
          },
        },
        dark: {
          layout: {
            hoverOpacity: 0.9,
          },
        },
      },
    }),
  ],
};
export default config;
