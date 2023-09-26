export const searchParamConstants = [
  {
    column: {
      selectedValue: { value: 'id', label: 'ID', type: 'string' },
    },
    contains: {
      selectedValue: {
        value: 'contains',
        label: 'Contains',
        type: 'string',
      },
    },
  },
  {
    column: {
      selectedValue: { value: 'name', label: 'Name', type: 'string' },
    },
    contains: {
      selectedValue: {
        value: 'contains',
        label: 'Contains',
        type: 'string',
      },
    },
  },
];

export const getInitialFilterStateForRuns = () => {
  const initialFilterState = {
    column: {
      selectedValue: {
        value: '',
        label: '',
        type: '',
      },
      statusOption: [
        {
          value: 'completed',
          label: 'Completed',
          type: 'status',
        },
        {
          value: 'failed',
          label: 'Failed',
          type: 'status',
        },
        {
          value: 'running',
          label: 'Running',
          type: 'status',
        },
        {
          value: 'cached',
          label: 'Cached',
          type: 'status',
        },
      ],
      options: [
        {
          value: 'id',
          label: 'Run ID',
          type: 'string',
        },
        {
          value: 'name',
          label: 'Run Name',
          type: 'string',
        },
        {
          value: 'pipeline_id',
          label: 'Pipeline',
          type: 'string',
        },
        {
          value: 'status',
          label: 'Status',
          type: 'status',
        },
        {
          value: 'stack_id',
          label: 'Stack Name',
          type: 'string',
        },
        {
          value: 'user_id',
          label: 'Author',
          type: 'string',
        },

        {
          value: 'created',
          label: 'Created at',
          type: 'date',
        },
      ],
    },
    contains: {
      selectedValue: {},
      statusOption: [
        {
          value: 'completed',
          label: 'Completed',
          type: 'status',
        },
        {
          value: 'failed',
          label: 'Failed',
          type: 'status',
        },
        {
          value: 'running',
          label: 'Running',
          type: 'status',
        },
        {
          value: 'cached',
          label: 'Cached',
          type: 'status',
        },
      ],
      options: [
        {
          value: 'contains',
          label: 'Contains',
          type: 'string',
        },
        {
          value: 'startswith',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'endswith',
          label: 'End With',
          type: 'string',
        },
        {
          value: 'equal',
          label: 'Equal',
          type: 'string',
        },
        {
          value: 'not_equal',
          label: 'Not Equal',
          type: 'string',
        },
        {
          value: 'gt',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'lt',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'gte',
          label: 'Greater than and Equal',
          type: 'date',
        },
        {
          value: 'lte',
          label: 'Less than and Equal',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equals',
          type: 'date',
        },
        {
          value: 'true',
          label: 'True',
          type: 'boolean',
        },
        {
          value: 'false',
          label: 'False',
          type: 'boolean',
        },
        {
          value: 'completed',
          label: 'Completed',
          type: 'status',
        },
        {
          value: 'running',
          label: 'Running',
          type: 'status',
        },
        {
          value: 'failed',
          label: 'Failed',
          type: 'status',
        },
        {
          value: 'cached',
          label: 'Cached',
          type: 'status',
        },
      ],
    },
    filterValue: '',
  };
  return JSON.parse(JSON.stringify(initialFilterState));
};
