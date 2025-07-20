import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import typeDefs from "./schema";
import resolvers from "./resolvers";

// ❶ Create the server once (cold‑start) — survives warm invocations
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  // optional: build a context object here
  context: async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

    return {
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    };
  },
});
