module.exports = function(app) {
  require('./application')(app);
  require('./errors')(app);
};