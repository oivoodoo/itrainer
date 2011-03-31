var fs = require('fs')
    , path = require('path');

module.exports = function(app) {
  require('./roles')(app);
  require('./users')(app);
  require('./login_token')(app);
  require('./city')(app);
  require('./city_region')(app);
  require('./service')(app);
  require('./service_category')(app);
};