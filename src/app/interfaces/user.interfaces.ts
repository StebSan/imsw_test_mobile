export interface IUserPagination {
  results: IUser[];
  total: number;
  totalPages: number;
  current: number;
  limit: number;
}

export interface IUser {
  id: string;
  createdAt: string;
  name: string;
  yearsOld: number;
  email: string;
}
