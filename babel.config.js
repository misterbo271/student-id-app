module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    [
      "module-resolver",
      {
        "root": [
          "./student-id-app"
        ],
        "extensions": [
          ".js",
          ".ios.js",
          ".android.js"
        ],
        "alias": {
          "app": "./student-id-app",
          "abilities": "./student-id-app/abilities",
          "assets": "./student-id-app/assets",
          "caches": "./student-id-app/caches",
          "components": "./student-id-app/components",
          "configs": "./student-id-app/configs",
          "constants": "./student-id-app/constants",
          "controls": "./student-id-app/controls",
          "databases": "./student-id-app/databases",
          "globals": "./student-id-app/globals",
          "handlers": "./student-id-app/handlers",
          "helpers": "./student-id-app/helpers",
          "hooks": "./student-id-app/hooks",
          "modules": "./student-id-app/modules",
          "screens": "./student-id-app/screens",
          "services": "./student-id-app/services",
          "stores": "./student-id-app/stores",
          "utils": "./student-id-app/utils"
        }
      }
    ],
    'react-native-reanimated/plugin'
  ],
  env: {
    "production": {
      "plugins": [
        "transform-remove-console"
      ]
    }
  }
};
