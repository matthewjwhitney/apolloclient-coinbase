import React from "react";
import { render } from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";

import { Price } from "./Price";
import { resolvers, typeDefs } from "./gql";
import SelectCurrency from "./SelectCurrency";

const cache = new InMemoryCache({});

const client = new ApolloClient({
  cache,
  resolvers,
  typeDefs,
  uri: "https://1cmnb.sse.codesandbox.io/"
});

const App = () => (
  <ApolloProvider client={client}>
    <Typography variant="h4">Apollo Client - Coinbase API</Typography>
    <Typography>
      A front end react application that uses Apollo Client to fetch a list of
      currencies from Coinbase API via an Apollo Server, store the selected
      currency in local cache, and then using that selected currency, fetch the
      Bitcoin spot price for that currency from Coinbase API via an Apollo
      Server.
    </Typography>
    <br />
    <Typography variant="h5">Demo</Typography>
    <Typography>
      Select a currency to see the price of Bitcoin for that currency. This
      price is updated near real-time from the Apollo Server.
    </Typography>
    <br />
    <SelectCurrency />
    <br />
    <Price />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
