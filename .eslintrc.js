module.exports = {
  root: true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": [
    "react",
    "simple-import-sort",
    "import",
    "react-hooks",
    "@typescript-eslint"
  ],
  "parser":"@typescript-eslint/parser",
  "parserOptions": {
    "requireConfigFile":false,
    "babelOptions": {
      "presets": ["@babel/preset-react"]
    },
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "tsx": true
    }
  },
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-prototype-builtins': 'off',
    'react/jsx-key': 'off',
    'no-undef': 'off'
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },

  "overrides": [
    {
      "files": [
        "**/*.js",
        "**/*.ts",
        "**/*.tsx"
      ],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              // `react` first, `next` second, then packages starting with a character
              [
                "^react$",
                "^next",
                "^[a-z]"
              ],
              // Packages starting with `@`
              [
                "^@"
              ],
              // Packages starting with `~`
              [
                "^~"
              ],
              // Imports starting with `../`
              [
                "^\\.\\.(?!/?$)",
                "^\\.\\./?$"
              ],
              // Imports starting with `./`
              [
                "^\\./(?=.*/)(?!/?$)",
                "^\\.(?!/?$)",
                "^\\./?$"
              ],
              // Style imports
              [
                "^.+\\.s?css$"
              ],
              // Side effect imports
              [
                "^\\u0000"
              ]
            ]
          }
        ],
        "import/no-anonymous-default-export": [
          "error",
          {
            "allowArray": false,
            "allowArrowFunction": true,
            "allowAnonymousClass": false,
            "allowAnonymousFunction": true,
            "allowCallExpression": true, // The true value here is for backward compatibility
            "allowLiteral": false,
            "allowObject": false
          }
        ]
      }
    }
  ]
}
