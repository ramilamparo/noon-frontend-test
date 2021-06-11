// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"react-app",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "prettier"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-inferrable-types": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
