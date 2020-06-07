import queries from "./queries";

const resolvers = {
  Query: {
    AppConfig: (_root, _variables, { client }) =>
      client.readQuery(queries.appConfig)
  },
  Mutation: {
    setAppConfig: (_root, { currency }, { client }) => {
      const data = {
        appConfig: {
          currency
        }
      };
      client.writeQuery({
        query: queries.appConfig,
        data
      });
      return data;
    }
  }
};

export default resolvers;
