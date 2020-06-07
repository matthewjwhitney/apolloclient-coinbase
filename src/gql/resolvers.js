import queries from "./queries";

const resolvers = {
  Query: {
    appConfig: (_root, _variables, { client }) =>
      client.readQuery(queries.appConfig),
  },
  Mutation: {
    setAppConfig: (_, { currency }, { cache }) => {
      const data = {
        appConfig: { __typename: "AppConfig", currency },
      };
      cache.writeData({ data });
      return data;
    },
  },
};

export default resolvers;
