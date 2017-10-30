npm: {
  styles: {
    bootstrap: ['dist/css/bootstrap.css']
  }
}

exports.files = {
  javascripts: {
    joinTo: {
      'app.js': /^app/,
      'vendor.js': /^(?!app)/
    }
  },
  stylesheets: { joinTo: 'app.css' }
};

exports.plugins = {
  babel: {
    presets: ['latest', 'react'],
    plugins: ['transform-object-rest-spread']
  }
};
