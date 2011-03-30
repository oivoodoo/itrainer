var express = require('express');

module.exports = function(app) {
  app.configure('development', function() {
    app.set('db-uri', 'mongodb://admin:201287ali@flame.local.mongohq.com:27021/itrainer');
    app.use(express.errorHandler({ dumpExceptions: true }));
  });
  
  app.configure('test', function() {
    app.set('db-uri', 'mongodb://admin:201287ali@flame.local.mongohq.com:27021/itrainer');
  });
  
  app.configure('production', function() {
    app.set('db-uri', 'mongodb://admin:201287ali@flame.local.mongohq.com:27021/itrainer');
  });
  
  app.db = app.mongoose.connect(app.set('db-uri'));
}