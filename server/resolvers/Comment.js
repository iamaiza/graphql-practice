const prisma = require('../prisma')

const Comment = {
    author: async(parent, args) => {
        return await prisma.user.findUnique({where: {id: parent.author}})
    },
    postId: async(parent, args) => {
        return await prisma.post.findUnique({where: {id: parent.postId}})
    }
}

module.exports = Comment