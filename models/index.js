var fs = require('fs')
    , path = require('path');

module.exports = function(app) {
  require('./roles')(app);
  require('./user')(app);
  require('./login_token')(app);
  require('./city_region')(app);
  require('./city')(app);
  require('./service')(app);
  require('./service_category')(app);
  
  var City = app.City
      , CityRegion = app.CityRegion;
      
  var c = new City();
  var r = new CityRegion();
  
  r.save(function(r_err) {
    c.regions.push(r);  
    c.save(function(c_err) {
      console.log("error!");
    });
  });
};