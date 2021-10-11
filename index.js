if(!process.env.NODE_ENV)
    process.env.NODE_ENV = "development"

require('dotenv').config()

const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const { ApolloServer } = require("apollo-server-express");

// setup
const authSetup = require("./util/auth");

const PORT = process.env.PORT

const apiSingleton = require("./util/api");
apiSingleton.initWithConfig({
});

// Construct a schema, using GraphQL schema language
const { typeDefs, resolvers } = require("./src/schema");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV === "development",
    playground: process.env.NODE_ENV === "development",
    debug: process.env.NODE_ENV === "development",
    subscriptions: {
        keepAlive: 40000,
    },
    context: ({ req, res }) => {
        return {
            request: req
        };
    },
    onHealthCheck: () => {
        return new Promise((resolve) => {
            // Replace the `true` in this conditional with more specific checks!
            resolve(true);
        });
    },
});

const app = express();
app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.disable('x-powered-by');
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Request-Method', 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// bodyparser
app.use(bodyParser.json())
app.use(authSetup.authMiddleware);
server.applyMiddleware({ app, path: '/', cors: false });
app.get("/", (req, res) => res.redirect("/"));

console.log(' API env ', process.env.NODE_ENV);
app.listen({ port : PORT }, () =>
    console.log(
        `🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
);

// Refer: https://shuheikagawa.com/blog/2019/04/25/keep-alive-timeout/
app.keepAliveTimeout = 61 * 1000;
app.headersTimeout = 65 * 1000;
