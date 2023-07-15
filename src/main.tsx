import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Provider } from 'react-redux';
import { getMainDefinition } from '@apollo/client/utilities';
import MyKlad from './App';
import store from './app/store';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
});

const postsWsLink = new WebSocketLink({
  uri: 'ws://localhost:9119/graphql', // Posts subscriptions endpoint
  options: {
    reconnect: true,
  },
});

// Split requests based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  postsWsLink,
  link
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MyKlad />
    </ApolloProvider>
  </Provider>
);
