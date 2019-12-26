const Employee = require('../database/models').Employee;

module.exports = {
	create(req, res) {
		const { body } = req;
		const { firstName, surname, email, contact, username, password } = body;
		return Employee.create({
			firstName,
			surname,
			email,
			contact,
			username,
			password,
		})
			.then(emp => res.status(201).send(emp))
			.catch(error => res.status(400).send(error));
	},
};
