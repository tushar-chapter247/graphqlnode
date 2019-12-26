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
		Employee.belongsToMany(models.Department, {
			through: 'EmployeeDepartment',
			as: 'departments',
			foreignKey: 'employeeId',
		});

		Employee.belongsToMany(models.Role, {
			through: 'EmployeeRole',
			as: 'roles',
			foreignKey: 'employeeId',
		});
	};

	return Employee;
};
