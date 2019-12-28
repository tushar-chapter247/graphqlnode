import employeeResolvers from './employee';
import { GraphQLDate } from 'graphql-iso-date';

const customScalarResolver = {
	Date: GraphQLDate,
};

export default [customScalarResolver, employeeResolvers];
