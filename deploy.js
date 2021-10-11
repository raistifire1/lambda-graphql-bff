if(!process.env.NODE_ENV)
    process.env.NODE_ENV = "development"

require('dotenv').config()

const { ApolloServer } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const { typeDefs, resolvers } = require("./src/schema");

const server = new ApolloServer({
    // playground: {
    //     endpoint: "/gql"
    // },
    typeDefs,
    resolvers,

    // introspection: false,
    playground: true,
    // debug: false,
    // subscriptions: {
    //     keepAlive: 40000,
    // },
    // context: ({ req, res }) => {
    //     return {
    //         request: req
    //     };
    // },
    // onHealthCheck: () => {
    //     return new Promise((resolve, reject) => {
    //         // Replace the `true` in this conditional with more specific checks!
    //         if (true) {
    //             resolve();
    //         } else {
    //             reject();
    //         }
    //     });
    // },
});

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});
