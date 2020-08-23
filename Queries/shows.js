const { showModel, ShowType } = require('../models/shows');
const { GraphQLList, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } = require('graphql');
const { InputFilter } = require('../assets/utilities');

const ShowList = {
	type: new GraphQLObjectType({
		name: 'PagedShowList',
		fields: { data: { type: new GraphQLList(ShowType) }, total_records: { type: GraphQLInt } }
	}),
	args: {
		filter: { type: InputFilter },
		search: { type: GraphQLString }
	},
	resolve: (_, { filter, search }) => {
		let documents = showModel
			.find({ name: RegExp(`${search || ''}`, 'i') })
			.sort({ [filter.sort_on]: filter.sort_type === 'ASC' ? 1 : -1 })
			.limit(filter.page_size)
			.skip(filter.page_size * filter.page_number);
		let counts = showModel.find().sort({ [filter.sort_on]: filter.sort_type === 'ASC' ? 1 : -1 }).countDocuments();
		return Promise.all([ documents, counts ]).then(([ result, count ]) => {
			return {
				data: result,
				total_records: count
			};
		});
	}
};

const ViewShow = {
	type: ShowType,
	args: {
		id: { type: GraphQLID }
	},
	resolve: (_, { id }) => {
		return showModel.findOne({ _id: id });
	}
};

module.exports = {
	ShowList,
	ViewShow
};
