import { gql } from 'apollo-server-express';
import employeeSchema from './employee';
import departmentSchema from './department';
import roleSchema from './role';

const linkSchema = gql`
	scalar Date
	type Query {
		_: Boolean
	}
	type Mutation {
		_: Boolean
	}
	type Subscription {
		_: Boolean
	}
`;

export default [linkSchema, employeeSchema, departmentSchema, roleSchema];
