require.paths.unshift('./modules/');

var sys = require('sys')
    , express = require('express')
    , jade = require('jade')
    , connect = require('connect')
    , mongoose = require('mongoose')
    , mongoStore = require('connect-mongodb')
    , db
    , stylus = require('stylus')
    , i18n = require('connect-i18n');

var config = require('./config').config;

var app = module.exports = express.createServer(
     connect.cookieParser()
    , stylus.middleware({
        src: __dirname + '/public/stylus'
        , dest: __dirname + '/public'
        , compress: true
      })
    , config.assets.handler
    , connect.static(__dirname + '/public')
    , connect.bodyParser()
    , connect.methodOverride()
    , connect.favicon()
    , i18n({default_locale: 'ru_ru'}, function(locals) { console.log(locals); })
);

app.config = config;
app.mongoose = mongoose;
app.schemes = {};

require('./config/db')(app);

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.session({store: mongoStore(app.set('db-uri')), secret: '9FF96302-4633-11E0-AAE4-38FEDED72085'}))
  app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
});

require('./models')(app);
require('./controllers')(app);
require('./helpers')(app);

if (!module.parent) {
  app.listen(process.env.C9_PORT || 3001);
  console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
  console.log('Using Express %s, Jade %s', express.version, jade.version);
}
