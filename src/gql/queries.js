import gql from "graphql-tag";

const queries = {
  appConfig: gql`
    query appConfig {
      appConfig @client {
        __typename
        currency @client {
          __typename
          id
          name
        }
      }
    }
  `,
  currencies: gql`
    query currencies {
      currencies {
        id
        name
      }
    }
  `,
  spotPrice: gql`
    query spotPrice($currency: String!) {
      spotPrice(currency: $currency) {
        amount
        currency
      }
    }
  `
};

export default queries;
