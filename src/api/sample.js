const _ = require("lodash");

class User {
  name;
  email;
  id;

  constructor(name = null, email = null, id = null){
    this.name = name;
    this.email = email;
    this.id = id;
  }

}

const users = [{
  name: 'Harry Potter',
  email: 'harry@potter.com',
  password: '$2b$04$U55FGMhe4YaLL3pJOB8WzOisz.PC/7rBTnneoGl2N6sAT7H6zEUuq',
  id: 23,
},
{
  name: 'Jurassic Park',
  email: 'michael@crichton.com',
  password: '$2b$04$U55FGMhe4YaLL3pJOB8WzOisz.PC/7rBTnneoGl2N6sAT7H6zEUuq',
  id: 34
},
{
  name: 'Test User 1',
  email: 'testing@gmail.com',
  password: '$2b$04$XGbb1whn4hpH/AkEAIHCyO5ajZO1N2xgQOrw/j3L7Wiv0kSouxcsG',
  id: 100,
}];

const createUser = () => new User();

const getAllUsers = () => {
  return users;
}

const getUser = (root, args) => {
  const { id = null } = args;
  console.log(args);
  if(!id) throw Error('No User found');

  if(id) {
    return _.find(users, {
      id
    })
  }
}

const getUserByEmail = (email) => {
  // const { email = null } = args;
  if(!email) return 'No User found';

  if(email) {
    return _.find(users, {
      email
    })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
}
