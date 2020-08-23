const { model, Schema } = require('mongoose');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLList
} = require('graphql');
const { GraphQLDateTime } = require('../assets/utilities');

const shows = model(
	'shows',
	new Schema(
		{
			name: String,
			description: String,
			cover_image: String,
			ratings: Number,
			release: String,
			show_time: Date,
			tags: [ String ],
			starring: [ { character_name: String, name: String, profile_image: String } ]
		},
		{
			timestamps: {
				createdAt: 'created_at',
				updatedAt: 'updated_at'
			}
		}
	)
);

const StarredArtist = new GraphQLObjectType({
	name: 'StarredArtists',
	fields: {
		character_name: { type: GraphQLString },
		name: { type: GraphQLString },
		profile_image: { type: GraphQLString }
	}
});

const InputStarredArtist = new GraphQLInputObjectType({
	name: 'InputStarredArtists',
	fields: {
		character_name: { type: GraphQLString },
		name: { type: GraphQLString },
		profile_image: { type: GraphQLString }
	}
});

const GeneralTypes = {
	description: { type: GraphQLString },
	cover_image: { type: GraphQLString },
	release: { type: GraphQLString },
	ratings: { type: GraphQLInt },
	show_time: { type: GraphQLDateTime },
	tags: { type: new GraphQLList(GraphQLString) }
};

const AddShowType = new GraphQLInputObjectType({
	name: 'AddShow',
	fields: {
		name: { type: new GraphQLNonNull(GraphQLString) },
		starring: { type: new GraphQLList(InputStarredArtist) },
		...GeneralTypes
	}
});

const EditShowType = new GraphQLInputObjectType({
	name: 'EditShow',
	fields: {
		name: { type: GraphQLString },
		...GeneralTypes
	}
});

const ShowType = new GraphQLObjectType({
	name: 'Show',
	fields: {
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		starring: { type: new GraphQLList(StarredArtist) },
		...GeneralTypes,
		cover_image: {
			type: GraphQLString,
			resolve: (obj) => (obj.cover_image ? `https://google.com/${obj.cover_image}` : '')
		}
	}
});

module.exports = {
	showModel: shows,
	AddShowType,
	ShowType,
	EditShowType
};
