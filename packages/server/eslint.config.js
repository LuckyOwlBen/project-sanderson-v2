// eslint.config.js / eslint.config.mjs (flat config example)
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ['packages/server/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./packages/server/tsconfig.json'],
        tsconfigRootDir: __dirname
      }
    }
  },
  {
    files: ['packages/client/**/*.ts', 'packages/client/**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./packages/client/tsconfig.json'],
        tsconfigRootDir: __dirname
      }
    }
  }
];
