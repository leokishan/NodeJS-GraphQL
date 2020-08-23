const { GraphQLScalarType, GraphQLInt, GraphQLString, GraphQLInputObjectType } = require('graphql');

const PaginationResponse = {
	pages: { type: GraphQLInt },
	total_records: { type: GraphQLInt }
};

const InputFilter = new GraphQLInputObjectType({
	name: 'Filter',
	fields: {
		sort_on: { type: GraphQLString, defaultValue: '_id' },
		sort_type: { type: GraphQLString, defaultValue: 'ASC' },
		page_number: { type: GraphQLInt, defaultValue: 0 },
		page_size: { type: GraphQLInt, defaultValue: 10 }
	}
});

const GraphQLDateTime = new GraphQLScalarType({
	name: 'GraphQLDateTime',
	description: 'This is custom date time',
	parseLiteral: (ast) => {
		// Parse input
		// Input by yyyy-mm-dd
		return new Date(ast.value);
	},
	parseValue: (value) => {
		return new Date(ast.value);
	},
	serialize: (value) => {
		// output format
		return value;
	}
});

module.exports = {
	GraphQLDateTime,
	PaginationResponse,
	InputFilter
};
