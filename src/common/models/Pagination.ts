export enum SortDirection {
  asc = "asc",
  desc = "desc",
}
export enum searchBy {
  name = "name",
  title = "title",
  loginOrEmail = "loginOrEmail",
}

export enum typeId {
  postId = "postId",
  blogId = "blogId",
}
export type SortBy = string;

export type sortDirection =
  | "asc"
  | "desc"
  | "ascending"
  | "descending"
  | 1
  | -1;

export interface IPagination<I> {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: I;
}
