if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const Query = require('./Queries');
const Mutation = require('./Mutations');

const PORT = process.env.PORT || 3010;
const DB_URL = process.env.MONGO_URL;

const app = express();
app.use('/static', express.static('assets/images'));
mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.set('debug', true);

const schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

app.get('/status', (req, res) => res.send(`Running ... `));

app.listen(PORT);
console.log(`Running server at localhost:${PORT}/`);
mongoose.connection.once('open', () => console.log('Mongo DB connected.'));
