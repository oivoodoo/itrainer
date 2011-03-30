module.exports = function(app) {
  app.namespace('/admin', function() {
    
    function authenticateFromLoginToken(req, res, next) {
      var cookie = JSON.parse(req.cookies.logintoken);
    
      LoginToken.findOne({ email: cookie.email,
                           series: cookie.series,
                           token: cookie.token }, (function(err, token) {
        if (!token) {
          res.redirect('/sessions/new');
          return;
        }
    
        User.findOne({ email: token.email }, function(err, user) {
          if (user) {
            req.session.user_id = user.id;
            req.currentUser = user;
    
            token.token = token.randomToken();
            token.save(function() {
              res.cookie('logintoken', token.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
              next();
            });
          } else {
            res.redirect('/sessions/new');
          }
        });
      }));
    };
    
    function loadUser(req, res, next) {
      if (req.session.user_id) {
        User.findById(req.session.user_id, function(err, user) {
          if (user) {
            req.currentUser = user;
            next();
          } else {
            res.redirect('/sessions/new');
          }
        });
      } else if (req.cookies.logintoken) {
        authenticateFromLoginToken(req, res, next);
      } else {
        res.redirect('/sessions/new');
      }
    };
    
    app.all('/admin(/*)?', loadUser);
  });
};