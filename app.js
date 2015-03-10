'use strict';

var app = require('express')(),
    favicon = require('serve-favicon'),
    http = require('http').Server(app);

    /**
    * serve favicon
    */
    app.use(favicon(__dirname + '/assets/favicons/favicon.ico'));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


http.listen(3001, function(){
    console.log('listening on *:3001');
});
