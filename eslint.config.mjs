import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Equivalente a "eslint:recommended"
  {
    ...js.configs.recommended,
  },

  // Equivalente a "plugin:jest/recommended"
  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
    ],
    ...jest.configs["flat/recommended"],
  },

  // Equivalente a "next/core-web-vitals"
  ...nextVitals,

  // Ignorar arquivos gerados
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
