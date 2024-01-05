const prisma = require("../prisma")

const Query = {
    me: async(_, __, { userId }) => {
        if(!userId) {
            throw new Error("You are not authenticated!")
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user;
    },
    users: async(_, args) => {
        const allUsers = await prisma.user.findMany()
        return allUsers;
    },
    post: async(_, args) => {
        const parseId = parseInt(args.id)
        const post = await prisma.post.findUnique({
            where: {
                id: parseId
            }
        })
        return post;
    },
    posts: async(_, args, { userId }) => {
        const allPosts = await prisma.post.findMany({ where: { status: "public" } })
        return allPosts;
    },
    myPosts: async(_, args, { userId }) => {
        if(!userId) {
            throw new Error("No user found!")
        }
        const parseId = parseInt(userId);
        const myPosts = await prisma.post.findMany({ where: { author: parseId } })
        return myPosts;
    },
}

module.exports = Query