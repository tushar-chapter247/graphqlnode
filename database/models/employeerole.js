'use strict';
module.exports = (sequelize, DataTypes) => {
	const EmployeeRole = sequelize.define(
		'EmployeeRole',
		{
			status: DataTypes.STRING,
		},
		{}
	);

	EmployeeRole.associate = function(models) {
		// associations can be defined here
	};

	return EmployeeRole;
};
