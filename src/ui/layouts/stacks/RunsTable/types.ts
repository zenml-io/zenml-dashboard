export type Sorting =
  | 'id'
  | 'stackRunType'
  | 'runName'
  | 'pipelineName'
  | 'status'
  | 'stackName'
  | 'user.name'
  | 'datasourceCommit'
  | 'createdAt'
  | 'created';

export type SortingDirection = 'ASC' | 'DESC';
