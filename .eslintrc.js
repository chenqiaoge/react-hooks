// module.exports = {
//   extends: ["react-app"],
//   rules: {
//     // "no-unused-vars": 1,
//     "react-hooks/exhaustive-deps": 1,
//     "import/no-anonymous-default-export": 'off'
//   }
// }

module.exports = {
  // "env": {
  //   "browser": true,
  //   "node": true,
  //   "es6": true
  // },
  // "parser": "babel-eslint",
  "extends": [
    "react-app",
    // "eslint:recommended",
    // "plugin:react/recommended"
  ],
  "rules": {
    "no-unused-vars": 1,
    "import/no-anonymous-default-export": 0,
    "comma-dangle": 0,
  }
}