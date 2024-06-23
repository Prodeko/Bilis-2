/** @type {import("prettier-plugin-tailwindcss").PluginOptions & import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  importOrder: ["^[A-Za-z]/(.*)$", "^@ui/(.*)$", "^@(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindConfig: "./tailwind.config.cjs",
  tailwindFunctions: ["clsx", "cva"], // Read more: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
};

export default config;
