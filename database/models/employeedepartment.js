'use strict';

module.exports = (sequelize, DataTypes) => {
	const EmployeeDepartment = sequelize.define(
		'EmployeeDepartment',
		{
			status: DataTypes.STRING,
		},
		{}
	);

	EmployeeDepartment.associate = function(models) {
		// associations can be defined here
	};

	return EmployeeDepartment;
};
