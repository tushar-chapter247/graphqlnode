import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Employee {
		id: ID!
		firstName: String
		surname: String
		email: String
		contact: String
		username: String
		password: String
		createdAt: Date
		updatedAt: Date
		departments: [Department]!
		roles: [Role]!
	}

	extend type Query {
		employees(offset: Int, limit: Int): [Employee]!
		employee(id: ID!): Employee
	}

	extend type Mutation {
		login(email: String, password: String): LoginResponse!
		addEmployee(
			firstName: String!
			surname: String!
			email: String!
			contact: String!
			username: String!
			password: String!
		): AddEmployeeResponse!
	}

	type LoginResponse {
		success: Boolean!
		message: String
		employee: Employee!
		token: String!
	}

	type AddEmployeeResponse {
		success: Boolean!
		message: String
		employee: Employee!
	}
`;

module.exports = typeDefs;
