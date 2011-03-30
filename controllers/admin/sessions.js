var namespace = require('express-namespace')
    , admin = require('./admin');
    
    console.log("ADMIN+ " + require('sys').inspect(admin.loadUser));

module.exports = function(app) {
  
  app.namespace('/admin', function() {  
    app.get('/sessions/new', function(req, res) {
      res.render('sessions/new.jade', {
        locals: { user: new User() }
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
              res.redirect('/documents');
            });
          } else {
            res.redirect('/documents');
          }
        } else {
          req.flash('error', 'Incorrect credentials');
          res.redirect('/sessions/new');
        }
      }); 
    });
    
    app.del('/sessions', admin.loadUser, function(req, res) {
      if (req.session) {
        LoginToken.remove({ email: req.currentUser.email }, function() {});
        res.clearCookie('logintoken');
        req.session.destroy(function() {});
      }
      res.redirect('/sessions/new');
    });
  });
};