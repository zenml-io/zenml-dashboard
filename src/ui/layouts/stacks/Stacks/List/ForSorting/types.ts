export type Sorting =
  | 'id'
  | 'name'
  | 'status'
  | 'isShared'
  | 'user.name'
  | 'datasourceCommit'
  | 'createdAt'
  | 'created';

export type SortingDirection = 'ASC' | 'DESC';
