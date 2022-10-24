export type Sorting =
  | 'id'
  | 'name'
  | 'status'
  | 'flavor'
  | 'isShared'
  | 'user.name'
  | 'datasourceCommit'
  | 'createdAt'
  | 'created';

export type SortingDirection = 'ASC' | 'DESC';
