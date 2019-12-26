'use strict';
module.exports = (sequelize, DataTypes) => {
	const Employee = sequelize.define(
		'Employee',
		{
			firstName: DataTypes.STRING,
			surname: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			contact: DataTypes.STRING,
			username: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: DataTypes.STRING,
		},
		{}
	);
	Employee.associate = function(models) {
		// associations can be defined here
	};
	return Employee;
};
