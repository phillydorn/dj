"use strict";

const Koa= require('koa');
const serve= require('koa-static');
const KoaBodyParser= require('koa-bodyparser');
const mount= require('koa-mount');
const indexRoutes= require('./routes');
// const socketIo = require('socket.io');




const app = new Koa();
const server = require('http').createServer(app.callback())

const io = require('socket.io')(server);
app.context.io = io;

io.on("connection", socket => {
  console.log('new socket')
})


app.use(KoaBodyParser());
const PORT = 3000;

app.use(mount('/', serve('./public')));

app.use(indexRoutes.routes());

server.listen(PORT);

// const server = app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

module.exports = server;

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
    
