/* eslint-disable import/no-cycle */
import { Klad } from './Klad.interface';
import User from './User.interface';

export interface Investment {
  id: string;
  partsPurchased: number;
  user: User;
  klad: Klad;
}
