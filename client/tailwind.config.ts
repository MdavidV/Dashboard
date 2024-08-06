import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";


const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

/**
 * @function generateThemeObject
 * @description Generates a theme object based on the provided colors and mapping.
 * @param {any} colors - An object containing color values.
 * @param {any} mapping - An object containing the mapping of color shades.
 * @param {boolean} [invert=false] - A flag to determine if the mapping should be inverted.
 * @returns {void} - This function does not return anything. It mutates the `theme` object directly.
 * 
 * @example
 * const colors = {
 *   primary: { light: '#abcdef', dark: '#123456' },
 *   secondary: { light: '#fedcba', dark: '#654321' }
 * };
 * const mapping = { light: '200', dark: '800' };
 * const theme = generateThemeObject(colors, mapping);
 */


const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  // Initialize an empty object to hold the theme
  const theme: any = {};

  // Iterate over each base color
  baseColors.forEach((color) => {
    // Initialize an empty object for each color in the theme
    theme[color] = {};

    // Iterate over each key-value pair in the mapping
    Object.entries(mapping).forEach(([key, value]: any) => {
      // Determine the shade key based on the invert flag
      const shadeKey = invert ? value : key;

      // Assign the corresponding color value to the theme object
      theme[color][key] = colors[color][shadeKey];
    });
  });

  return theme;
};

// * Generate the light theme object
// * This creates a theme object with standard mapping
const lightTheme = generateThemeObject(colors, shadeMapping);

// * Generate the dark theme object
// * This creates a theme object with inverted mapping
const darkTheme = generateThemeObject(colors, shadeMapping, true);


const themes = { 
  light: {
    ...lightTheme, 
    white: "#ffffff"
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"]
  }

}


const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};
export default config;
