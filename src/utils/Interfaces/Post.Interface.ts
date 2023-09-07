/* eslint-disable import/no-cycle */
import Comment from './Comment.interface';
import { Klad } from './Klad.interface';
import User from './User.interface';

export default interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  type: string;
  imageUrl: string;
  videoUrl: string;
  documentUrl: string;
  likersIds: string[];
  shares: number;
  likers: User[];
  subscribers: User[];
  user: User;
  post: Post;
  klad: Klad;
  comments: Comment[];
}
