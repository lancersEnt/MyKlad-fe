import { gql } from '@apollo/client';

export const GET_USER = gql`
  query Query($username: String!) {
    findByUsername(username: $username) {
      id
      firstname
      lastname
      sex
      dateOfBirth
      balance
      address
      phone
      permissions
      username
      email
      profilePictureUrl
      investments {
        id
        partsPurchased
        klad {
          id
          name
          budgetNeeded
          budgetCollected
          pictureUrl
          owner {
            id
            firstname
            username
          }
        }
      }
      klads {
        id
        name
        isDraft
        inReview
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
        shares
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
        klad {
          id
          name
          description
          pictureUrl
          budgetNeeded
          budgetCollected
          partPrice
          owner {
            profilePictureUrl
            username
            firstname
            lastname
          }
        }
        post {
          id
          authorId
          content
          createdAt
          type
          imageUrl
          videoUrl
          documentUrl
          likersIds
          comments {
            id
          }
          user {
            id
            username
            firstname
            profilePictureUrl
            lastname
            permissions
          }
          shares
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
      balance
      permissions
      username
      email
      profilePictureUrl
      klads {
        id
        name
        pictureUrl
        budgetNeeded
        budgetCollected
        partPrice
        isApproved
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
        shares
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
        klad {
          id
          name
          description
          pictureUrl
          budgetNeeded
          budgetCollected
          partPrice
          owner {
            profilePictureUrl
            username
            firstname
            lastname
          }
        }
        post {
          id
          authorId
          content
          createdAt
          type
          imageUrl
          videoUrl
          documentUrl
          likersIds
          comments {
            id
          }
          user {
            id
            username
            firstname
            profilePictureUrl
            lastname
            permissions
          }
          shares
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
        shares
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
        klad {
          id
          name
          description
          pictureUrl
          budgetNeeded
          isApproved
          budgetCollected
          partPrice
          owner {
            profilePictureUrl
            username
            firstname
            lastname
          }
        }
        post {
          id
          authorId
          content
          createdAt
          type
          imageUrl
          videoUrl
          documentUrl
          likersIds
          comments {
            id
          }
          user {
            id
            username
            firstname
            profilePictureUrl
            lastname
            permissions
          }
          shares
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
      shares
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
      klad {
        id
        name
        description
        pictureUrl
        budgetNeeded
        isApproved
        budgetCollected
        partPrice
        owner {
          profilePictureUrl
          username
          firstname
          lastname
        }
      }
      post {
        id
        authorId
        content
        createdAt
        type
        imageUrl
        videoUrl
        documentUrl
        likersIds
        comments {
          id
        }
        user {
          id
          username
          firstname
          profilePictureUrl
          lastname
          permissions
        }
        shares
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
      shares
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
        klad {
          id
          name
          description
          pictureUrl
          budgetNeeded
          isApproved
          budgetCollected
          partPrice
          owner {
            profilePictureUrl
            username
            firstname
            lastname
          }
        }
        post {
          id
          authorId
          content
          createdAt
          type
          imageUrl
          videoUrl
          documentUrl
          likersIds
          comments {
            id
          }
          user {
            id
            username
            firstname
            profilePictureUrl
            lastname
            permissions
          }
          shares
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
      sex
      isActive
      username
      balance
      dateOfBirth
      klads {
        id
        name
        isDraft
        isApproved
        isRejected
        archivedMessagesUrl
        inReview
      }
      investments {
        id
        partsPurchased
        klad {
          id
          name
          budgetNeeded
          budgetCollected
        }
      }
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

export const GET_SUBCATEGORIES = gql`
  query Query {
    subCategories {
      id
      name
    }
  }
`;

export const GET_KLAD = gql`
  query Query($kladId: String!) {
    klad(id: $kladId) {
      id
      name
      description
      pictureUrl
      coverPictureUrl
      isDraft
      isApproved
      isRejected
      archivedMessagesUrl
      inReview
      subCategory {
        id
        name
        category {
          id
          name
        }
      }
      partPrice
      minPartsPurchasable
      maxPartsPurchasable
      budgetNeeded
      budgetCollected
      milestones {
        id
        name
        dueDate
      }
      pictures
      videos
      documents
      createdAt
      owner {
        id
        firstname
        lastname
        username
        profilePictureUrl
      }
      messages {
        id
        content
        user {
          id
          firstname
          lastname
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  }
`;

export const LIVE_KLAD = gql`
  query Query($kladId: String!) {
    liveKlad(id: $kladId) {
      id
      name
      description
      pictureUrl
      coverPictureUrl
      isDraft
      isApproved
      isRejected
      investments {
        id
        partsPurchased
        investor {
          id
          firstname
          lastname
          username
          profilePictureUrl
        }
      }
      archivedMessagesUrl
      inReview
      subCategory {
        id
        name
        category {
          id
          name
        }
      }
      partPrice
      minPartsPurchasable
      maxPartsPurchasable
      budgetNeeded
      budgetCollected
      milestones {
        id
        name
        dueDate
      }
      pictures
      videos
      documents
      createdAt
      owner {
        id
        firstname
        lastname
        username
        profilePictureUrl
      }
      messages {
        id
        content
        user {
          id
          firstname
          lastname
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  }
`;

export const SUBMITTED_KLADS = gql`
  query Query {
    submittedKlads {
      id
      name
      description
      pictureUrl
      coverPictureUrl
      isDraft
      isApproved
      isRejected
      archivedMessagesUrl
      inReview
      subCategory {
        id
        name
        category {
          id
          name
        }
      }
      partPrice
      minPartsPurchasable
      maxPartsPurchasable
      budgetNeeded
      budgetCollected
      milestones {
        id
        name
        dueDate
      }
      pictures
      videos
      documents
      createdAt
      owner {
        id
        firstname
        lastname
        username
        profilePictureUrl
      }
      messages {
        id
        content
        user {
          id
          firstname
          lastname
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  }
`;

export const APPROVED_KLADS = gql`
  query Query {
    approvedKlads {
      id
      name
      description
      pictureUrl
      coverPictureUrl
      isDraft
      isApproved
      isRejected
      archivedMessagesUrl
      inReview
      subCategory {
        id
        name
        category {
          id
          name
        }
      }
      partPrice
      minPartsPurchasable
      maxPartsPurchasable
      budgetNeeded
      budgetCollected
      milestones {
        id
        name
        dueDate
      }
      pictures
      videos
      documents
      createdAt
      owner {
        id
        firstname
        lastname
        username
        profilePictureUrl
      }
      messages {
        id
        content
        user {
          id
          firstname
          lastname
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  }
`;

export const GET_MESSAGE = gql`
  query Query($messageId: String!) {
    message(id: $messageId) {
      id
      content
      user {
        id
        firstname
        lastname
        username
        profilePictureUrl
      }
      createdAt
    }
  }
`;

export const RECOMENDED_KLADS = gql`
  query Query {
    recommendedKlads {
      id
      name
      pictureUrl
      budgetNeeded
      budgetCollected
      partPrice
    }
  }
`;

export const KLADS = gql`
  query Query {
    klads {
      id
      name
      pictureUrl
      budgetNeeded
      budgetCollected
      partPrice
    }
  }
`;

export const FILTRED_KLADS = gql`
  query FiltredKlads($filter: Filter) {
    filtredKlads(filter: $filter) {
      id
      name
      pictureUrl
      budgetNeeded
      budgetCollected
      partPrice
    }
  }
`;

export const MY_KLADS = gql`
  query FiltredKlads {
    myKlads {
      id
      name
      pictureUrl
      budgetNeeded
      budgetCollected
      partPrice
    }
  }
`;

export const USERS = gql`
  query Users {
    users {
      id
      username
      email
      profilePictureUrl
      isActive
      firstname
      lastname
      dateOfBirth
      permissions
    }
  }
`;

export const USER_SEARCH = gql`
  query SearchForUsers($text: String) {
    searchForUsers(text: $text) {
      id
      firstname
      lastname
      username
      profilePictureUrl
      permissions
    }
  }
`;

export const POST_SEARCH = gql`
  query Query($text: String) {
    searchForPosts(text: $text) {
      id
      authorId
      content
      createdAt
      type
      imageUrl
      videoUrl
      documentUrl
      subscribersIds
      shares
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
      klad {
        id
        name
        description
        pictureUrl
        budgetNeeded
        isApproved
        budgetCollected
        partPrice
        owner {
          profilePictureUrl
          username
          firstname
          lastname
        }
      }
      post {
        id
        authorId
        content
        createdAt
        type
        imageUrl
        videoUrl
        documentUrl
        likersIds
        comments {
          id
        }
        user {
          id
          username
          firstname
          profilePictureUrl
          lastname
          permissions
        }
        shares
      }
    }
  }
`;

export const KLAD_SEARCH = gql`
  query SearchForKlads($text: String) {
    searchForKlads(text: $text) {
      id
      name
      partPrice
      pictureUrl
      budgetCollected
      budgetNeeded
    }
  }
`;
