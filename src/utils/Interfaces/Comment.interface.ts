import User from './User.interface';

export default interface Comment {
  id: string;
  user: User;
  content: string;
}
