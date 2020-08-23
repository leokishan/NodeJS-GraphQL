const { GraphQLObjectType, GraphQLString } = require('graphql');
const ShowQuery = require('./shows');

const status = {
	type: GraphQLString,
	resolve: (_, args) => {
		return 'Status';
	}
};

const rootQuery = new GraphQLObjectType({
	name: 'query',
	fields: {
		status: status,
		...ShowQuery
	}
});

module.exports = rootQuery;
