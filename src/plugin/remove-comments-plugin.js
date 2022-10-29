

class RemoveCommentsPlugin {

  apply(compiler) {

    compiler.hooks.emit.tap(('RemoveCommentsPlugin'), (compilation) => {

      // compilation => 此次打包的上下文

      for(const name in compilation.assets) {
        if(name.endsWith('.js')) {
          const contents = compilation.assets[name].source();

          const withoutComments = contents.replace(/\/\*\*+\*\//g, '');

          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length 
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin;

