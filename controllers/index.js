module.exports = function(app) {
  require('./application')(app);
  require('./admin')(app);
  require('./admin/sessions')(app);
  require('./errors')(app);
};