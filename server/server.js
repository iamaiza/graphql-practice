require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const User = require("./resolvers/User")
const Post = require("./resolvers/Post")
const Comment = require("./resolvers/Comment")

const startServer = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const schema = fs.readFileSync("./schema.graphql", "utf-8");
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: {
      Query,
      Mutation,
      User,
      Post,
      Comment
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: 4000,
    context: ({ req }) => {
      if(req.headers.authorization === "Bearer undefined" || !req.headers.authorization) {
        console.log("Token is not valid")
        return {};
      }
      const token = req.headers.authorization.split(" ")[1] || "";
      console.log(token);
      const decodedToken = jwt.verify(token, "tokensecretkey")
      console.log(decodedToken);
      const userId = decodedToken.userId;
      console.log(userId);
      return { userId };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer().catch((err) => console.log(err.message));
