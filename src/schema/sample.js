const { gql } = require("apollo-server-express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersAPI = require("../api/sample");

const SECRET_KEY = "SUPER_SECRET";

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
type User {
name: String!
email: String!
password: String!
id: Int
}

type Query {
  users: [User]
  userById (id: Int): User!
}

type Error {
  error: [String]!
}

type Token {
  error: [String]!
  token: String!
}

type Mutation {
  signupUser( name: String, email: String, password: String): Token
  loginUser( email: String, password: String): Token
  verifyToken( token: String ): User
}
`;

const verifyPassword = async (User, password) => {
  // compare the passwords
  return await bcrypt.compare(password, User.password)
}

const resolvers = {
  Query: {
    users: () => usersAPI.getAllUsers(),
    userById: usersAPI.getUser
  },
  Mutation: {
    signupUser: async (root, args) => {
        const { name, email, password } = args;
        const newUser = {name, email, password: bcrypt.hashSync(password, 3) };
        const userToken = jwt.sign(newUser, SECRET_KEY);
        return { token: userToken };
    },
    loginUser: async (root, args) => {
        const { email, password } = args;
        const foundUser = usersAPI.getUserByEmail(email);

        console.log(foundUser);
        if(!foundUser) return { 
          token: '', 
          error: ['No User with Email found']
        }

        const isUserVerified = await verifyPassword(foundUser, password);

        if(!isUserVerified) return { 
          token: '', 
          error: ['Incorrect password']
        }


        const userToken = jwt.sign(foundUser, SECRET_KEY);
        return { token: userToken, error: [] };
    },
    verifyToken:  async (root, args) => {
        const { token } = args;
        try {
          const decoded = jwt.verify(token, SECRET_KEY);
          // console.log(decoded);
          if(decoded.email) {
            return decoded;
          }
          return usersAPI.createUser()
        } catch(err) {
          // err
          return usersAPI.createUser()
        }
    }
  }
};


module.exports = {
  typeDefs,
  resolvers
};
