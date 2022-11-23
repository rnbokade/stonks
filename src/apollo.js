import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";

const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret":
    "1kPEv0czGohuy18lm682OipuyWjwKi9vwaWUuYQ4CdseQY962fyd1aBqYpeMKJak",
};
const getHeaders = () => {
  return headers;
};
const cache = new InMemoryCache();
const wsLink = new WebSocketLink({
  uri: "wss://open-skunk-43.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      return { headers: getHeaders() };
    },
  },
});
const httpLink = new HttpLink({
  uri: "https://open-skunk-43.hasura.app/v1/graphql",
  headers: getHeaders(),
});

const link = split(
  ({ query }) => {
    let definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache,
});
