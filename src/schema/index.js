const { merge } = require('lodash');
const SampleSchema = require("./sample");
const RTFSchema = require("./rtf");

module.exports = {
    typeDefs: [
        SampleSchema.typeDefs,
        RTFSchema.typeDefs
    ],
    resolvers: merge(
        SampleSchema.resolvers,
        RTFSchema.resolvers
    )
}