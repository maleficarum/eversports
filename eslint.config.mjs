import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }] // Disallow console.log, allow warn/error
    }
  },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
]);
