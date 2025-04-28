import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load required plugins and parser
import eslintParser from '@babel/eslint-parser';
import airbnbBase from 'eslint-config-airbnb-base';

// Airbnb base config uses eslint-plugin-import
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'src/*.grammar.js', 'lib/*.js'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: 'module',
        babelOptions: {
          configFile: './babel.config.js', // adjust if needed
        },
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      ...airbnbBase.rules,
    },
  },
];
