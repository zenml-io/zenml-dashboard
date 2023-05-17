/* eslint-disable */

import { SecretDetailRouteParams } from '.';
import { connectorsActions } from '../../../../redux/actions';
import { connectorSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect, useState } from 'react';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  connector: any;
  fetching?: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<SecretDetailRouteParams>();
  const [fetching, setFetching] = useState(false);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);

    dispatch(
      connectorsActions.connectorForId({
        connectorId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    // Legacy: previously runs was in pipeline
    // dispatch(
    //   connectorsActions.allRunsBysecretId({
    //     sort_by: 'desc:created',
    //     logical_operator: 'and',
    //     page: 1,
    //     size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
    //     secretId: id,
    //     onSuccess: () => setFetching(false),
    //     onFailure: () => setFetching(false),
    //   }),
    // );
  }, [id]);

  // const setFetching = (fetching: boolean) => {
  //   dispatch(secretPagesActions.setFetching({ fetching }));
  // };

  const connector = {
    id: '9dd13b81',
    created: '2023-05-02T09:12:07',
    updated: '2023-05-02T09:12:25',
    user: {
      id: 'd9b0ecf9-00c9-4e1d-be97-5bc4c0e51e31',
      created: '2023-02-10T09:20:44',
      updated: '2023-04-28T11:41:18',
      name: 'zenml',
      full_name: 'ZenML',
      email_opted_in: false,
      hub_token: null,
      active: true,
      activation_token: null,
      teams: [],
      roles: [
        {
          id: '074e5878-4f8e-47a2-94ca-87360190568b',
          created: '2023-02-10T09:20:33',
          updated: '2023-02-10T09:20:33',
          name: 'admin',
          permissions: ['write', 'me', 'read'],
        },
      ],
      email: null,
    },
    workspace: {
      id: 'e7ce6fdf-d55a-4181-832d-8e298fa38b1c',
      created: '2023-02-10T09:20:44',
      updated: '2023-02-10T09:20:44',
      name: 'default',
      description: '',
    },
    name: 'aws_connector',
    isShared: true,
    resourceId: '000',
    authentication: 'service-account',
    scope: 'workspace',
    values: {},
    connector_type: [
      {
        name: 'kubernetes',
        logoUrl:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
      },
    ],
    resource_types: [
      {
        name: 'github',
        logoUrl:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/github.png',
      },
      {
        name: 'kubernetes',
        logoUrl:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
      },
      {
        name: 'airflow',
        logoUrl:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/airflow.png',
      },
    ],
  };

  // const connector = useSelector(connectorSelectors.connectorForId(id));

  return { connector, fetching };
};
