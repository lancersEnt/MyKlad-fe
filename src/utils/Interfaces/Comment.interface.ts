/* eslint-disable import/no-cycle */
import User from './User.interface';

export default interface Comment {
  id: string;
  user: User;
  content: string;
  likersIds: string[];
  likers: User[];
}
