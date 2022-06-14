import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import {
  ApolloServer,
  ExpressContext,
} from "apollo-server-express";
import * as express from "express";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { GRAPHQL_SCHEMA_PATH } from "./constants";
import { Server } from "http";
import Db from "./db";
import resolvers, { TwitterResolverContext } from "./resolvers";

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {

  const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
    loaders: [new GraphQLFileLoader()],
  });

  const server = new ApolloServer({
    schema: addResolversToSchema({
      schema: SCHEMA,
      resolvers,
    }),
    context: (): TwitterResolverContext => ({ db }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  return server;
}