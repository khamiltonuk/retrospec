'use strict';

var express = require('express'),
    app = require('express')(),
    favicon = require('serve-favicon'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

/**
* serve favicon
*/
app.use(favicon(__dirname + '/assets/favicons/favicon.ico'));

/**
* declare static folder
* this forwards requests to static files (css, js, images)
* to the /assets directory.
*
* with this, you never need to include /assets/ in your url
* when referencing static files.
*/
app.use(express.static(__dirname + '/assets'));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


http.listen(3001, function(){
    console.log('listening on *:3001');
});
