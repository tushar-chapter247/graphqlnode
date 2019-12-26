'use strict';

module.exports = (sequelize, DataTypes) => {
	const Department = sequelize.define(
		'Department',
		{
			name: DataTypes.STRING,
		},
		{}
	);

	Department.associate = function(models) {
		Department.belongsToMany(models.Employee, {
			through: 'EmployeeDepartment',
			as: 'employees',
			foreignKey: 'departmentId',
		});
	};

	return Department;
};
