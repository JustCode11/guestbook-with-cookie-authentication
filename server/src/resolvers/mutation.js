const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");

module.exports = {
    login: async (_, { email, password }, { models, __, res }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({ email });
        if (!user) {
            throw new AuthenticationError("User not found!");
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new AuthenticationError("Incorrect password!");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.clearCookie("authToken");
        res.cookie("authToken", token, {
            httpOnly: true,
            path: "/"
        });
        return token;
    },
    logout: async (_, __, { ___, user, res }) => {
        if (!user) {
            throw new AuthenticationError("User not found!");
        }
        res.clearCookie("authToken");
        return true;
    },
    signUp: async (_, { username, email, password }, { models, __, res }) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        try {
            const user = await models.User.create({
                username,
                email,
                password: hashed
            });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.clearCookie("authToken");
            res.cookie("authToken", token, {
                httpOnly: true,
                path: "/"
            });
            return token;
        } catch (err) {
            throw new Error("Error creating account!");
        }
    },
    newNote: async (_, { content }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("You must be signed in to create a note");
        }
        console.log("user: ", user);
        console.log("models: ", models);
        return await models.Note.create({
            content,
            author: mongoose.Types.ObjectId(user.id)
        });
    }
}