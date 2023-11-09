import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      cupcake: {
        ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          "background-color": "#efeae6",
      }
    }],
  },
};
export default config;
