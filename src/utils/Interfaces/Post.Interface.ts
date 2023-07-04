import Comment from './Comment.interface';
import User from './User.interface';

export default interface Post {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  comments: Comment[];
}
