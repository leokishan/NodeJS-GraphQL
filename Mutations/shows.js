const { GraphQLID, GraphQLString } = require('graphql');
const { showModel, AddShowType, ShowType, EditShowType } = require('../models/shows');

const AddShow = {
	type: ShowType,
	args: {
		show: { type: AddShowType }
	},
	resolve: (_, args) => {
		return showModel
			.create(args.show)
			.then((response) => {
				return response;
			})
			.catch((err) => console.log(err));
	}
};

const EditShow = {
	type: GraphQLString,
	args: {
		id: { type: GraphQLID },
		show: { type: EditShowType }
	},
	resolve: (_, args) => {
		return showModel
			.updateOne({ _id: args.id }, args.show)
			.then((response) => {
				return 'Edit show successfully.';
			})
			.catch((err) => console.log(err));
	}
};

module.exports = {
	AddShow,
	EditShow
};
