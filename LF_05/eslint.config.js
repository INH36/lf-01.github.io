import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		extends: ['airbnb', 'airbnb-typescript', 'prettier'],
		ignores: [
			'node_modules/**',
			'dist/**',
			'build/**',
			'out/**',
			'.next/**',
			'.nuxt/**',
			'.output/**',
			'.vercel/**',
			'.netlify/**',
			'.cache/**',
			'.parcel-cache/**',
			'.vite/**',
			'.turbo/**',
			'*.tsbuildinfo',
			'tsconfig.tsbuildinfo',
			'coverage/**',
			'storybook-static/**',
			'public/vendor/**',
			'public/libs/**',
			'stats.html',
			'bundle-analyzer-report.html',
		],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: globals.browser,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			js,
			react: pluginReact,
		},
		rules: {
			...js.configs.recommended.rules,
			...pluginReact.configs.recommended.rules,
		},
	},
	...tseslint.configs.recommended,

	{
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
]);
