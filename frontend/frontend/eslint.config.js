import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Genel JS/TS dosyaları
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // TypeScript önerilen kurallar
  tseslint.configs.recommended,

  // React önerilen kurallar
  pluginReact.configs.flat.recommended,

  // Ek kurallar: React 17+ otomatik JSX import ve target="_blank"
  {
    settings: {
      react: {
        version: "detect" // React sürümünü otomatik algılar
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off", // artık JSX için React import gerekmez
      "react/jsx-no-target-blank": "warn", // target="_blank" uyarısı
    },
  },
]);
