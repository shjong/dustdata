
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let data ;


app.use((req, res, next)=>{ req.io = io; next(); });

app.use('/data', function(req,res,next) {
        console.log("someone hit us with",req.socket.id);
	req.io.emit('data', req.query.dust);
        data = req.query.dust;
	res.send("success");
	
});

io.on('connection', function(socket) {
	console.log("connection from ", socket.id);
	socket.emit('data', data);
});

app.use(express.static('./'), function() {
	console.log("does someone hit the route?");
});


server.listen( 2580, function() {
	console.log("Port 2580 is open for business!");
});

