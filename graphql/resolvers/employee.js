import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
import { AuthenticationError, UserInputError } from 'apollo-server';

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
				const employeeRes = await models.Employee.create({
					firstName,
					surname,
					email,
					contact,
					username,
					password,
				});

				return {
					success: true,
					message: 'Employee signin successful',
					employee: employeeRes,
				};
			} catch (error) {
				return {
					success: false,
					message: 'Employee singin failed',
					employee: employeeRes,
				};
			}
		},
	},
};
