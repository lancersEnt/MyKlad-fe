/* eslint-disable import/no-extraneous-dependencies */
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
import { SnackbarProvider } from 'notistack';
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

const commentsWsLink = new WebSocketLink({
  uri: 'ws://localhost:9229/graphql', // Posts subscriptions endpoint
  options: {
    reconnect: true,
  },
});

const notificationsWsLink = new WebSocketLink({
  uri: 'ws://localhost:9559/graphql', // Posts subscriptions endpoint
  options: {
    reconnect: true,
  },
});

// Split requests based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    console.log(definition);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription' &&
        (definition.selectionSet.selections[0].name.value === 'commentLiked' ||
          definition.selectionSet.selections[0].name.value ===
            'commentUnliked' ||
          definition.selectionSet.selections[0].name.value === 'commentCreated')
      );
    },
    commentsWsLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription' &&
          definition.selectionSet.selections[0].name.value ===
            'notificationCreated'
        );
      },
      notificationsWsLink,
      postsWsLink
    )
  ),
  link
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          likers: {
            // shorthand
            merge: true,
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SnackbarProvider maxSnack={3} preventDuplicate>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MyKlad />
      </ApolloProvider>
    </Provider>
  </SnackbarProvider>
);
