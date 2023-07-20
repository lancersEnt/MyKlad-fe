/* eslint-disable import/no-cycle */
import Comment from './Comment.interface';
import User from './User.interface';

export default interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  likersIds: string[];
  likers: User[];
  user: User;
  comments: Comment[];
}
