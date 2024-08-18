export type PaginationData<TData> = {
  current_page: number;
  data: TData[];
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};
