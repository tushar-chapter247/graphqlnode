import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Role {
		id: ID!
		name: String
		createdAt: Date
		updatdAt: Date
	}

	extend type Query {
		roles(employeeId: ID!): [Role]!
	}
`;

module.exports = typeDefs;
