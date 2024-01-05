const prisma = require('../prisma')

const Post = {
    author: async(parent, args) => {
        return await prisma.user.findUnique({where: {id: parent.author}})
    },
    comments: async(parent, args) => {
        return await prisma.comment.findMany({where: {postId: parent.id}})
    }
}

module.exports = Post