import React from "react";
import { render } from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Typography, Link } from "@material-ui/core";

import Price from "./Price";
import { resolvers, typeDefs } from "./gql";
import SelectCurrency from "./SelectCurrency";

const cache = new InMemoryCache({});
const data = {
  appConfig: {
    __typename: "AppConfig",
    currency: { id: "USD", name: "US Dollar", __typename: "Currency" }
  }
};
cache.writeData({ data });
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
    <Typography>
      <Link href="https://codesandbox.io/s/apollo-server-coinbase-api-1cmnb">
        My Demo of "Apollo Server - Coinbase API" that this App uses
      </Link>
    </Typography>
    <Typography>
      <Link href="https://developers.coinbase.com/api/v2">Coinbase API</Link>
    </Typography>
    <br />
    <Typography variant="h5">Demo</Typography>
    <Typography>
      Select a currency to see the price of Bitcoin for that currency. This
      price is updated near real-time from the Apollo Server although
      unfortunately the Coinbase Server only updates about every 30 seconds.
    </Typography>
    <br />
    <SelectCurrency />
    <br />
    <Price />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
