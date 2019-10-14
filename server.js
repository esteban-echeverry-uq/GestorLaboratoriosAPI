const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { DATABASE, PORT, ENV } = require('./api/configs/config');
const app = express();

// models
require('./api/models/room');
require('./api/models/space');
require('./api/models/tool');
require('./api/models/user');

// defined routes
const homeRoutes = require('./api/routes/home');
const roomRoutes = require('./api/routes/room');
const spaceRoutes = require('./api/routes/space');
const toolRoutes = require('./api/routes/tool');
const userRoutes = require('./api/routes/user');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// express parse initialization
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

// implementing routes
homeRoutes(app);
roomRoutes(app);
spaceRoutes(app);
toolRoutes(app);
userRoutes(app);

// starting server
app.listen(PORT);

console.log('todo list RESTful API server started on: ' + PORT);
