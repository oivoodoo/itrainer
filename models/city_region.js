module.exports = function(app) {
  
  var Schema= app.mongoose.Schema;
  
  CityRegion = new Schema({
    'name': {type: String, index: true},
    'city': app.City
  });
  
  app.mongoose.model('CityRegion', CityRegion);
  app.CityRegion = app.mongoose.model('CityRegion');
};