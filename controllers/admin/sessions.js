var namespace = require('express-namespace');

module.exports = function(app) {

  var admin = require('./admin')(app)
      , User = app.User
      , LoginToken = app.LoginToken;
  
  app.namespace('/admin', function() {  
    app.get('/sessions/new', function(req, res) {
      res.render('admin/sessions/new', {
        locals: { user: new User() }
        , layout: 'admin/admin'
      });
    });
    
    app.post('/sessions', function(req, res) {
      User.findOne({ email: req.body.user.email }, function(err, user) {
        if (user && user.authenticate(req.body.user.password)) {
          req.session.user_id = user.id;
    
          // Remember me
          if (req.body.remember_me) {
            var loginToken = new LoginToken({ email: user.email });
            loginToken.save(function() {
              res.cookie('logintoken', loginToken.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
              res.redirect('/admin');
            });
          } else {
            res.redirect('/admin');
          }
        } else {
          req.flash('error', 'Вы ввели неверные пользовательские данные, попробуйте снова.');
          res.redirect('admin/sessions/new');
        }
      }); 
    });
    
    app.del('/sessions', admin.loadUser, function(req, res) {
      if (req.session) {
        LoginToken.remove({ email: req.currentUser.email }, function() {});
        res.clearCookie('logintoken');
        req.session.destroy(function() {});
      }
      res.redirect('admin/sessions/new');
    });
  });
};