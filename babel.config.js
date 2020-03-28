module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: {
          version: 3
        },
        modules: "commonjs"
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "preval",
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
};
