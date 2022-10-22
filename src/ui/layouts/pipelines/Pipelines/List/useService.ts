/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pipelinePagesActions,
  pipelinesActions,
} from '../../../../../redux/actions';
import {
  pipelinePagesSelectors,
  pipelineSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredPipelines: TPipeline[];
  setFilteredPipelines: (pipelines: TPipeline[]) => void;
  setSelectedRunIds: (ids: TId[]) => void;
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
}

interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = (
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[],
): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    null,
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');

  const dispatch = useDispatch();

  const [openPipelineIds, setOpenPipelineIds] = useState<TId[]>([]);
  const [filteredPipelines, setFilteredPipelines] = useState<TPipeline[]>([]);

  const fetching = useSelector(pipelinePagesSelectors.fetching);

  const currentWorkspace = useSelector(pipelinePagesSelectors.currentWorkspace);

  const pipelines = useSelector(pipelineSelectors.myPipelines);

  const newPipeline = [
    {
      id: '0ad281ba-9d57-4685-aadf-018a063f6dfa',
      created: '2022-10-08T13:57:13',
      updated: '2022-10-08T13:57:13',
      user: {
        id: '8bf46ca2-8194-4540-8abb-364f63f44baa',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:30:28',
        name: 'default',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'first_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'run.my_first_step',
            upstream_steps: [],
          },
          {
            source: 'run.my_second_step',
            upstream_steps: ['my_first_step'],
          },
        ],
      },
      runs: [
        {
          id: '14ae49d7-7232-4783-b5ed-fc76b395b423',
          created: '2022-10-08T13:57:48',
          updated: '2022-10-08T13:57:48',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'first_pipeline-08_Oct_22-15_57_11_673238',
          stack_id: '6a05f5a9-6d4c-4f8c-874a-7d3c483076ed',
          pipeline_id: '0ad281ba-9d57-4685-aadf-018a063f6dfa',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath: '/home/htahir1/workspace/zenml/run.py',
            },
            name: 'first_pipeline',
            settings: {},
          },
          num_steps: 2,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 86,
        },
        {
          id: 'cf03c284-0235-4ec2-8b53-2cf3e5ec0c61',
          created: '2022-10-08T14:57:07',
          updated: '2022-10-08T14:57:07',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'first_pipeline-08_Oct_22-16_56_35_713957',
          stack_id: '6a05f5a9-6d4c-4f8c-874a-7d3c483076ed',
          pipeline_id: '0ad281ba-9d57-4685-aadf-018a063f6dfa',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath: '/home/htahir1/workspace/zenml/run.py',
            },
            name: 'first_pipeline',
            settings: {},
          },
          num_steps: 2,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 93,
        },
      ],
      status: ['completed', 'completed'],
    },
    {
      id: '1192642a-daeb-4aa6-b238-6e615a44a839',
      created: '2022-10-13T11:37:23',
      updated: '2022-10-13T11:37:23',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'scipy_example_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.loader.loader_step.importer',
            upstream_steps: [],
          },
          {
            source: 'steps.vectorizer.vectorizer_step.vectorizer',
            upstream_steps: ['importer'],
          },
          {
            source: 'steps.trainer.trainer_step.trainer',
            upstream_steps: ['importer', 'vectorizer'],
          },
          {
            source: 'steps.predictor.predictor_step.predictor',
            upstream_steps: ['importer', 'trainer', 'vectorizer'],
          },
        ],
      },
      runs: [],
      status: [],
    },
    {
      id: '13db5416-8982-494e-b020-60bac417146a',
      created: '2022-10-16T17:02:52',
      updated: '2022-10-16T17:02:52',
      user: {
        id: 'bad9de78-953f-4712-99dc-b6e8197be896',
        created: '2022-10-14T13:25:16',
        updated: '2022-10-14T13:27:12',
        name: 'jayesh',
        full_name: 'Jayesh Sharma',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'model_deployment_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'pipeline.importer_mnist',
            upstream_steps: [],
          },
          {
            source: 'pipeline.normalizer',
            upstream_steps: ['importer_mnist'],
          },
          {
            source: 'pipeline.tf_trainer',
            upstream_steps: ['importer_mnist', 'normalizer'],
          },
          {
            source: 'pipeline.tf_evaluator',
            upstream_steps: ['importer_mnist', 'normalizer', 'tf_trainer'],
          },
          {
            source: 'pipeline.deployment_trigger',
            upstream_steps: ['tf_evaluator'],
          },
          {
            source:
              'zenml.integrations.seldon.steps.seldon_deployer.seldon_model_deployer_step@zenml_0.20.2',
            upstream_steps: ['deployment_trigger', 'tf_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '21b5932d-4778-4c9f-b2d7-58f5df571a92',
          created: '2022-10-17T14:07:05',
          updated: '2022-10-17T14:07:05',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'model-deployment-pipeline-kxzws',
          stack_id: '812cb809-3183-43c0-818c-0436003f8780',
          pipeline_id: '13db5416-8982-494e-b020-60bac417146a',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/model_deployment/run.py',
            },
            name: 'model_deployment_pipeline',
            settings: {
              docker: {
                required_integrations: ['seldon', 'tensorflow', 'sklearn'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 525,
        },
        {
          id: '2fc8a272-e344-4129-b16f-0190bd2475b5',
          created: '2022-10-17T17:30:08',
          updated: '2022-10-17T17:30:08',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'model_deployment_pipeline-17_Oct_22-22_58_40_674899',
          stack_id: 'f53607f1-5715-41c2-872a-d899aa38a81a',
          pipeline_id: '13db5416-8982-494e-b020-60bac417146a',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/model_deployment/run.py',
              seldon_docker_image:
                'demozenmlcontainerregistry.azurecr.io/zenml@sha256:7471e38c87cb2a913f65cab0cd119318cbaf79b142dfa626c88c04f0c0238be4',
            },
            name: 'model_deployment_pipeline',
            settings: {
              docker: {
                required_integrations: ['seldon', 'tensorflow', 'sklearn'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 593,
        },
        {
          id: '38f3c0ce-a595-4b2f-afc4-1605a5dcbe5f',
          created: '2022-10-17T17:14:00',
          updated: '2022-10-17T17:14:00',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'model_deployment_pipeline-17_Oct_22-22_33_28_860357',
          stack_id: 'f53607f1-5715-41c2-872a-d899aa38a81a',
          pipeline_id: '13db5416-8982-494e-b020-60bac417146a',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/model_deployment/run.py',
              seldon_docker_image:
                'demozenmlcontainerregistry.azurecr.io/zenml@sha256:31a71b3fd1e54675bb81ae7f17847b96c2c93c2b7d76274ec7fc5d426240f7cc',
            },
            name: 'model_deployment_pipeline',
            settings: {
              docker: {
                required_integrations: ['seldon', 'tensorflow', 'sklearn'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 585,
        },
      ],
      status: ['failed', 'running', 'failed'],
    },
    {
      id: '16cbce9c-a206-4728-835c-8d7e9c29d58f',
      created: '2022-10-11T13:56:42',
      updated: '2022-10-11T13:56:42',
      user: {
        id: '8bf46ca2-8194-4540-8abb-364f63f44baa',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:30:28',
        name: 'default',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'hamza_test_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'simple_run.get_first_num',
            upstream_steps: [],
          },
          {
            source: 'simple_run.get_random_int',
            upstream_steps: [],
          },
          {
            source: 'simple_run.subtract_numbers',
            upstream_steps: ['get_first_num', 'get_random_int'],
          },
        ],
      },
      runs: [
        {
          id: '23cbd590-e6b2-4c64-91ea-cfd6c93dfa20',
          created: '2022-10-11T14:01:28',
          updated: '2022-10-11T14:01:28',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'hamza-test-pipeline-djfds',
          stack_id: '5ba86b38-8d2d-421e-b642-0c2fb8f471f2',
          pipeline_id: '16cbce9c-a206-4728-835c-8d7e9c29d58f',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/htahir1/workspace/zenml_io/demos/demos/orchestration_portability_deepchecks_demo/simple_run.py',
            },
            name: 'hamza_test_pipeline',
            settings: {
              docker: {
                build_context_root: '/home/htahir1/workspace/zenml_io/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                },
                dockerfile:
                  '/home/htahir1/workspace/zenml_io/zenml/local-pip.Dockerfile',
              },
              'orchestrator.kubeflow': {
                client_args: {
                  cookies:
                    'authservice_session=MTY2NTQ5Njc5NHxOd3dBTkVWQ1RqWTNVRVJKUmtaV1ZrRkhWMDlWVmxGS1FUVmFUbEpNVlRKWldVeEhSa3hNUWtGS1FWaFBOVUphVmtsYVZFbFZSRUU9fM2rShlTqDtwPGkTqQlE4lo8YBg6BZUvKzOe8xPkFGFV',
                  host: 'http://localhost:8081/pipeline',
                },
                user_namespace: 'michael',
              },
              resources: {
                cpu_count: 0.2,
                memory: '512MiB',
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 133,
        },
        {
          id: '2d8f7190-b1b7-4be5-9aef-95b7ca27940e',
          created: '2022-10-11T13:57:58',
          updated: '2022-10-11T13:57:58',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'hamza-test-pipeline-wmvk8',
          stack_id: '5ba86b38-8d2d-421e-b642-0c2fb8f471f2',
          pipeline_id: '16cbce9c-a206-4728-835c-8d7e9c29d58f',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/htahir1/workspace/zenml_io/demos/demos/orchestration_portability_deepchecks_demo/simple_run.py',
            },
            name: 'hamza_test_pipeline',
            settings: {
              docker: {
                build_context_root: '/home/htahir1/workspace/zenml_io/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                },
                dockerfile:
                  '/home/htahir1/workspace/zenml_io/zenml/local-pip.Dockerfile',
              },
              'orchestrator.kubeflow': {
                client_args: {
                  cookies:
                    'authservice_session=MTY2NTQ5NjU5N3xOd3dBTkVwWFNqZE1TMU5TVlU0MFNrRkVWRlZTVGtoRlJVUXpTVlpXTkZkWVdrbEZOMVZYVlVOUVdVRTFRelpKVDFnMVdsUlhXRUU9fNUxH1ASuoadXfXLCg33mfH94seoVIX8pSSi2wSlS9Wu',
                  host: 'http://localhost:8081/pipeline',
                },
                user_namespace: 'michael',
              },
              resources: {
                cpu_count: 0.2,
                memory: '512MiB',
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 125,
        },
        {
          id: '3bd34766-bcb9-4318-a1bf-6073940e63fb',
          created: '2022-10-11T15:45:19',
          updated: '2022-10-11T15:45:19',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'hamza-test-pipeline-h4prk',
          stack_id: '5ba86b38-8d2d-421e-b642-0c2fb8f471f2',
          pipeline_id: '16cbce9c-a206-4728-835c-8d7e9c29d58f',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/htahir1/workspace/zenml_io/demos/demos/orchestration_portability_deepchecks_demo/simple_run.py',
            },
            name: 'hamza_test_pipeline',
            settings: {
              docker: {
                build_context_root: '/home/htahir1/workspace/zenml_io/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                },
                dockerfile:
                  '/home/htahir1/workspace/zenml_io/zenml/local-pip.Dockerfile',
              },
              'orchestrator.kubeflow': {
                client_args: {
                  cookies:
                    'authservice_session=MTY2NTUwMzAyNXxOd3dBTkZreVIweFBVVlpYU2xCV1JGUmFTazFHUkRVM1NVOVZVVmN5VTFaT1RWTldXRm95VWtOSFNFWk9NbGRXU0V4WlJqTllOVkU9fCFiDnA0dFQVMd37fSK-lg8lU1p3L2F_mO9dYKimTkET',
                  host: 'https://www.kubeflow.zenml.io/pipeline',
                },
                user_namespace: 'michael',
              },
              resources: {
                cpu_count: 0.2,
                memory: '512MiB',
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 169,
        },
      ],
      status: ['running', 'running', 'completed'],
    },
    {
      id: '2f13a04e-63c1-4454-bb49-7ec391878ee3',
      created: '2022-10-13T08:13:31',
      updated: '2022-10-13T08:13:31',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'tensorflow_custom_code_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'seldon_tensorflow.steps.tf_data_loader.tf_data_loader',
            upstream_steps: [],
          },
          {
            source: 'seldon_tensorflow.steps.tf_trainer.tf_trainer',
            upstream_steps: ['tf_data_loader'],
          },
          {
            source: 'seldon_tensorflow.steps.tf_evaluator.tf_evaluator',
            upstream_steps: ['tf_data_loader', 'tf_trainer'],
          },
          {
            source:
              'seldon_tensorflow.steps.deployment_trigger.deployment_trigger',
            upstream_steps: ['tf_evaluator'],
          },
          {
            source:
              'zenml.integrations.seldon.steps.seldon_deployer.seldon_custom_model_deployer_step@zenml_0.20.3',
            upstream_steps: ['deployment_trigger', 'tf_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '29dcf9d2-d2e9-4539-86bc-5bfdba7d8572',
          created: '2022-10-13T08:19:41',
          updated: '2022-10-13T08:19:41',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'tensorflow_custom_code_pipeline-13_Oct_22-08_13_30_989088',
          stack_id: '16b90d61-e761-4876-bf17-acd8e033c4cd',
          pipeline_id: '2f13a04e-63c1-4454-bb49-7ec391878ee3',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenml/examples/custom_code_deployment/run_seldon_tensorflow.py',
              seldon_docker_image:
                'gcr.io/zenml-core/zenml-kubeflow/zenml@sha256:49e5306193f12e8e5ba37c738d945555a3fa5f5851b81d7620bbfd54a4afabf7',
            },
            name: 'tensorflow_custom_code_pipeline',
            settings: {
              docker: {
                required_integrations: ['seldon', 'tensorflow'],
                requirements: ['Pillow'],
              },
            },
          },
          num_steps: 5,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 231,
        },
        {
          id: '80e93aff-1de3-4d78-a980-5d89890be786',
          created: '2022-10-13T08:30:46',
          updated: '2022-10-13T08:30:46',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'tensorflow_custom_code_pipeline-13_Oct_22-08_28_51_921147',
          stack_id: '16b90d61-e761-4876-bf17-acd8e033c4cd',
          pipeline_id: '2f13a04e-63c1-4454-bb49-7ec391878ee3',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenml/examples/custom_code_deployment/run_seldon_tensorflow.py',
              seldon_docker_image:
                'gcr.io/zenml-core/zenml-kubeflow/zenml@sha256:b74a3fa50dc7cd4fb4b53a93cdd63c47d26481f9e0048b7065b1b12a564583aa',
            },
            name: 'tensorflow_custom_code_pipeline',
            settings: {
              docker: {
                required_integrations: ['seldon', 'tensorflow'],
                requirements: ['Pillow'],
              },
            },
          },
          num_steps: 5,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 261,
        },
        {
          id: 'f37ab0db-b80e-49ed-af41-ca20f14ea294',
          created: '2022-10-13T08:30:46',
          updated: '2022-10-13T08:30:46',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'tensorflow_custom_code_pipeline-13_Oct_22-08_25_11_835699',
          stack_id: '16b90d61-e761-4876-bf17-acd8e033c4cd',
          pipeline_id: '2f13a04e-63c1-4454-bb49-7ec391878ee3',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenml/examples/custom_code_deployment/run_seldon_tensorflow.py',
              seldon_docker_image:
                'gcr.io/zenml-core/zenml-kubeflow/zenml@sha256:124957fb8d81ca7ef78d2b7dbd10094516737e6557bb4b3c15027ddfad2674a1',
            },
            name: 'tensorflow_custom_code_pipeline',
            settings: {
              docker: {
                required_integrations: ['seldon', 'tensorflow'],
                requirements: ['Pillow'],
              },
            },
          },
          num_steps: 5,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 254,
        },
      ],
      status: ['failed', 'running', 'failed'],
    },
    {
      id: '350538e2-1946-4faf-9e51-6726cf66155a',
      created: '2022-10-13T15:53:53',
      updated: '2022-10-13T15:53:53',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'data_analysis_pipeline',
      docstring:
        'Defines a one-time pipeline to detect drift before and after Curry shot.\n\n    Args:\n        importer: Import step to query data.\n        drift_splitter: Split data step for drift calculation.\n        drift_detector: Detect drift step.\n        drift_analyzer: Analyze step to parse drift report.\n    ',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.importer.game_data_importer',
            upstream_steps: [],
          },
          {
            source: 'steps.splitter.date_based_splitter',
            upstream_steps: ['game_data_importer'],
          },
          {
            source:
              'zenml.integrations.evidently.steps.evidently_profile.EvidentlyProfileStep@zenml_0.20.3',
            upstream_steps: ['date_based_splitter'],
          },
          {
            source: 'steps.analyzer.analyze_drift',
            upstream_steps: ['EvidentlyProfileStep'],
          },
        ],
      },
      runs: [
        {
          id: '5b4bdfa3-bf76-4a61-92b3-e3150bf3a77c',
          created: '2022-10-13T16:01:34',
          updated: '2022-10-13T16:01:34',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'data_analysis_pipeline-13_Oct_22-15_59_49_851501',
          stack_id: '0feb1888-8754-46f3-a3f5-aaaa94a07f29',
          pipeline_id: '350538e2-1946-4faf-9e51-6726cf66155a',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/nba-pipeline/run_pipeline.py',
            },
            name: 'data_analysis_pipeline',
            settings: {},
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 398,
        },
        {
          id: '646bf138-0f7c-4438-b47e-6acb0aa7e7bb',
          created: '2022-10-13T16:03:34',
          updated: '2022-10-13T16:03:34',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'data_analysis_pipeline-13_Oct_22-16_02_09_849674',
          stack_id: '0feb1888-8754-46f3-a3f5-aaaa94a07f29',
          pipeline_id: '350538e2-1946-4faf-9e51-6726cf66155a',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/nba-pipeline/run_pipeline.py',
            },
            name: 'data_analysis_pipeline',
            settings: {},
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 400,
        },
        {
          id: '6e0b2707-7fd5-4370-9817-06d3342ed5e1',
          created: '2022-10-13T15:56:15',
          updated: '2022-10-13T15:56:15',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'data_analysis_pipeline-13_Oct_22-15_53_52_480324',
          stack_id: '0feb1888-8754-46f3-a3f5-aaaa94a07f29',
          pipeline_id: '350538e2-1946-4faf-9e51-6726cf66155a',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/nba-pipeline/run_pipeline.py',
            },
            name: 'data_analysis_pipeline',
            settings: {},
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 390,
        },
      ],
      status: ['failed', 'completed', 'failed'],
    },
    {
      id: '37feb34f-e1b1-4333-801b-ec44142f24d8',
      created: '2022-10-07T15:39:10',
      updated: '2022-10-07T15:39:10',
      user: {
        id: '8bf46ca2-8194-4540-8abb-364f63f44baa',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:30:28',
        name: 'default',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'lgbm_pipeline',
      docstring: 'Links all the steps together in a pipeline',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.data_loader.data_loader_step.data_loader',
            upstream_steps: [],
          },
          {
            source: 'steps.trainer.trainer_step.trainer',
            upstream_steps: ['data_loader'],
          },
          {
            source: 'steps.predictor.predictor_step.predictor',
            upstream_steps: ['trainer'],
          },
        ],
      },
      runs: [
        {
          id: '0b2c8001-3699-40a8-bdb4-8c4b4c2d4d7b',
          created: '2022-10-07T15:41:23',
          updated: '2022-10-07T15:41:23',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'lgbm-pipeline-nq67s',
          stack_id: 'c4a9dfaa-f5ef-4636-9972-c0be679d62f8',
          pipeline_id: '37feb34f-e1b1-4333-801b-ec44142f24d8',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenml/examples/lightgbm/run.py',
            },
            name: 'lgbm_pipeline',
            settings: {
              docker: {
                parent_image:
                  'gcr.io/zenml-core/zenml-kubeflow/zenml-new-server:latest',
                required_integrations: ['lightgbm'],
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 27,
        },
        {
          id: 'd96d3db9-14d2-4fe8-951d-7aa31cbf4431',
          created: '2022-10-07T15:41:10',
          updated: '2022-10-07T15:41:10',
          user: '2911566f-b8f5-43ff-a7aa-19fc84ff32eb',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'lgbm_pipeline-07_Oct_22-17_40_42_811391',
          stack_id: 'd5a55d8e-814d-45e0-b95c-78db324ca31e',
          pipeline_id: '37feb34f-e1b1-4333-801b-ec44142f24d8',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/lightgbm/run.py',
            },
            name: 'lgbm_pipeline',
            settings: {
              docker: {
                required_integrations: ['lightgbm'],
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 24,
        },
      ],
      status: ['completed', 'completed'],
    },
    {
      id: '4329e5f4-7d6b-4c20-b8e2-aed426ed71b3',
      created: '2022-10-07T15:45:31',
      updated: '2022-10-07T15:45:31',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'mnist_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.importers.importer',
            upstream_steps: [],
          },
          {
            source: 'steps.normalizers.normalizer',
            upstream_steps: ['importer'],
          },
          {
            source: 'steps.trainers.trainer',
            upstream_steps: ['importer', 'normalizer'],
          },
          {
            source: 'steps.evaluators.evaluator',
            upstream_steps: ['importer', 'normalizer', 'trainer'],
          },
        ],
      },
      runs: [
        {
          id: '1f1bb496-9de4-4371-a7e2-fcbae3607a1a',
          created: '2022-10-14T14:16:00',
          updated: '2022-10-14T14:16:00',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'mnist-pipeline-8kgzm',
          stack_id: '4570f271-0546-484e-befc-771bd6da31bf',
          pipeline_id: '4329e5f4-7d6b-4c20-b8e2-aed426ed71b3',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/mnt/w/apps/testzenml/kubeflow_pipelines_orchestration/run.py',
            },
            name: 'mnist_pipeline',
            settings: {
              docker: {
                required_integrations: ['tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 429,
        },
        {
          id: '507673ec-da3f-4da6-b097-dfc171396113',
          created: '2022-10-07T15:46:47',
          updated: '2022-10-07T15:46:47',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'mnist-pipeline-lwk45',
          stack_id: 'c4a9dfaa-f5ef-4636-9972-c0be679d62f8',
          pipeline_id: '4329e5f4-7d6b-4c20-b8e2-aed426ed71b3',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenml/examples/kubeflow_pipelines_orchestration/run.py',
            },
            name: 'mnist_pipeline',
            settings: {
              docker: {
                parent_image:
                  'gcr.io/zenml-core/zenml-kubeflow/zenml-new-server:latest',
                required_integrations: ['tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 50,
        },
        {
          id: '948aff6e-10c6-436b-8fe0-84c7bf4927a3',
          created: '2022-10-14T14:27:42',
          updated: '2022-10-14T14:27:42',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'mnist-pipeline-5fqj7',
          stack_id: '4570f271-0546-484e-befc-771bd6da31bf',
          pipeline_id: '4329e5f4-7d6b-4c20-b8e2-aed426ed71b3',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/mnt/w/apps/testzenml/kubeflow_pipelines_orchestration/run.py',
            },
            name: 'mnist_pipeline',
            settings: {
              docker: {
                required_integrations: ['tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 431,
        },
      ],
      status: ['running', 'failed', 'failed'],
    },
    {
      id: '4b68fb03-e9de-41b4-ada2-b4aa54145ec1',
      created: '2022-10-17T14:33:47',
      updated: '2022-10-17T14:33:47',
      user: {
        id: 'bcfa2335-7a20-4bb1-894d-5c98c65a88d0',
        created: '2022-10-10T12:26:45',
        updated: '2022-10-20T09:37:58',
        name: 'michael',
        full_name: 'Michael',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'data_validation_pipeline',
      docstring: 'Links all the steps together in a pipeline',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.data_loader.data_loader',
            upstream_steps: [],
          },
          {
            source:
              'zenml.integrations.deepchecks.steps.deepchecks_data_drift.data_drift_detector@zenml_0.20.3',
            upstream_steps: ['data_loader'],
          },
          {
            source:
              'zenml.integrations.deepchecks.steps.deepchecks_data_integrity.data_validator@zenml_0.20.3',
            upstream_steps: ['data_loader'],
          },
          {
            source: 'steps.trainer.trainer',
            upstream_steps: ['data_loader'],
          },
          {
            source:
              'zenml.integrations.deepchecks.steps.deepchecks_model_drift.model_drift_detector@zenml_0.20.3',
            upstream_steps: ['data_loader', 'trainer'],
          },
          {
            source:
              'zenml.integrations.deepchecks.steps.deepchecks_model_validation.model_validator@zenml_0.20.3',
            upstream_steps: ['data_loader', 'trainer'],
          },
        ],
      },
      runs: [
        {
          id: '98fcb435-3c84-429c-8ddf-4659a96c8dc8',
          created: '2022-10-17T15:24:27',
          updated: '2022-10-17T15:24:27',
          user: 'bcfa2335-7a20-4bb1-894d-5c98c65a88d0',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: '5352743661408878592',
          stack_id: 'acd7e5e6-89e1-4eee-8dcb-9972d70bc74f',
          pipeline_id: '4b68fb03-e9de-41b4-ada2-b4aa54145ec1',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/schustmi/dev/zenml/examples/deepchecks_data_validation/run.py',
            },
            name: 'data_validation_pipeline',
            settings: {
              docker: {
                build_context_root: '/Users/schustmi/dev/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                  platform: 'linux/amd64',
                },
                dockerfile: '/Users/schustmi/dev/zenml/local-pip.Dockerfile',
                required_integrations: ['sklearn'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 550,
        },
      ],
      status: ['running'],
    },
    {
      id: '519732c9-9303-4ba4-8cc5-9e905c603036',
      created: '2022-10-20T09:20:39',
      updated: '2022-10-20T09:20:39',
      user: {
        id: 'bcfa2335-7a20-4bb1-894d-5c98c65a88d0',
        created: '2022-10-10T12:26:45',
        updated: '2022-10-20T09:37:58',
        name: 'michael',
        full_name: 'Michael',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'validation_pipeline',
      docstring:
        'Data validation pipeline for Great Expectations.\n\n    The pipeline imports data from a source, then splits it into training\n    and validation sets. The Great Expectations profiler step is used to\n    generate the expectation suite (i.e. validation rules) based on the\n    schema ans statistical properties of the training dataset.\n\n    Next, that generated expectation suite is used to validate both the training\n    dataset and the validation dataset.\n\n    A prevalidator step is used to delay the execution of the validator\n    steps until the generated expectation suite is ready.\n\n    Args:\n        importer: data importer step\n        splitter: splitter step\n        profiler: data profiler step\n        prevalidator: dummy step required to enforce ordering\n        train_validator: training dataset validation step\n        test_validator: test dataset validation step\n    ',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.importer.importer',
            upstream_steps: [],
          },
          {
            source: 'steps.splitter.splitter',
            upstream_steps: ['importer'],
          },
          {
            source:
              'zenml.integrations.great_expectations.steps.ge_profiler.GreatExpectationsProfilerStep@zenml_0.20.4',
            upstream_steps: ['splitter'],
          },
          {
            source: 'steps.prevalidator.prevalidator',
            upstream_steps: ['GreatExpectationsProfilerStep'],
          },
          {
            source:
              'zenml.integrations.great_expectations.steps.ge_validator.GreatExpectationsValidatorStep@zenml_0.20.4',
            upstream_steps: ['prevalidator', 'splitter'],
          },
          {
            source:
              'zenml.integrations.great_expectations.steps.ge_validator.GreatExpectationsValidatorStep@zenml_0.20.4',
            upstream_steps: ['prevalidator', 'splitter'],
          },
        ],
      },
      runs: [
        {
          id: '6817a950-3ae9-475a-918a-a2c46d443d86',
          created: '2022-10-20T09:22:25',
          updated: '2022-10-20T09:22:25',
          user: 'bcfa2335-7a20-4bb1-894d-5c98c65a88d0',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'validation_pipeline-20_Oct_22-11_20_38_946383',
          stack_id: '6240e6ad-f30c-4ec2-bd21-601ac0e3fff1',
          pipeline_id: '519732c9-9303-4ba4-8cc5-9e905c603036',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/schustmi/dev/zenml/examples/great_expectations_data_validation/run.py',
            },
            name: 'validation_pipeline',
            settings: {
              docker: {
                required_integrations: ['sklearn', 'great_expectations'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 679,
        },
      ],
      status: ['completed'],
    },
    {
      id: '54622f92-8519-44f5-a4c2-64a8a0abd646',
      created: '2022-10-18T09:26:39',
      updated: '2022-10-18T09:26:39',
      user: {
        id: 'bad9de78-953f-4712-99dc-b6e8197be896',
        created: '2022-10-14T13:25:16',
        updated: '2022-10-14T13:27:12',
        name: 'jayesh',
        full_name: 'Jayesh Sharma',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'example_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.loader.loader_step.loader_mnist',
            upstream_steps: [],
          },
          {
            source: 'steps.normalizer.normalizer_step.normalizer',
            upstream_steps: ['loader_mnist'],
          },
          {
            source: 'steps.trainer.trainer_step.tf_trainer',
            upstream_steps: ['loader_mnist', 'normalizer'],
          },
          {
            source: 'steps.evaluator.evaluator_step.tf_evaluator',
            upstream_steps: ['loader_mnist', 'normalizer', 'tf_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '8e009807-f0db-421c-86f3-70506f03679c',
          created: '2022-10-18T10:09:22',
          updated: '2022-10-18T10:09:22',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'example-pipeline-stsnv',
          stack_id: '812cb809-3183-43c0-818c-0436003f8780',
          pipeline_id: '54622f92-8519-44f5-a4c2-64a8a0abd646',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/experiment_tracking/run.py',
            },
            name: 'example_pipeline',
            settings: {
              docker: {
                required_integrations: ['mlflow', 'wandb', 'tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 605,
        },
        {
          id: '98906a2d-5190-482e-9fdb-251e807e4d41',
          created: '2022-10-18T10:09:22',
          updated: '2022-10-18T10:09:22',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'example-pipeline-8mljr',
          stack_id: '812cb809-3183-43c0-818c-0436003f8780',
          pipeline_id: '54622f92-8519-44f5-a4c2-64a8a0abd646',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/experiment_tracking/run.py',
            },
            name: 'example_pipeline',
            settings: {
              docker: {
                required_integrations: ['mlflow', 'wandb', 'tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 602,
        },
      ],
      status: ['completed', 'completed'],
    },
    {
      id: '583daa6b-305a-48fd-b686-689785a716df',
      created: '2022-10-11T14:18:01',
      updated: '2022-10-11T14:18:01',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'train_pipeline',
      docstring:
        '\n    It trains the agent.\n    Args:\n        game_wrap: This is a function that returns a GameWrapper object. The GameWrapper object wraps\n        over the game that you want to train on. It has functions that can be used to get the available\n        actions, get the current state, etc\n        build_dqn: This is a function that returns a DQN. The parameters are the game_wrapper, which\n        is the game wrapper object that we created earlier\n        replay_buffer: The replay buffer is a class that holds all the experiences a DQN has seen,\n        and samples from it randomly to train the DQN\n        agent: The agent that will be used to play the game\n        get_information_meta: This is a function that returns the frame number, rewards, and loss\n        list\n        train: The function that will be called inside the train_pipeline function. This is the\n        function that will be called\n    ',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.game_wrap.game_wrap',
            upstream_steps: [],
          },
          {
            source: 'steps.replay_buffer.replay_buffer',
            upstream_steps: [],
          },
          {
            source: 'steps.build_dqn.build_dqn',
            upstream_steps: ['game_wrap'],
          },
          {
            source: 'steps.agent.agent',
            upstream_steps: ['build_dqn', 'game_wrap', 'replay_buffer'],
          },
          {
            source: 'steps.get_information_meta.get_information_meta',
            upstream_steps: ['agent'],
          },
          {
            source: 'steps.train.train',
            upstream_steps: ['agent', 'game_wrap', 'get_information_meta'],
          },
        ],
      },
      runs: [
        {
          id: '0baef1c0-9b3d-4794-b7b6-b8295773d37b',
          created: '2022-10-11T17:47:09',
          updated: '2022-10-11T17:47:09',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'train_pipeline-11_Oct_22-17_46_29_803922',
          stack_id: 'b8e40da7-033d-4c37-8be4-71958bcb4548',
          pipeline_id: '583daa6b-305a-48fd-b686-689785a716df',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/atari-game-play/run.py',
            },
            name: 'train_pipeline',
            settings: {
              docker: {
                required_integrations: ['tensorflow'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 183,
        },
        {
          id: '17552aa8-b6c9-49e3-8d63-0fdfc1d963ca',
          created: '2022-10-11T17:25:25',
          updated: '2022-10-11T17:25:25',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'train_pipeline-11_Oct_22-17_23_24_346078',
          stack_id: 'b8e40da7-033d-4c37-8be4-71958bcb4548',
          pipeline_id: '583daa6b-305a-48fd-b686-689785a716df',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/atari-game-play/run.py',
            },
            name: 'train_pipeline',
            settings: {
              docker: {
                required_integrations: ['tensorflow'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 179,
        },
        {
          id: '36f5e234-d666-45cf-b2ef-28beb0add3db',
          created: '2022-10-11T14:48:42',
          updated: '2022-10-11T14:48:42',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'train_pipeline-11_Oct_22-14_48_14_232817',
          stack_id: 'b8e40da7-033d-4c37-8be4-71958bcb4548',
          pipeline_id: '583daa6b-305a-48fd-b686-689785a716df',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/atari-game-play/run.py',
            },
            name: 'train_pipeline',
            settings: {
              docker: {
                required_integrations: ['tensorflow'],
              },
            },
          },
          num_steps: 6,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 166,
        },
      ],
      status: ['failed', 'failed', 'failed'],
    },
    {
      id: '7d75cc6a-31d2-4f0b-ac41-3be2ab282fac',
      created: '2022-10-12T09:50:51',
      updated: '2022-10-12T09:50:51',
      user: {
        id: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
        created: '2022-10-12T09:38:38',
        updated: '2022-10-12T09:38:38',
        name: 'alex',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'step_operator_pipeline',
      docstring: 'Links all the steps together in a pipeline',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.importer.importer_step.digits_data_loader',
            upstream_steps: [],
          },
          {
            source: 'steps.remote_trainer.remote_trainer_step.remote_trainer',
            upstream_steps: ['digits_data_loader'],
          },
          {
            source: 'steps.evaluator.evaluator_step.evaluator',
            upstream_steps: ['digits_data_loader', 'remote_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '3c3901cb-a2c5-4dc2-9a40-23ff1db23e31',
          created: '2022-10-13T09:46:41',
          updated: '2022-10-13T09:46:41',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'step_operator_pipeline-13_Oct_22-11_42_46_347532',
          stack_id: 'a2e479f9-73b5-496e-9cae-12180b140379',
          pipeline_id: '7d75cc6a-31d2-4f0b-ac41-3be2ab282fac',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/step_operator_remote_training/run.py',
            },
            name: 'step_operator_pipeline',
            settings: {
              docker: {
                required_integrations: ['sklearn'],
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 291,
        },
        {
          id: '4917017a-f372-416a-b93d-39b6d8948b1a',
          created: '2022-10-12T11:05:04',
          updated: '2022-10-12T11:05:04',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'step_operator_pipeline-12_Oct_22-13_03_10_722823',
          stack_id: 'dabd17e1-bf80-45b6-a3a4-d5a6dbcde05c',
          pipeline_id: '7d75cc6a-31d2-4f0b-ac41-3be2ab282fac',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/step_operator_remote_training/run.py',
            },
            name: 'step_operator_pipeline',
            settings: {
              docker: {
                required_integrations: ['sklearn'],
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 198,
        },
        {
          id: '4bdc96f3-ea06-41c2-8242-17f443000a18',
          created: '2022-10-13T15:45:33',
          updated: '2022-10-13T15:45:33',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'step_operator_pipeline-13_Oct_22-17_43_58_792479',
          stack_id: 'dabd17e1-bf80-45b6-a3a4-d5a6dbcde05c',
          pipeline_id: '7d75cc6a-31d2-4f0b-ac41-3be2ab282fac',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/step_operator_remote_training/run.py',
            },
            name: 'step_operator_pipeline',
            settings: {
              docker: {
                required_integrations: ['sklearn'],
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 381,
        },
      ],
      status: ['completed', 'failed', 'failed'],
    },
    {
      id: '88dc4d68-606d-4935-b753-de99f345fb28',
      created: '2022-10-11T10:34:15',
      updated: '2022-10-11T10:34:15',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'vertex_example_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.first_step.first_step.get_first_num',
            upstream_steps: [],
          },
          {
            source: 'steps.second_step.second_step.get_random_int',
            upstream_steps: [],
          },
          {
            source: 'steps.third_step.third_step.subtract_numbers',
            upstream_steps: ['get_first_num', 'get_random_int'],
          },
        ],
      },
      runs: [
        {
          id: '05b417e0-a26b-4408-bea4-1a444c830535',
          created: '2022-10-13T14:08:41',
          updated: '2022-10-13T14:08:41',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: '8022393078021095424',
          stack_id: 'd49932d2-5806-486e-accb-36da86b811a5',
          pipeline_id: '88dc4d68-606d-4935-b753-de99f345fb28',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/Users/safoine-zenml/work-dir/zen/zenml/examples/vertex_ai_orchestration/run.py',
            },
            name: 'vertex_example_pipeline',
            settings: {},
          },
          num_steps: 3,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 321,
        },
        {
          id: 'c4b7cfed-960a-40af-bd0f-f12aeb17b1a9',
          created: '2022-10-11T10:34:38',
          updated: '2022-10-11T10:34:38',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'vertex_example_pipeline-11_Oct_22-10_34_14_516146',
          stack_id: 'b8e40da7-033d-4c37-8be4-71958bcb4548',
          pipeline_id: '88dc4d68-606d-4935-b753-de99f345fb28',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenml/examples/vertex_ai_orchestration/run.py',
            },
            name: 'vertex_example_pipeline',
            settings: {},
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 107,
        },
      ],
      status: ['failed', 'running'],
    },
    {
      id: 'b2998179-a37e-4c65-9982-0bcb72c8173e',
      created: '2022-10-13T14:20:40',
      updated: '2022-10-13T14:20:40',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'time_series_pipeline',
      docstring:
        'Defines a training pipeline to train a model to predict el. power production based on weather forecast.\n\n    Args:\n        bigquery_importer: Fetch data from BQ.\n        preparator: Clean and prepare the dataset.\n        transformer: Change cardinal GPS directions into vector features.\n        trainer: Produce a trained prediction model.\n        evaluator: Evaluate the trained model on a test set (using R2 score).\n    ',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.importer.bigquery_importer',
            upstream_steps: [],
          },
          {
            source: 'steps.preparator.preparator',
            upstream_steps: ['bigquery_importer'],
          },
          {
            source: 'steps.transformer.transformer',
            upstream_steps: ['preparator'],
          },
          {
            source: 'steps.trainer.trainer',
            upstream_steps: ['transformer'],
          },
          {
            source: 'steps.evaluator.evaluator',
            upstream_steps: ['trainer', 'transformer'],
          },
        ],
      },
      runs: [
        {
          id: 'e4c9cd96-fcb9-4133-a6f6-03d33533f540',
          created: '2022-10-13T14:23:22',
          updated: '2022-10-13T14:23:22',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'time_series_pipeline-13_Oct_22-15_20_39_349590',
          stack_id: 'b8e40da7-033d-4c37-8be4-71958bcb4548',
          pipeline_id: 'b2998179-a37e-4c65-9982-0bcb72c8173e',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/safoine-zenml/work-dir/zenfiles/time-series-forecast/src/main.py',
              tags: 'zenfile',
            },
            name: 'time_series_pipeline',
            settings: {
              docker: {
                required_integrations: ['gcp', 'sklearn'],
              },
            },
          },
          num_steps: 5,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 331,
        },
      ],
      status: ['running'],
    },
    {
      id: 'b8204e36-3ac0-4f7d-862c-25b52fee3534',
      created: '2022-10-13T12:03:22',
      updated: '2022-10-13T12:03:22',
      user: {
        id: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
        created: '2022-10-12T09:38:38',
        updated: '2022-10-12T09:38:38',
        name: 'alex',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'feast_pipeline',
      docstring: 'Links all the steps together in a pipeline',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.getter.get_features_step.get_historical_features',
            upstream_steps: [],
          },
          {
            source: 'steps.printer.printer_step.feature_printer',
            upstream_steps: ['get_historical_features'],
          },
        ],
      },
      runs: [
        {
          id: '63faa8cd-d925-4c1a-8e89-dba79030be31',
          created: '2022-10-13T12:30:13',
          updated: '2022-10-13T12:30:13',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'feast_pipeline-13_Oct_22-14_29_25_789546',
          stack_id: 'fd6018c3-b7e4-4d14-914c-8d61f32fcef0',
          pipeline_id: 'b8204e36-3ac0-4f7d-862c-25b52fee3534',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/feast_feature_store/run.py',
            },
            name: 'feast_pipeline',
            settings: {
              docker: {
                required_integrations: ['feast'],
              },
            },
          },
          num_steps: 2,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 315,
        },
        {
          id: '703a8092-6c62-48ee-bdd3-6ce0d3efdc2c',
          created: '2022-10-13T12:17:51',
          updated: '2022-10-13T12:17:51',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'feast_pipeline-13_Oct_22-14_16_25_332242',
          stack_id: 'fd6018c3-b7e4-4d14-914c-8d61f32fcef0',
          pipeline_id: 'b8204e36-3ac0-4f7d-862c-25b52fee3534',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/feast_feature_store/run.py',
            },
            name: 'feast_pipeline',
            settings: {
              docker: {
                required_integrations: ['feast'],
              },
            },
          },
          num_steps: 2,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 303,
        },
        {
          id: '727127e4-7d42-445a-a748-fd04b7068f77',
          created: '2022-10-13T12:10:56',
          updated: '2022-10-13T12:10:56',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'feast_pipeline-13_Oct_22-14_10_04_083625',
          stack_id: 'fd6018c3-b7e4-4d14-914c-8d61f32fcef0',
          pipeline_id: 'b8204e36-3ac0-4f7d-862c-25b52fee3534',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/feast_feature_store/run.py',
            },
            name: 'feast_pipeline',
            settings: {
              docker: {
                required_integrations: ['feast'],
              },
            },
          },
          num_steps: 2,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 300,
        },
      ],
      status: ['completed', 'failed', 'failed'],
    },
    {
      id: 'c4e73f02-d173-4550-b34d-9107b1acfe2f',
      created: '2022-10-20T15:59:51',
      updated: '2022-10-20T15:59:51',
      user: {
        id: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
        created: '2022-10-12T09:38:38',
        updated: '2022-10-12T09:38:38',
        name: 'alex',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'training_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.deployment_triggers.deployment_trigger',
            upstream_steps: [],
          },
          {
            source:
              'zenml.integrations.label_studio.steps.label_studio_standard_steps.get_or_create_dataset@zenml_0.20.4',
            upstream_steps: [],
          },
          {
            source:
              'zenml.integrations.label_studio.steps.label_studio_standard_steps.get_labeled_data@zenml_0.20.4',
            upstream_steps: ['get_or_create_dataset'],
          },
          {
            source: 'steps.convert_annotations_step.convert_annotations',
            upstream_steps: ['get_labeled_data'],
          },
          {
            source: 'steps.pytorch_trainer.pytorch_model_trainer',
            upstream_steps: ['convert_annotations'],
          },
          {
            source: 'steps.model_deployers.model_deployer_mock',
            upstream_steps: ['deployment_trigger', 'pytorch_model_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '3274e37c-c808-4f6f-b825-d2e6c1b17db7',
          created: '2022-10-20T16:01:54',
          updated: '2022-10-20T16:01:54',
          user: 'b892b299-6410-4bd5-94e5-1099e6b9f61b',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'training_pipeline-20_Oct_22-17_59_50_180828',
          stack_id: 'b31d609d-8011-424a-b16e-0a68c46a76cd',
          pipeline_id: 'c4e73f02-d173-4550-b34d-9107b1acfe2f',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/strickvl/coding/zenml/repos/zenml/examples/label_studio_annotation/run.py',
            },
            name: 'training_pipeline',
            settings: {},
          },
          num_steps: 6,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 725,
        },
      ],
      status: ['completed'],
    },
    {
      id: 'c538c4ed-777a-43a2-bd70-6a82c2f92631',
      created: '2022-10-07T15:35:09',
      updated: '2022-10-07T15:35:09',
      user: {
        id: '89bd1b4b-dbe2-4d88-9a26-dcaf96a18b9a',
        created: '2022-10-07T15:30:42',
        updated: '2022-10-07T15:31:09',
        name: 'felix',
        full_name: 'Felix',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'kubernetes_example_pipeline',
      docstring:
        'data loading -> train -> test with skew comparison in parallel.',
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.importer.digits_data_loader',
            upstream_steps: [],
          },
          {
            source: 'steps.skew_comparisons.skew_comparison',
            upstream_steps: ['digits_data_loader'],
          },
          {
            source: 'steps.sklearn_trainer.svc_trainer',
            upstream_steps: ['digits_data_loader'],
          },
          {
            source: 'steps.evaluator.evaluator',
            upstream_steps: ['digits_data_loader', 'svc_trainer'],
          },
        ],
      },
      runs: [
        {
          id: 'afd578a1-f169-4943-96c8-54ac43e2cd0d',
          created: '2022-10-07T15:35:41',
          updated: '2022-10-07T15:35:41',
          user: '89bd1b4b-dbe2-4d88-9a26-dcaf96a18b9a',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'kubernetes_example_pipeline-07_Oct_22-17_35_08_429823',
          stack_id: '37057fed-367c-42d8-818a-8e5041cb63a5',
          pipeline_id: 'c538c4ed-777a-43a2-bd70-6a82c2f92631',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/felix/code/zenml/examples/kubernetes_orchestration/run.py',
            },
            name: 'kubernetes_example_pipeline',
            settings: {
              docker: {
                parent_image: 'gcr.io/zenml-core/base-image-felix:latest',
                required_integrations: ['sklearn', 'facets'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 2,
        },
        {
          id: 'b4f8e5c0-6862-4fdd-b1ee-dd9fb9d81cca',
          created: '2022-10-07T15:36:23',
          updated: '2022-10-07T15:36:23',
          user: '89bd1b4b-dbe2-4d88-9a26-dcaf96a18b9a',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'kubernetes_example_pipeline-07_Oct_22-17_35_49_459766',
          stack_id: '770393a7-ee6f-4d2e-8704-29444d31f8c1',
          pipeline_id: 'c538c4ed-777a-43a2-bd70-6a82c2f92631',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/felix/code/zenml/examples/kubernetes_orchestration/run.py',
            },
            name: 'kubernetes_example_pipeline',
            settings: {
              docker: {
                parent_image: 'gcr.io/zenml-core/base-image-felix:latest',
                required_integrations: ['sklearn', 'facets'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 6,
        },
        {
          id: 'f3ab2cc1-29c3-44f1-8b2f-982c7a3e7c93',
          created: '2022-10-07T15:44:45',
          updated: '2022-10-07T15:44:45',
          user: '234f72f9-c801-4f47-88b9-f3533c136405',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'kubernetes_example_pipeline-07_Oct_22-17_44_08_783457',
          stack_id: '770393a7-ee6f-4d2e-8704-29444d31f8c1',
          pipeline_id: 'c538c4ed-777a-43a2-bd70-6a82c2f92631',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/Users/felix/code/zenml/examples/kubernetes_orchestration/run.py',
            },
            name: 'kubernetes_example_pipeline',
            settings: {
              docker: {
                parent_image: 'gcr.io/zenml-core/base-image-felix:latest',
                required_integrations: ['sklearn', 'facets'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 41,
        },
      ],
      status: ['completed', 'completed', 'completed'],
    },
    {
      id: 'c5ac6b32-0dbf-4bc2-8266-bb17d834490f',
      created: '2022-10-18T10:20:14',
      updated: '2022-10-18T10:20:14',
      user: {
        id: 'bad9de78-953f-4712-99dc-b6e8197be896',
        created: '2022-10-14T13:25:16',
        updated: '2022-10-14T13:27:12',
        name: 'jayesh',
        full_name: 'Jayesh Sharma',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'wandb_example_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.loader.loader_step.loader_mnist',
            upstream_steps: [],
          },
          {
            source: 'steps.normalizer.normalizer_step.normalizer',
            upstream_steps: ['loader_mnist'],
          },
          {
            source: 'steps.trainer.trainer_step.tf_trainer',
            upstream_steps: ['loader_mnist', 'normalizer'],
          },
          {
            source: 'steps.evaluator.evaluator_step.tf_evaluator',
            upstream_steps: ['loader_mnist', 'normalizer', 'tf_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '48ae071b-774c-4595-b7c6-8cfb23aa61c5',
          created: '2022-10-18T10:47:38',
          updated: '2022-10-18T10:47:38',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'wandb-example-pipeline-5xhdw',
          stack_id: '812cb809-3183-43c0-818c-0436003f8780',
          pipeline_id: 'c5ac6b32-0dbf-4bc2-8266-bb17d834490f',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/experiment_tracking/run.py',
            },
            name: 'wandb_example_pipeline',
            settings: {
              docker: {
                required_integrations: ['mlflow', 'wandb', 'tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 640,
        },
        {
          id: '89345cd0-561e-43cd-be4e-06e149bc12b0',
          created: '2022-10-18T10:25:24',
          updated: '2022-10-18T10:25:24',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'wandb-example-pipeline-skknk',
          stack_id: '812cb809-3183-43c0-818c-0436003f8780',
          pipeline_id: 'c5ac6b32-0dbf-4bc2-8266-bb17d834490f',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/experiment_tracking/run.py',
            },
            name: 'wandb_example_pipeline',
            settings: {
              docker: {
                required_integrations: ['mlflow', 'wandb', 'tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 625,
        },
        {
          id: 'c42fd7dc-920c-4a37-8ed8-7e98724040bf',
          created: '2022-10-18T10:22:52',
          updated: '2022-10-18T10:22:52',
          user: 'bad9de78-953f-4712-99dc-b6e8197be896',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'wandb-example-pipeline-478ln',
          stack_id: '812cb809-3183-43c0-818c-0436003f8780',
          pipeline_id: 'c5ac6b32-0dbf-4bc2-8266-bb17d834490f',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath: '/mnt/w/apps/testzenml/experiment_tracking/run.py',
            },
            name: 'wandb_example_pipeline',
            settings: {
              docker: {
                required_integrations: ['mlflow', 'wandb', 'tensorflow'],
              },
            },
          },
          num_steps: 4,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 621,
        },
      ],
      status: ['completed', 'running', 'running'],
    },
    {
      id: 'cfe83b3b-700e-4a71-90a2-bdc5b4bf7af7',
      created: '2022-10-11T10:12:16',
      updated: '2022-10-11T10:12:16',
      user: {
        id: '8bf46ca2-8194-4540-8abb-364f63f44baa',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:30:28',
        name: 'default',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'simple_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'simple_run.get_first_num',
            upstream_steps: [],
          },
          {
            source: 'simple_run.get_random_int',
            upstream_steps: [],
          },
          {
            source: 'simple_run.subtract_numbers',
            upstream_steps: ['get_first_num', 'get_random_int'],
          },
        ],
      },
      runs: [],
      status: [],
    },
    {
      id: 'd2489b26-56dd-4b12-bba2-dffaff50f9ff',
      created: '2022-10-14T11:26:36',
      updated: '2022-10-14T11:26:36',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'quickstart_first_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: '__main__.first_step',
            upstream_steps: [],
          },
          {
            source: '__main__.second_step',
            upstream_steps: [],
          },
          {
            source: '__main__.third_step',
            upstream_steps: ['first_step', 'second_step'],
          },
        ],
      },
      runs: [
        {
          id: 'ae968bd4-f191-44a4-ab8d-9abc6e0070cd',
          created: '2022-10-14T11:27:26',
          updated: '2022-10-14T11:27:26',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'quickstart_first_pipeline-14_Oct_22-12_26_35_144519',
          stack_id: 'b8e40da7-033d-4c37-8be4-71958bcb4548',
          pipeline_id: 'd2489b26-56dd-4b12-bba2-dffaff50f9ff',
          pipeline_configuration: {
            enable_cache: true,
            extra: {},
            name: 'quickstart_first_pipeline',
            settings: {},
          },
          num_steps: 3,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 425,
        },
      ],
      status: ['running'],
    },
    {
      id: 'f09f1dab-9093-481e-85db-361a5dcd8196',
      created: '2022-10-13T08:58:21',
      updated: '2022-10-13T08:58:21',
      user: {
        id: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
        created: '2022-10-07T15:34:16',
        updated: '2022-10-11T09:54:09',
        name: 'safoine',
        full_name: 'safoine',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'continuous_deployment_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'steps.ingest_data.ingest_data',
            upstream_steps: [],
          },
          {
            source: 'steps.data_process.encode_cat_cols',
            upstream_steps: ['ingest_data'],
          },
          {
            source: 'steps.data_process.drop_cols',
            upstream_steps: ['encode_cat_cols'],
          },
          {
            source: 'steps.data_splitter.data_splitter',
            upstream_steps: ['drop_cols'],
          },
          {
            source: 'steps.trainer.model_trainer',
            upstream_steps: ['data_splitter'],
          },
          {
            source: 'steps.evaluation.evaluation',
            upstream_steps: ['data_splitter', 'model_trainer'],
          },
          {
            source: 'pipelines.seldon_deployment_pipeline.deployment_trigger',
            upstream_steps: ['evaluation'],
          },
          {
            source:
              'zenml.integrations.seldon.steps.seldon_deployer.seldon_model_deployer_step@zenml_0.20.2',
            upstream_steps: ['deployment_trigger', 'model_trainer'],
          },
        ],
      },
      runs: [
        {
          id: '9fd63c04-31db-4ed3-a250-b3131b51fe8c',
          created: '2022-10-13T09:27:14',
          updated: '2022-10-13T09:27:14',
          user: '362587ad-8511-4af6-9ece-1e6cafa94dc6',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'continuous_deployment_pipeline-13_Oct_22-09_25_24_931368',
          stack_id: '16b90d61-e761-4876-bf17-acd8e033c4cd',
          pipeline_id: 'f09f1dab-9093-481e-85db-361a5dcd8196',
          pipeline_configuration: {
            enable_cache: false,
            extra: {
              dag_filepath:
                '/home/safoine-zenml/zen/zenfiles/customer-churn/run_seldon_deployment_pipeline.py',
              seldon_docker_image:
                'gcr.io/zenml-core/zenml-kubeflow/zenml@sha256:f06ce8f4eec140840b3b79c8a3f330ad7ba9c2aad0d9ae89515f83fac219b0f0',
              tags: 'zenfile',
            },
            name: 'continuous_deployment_pipeline',
            settings: {
              docker: {
                required_integrations: [
                  'facets',
                  'lightgbm',
                  'xgboost',
                  'seldon',
                ],
                requirements: [
                  'statsmodels',
                  'optuna',
                  'statsmodels',
                  'feature_engine',
                ],
              },
            },
          },
          num_steps: 8,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 266,
        },
      ],
      status: ['completed'],
    },
    {
      id: 'fc96fa20-dd80-41d7-89a7-7cf8aaea0451',
      created: '2022-10-11T10:22:10',
      updated: '2022-10-11T10:22:10',
      user: {
        id: '8bf46ca2-8194-4540-8abb-364f63f44baa',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:30:28',
        name: 'default',
        full_name: '',
        email: '',
        email_opted_in: false,
        active: true,
      },
      project: {
        id: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
        created: '2022-10-07T15:29:49',
        updated: '2022-10-07T15:29:49',
        name: 'default',
        description: '',
      },
      name: 'hamzas_example_pipeline',
      docstring: null,
      spec: {
        version: '0.1',
        steps: [
          {
            source: 'simple_run.get_first_num',
            upstream_steps: [],
          },
          {
            source: 'simple_run.get_random_int',
            upstream_steps: [],
          },
          {
            source: 'simple_run.subtract_numbers',
            upstream_steps: ['get_first_num', 'get_random_int'],
          },
        ],
      },
      runs: [
        {
          id: '03475d37-0270-4db9-80e6-1a8d39f1dff3',
          created: '2022-10-17T08:49:24',
          updated: '2022-10-17T08:49:24',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'hamzas_example_pipeline-17_Oct_22-10_46_55_360994',
          stack_id: 'a1ad6373-0899-4661-8fff-be60631fa647',
          pipeline_id: 'fc96fa20-dd80-41d7-89a7-7cf8aaea0451',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/htahir1/workspace/zenml_io/zenml/examples/hamza_test_example/run.py',
            },
            name: 'hamzas_example_pipeline',
            settings: {
              docker: {
                build_context_root: '/home/htahir1/workspace/zenml_io/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                },
                dockerfile:
                  '/home/htahir1/workspace/zenml_io/zenml/local-pip.Dockerfile',
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 467,
        },
        {
          id: '05b83a76-fd9d-432d-95e0-19e3f99f0123',
          created: '2022-10-11T10:26:50',
          updated: '2022-10-11T10:26:50',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'hamzas-example-pipeline-11-oct-22-12-22-17-847100-r-2r27g',
          stack_id: '5bf8d8b6-8819-4d62-b73a-295cc0cae3f6',
          pipeline_id: 'fc96fa20-dd80-41d7-89a7-7cf8aaea0451',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/htahir1/workspace/zenml_io/demos/demos/orchestration_portability_deepchecks_demo/simple_run.py',
            },
            name: 'hamzas_example_pipeline',
            settings: {
              docker: {
                build_context_root: '/home/htahir1/workspace/zenml_io/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                },
                dockerfile:
                  '/home/htahir1/workspace/zenml_io/zenml/local-pip.Dockerfile',
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.1',
          git_sha: null,
          mlmd_id: 105,
        },
        {
          id: '1d2848fc-5821-41e7-b519-e4936a28d51d',
          created: '2022-10-17T09:29:38',
          updated: '2022-10-17T09:29:38',
          user: '8bf46ca2-8194-4540-8abb-364f63f44baa',
          project: '9ae7e84c-6244-412e-9e9f-9b127ed5d575',
          name: 'hamzas_example_pipeline-17_Oct_22-11_27_46_156907',
          stack_id: 'a1ad6373-0899-4661-8fff-be60631fa647',
          pipeline_id: 'fc96fa20-dd80-41d7-89a7-7cf8aaea0451',
          pipeline_configuration: {
            enable_cache: true,
            extra: {
              dag_filepath:
                '/home/htahir1/workspace/zenml_io/zenml/examples/hamza_test_example/run.py',
            },
            name: 'hamzas_example_pipeline',
            settings: {
              docker: {
                build_context_root: '/home/htahir1/workspace/zenml_io/zenml',
                build_options: {
                  buildargs: {
                    PYTHON_VERSION: '3.8',
                  },
                },
                dockerfile:
                  '/home/htahir1/workspace/zenml_io/zenml/local-pip.Dockerfile',
              },
            },
          },
          num_steps: 3,
          zenml_version: '0.20.3',
          git_sha: null,
          mlmd_id: 482,
        },
      ],
      status: ['failed', 'completed', 'completed'],
    },
  ];
  useEffect(() => {
    console.log('activeSorting', activeSorting);
    console.log('activeSorting', activeSortingDirection);

    let orderedPipelines =
      activeSorting === null
        ? _.sortBy(newPipeline, (pipeline: TPipeline) =>
            new Date(pipeline.created).getTime(),
          ).reverse()
        : _.orderBy(
            newPipeline,
            [activeSorting],
            [activeSortingDirection === 'DESC' ? 'desc' : 'asc'],
          );

    const isValidFilter = filter.map((f) => f.value).join('');
    if (isValidFilter) {
      orderedPipelines = getFilteredDataForTable(orderedPipelines, filter);
    }

    setFilteredPipelines(orderedPipelines as any[]);
  }, [filter, pipelines]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      dispatch(pipelinesActions.getMy({}));
    }, 5000);

    return () => clearInterval(intervalId);

    //This is important
  });

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(pipelinePagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setSelectedRunIds,
    setFilteredPipelines,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  };
};
