const prisma = require("../prisma")

const User = {
    posts: async(parent, args) => {
        return await prisma.post.findUnique({where: { author: parent.id }})
    },
    comments: async(parent, args) => {
        return await prisma.comment.findMany({where: { author: parent.id }})
    }
}

module.exports = User