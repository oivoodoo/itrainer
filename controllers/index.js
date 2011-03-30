module.exports = function(app) {
  require('./application')(app);
  require('./admin')(app);
  require('./errors')(app);
};