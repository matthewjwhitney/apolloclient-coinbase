import gql from "graphql-tag";

const mutations = {
  setAppConfig: gql`
    mutation setAppConfig($currency: ID) {
      setAppConfig(currency: $currency) @client {
        __typename
        currency {
          id
          name
          __typename
        }
      }
    }
  `,
};

export default mutations;
