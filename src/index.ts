import {ApolloServer, gql} from 'apollo-server';
import scheme from './scheme'

// GraphQLスキーマの定義
const typeDefs = scheme.getTypeDefs();
import resolvers from './resolvers';

// サーバーの起動
const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
