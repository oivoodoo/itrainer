var fs = require('fs')
    , path = require('path');

module.exports = function(app) {
  var files = fs.readdirSync(__dirname);
  files.forEach(function(f) {
    var basename = path.basename(f, '.js');
    if (basename != 'index') {
      require('./' + basename)(app);
    }
    });
  };