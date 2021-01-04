const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require("graphql-validation-complexity");

const models = require("./models");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers");
const db = require("./db");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const getUser = (token) => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Session invalid");
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: async ({ req, res }) => {
        console.log("cookie: ", req.cookies.authToken);
        const token = req.cookies.authToken;
        const user = await getUser(token);
        return { models, user, res };
    }
});

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

const app = express();
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(cookieParser());
//app.use(cors());

server.applyMiddleware({ app, path: "/api", cors: corsOptions });

app.listen({ port }, () => {
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`);
});