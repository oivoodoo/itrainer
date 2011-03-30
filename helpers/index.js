var property = require('./property')

module.exports = function(app) {
  app.dynamicHelpers({
    messages: require('express-messages')
    , admin_menu: function() {
      return property.create();
      }
    , assets: function() {
      return app.config.assets.handler.cacheTimestamps;
      }
  });
  
  app.helpers({
    helper: require('./application')
  });
}