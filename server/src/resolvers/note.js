module.exports = {
    author: async (note, _, { models }) => {
        return await models.User.findById(note.author);
    }
}