const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://root:root@cluster0.ytzggmw.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true});
mongoose.set('strictQuery',true);

const db = mongoose.connection;

db.on('error',(error)=>{ console.error(error)});
db.once('open',()=>{console.log("connected to database")});

const app = express();

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    joining: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    employeeType: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }

})

const UsersModel = mongoose.model('Users',userSchema);



var schema = buildSchema(`
  input UserInput {
    firstname: String
    lastname: String
    age: Int
    joining: Int
    title: String
    department: String
    employeeType: String
    status: Boolean
  }

  type User {
    id: ID!
    firstname: String
    lastname: String
    age: Int
    joining: Int
    title: String
    department: String
    employeeType: String
    status: Boolean
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
`);

// If Message had any complex fields, we'd put them on this object.
class User {
  constructor(id, {firstname, lastname, age, joining, title, department, employeeType, status}) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.joining = joining;
    this.title = title;
    this.department = department;
    this.employeeType = employeeType;
    this.status = status;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getUser: ({id}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no user exists with id ' + id);
    }
    return new User(id, fakeDatabase[id]);
  },
  createUser: ({input}) => {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');
    const user = new UsersModel({
        firstname: input.firstname,
        lastname: input.lastname,
        age: input.age,
        joining: input.joining,
        title: input.title,
        department: input.department,
        employeeType: input.employeeType,
        status: input.status
    })
    const newUser = user.save();
    console.log(newUser);
    return new User(id, input);
  },
  updateUser: ({id, input}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no user exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new User(id, input);
  },
  
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
  
