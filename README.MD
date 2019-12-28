# APOLLO GRAPHQL NODE SERVER USING EXPRESS AND SEQUELIZE

## STEPS FOR INITIALIZING MODELS FOR EMPLOYEES WITH MANY TO MANY RELATION WITH DEPARTMENT AND ROLES

Follow this link for more refefence:
https://github.com/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate

### sequelize model:create --name Employee --attributes firstName:string,surname:string,email:string,contact:string,username:string,password:string

### sequelize model:create --name Department --attributes name:string

### sequelize model:create --name Role --attributes name:string

### sequelize model:create --name EmployeeRole --attributes status:string

### sequelize model:create --name EmployeeDepartment --attributes status:string

```javascript
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
```

```javascript
Department.associate = function(models) {
	Department.belongsToMany(models.Employee, {
		through: 'EmployeeDepartment',
		as: 'employees',
		foreignKey: 'departmentId',
	});
};
```

```javascript
Role.associate = function(models) {
	Role.belongsToMany(models.Employee, {
		through: 'EmployeeRole',
		as: 'employees',
		foreignKey: 'roleId',
	});
};
```
