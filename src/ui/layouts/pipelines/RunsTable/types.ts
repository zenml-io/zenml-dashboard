export type Sorting =
  | 'id'
  | 'pipelineRunType'
  | 'status'
  | 'runName'
  | 'pipelineName'
  | 'datasourceCommit'
  | 'stackName'
  | 'user.name'
  | 'createdAt'
  | 'created';

export type SortingDirection = 'ASC' | 'DESC';
