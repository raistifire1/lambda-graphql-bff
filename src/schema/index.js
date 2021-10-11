const { merge } = require('lodash');
const SampleAPI = require("./sample");

module.exports = {
    typeDefs: [
        SampleAPI.typeDefs
    ],
    resolvers: merge(
        SampleAPI.resolvers
    )
}