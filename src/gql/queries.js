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
  buyPrice: gql`
    query buyPrice($currency: String!) {
      buyPrice(currency: $currency) {
        amount
        currency
      }
    }
  `,
  sellPrice: gql`
    query sellPrice($currency: String!) {
      sellPrice(currency: $currency) {
        amount
        currency
      }
    }
  `,
};

export default queries;
