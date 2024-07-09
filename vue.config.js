const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const VueDefineOptions = require('unplugin-vue-define-options/webpack');

const path = require("path");
const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 443;
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    port
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [
      AutoImport.default({
        imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css',
            exclude: /^(?!.*loading-directive).*$/,
          }),
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components.default({
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
      VueDefineOptions({
        include: [/\.vue$/, /\.vue\?vue/],
      }),
    ]
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  }
})
