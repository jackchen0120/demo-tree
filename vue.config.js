
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  // configureWebpack 值为函数，参数 config (被解析的配置)，可直接赋值修改
  configureWebpack: (config) => {
    config['externals'] = {
      vue: "Vue",
      "element-ui": "ELEMENT",
    };
    // 判断为生产模式下，因为开发模式我们是想保存console的
    if (process.env.NODE_ENV === 'production') {
      config['performance'] = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 js 文件的性能提示
        assetFilter(assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
      config['plugins'].push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true //生产环境自动删除console
            },
            warnings: false
          },
          sourceMap: false,
          parallel: true //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        })
      )
    }
  },
};
