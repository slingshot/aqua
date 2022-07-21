module.exports = {
    extends: [
        "next/core-web-vitals",
        "airbnb",
        "airbnb-typescript",
    ],
    parserOptions: {
        "project": "./tsconfig.json",
    },
    rules: {
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "warn",
        "react/prop-types": "off",
        "react/function-component-definition": "off",
        "import/prefer-default-export": "off",
        "import/no-default-export": "warn",
    },
}
