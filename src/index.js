import React from "react";
import { render } from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

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
    <SelectCurrency />
    <Price />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
