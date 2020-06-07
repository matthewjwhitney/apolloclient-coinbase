import gql from "graphql-tag";

const typeDefs = gql`
  type AppConfig {
    currency: Currency
  }

  extend type Query {
    appConfig: AppConfig
  }
  extend type Mutation {
    setAppConfig(currency: Currency): AppConfig
  }
`;
export default typeDefs;
