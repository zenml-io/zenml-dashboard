const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: 'step_44',
    type: 'step',
    position,
    data: {
      status: 'completed',
      execution_id: '29',
      entrypoint_name: 'get_first_num',
      name: 'get_first_num',
      parameters: {},
      inputs: {},
      outputs: {
        first_num:
          '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/get_first_num/first_num/29',
      },
    },
  },
  {
    id: 'artifact_33',
    type: 'artifact',
    position,
    data: {
      execution_id: '33',
      name: 'first_num',
      is_cached: true,
      artifact_type: 'DataArtifact',
      artifact_data_type: 'builtins.int',
      parent_step_id: '44',
      producer_step_id: '29',
      uri:
        '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/get_first_num/first_num/29',
    },
  },
  {
    id: 'step_45',
    type: 'step',

    position,
    data: {
      status: 'cached',
      execution_id: '45',
      entrypoint_name: 'get_random_int',
      name: 'get_random_int',
      parameters: {},
      inputs: {},
      outputs: {
        random_num:
          '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/get_random_int/random_num/45',
      },
    },
  },
  {
    id: 'artifact_44',
    type: 'artifact',
    position,
    data: {
      execution_id: '44',
      name: 'random_num',
      is_cached: false,
      artifact_type: 'DataArtifact',
      artifact_data_type: 'builtins.int',
      parent_step_id: '45',
      producer_step_id: '45',
      uri:
        '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/get_random_int/random_num/45',
    },
  },
  {
    id: 'step_46',
    type: 'step',

    position,
    data: {
      status: 'running',
      execution_id: '46',
      entrypoint_name: 'subtract_numbers',
      name: 'subtract_numbers',
      parameters: {},
      inputs: {
        first_num:
          '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/get_first_num/first_num/29',
        random_num:
          '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/get_random_int/random_num/45',
      },
      outputs: {
        result:
          '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/subtract_numbers/result/46',
      },
    },
  },
  {
    id: 'artifact_45',
    type: 'artifact',
    position,
    data: {
      execution_id: '45',
      name: 'result',
      is_cached: false,
      artifact_type: 'DataArtifact',
      artifact_data_type: 'builtins.int',
      parent_step_id: '46',
      producer_step_id: '46',
      uri:
        '/home/htahir1/.config/zenml/local_stores/b5954d0e-07f2-4db5-8994-b6fde66d2d30/subtract_numbers/result/46',
    },
  },
];

export const initialEdges = [
  {
    id: 'step_44_artifact_33',
    source: 'step_44',
    target: 'artifact_33',
  },
  {
    id: 'step_45_artifact_44',
    source: 'step_45',
    target: 'artifact_44',
  },
  {
    id: 'step_46_artifact_45',
    source: 'step_46',
    target: 'artifact_45',
  },
  {
    id: 'step_46_artifact_33',
    source: 'artifact_33',
    target: 'step_46',
  },
  {
    id: 'step_46_artifact_44',
    source: 'artifact_44',
    target: 'step_46',
  },
];
