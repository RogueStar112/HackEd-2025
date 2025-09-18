import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];


// export default eslintConfig;

import eslintPluginNext from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
  // Next.js recommended rules
  eslintPluginNext.configs["core-web-vitals"],

  // TypeScript rules
  ...tseslint.configs.recommended,

  {
    rules: {
      // 🔴 Disable "no-explicit-any" everywhere
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off"
    },
  },
];