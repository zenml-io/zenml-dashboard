export type Sorting =
  | 'id'
  | 'runName'
  | 'pipelineName'
  | 'stackRunType'
  | 'status'
  | 'stackName'
  | 'user.name'
  | 'datasourceCommit'
  | 'createdAt'
  | 'created';

export type SortingDirection = 'ASC' | 'DESC';
