require.paths.unshift('./modules/');

var sys = require("sys")
    ,   express = require('express')
    ,   mongoose = require('mongoose')
    ,   connect = require('connect')
    ,   mongoStore = require('connect-mongodb')
    ,   jade = require('jade');
    
var app = module.exports = express.createServer(
    connect.bodyParser()
    ,   connect.cookieParser()
    ,   connect.static(__dirname + '/public')
    ,   connect.methodOverride()
    ,   connect.favicon()
    ,   connect.session({ secret: 'secret key bla-bla-bla' })
    );
    
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
});
    
app.get('/', function(req, res) {
    res.send('test rendering via express server');
    });

/* Include controllers of the application with the full routes */
// require('./controllers')(app);

/* Include helpers of the application */

/* Run the server with default env params */
if (!module.parent) {
    app.listen(process.env.C9_PORT || 3000);
    console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
    console.log('Using Express %s, Jade %s', express.version, jade.version);
}
