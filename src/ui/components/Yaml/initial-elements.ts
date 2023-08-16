export const initialNodes = [
  {
    id: 'loader_mnist',
    type: 'step',
    data: {
      pipeline_parameter_name: 'importer',
    },
  },
  {
    id: 'normalizer',
    type: 'step',
    data: {
      pipeline_parameter_name: 'normalizer',
    },
  },
  {
    id: 'tf_trainer',
    type: 'step',
    data: {
      pipeline_parameter_name: 'trainer',
    },
  },
  {
    id: 'tf_evaluator',
    type: 'step',
    data: {
      pipeline_parameter_name: 'evaluator',
    },
  },
];

export const initialEdges = [
  {
    id: 'step_10',
    target: 'loader_mnist',
    source: '0',
    arrowHeadColor: '',
  },
  {
    id: 'step_11',
    target: 'normalizer',
    source: 'loader_mnist',
    arrowHeadColor: '',
  },
  {
    id: 'step_12',
    target: 'tf_trainer',
    source: 'loader_mnist',
    arrowHeadColor: '',
  },
  {
    id: 'step_13',
    target: 'tf_trainer',
    source: 'normalizer',
    arrowHeadColor: '',
  },
  {
    id: 'step_14',
    target: 'tf_evaluator',
    source: 'loader_mnist',
    arrowHeadColor: '',
  },
  {
    id: 'step_15',
    target: 'tf_evaluator',
    source: 'tf_trainer',
    arrowHeadColor: '',
  },
];
