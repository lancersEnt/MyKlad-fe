import User from './User.interface';

export default interface Notification {
  id: string;
  title: string;
  body: string;
  user: User;
  createdBy: string;
  action: string;
  seen: boolean;
  targetUserId: string;
  createdAt: string;
}
