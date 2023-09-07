import User from './User.interface';

export interface Message {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}
