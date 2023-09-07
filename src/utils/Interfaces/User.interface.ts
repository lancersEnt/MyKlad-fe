/* eslint-disable import/no-cycle */
import { Investment } from './Investment.interface';
import { Klad } from './Klad.interface';
import Post from './Post.Interface';

export default interface User {
  id: string;
  email: string;
  username: string;
  firstname: string;
  sex: string;
  address: string;
  dateOfBirth: string;
  lastname: string;
  balance: number;
  phone: string;
  permissions: string[];
  investments: Investment[];
  followers: User[];
  following: User[];
  managers: User[];
  klads: Klad[];
  pages: User[];
  posts: Post[];
  profilePictureUrl: string;
}
