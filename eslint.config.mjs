import globals from 'globals';
import daStyle from 'eslint-config-dicodingacademy';


export default [
  daStyle,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
    }
  }
];
