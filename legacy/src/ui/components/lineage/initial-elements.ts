export const initialNodes = [
  {
    id: 'step_58603388-8935-4765-837c-cefdee897f0c',
    type: 'step',
    data: {
      execution_id: '58603388-8935-4765-837c-cefdee897f0c',
      name: 'get_first_num',
      status: 'running',
      entrypoint_name: 'get_first_num',
      parameters: {},
      configuration: {
        enable_cache: true,
        extra: {
          dag_filepath:
            '/home/apenner/PycharmWorkspaces/zenml/examples/airflow_orchestration/run.py',
        },
        name: 'get_first_num',
      },
      inputs: {},
      outputs: {
        first_num:
          '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/get_first_num/first_num/1',
      },
    },
  },
  {
    id: 'artifact_35b6c36e-bd87-43f3-ae58-3a0b750d075a',
    type: 'artifact',
    data: {
      execution_id: '35b6c36e-bd87-43f3-ae58-3a0b750d075a',
      name: 'first_num',
      status: 'completed',
      is_cached: false,
      artifact_type: 'DataArtifact',
      artifact_data_type: 'builtins.int',
      parent_step_id: '58603388-8935-4765-837c-cefdee897f0c',
      producer_step_id: '58603388-8935-4765-837c-cefdee897f0c',
      uri:
        '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/get_first_num/first_num/1',
    },
  },
  {
    id: 'step_3041e36d-e18e-42df-a9b8-d825e390c9db',
    type: 'step',
    data: {
      execution_id: '3041e36d-e18e-42df-a9b8-d825e390c9db',
      name: 'get_random_int',
      status: 'completed',
      entrypoint_name: 'get_random_int',
      parameters: {},
      configuration: {
        extra: {
          dag_filepath:
            '/home/apenner/PycharmWorkspaces/zenml/examples/airflow_orchestration/run.py',
        },
        name: 'get_random_int',
      },
      inputs: {},
      outputs: {
        random_num:
          '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/get_random_int/random_num/2',
      },
    },
  },
  {
    id: 'artifact_37f93090-fb78-49c3-8b32-99fbae695f08',
    type: 'artifact',
    data: {
      execution_id: '37f93090-fb78-49c3-8b32-99fbae695f08',
      name: 'random_num',
      status: 'completed',
      is_cached: false,
      artifact_type: 'DataArtifact',
      artifact_data_type: 'builtins.int',
      parent_step_id: '3041e36d-e18e-42df-a9b8-d825e390c9db',
      producer_step_id: '3041e36d-e18e-42df-a9b8-d825e390c9db',
      uri:
        '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/get_random_int/random_num/2',
    },
  },
  {
    id: 'step_a81acf42-3704-459e-95e0-8cb20a7c3918',
    type: 'step',
    data: {
      execution_id: 'a81acf42-3704-459e-95e0-8cb20a7c3918',
      name: 'subtract_numbers',
      status: 'cached',
      entrypoint_name: 'subtract_numbers',
      parameters: {},
      configuration: {
        enable_cache: true,
        extra: {
          dag_filepath:
            '/home/apenner/PycharmWorkspaces/zenml/examples/airflow_orchestration/run.py',
        },
        name: 'subtract_numbers',
      },
      inputs: {
        first_num:
          '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/get_first_num/first_num/1',
        random_num:
          '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/get_random_int/random_num/2',
      },
      outputs: {
        result:
          '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/subtract_numbers/result/3',
      },
    },
  },
  {
    id: 'artifact_8655ff1f-743c-4c0e-b175-f95d39fa6634',
    type: 'artifact',
    data: {
      execution_id: '8655ff1f-743c-4c0e-b175-f95d39fa6634',
      name: 'result',
      status: 'completed',
      is_cached: false,
      artifact_type: 'DataArtifact',
      artifact_data_type: 'builtins.int',
      parent_step_id: 'a81acf42-3704-459e-95e0-8cb20a7c3918',
      producer_step_id: 'a81acf42-3704-459e-95e0-8cb20a7c3918',
      uri:
        '/home/apenner/.config/zenml/local_stores/70f00157-fbe4-4929-a719-f594fddfeb47/subtract_numbers/result/3',
    },
  },
];

export const initialEdges = [
  {
    id:
      'step_58603388-8935-4765-837c-cefdee897f0c_artifact_35b6c36e-bd87-43f3-ae58-3a0b750d075a',
    source: 'step_58603388-8935-4765-837c-cefdee897f0c',
    target: 'artifact_35b6c36e-bd87-43f3-ae58-3a0b750d075a',
  },
  {
    id:
      'step_3041e36d-e18e-42df-a9b8-d825e390c9db_artifact_37f93090-fb78-49c3-8b32-99fbae695f08',
    source: 'step_3041e36d-e18e-42df-a9b8-d825e390c9db',
    target: 'artifact_37f93090-fb78-49c3-8b32-99fbae695f08',
  },
  {
    id:
      'step_a81acf42-3704-459e-95e0-8cb20a7c3918_artifact_8655ff1f-743c-4c0e-b175-f95d39fa6634',
    source: 'step_a81acf42-3704-459e-95e0-8cb20a7c3918',
    target: 'artifact_8655ff1f-743c-4c0e-b175-f95d39fa6634',
  },
  {
    id:
      'step_a81acf42-3704-459e-95e0-8cb20a7c3918_artifact_35b6c36e-bd87-43f3-ae58-3a0b750d075a',
    source: 'artifact_35b6c36e-bd87-43f3-ae58-3a0b750d075a',
    target: 'step_a81acf42-3704-459e-95e0-8cb20a7c3918',
  },
  {
    id:
      'step_a81acf42-3704-459e-95e0-8cb20a7c3918_artifact_37f93090-fb78-49c3-8b32-99fbae695f08',
    source: 'artifact_37f93090-fb78-49c3-8b32-99fbae695f08',
    target: 'step_a81acf42-3704-459e-95e0-8cb20a7c3918',
  },
];
