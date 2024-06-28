import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import rocketConfig from "@rocketseat/eslint-config/react";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  rocketConfig,
  {
    plugins: ["simple-import-sort", "react", "react-native"],
    rules: {
      "simple-import-sort/imports": "error",
      "react/react-in-jsx-scope": "off"
    }
  }
];
