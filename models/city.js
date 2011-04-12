module.exports = function(app) {
  
  var Schema = app.mongoose.Schema;

  City = new Schema({
    name: {type: String, index: true}
    , regions: [app.schemes.CityRegion]
  });
  
  app.schemes.City = City;
  app.mongoose.model('City', City);
  app.City = app.mongoose.model('City');
};