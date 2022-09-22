module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@src": "./src",
            "@assets": "./assets",
            "@root": "./",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: [
          [
            "inline-dotenv",
            {
              path: ".env.production",
            },
          ],
        ],
      },
      development: {
        plugins: [
          [
            "inline-dotenv",
            {
              path: ".env.development",
            },
          ],
        ],
      },
    },
  };
};
