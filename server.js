require.paths.unshift('./modules/');

var sys = require("sys")
    ,   express = require('express')
    ,   mongoose = require('mongoose')
    ,   connect = require('connect')
    ,   mongoStore = require('connect-mongodb');
    
var app = module.exports = express.createServer(
    connect.bodyParser()
    ,   connect.methodOverride()
    );

/* Include controllers of the application with the full routes */
// require('./controllers')(app);

/* Include helpers of the application */

/* Run the server with default env params */
if (!module.parent) {
    app.listen(process.env.PORT || 3000);
    console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
    console.log('Using Express %s, Jade %s', express.version, jade.version);
}
