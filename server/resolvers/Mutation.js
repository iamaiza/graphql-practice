const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const jwt = require("jsonwebtoken");

const Mutation = {
  signupUser: async (_, args) => {
    const { name, email, password, imgUrl } = args.data;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        imgUrl,
      },
    });
    const secret = "tokensecretkey";
    const token = jwt.sign({ userId: user.id }, secret);
    return { user, token };
  },
  loginUser: async (_, args) => {
    const { email, password } = args.data;
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new Error("Invalid password");
    }
    const secret = "tokensecretkey";

    const token = jwt.sign({ userId: user.id }, secret);
    return { user, token };
  },
  createPost: async (_, args) => {
    const { title, content, imgUrl, status, createdAt, author } = args.data;
    const parseId = parseInt(author);
    const user = await prisma.user.findUnique({
      where: { id: parseId },
      select: { name: true, imgUrl: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imgUrl,
        status,
        createdAt,
        author: parseId,
      },
    });
    return post;
  },
  createComment: async (_, args) => {
    const { text, author, postId } = args.data;
    const parseAuthorId = parseInt(author);
    const parsePostId = parseInt(postId);
    const user = await prisma.user.findUnique({
      where: { id: parseAuthorId },
      select: { name: true, imgUrl: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const post = await prisma.post.findUnique({
      where: { id: parsePostId },
      select: { title: true },
    });
    if (!post) {
      throw new Error("Post not found");
    }
    const comment = await prisma.comment.create({
      data: {
        text,
        author: parseAuthorId,
        postId: parsePostId,
      },
    });
    return comment;
  },
  updateUser: async (_, args) => {
    const { name, email, password, imgUrl } = args.data;
    const id = parseInt(args.id);
    const existingUser = await prisma.user.findUnique({ where: { id: id } });
    const hashPassword = await bcrypt.hash(password, 10);
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        password:
          password && password !== existingUser.password
            ? !checkPassword
              ? hashPassword
              : existingUser.password
            : existingUser.password,
        imgUrl,
      },
    });
    return user;
  },
  updatePost: async (_, args) => {
    const { title, content, status, imgUrl } = args.data;
    const id = args.id;
    const parseId = parseInt(id);

    const post = await prisma.post.update({
      where: { id: parseId },
      data: {
        title,
        content,
        imgUrl,
        status,
      }
    })

    return post;
  },
  deletePost: async(_, args) => {
    const id = args.id
    const parseId = parseInt(id)
    await prisma.comment.deleteMany({ where: { postId: parseId } })

    const post = await prisma.post.delete({
      where: { id: parseId }
    })
    return post
  },
  updateComment: async(_, args) => {
    const { id, data } = args
    const parseId = parseInt(id)

    const comment = await prisma.comment.update({
      where: { id: parseId },
      data: {
        text: data.text
      }
    })

    return comment;
  },
  deleteComment: async(_, args) => {
    const id = args.id
    const parseId = parseInt(id)
    const comment = await prisma.comment.delete({
      where: { id: parseId }
    })

    return comment
  }
};

module.exports = Mutation;
