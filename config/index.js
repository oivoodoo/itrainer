var assetManager = require('connect-assetmanager')
    , assetHandler = require('connect-assetmanager-handlers')
    , stylus = require('stylus')
    , settings = require('./settings')
    , nodemailer = require('nodemailer');

var assetsConfig = {
    'js': {
        'route': /\/scripts\/[0-9]+\.*\.js/
      , 'path': './public/scripts/'
      , 'dataType': 'javascript'
      , 'files': [
        'jquery.min.js'
        , 'class.horinaja.jquery.js'
        , 'application.js'
      ]
      , 'postManipulate': {
        '^': [
            assetHandler.uglifyJsOptimize
        ]
      }
    }
};

function compile(str, path) {
  stylus(str)
    .set('filename', path)
    .set('compress', true);
};

nodemailer.SMTP = settings.email;

exports.config = { 
  assets: { 
    handler: assetManager(assetsConfig)
    , compile: compile
  },
  email: settings.email
};