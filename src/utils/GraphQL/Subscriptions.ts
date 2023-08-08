import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION = gql`
  subscription Subscription {
    postCreated {
      newPost {
        id
        imageUrl
        user {
          id
        }
      }
    }
  }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription Subscription($userId: String) {
    notificationCreated(userId: $userId) {
      notification {
        id
        seen
        body
        action
        targetUserId
        createdBy
      }
    }
  }
`;

export const COMMENT_SUBSCRIPTION = gql`
  subscription Subscription($postId: String!) {
    commentCreated(postId: $postId) {
      newComment {
        id
        postId
      }
    }
  }
`;

export const COMMENT_LIKE_SUBSCRIPTION = gql`
  subscription Subscription($postId: String!) {
    commentLiked(postId: $postId) {
      comment {
        id
        postId
      }
    }
  }
`;

export const COMMENT_UNLIKE_SUBSCRIPTION = gql`
  subscription Subscription($postId: String!) {
    commentUnliked(postId: $postId) {
      comment {
        id
        postId
      }
    }
  }
`;

export const POST_LIKE_SUBSCRIPTION = gql`
  subscription Subscription {
    postLiked {
      post {
        id
      }
    }
  }
`;

export const POST_UNLIKE_SUBSCRIPTION = gql`
  subscription Subscription {
    postUnliked {
      post {
        id
      }
    }
  }
`;
