import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
import { AuthenticationError, UserInputError } from 'apollo-server';

const createHashPassword = async password => {
	const hashedPassword = await new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, function(err, hash) {
			if (err) reject(err);
			resolve(hash);
		});
	});

	return hashedPassword;
};

const createToken = async (user, secret, expiresIn) => {
	const { id, email } = user;
	return await jwt.sign({ id, email }, secret, {
		expiresIn,
	});
};

export default {
	Query: {
		employees: async (parent, { offset = 0, limit = 2 }, { models }) => {
			console.log('===============> ', models);
			return await models.Employee.findAll({
				include: [
					{
						model: models.Department,
						as: 'departments',
						required: false,
						attributes: ['id', 'name'],
						through: { attributes: [] },
					},
					{
						model: models.Role,
						as: 'roles',
						required: false,
						attributes: ['id', 'name'],
						through: { attributes: [] },
					},
				],
				offset,
				limit,
			});
		},
		employee: async (parent, { id }, { models }) => {
			return await models.Employee.findByPk(id);
		},
	},
	Mutation: {
		addEmployee: async (
			parent,
			{ firstName, surname, email, contact, username, password },
			{ models, secret }
		) => {
			try {
				const hashedPassword = await createHashPassword(password);

				const employeeRes = await models.Employee.create({
					firstName,
					surname,
					email,
					contact,
					username,
					password: hashedPassword,
				});

				return {
					success: true,
					message: 'Employee signup successful',
					employee: employeeRes,
				};
			} catch (error) {
				return {
					success: false,
					message: error.message || 'Employee signup failed',
					employee: {},
				};
			}
		},

		login: async (parent, { email, password }, { models, secret }, info) => {
			try {
				const empRec = await models.Employee.findOne({
					where: {
						email: email,
					},
				});

				if (!empRec) {
					throw {
						success: false,
						message: 'Provided Email is not registered with us',
					};
				}

				const passwordMatch = bcrypt.compareSync(password, empRec.password);
				if (!passwordMatch) {
					throw {
						success: false,
						message: 'Incorrect Email id & password',
					};
				}

				const token = jwt.sign(
					{ id: empRec.id, randomKey: salt },
					process.env.SECRET,
					{
						expiresIn: 86400,
					}
				);

				return {
					success: true,
					message: 'Employee login successful',
					token,
				};
			} catch (error) {
				return {
					success: false,
					message: error.message || 'Employee login failed',
					token: '',
				};
			}
		},
	},
};
