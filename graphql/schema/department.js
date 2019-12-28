import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Department {
		id: ID!
		name: String
		createdAt: Date
		updatdAt: Date
	}

	extend type Query {
		departments(employeeId: ID!): [Department]!
	}
`;

module.exports = typeDefs;
