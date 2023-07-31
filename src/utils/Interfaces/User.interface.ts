/* eslint-disable import/no-cycle */
import Post from './Post.Interface';

export default interface User {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  permissions: string[];
  followers: User[];
  following: User[];
  posts: Post[];
  profilePictureUrl: string;
}
