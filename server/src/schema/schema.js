const { gql } = require("apollo-server-express");

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Note {
        id: ID!
        content: String!
        author: User!
    }

    type Query {
        me: User!
        users: [User]!
        notes: [Note]!
    }

    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        login(email: String!, password: String!): String!
        logout(email: String!): String!
        newNote(content: String!): Note!
    }
`;