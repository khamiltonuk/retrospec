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

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket){

    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // remove the username from global usernames list
        if (addedUser) {
            delete usernames[socket.username];
            --numUsers;
            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });


    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
