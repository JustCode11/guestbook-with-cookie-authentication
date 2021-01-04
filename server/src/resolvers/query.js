module.exports = {
    me: async (_, __, { models, user }) => {
        if (!user) {
            throw new Error("You are not authenticated!");
        }
        return await models.User.findById(user.id);
    },
    users: async (_, __, { models }) => {
        return await models.User.find({});
    },
    notes: async (_, __, { models }) => {
        return await models.Note.find({});
    }
};