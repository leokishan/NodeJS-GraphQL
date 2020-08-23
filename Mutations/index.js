const { GraphQLObjectType, GraphQLString } = require('graphql');
const ShowMutations = require('./shows');

const status = {
	type: GraphQLString,
	args: {
		echo: { type: GraphQLString }
	},
	resolve: (_, { echo }) => echo
};

const rootMutation = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		status: status,
		...ShowMutations
	}
});

module.exports = rootMutation;
