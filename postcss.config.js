//const postcssPresetEnv = require("postcss-preset-env");

// const syntax = require("postcss-syntax")({
//   css: require("postcss-scss")
// });

module.exports = {
  //syntax: syntax,
  plugins: [
    // require("postcss-url")([
    //   { filter: "fonts\", url: asset =>{
    //     return `./src/shared/fonts/${asset.url}`} }
    // ]),
    require('postcss-flexbugs-fixes'),
    require('postcss-import'),
    require('postcss-for'),
    require('postcss-mixins'),
    require('postcss-calc'),
    require('postcss-extend'),
    require('precss'),
    // require("postcss-base64")({ extensions: [".png", ".svg"] }),
    require('postcss-normalize')({
      browsers: 'last 2 versions',
    }),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
      remove: false,
    }),
    // postcssPresetEnv({
    //   stage: 0,
    //   features: {
    //     "nesting-rules": true,
    //     "color-mod-function": true,
    //     "custom-media": true
    //   }
    // })
  ],
};
