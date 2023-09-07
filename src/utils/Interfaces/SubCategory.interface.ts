import { Category } from './Category.interface';

export interface SubCategory {
  id: string;
  name: string;
  category: Category;
}
