module.exports = {
    "env": {
        "browser": false,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        { files: ['**/*.ts', '**/*.js'] },
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],

    "ignorePatterns": ["src/records/**", "src/**/*.test.ts"],
    "rules": {

    }
}
