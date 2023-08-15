export const constantCommandsToCreateStack = {
  title: 'Stack Cheatsheet',
  documentation:
    'https://docs.zenml.io/user-guide/starter-guide/understand-stacks',
  body: [
    {
      text: 'Register a stack',
      isCode: false,
    },
    {
      text: 'zenml stack register STACK_NAME -o default -a default',
      isCode: true,
    },
    {
      text: 'List stacks',
      isCode: false,
    },
    {
      text: 'zenml stack list',
      isCode: true,
    },
    {
      text: 'Set stack active',
      isCode: false,
    },
    {
      text: 'zenml stack set STACK_NAME',
      isCode: true,
    },
  ],
};
export const constantCommandsToCreateSecret = {
  title: 'Stack Cheatsheet',
  documentation:
    'https://docs.zenml.io/platform-guide/set-up-your-mlops-platform/use-the-secret-store',
};

export const constantCommandsToCreateRepository = {
  documentation:
    'https://docs.zenml.io/user-guide/advanced-guide/environment-management/connect-your-git-repository',
};

export const constantCommandsToCreatePipeline = {
  title: 'Pipeline Cheatsheet',
  documentation: 'https://docs.zenml.io/user-guide/starter-guide',
  body: [
    {
      text: 'Create a pipeline',
      isCode: false,
    },
    {
      text: 'zenml pipeline run -c config.yaml run.py',
      isCode: true,
    },
    {
      text: 'List Pipelines',
      isCode: false,
    },
    {
      text: 'zenml pipeline list',
      isCode: true,
    },
    {
      text: 'List pipeline runs',
      isCode: false,
    },
    {
      text: 'zenml pipeline runs list',
      isCode: true,
    },
  ],
};

export const constantCommandsToCreateRuns = {
  title: 'Runs Cheatsheet',
  documentation:
    'https://docs.zenml.io/user-guide/starter-guide/fetch-runs-after-execution',
  body: [
    {
      text: 'Create a runs',
      isCode: false,
    },
    {
      text: 'zenml runs run -c config.yaml run.py',
      isCode: true,
    },
    {
      text: 'List Runs',
      isCode: false,
    },
    {
      text: 'zenml runs list',
      isCode: true,
    },
    {
      text: 'List runs',
      isCode: false,
    },
    {
      text: 'zenml runs list',
      isCode: true,
    },
  ],
};

export const constantCommandsToCreateComponent = {
  documentation:
    'https://docs.zenml.io/user-guide/starter-guide/understand-stacks',
  componentCommand: {
    type: 'alerter',
    body: [
      {
        text: 'Register an alerter',
        isCode: false,
      },
      {
        text: 'zenml alerter register <ALERTER_NAME> -f <FLAVOR>',
        isCode: true,
      },
      {
        text: 'List alerters',
        isCode: false,
      },
      {
        text: 'zenml alerter list',
        isCode: true,
      },
      {
        text: 'See alerter flavors',
        isCode: false,
      },
      {
        text: 'zenml alerter flavor list',
        isCode: true,
      },
    ],
  },
  defaultBody: [
    {
      text: 'Register a stack component',
      isCode: false,
    },
    {
      text: 'zenml <STACK-COMPONENT> register <STACK_COMP_NAME> -f <FLAVOR>',
      isCode: true,
    },
    {
      text: 'List stack component',
      isCode: false,
    },
    {
      text: 'zenml <STACK-COMPONENT> list',
      isCode: true,
    },
    {
      text: 'See stack component flavors',
      isCode: false,
    },
    {
      text: 'zenml <STACK-COMPONENT> flavor list',
      isCode: true,
    },
  ],
};
