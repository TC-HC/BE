import { UserPostStat } from './UserPostStat.type';

export type PostStatsResponse = {
  data: UserPostStat[];
  pagination: {
    page: number;
    limit: number;
  };
};
