module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // template title <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Peek-a-Vue by BenCodeZen'
    }
  }
}
