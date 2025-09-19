export default [
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: "module",
    },
    rules: {
      indent: ["error", 2, { SwitchCase: 1 }],
      "linebreak-style": ["error", "unix"],
      semi: ["error", "always"],
      "prefer-arrow-callback": ["error"],
      "prefer-const": ["error"],
    },
  },
];
