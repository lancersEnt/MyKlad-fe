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
import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr.json';
import en from 'javascript-time-ago/locale/en.json';
import store from './app/store';
import MyKlad from './App';

const link = createHttpLink({
  uri: 'http://192.168.1.199:3000/graphql',
  credentials: 'include',
});

const postsWsLink = new WebSocketLink({
  uri: 'ws://192.168.1.199:9119/graphql', // Posts subscriptions endpoint
  options: {
    reconnect: true,
  },
});

const messagesWsLink = new WebSocketLink({
  uri: 'ws://192.168.1.199:9669/graphql', // messages subscriptions endpoint
  options: {
    reconnect: true,
  },
});

const commentsWsLink = new WebSocketLink({
  uri: 'ws://192.168.1.199:9229/graphql', // Posts subscriptions endpoint
  options: {
    reconnect: true,
  },
});

const notificationsWsLink = new WebSocketLink({
  uri: 'ws://192.168.1.199:9559/graphql', // Posts subscriptions endpoint
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
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      const selections = definition.selectionSet.selections as any[]; // Cast selections as any[]
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription' &&
        (selections[0].name.value === 'commentLiked' ||
          selections[0].name.value === 'commentUnliked' ||
          selections[0].name.value === 'commentCreated')
      );
    },
    commentsWsLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        const selections = definition.selectionSet.selections as any[]; // Cast selections as any[]
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription' &&
          selections[0].name.value === 'notificationCreated'
        );
      },
      notificationsWsLink,
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          const selections = definition.selectionSet.selections as any[]; // Cast selections as any[]
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription' &&
            selections[0].name.value === 'messageCreated'
          );
        },
        messagesWsLink,
        postsWsLink
      )
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
          'Comment.likers': {
            // shorthand
            merge: true,
          },
          'Post.likers': {
            // shorthand
            merge: true,
          },
        },
      },
    },
  }),
});

TimeAgo.addDefaultLocale(fr);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SnackbarProvider maxSnack={3} preventDuplicate>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MyKlad />
      </ApolloProvider>
    </Provider>
  </SnackbarProvider>
);
