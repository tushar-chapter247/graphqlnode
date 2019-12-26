'use strict';

module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'Role',
		{
			name: DataTypes.STRING,
		},
		{}
	);

	Role.associate = function(models) {
		Role.belongsToMany(models.Employee, {
			through: 'EmployeeRole',
			as: 'employees',
			foreignKey: 'roleId',
		});
	};

	return Role;
};
