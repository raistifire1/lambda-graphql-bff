const { gql } = require("apollo-server-express");
const rtfAPI = require('../api/rtf');

/**
    HELP

    --- SignUp User ---

    mutation signupUser {
      signupUser( name: "my user", email: "testing@gmail.com", password: "password") {
        token
      }
    }

    ---- Login User ----

    mutation loginUser {
      loginUser( email: "testing@gmail.com", password: "password") {
        token,
        error 
      }
    }

    ---- verify Token ----

    mutation verifyToken {
      verifyToken(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIDEiLCJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDQkWEdiYjF3aG40aHBIL0FrRUFJSEN5TzVhalpPMU4yeGdRT3J3L2ozTDdXaXYwa1NvdXhjc0ciLCJpZCI6MTAwLCJpYXQiOjE1ODU0ODcwMDB9.C9ezWI15HNsZAD68us6lL31DdsPFPJ5Xnh9tnb5duFw") {
        name,
        email,
        id
      }
    }

    ---- Query Users ----

    {
      users {
        email
        id
      }
      userById(id: 34) {
        name
      }
    }

 */


const typeDefs = gql`
type Posts {
  userId: Int!
  id: Int!
  title: String!
  body: String!
}

extend type Query {
  posts: [Posts]
}

`;

const resolvers = {
  Query: {
    posts: async (root, args) => {
      const result = await rtfAPI.getAllPosts();
      return result;
    }
  },
  Mutation: {
  }
};


module.exports = {
  typeDefs,
  resolvers
};
