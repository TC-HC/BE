import { Category } from '@prisma/client';

export type SubscribeCategoryResponse = {
  uuid: string;
  email: string;
  name: string | null;
  role: string;
  subscribedCategories: Category[];
};
