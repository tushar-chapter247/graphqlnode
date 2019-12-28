const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import jwt from 'jsonwebtoken';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const employeeRouter = require('./routes/employee');
const departmentRouter = require('./routes/department');
const roleRouter = require('./routes/role');

const models = require('./database/models');

const app = express();
const graphQlPath = '/graphql';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const initialRoute = '/api';
app.use('/', indexRouter);
app.use(initialRoute + '/users', usersRouter);
app.use(initialRoute + '/employee', employeeRouter);
app.use(initialRoute + '/department', departmentRouter);
app.use(initialRoute + '/role', roleRouter);

const getMe = async req => {
	const token = req.headers['x-token'];
	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET);
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again.');
		}
	}
};

// APOLLO EXPRESS SERVER
const server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: error => {
		const message = error.message
			.replace('SequelizeValidationError: ', '')
			.replace('Validation error: ', '');

		return {
			...error,
			message,
		};
	},
	context: async ({ req }) => {
		const me = await getMe(req);
		return {
			models,
			me,
			secret: process.env.SECRET,
		};
	},
});
server.applyMiddleware({ app, path: graphQlPath });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// sync database
models.sequelize
	.sync()
	.then(function() {
		console.log('Database looks fine!');
	})
	.catch(function(err) {
		console.log('Something went wrong with database: ', err);
	});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
