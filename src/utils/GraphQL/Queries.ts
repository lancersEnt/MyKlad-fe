import { gql } from '@apollo/client';

export const GET_USER = gql`
  query Query($username: String!) {
    findByUsername(username: $username) {
      id
      firstname
      lastname
      permissions
      username
      email
      profilePictureUrl
      followers {
        firstname
        lastname
        username
        profilePictureUrl
        permissions
        email
      }
      following {
        firstname
        lastname
        profilePictureUrl
        username
        permissions
        email
      }
      posts {
        id
        authorId
        content
        createdAt
        type
        imageUrl
        videoUrl
        documentUrl
        likersIds
        subscribers {
          id
          firstname
          lastname
        }
        likers {
          id
          firstname
          lastname
          permissions
          profilePictureUrl
          username
        }
        comments {
          id
          content
          user {
            id
            username
            firstname
            lastname
            profilePictureUrl
            username
            permissions
          }
          likersIds
          likers {
            id
            firstname
            lastname
            profilePictureUrl
            permissions
            username
          }
        }
        user {
          id
          username
          firstname
          profilePictureUrl
          lastname
          permissions
        }
      }
    }
  }
`;

export const GET_PAGE = gql`
  query Query($username: String!) {
    findPageByUsername(username: $username) {
      id
      firstname
      lastname
      permissions
      username
      email
      profilePictureUrl
      managers {
        id
        firstname
        lastname
        username
        permissions
        profilePictureUrl
        email
        pages {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
          email
        }
      }
      followers {
        firstname
        lastname
        username
        profilePictureUrl
        permissions
        email
      }
      following {
        firstname
        lastname
        profilePictureUrl
        username
        permissions
        email
      }
      posts {
        id
        authorId
        content
        createdAt
        type
        imageUrl
        videoUrl
        documentUrl
        likersIds
        subscribers {
          id
          firstname
          lastname
        }
        likers {
          id
          firstname
          lastname
          permissions
          profilePictureUrl
          username
        }
        comments {
          id
          content
          user {
            id
            username
            firstname
            lastname
            profilePictureUrl
            username
            permissions
          }
          likersIds
          likers {
            id
            firstname
            lastname
            profilePictureUrl
            permissions
            username
          }
        }
        user {
          id
          username
          firstname
          profilePictureUrl
          lastname
          permissions
        }
      }
    }
  }
`;

export const UNSEEN_NOTIFICATIONS_COUNT = gql`
  query Query {
    userUnseenNotificationsCount
  }
`;

export const LATEST_NOTIFICATIONS = gql`
  query LatestNotifications {
    userLatestNotifications {
      id
      title
      body
      action
      createdBy
      targetUserId
      seen
      createdAt
      user {
        id
        username
        firstname
        lastname
        permissions
        profilePictureUrl
      }
    }
  }
`;

export const FEED = gql`
  query Query($page: Int!) {
    feed(page: $page) {
      count
      posts {
        id
        authorId
        content
        createdAt
        type
        imageUrl
        videoUrl
        documentUrl
        likersIds
        subscribers {
          id
          firstname
          lastname
        }
        likers {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
        }
        comments {
          id
          content
          likersIds
          likers {
            id
            firstname
            lastname
            username
            permissions
            profilePictureUrl
          }
          user {
            id
            firstname
            lastname
            username
            permissions
            profilePictureUrl
          }
        }
        user {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query Post($postId: String!) {
    post(id: $postId) {
      id
      authorId
      content
      createdAt
      type
      imageUrl
      videoUrl
      documentUrl
      subscribersIds
      subscribers {
        id
        firstname
        lastname
        permissions
        profilePictureUrl
      }
      likersIds
      likers {
        id
        firstname
        lastname
        username
        permissions
        profilePictureUrl
      }
      comments {
        id
        content
        likersIds
        likers {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
        }
        user {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
        }
      }
      user {
        id
        firstname
        lastname
        username
        permissions
        profilePictureUrl
      }
    }
  }
`;

export const POST_COMMENTS = gql`
  query PostComments($postId: String!) {
    postComments(postId: $postId) {
      id
      content
      authorId
      likers {
        id
        firstname
        lastname
        username
        permissions
        profilePictureUrl
      }
      likersIds
      user {
        id
        firstname
        lastname
        email
        permissions
        username
        profilePictureUrl
      }
    }
  }
`;

export const POST = gql`
  query Post($postId: String!) {
    post(id: $postId) {
      id
      likersIds
      likers {
        id
        firstname
        lastname
        permissions
        username
        profilePictureUrl
      }
      comments {
        id
        content
        authorId
        likers {
          id
          firstname
          lastname
          permissions
          username
          profilePictureUrl
        }
        likersIds
        user {
          id
          firstname
          lastname
          email
          permissions
          username
          profilePictureUrl
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      firstname
      lastname
      username
      dateOfBirth
      city
      address
      nationality
      phone
      profilePictureUrl
      email
      permissions
      pages {
        id
        firstname
        lastname
        username
        permissions
        profilePictureUrl
        email
        managers {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
          email
        }
      }
      managers {
        id
        firstname
        lastname
        username
        permissions
        profilePictureUrl
        email
        pages {
          id
          firstname
          lastname
          username
          permissions
          profilePictureUrl
          email
        }
      }
      followers {
        firstname
        lastname
        username
        permissions
        profilePictureUrl
        email
      }
      following {
        firstname
        lastname
        username
        permissions
        profilePictureUrl
        email
      }
    }
  }
`;

export const DISCOVER_KLADERS = gql`
  query Query($discoverInput: DiscoverInput) {
    discoverUsers(discoverInput: $discoverInput) {
      id
      firstname
      lastname
      permissions
      username
      profilePictureUrl
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query Notification {
    userNotifications {
      id
      title
      body
      action
      createdBy
      targetUserId
      seen
      createdAt
      user {
        id
        username
        firstname
        permissions
        lastname
        profilePictureUrl
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
`;
