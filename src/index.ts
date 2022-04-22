
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import scheme from './scheme'
//import LibTask from './lib/LibTask';
//import LibCsrf from './lib/LibCsrf';
//
const typeDefs = scheme.getTypeDefs();
import resolvers from './resolvers';

/* serever-Start */
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });
// ENV
//console.log(app.get('env'));
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
//  logger.info("Server ready");
});