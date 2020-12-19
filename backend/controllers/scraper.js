const sys = require('util'),
    spawn = require('child_process').spawn,
    process = spawn('python', ["test.py"]),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

process.stdout.on('data', (function(output) {
    const result = String(output);
    console.log(result);
    io.sockets.emit('incoming-data', { data: result });
}));
