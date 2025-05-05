import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';



export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['playwright-report/**'],
  },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "error"
    }
  }
);
