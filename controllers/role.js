const Role = require('../database/models').Role;

module.exports = {
	create(req, res) {
		const { body } = req;
		const { name } = body;
		return Role.create({
			name,
		})
			.then(emp => res.status(201).send(emp))
			.catch(error => res.status(400).send(error));
	},
};
