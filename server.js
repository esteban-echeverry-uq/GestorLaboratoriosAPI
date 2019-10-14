const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { DATABASE, PORT } = require('./api/configs/environments/dev');
const app = express();

// models
require('./api/models/user');

// defined routes
const homeRoutes = require('./api/routes/home');
const userRoutes = require('./api/routes/user');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE.URL, {
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
userRoutes(app);

// starting server
app.listen(PORT);

console.log('todo list RESTful API server started on: ' + PORT);
