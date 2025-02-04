import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import jestPlugin from "eslint-plugin-jest";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/.eslintrc.js"],
}, ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslintEslintPlugin,
        jest: jestPlugin,
        "unused-imports": unusedImportsPlugin,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: __dirname,
        },
    },

    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-object-type": "warn",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
        "prettier/prettier": "error",
        // custom
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/consistent-test-it": ["error", { fn: "it" }],
        // unused imports
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        'lines-between-class-members': [
          'error',
          'always',
          {
            exceptAfterSingleLine: true,
          },
        ],
    },
}];