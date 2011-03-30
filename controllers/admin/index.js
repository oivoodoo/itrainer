module.exports = function(app) {
  require('./admin')(app);
  require('./sessions')(app);
};