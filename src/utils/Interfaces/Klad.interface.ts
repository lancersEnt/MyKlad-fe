import { Milestone } from './Milestone.interface';
import { SubCategory } from './SubCategory.interface';
import User from './User.interface';

export interface Klad {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  coverPictureUrl: string;
  isApproved: boolean;
  isRejected: boolean;
  isDraft: boolean;
  inReview: boolean;
  subCategory: SubCategory;
  partPrice: number;
  minPartsPurchasable: number;
  maxPartsPurchasable: number;
  budgetNeeded: number;
  budgetCollected: number;
  milestones: Milestone[];
  pictures: string[];
  videos: string[];
  documents: string[];
  createdAt: string;
  owner: User;
}
