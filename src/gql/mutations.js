import gql from "graphql-tag";

const mutations = {
  setAppConfig: gql`
    mutation setAppConfig($currency: ID) {
      setAppConfig(currency: $currency) @client {
        currency
      }
    }
  `
};

export default mutations;
