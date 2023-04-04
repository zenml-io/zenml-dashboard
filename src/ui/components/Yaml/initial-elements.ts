export const initialNodes = [
  {
    id: 'digits_data_loader',
    type: 'step',
    data: {
      pipeline_parameter_name: 'step_1_',
    },
  },
  {
    id: 'svc_trainer',
    type: 'step',
    data: {
      pipeline_parameter_name: 'step_2_',
    },
  },
];

export const initialEdges = [
  {
    id:
      'step_10',
    source: 'digits_data_loader',
    target: ['1'],
    arrowHeadColor: ""
  },
  {
    id:
      'step_21',
    source: 'digits_data_loader',
    target: ['svc_trainer'],
    arrowHeadColor: ""
  },
];
