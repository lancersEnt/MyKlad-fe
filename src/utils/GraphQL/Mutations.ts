import { gql } from '@apollo/client';

export const MARK_AS_SEEN = gql`
  mutation MarkAsSeen($markAsSeenId: String) {
    markAsSeen(id: $markAsSeenId) {
      id
    }
  }
`;

export const REQ_RES = gql`
  mutation Mutation($email: String!) {
    forgotPassword(email: $email) {
      id
    }
  }
`;

export const RES_PASS = gql`
  mutation Mutation($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation ($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      content
      authorId
      createdAt
      updatedAt
      user {
        id
        firstname
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      content
    }
  }
`;

export const LIKE_POST = gql`
  mutation Mutation($postId: String!) {
    likePost(postId: $postId) {
      id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation Mutation($postId: String!) {
    unlikePost(postId: $postId) {
      id
    }
  }
`;
export const LIKE_COMMENT = gql`
  mutation Mutation($commentId: String!) {
    likeComment(commentId: $commentId)
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation Mutation($commentId: String!) {
    unlikeComment(commentId: $commentId)
  }
`;

export const FOLLOW = gql`
  mutation follow($followInput: FollowInput!) {
    follow(followInput: $followInput)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($unfollowInput: UnfollowInput!) {
    unfollow(unfollowInput: $unfollowInput)
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation(
    $updateUserId: String!
    $updateUserInput: UpdateUserInput!
  ) {
    updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
      id
    }
  }
`;

export const SIGN_IN = gql`
  mutation Login($user: LoginUserInput!) {
    login(user: $user) {
      user {
        id
        firstname
        lastname
        username
        email
        city
        nationality
        dateOfBirth
        address
        phone
        profilePictureUrl
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
          username
          firstname
          permissions
          lastname
          profilePictureUrl
        }
        following {
          username
          firstname
          permissions
          lastname
          profilePictureUrl
        }
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation Mutation {
    logout
  }
`;

export const SIGNUP = gql`
  mutation signup($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      id
      email
    }
  }
`;

export const ACC_ACTIVATION = gql`
  mutation activateAccount($activationToken: String!) {
    activateUserAccount(activationToken: $activationToken) {
      id
      email
    }
  }
`;

export const ADD_PAGE = gql`
  mutation Mutation($createUserInput: CreateUserInput!, $ownerId: String) {
    createPage(createUserInput: $createUserInput, ownerId: $ownerId) {
      firstname
      email
      phone
      username
      address
      password
    }
  }
`;

export const SWITCH_ACCOUNT = gql`
  mutation Mutation($targetId: String) {
    switchAccount(targetId: $targetId) {
      user {
        id
        firstname
      }
      token
    }
  }
`;

export const SWITCH_BACK = gql`
  mutation Mutation {
    switchBack
  }
`;
