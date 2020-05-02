import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Amplify from "aws-amplify";
import App from "./components/App";
import gql from "graphql-tag";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import awsExports from "./aws-exports";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { createAuthLink } from "aws-appsync-auth-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./styles.css";

Amplify.configure(awsExports);

const url = awsExports.aws_appsync_graphqlEndpoint;
const region = awsExports.aws_appsync_region;
const auth = {
  type: AUTH_TYPE.API_KEY,
  apiKey: awsExports.aws_appsync_apiKey,
};
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
