const env = process.env.NODE_ENV || 'developement';
const configEnv = require('./../config/configEnv');
configEnv();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// Load routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const connections = require('./routes/api/connections');
const search = require('./routes/api/search');
const messages = require('./routes/api/messages');
const rooms = require('./routes/api/rooms');

// Load passport auth strategy
const configurePassport = require('./../config/passport');

// Load socket IO controller
const socketIOController = require('./socketio/socketIOController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGODB_URI;
const dbOptions = { useNewUrlParser: true };

// Connect to MongoDB
mongoose
	.connect(db, dbOptions)
	.then(() => console.log('Connected to MongoDB!'))
	.catch(err => console.log('Unable to connect to MongoDB'));

// Passport middleware
app.use(passport.initialize());

// Passport config
configurePassport(passport);

// API routes
app.use('/api/connections', connections);
app.use('/api/messages', messages);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/rooms', rooms);
app.use('/api/search', search);
app.use('/api/users', users);


// server static assets if in production
if (env === 'production') {
	// set static folder
	app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

	app.get('*', (req, res) => {
		const clientIndexHtml = path.resolve(__dirname, '..', 'client', 'build', 'index.html');
		res.sendFile(clientIndexHtml);
	});
}

io.on('connection', socket => {
	socketIOController(socket, io);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`**** ${env.toUpperCase()} ****`);
	console.log(`server running at localhost:${port}`);
	// console.log(process.env.MONGODB_URI);
});

module.exports = app;