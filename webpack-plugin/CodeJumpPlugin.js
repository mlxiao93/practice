const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server')
const exec = require('child_process').exec;

class CodeJumpPlugin {
  constructor (options) {
    // console.log(options);
  }
  apply(compiler) {

    compiler.hooks.compilation.tap('CodeJumpPlugin', (compilation) => {

      if (!compilation.options.devServer) throw '请增加devServer配置项';
      const originBefore = compilation.options.devServer.before;
      const context = compilation.options.context;
      compilation.options.devServer.before = function(app, server) {
        app.get('/code-jump', function(req, res) {
          let path = req.query.path;
          path && exec(`code ${context}`, function (err) {
            exec(`code ${path}`)
          })
          res.json('ok');
        });
        originBefore && originBefore.apply(null, arguments);
      }
      // debugger;

      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'CodeJumpPlugin', // <-- Set a meaningful name here for stacktraces
          (data, cb) => {
            data.assetTags.scripts.push({
              tagName: 'script',
              innerHTML: `document.body.addEventListener('click', function (e) {
  if (!e.altKey) return;
  var target = e.target;
  let path;
  do {
    path = target.dataset.resourcePath;
    target = target && target.parentNode;
  } while (!path && target);
  if (path) fetch('/code-jump?path=' + path)
}, {useCapture: true})`
            })
            cb(null, data)
          }
      )
    });
  }
}

module.exports = CodeJumpPlugin;