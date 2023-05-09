/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  secretPagesActions,
  secretsActions,
} from '../../../../../redux/actions';
import {
  workspaceSelectors,
  // secretPagesSelectors,
  secretPagesSelectors,
  // secretSelectors,
  secretSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  openConnectorIds: TId[];
  setOpenConnectorIds: (ids: TId[]) => void;
  fetching: boolean;
  setFilteredConnectors: (secrets: any[]) => void;
  filteredConnectors: any[];
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setSelectedRunIds: (ids: TId[]) => void;
}

interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = ({
  // secretComponentId,
  filter,
  isExpended,
}: {
  // secretComponentId?: any;
  isExpended?: any;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const dispatch = useDispatch();

  const [openConnectorIds, setOpenConnectorIds] = useState<TId[]>([]);
  const [filteredConnectors, setFilteredConnectors] = useState<any[]>([]);

  const fetching = useSelector(secretPagesSelectors.fetching);

  // const secrets = useSelector(secretSelectors.mySecrets);
  // const secretsPaginated = useSelector(secretSelectors.mySecretsPaginated);
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const isValidFilter = filter.map((f) => f.value).join('');

  const connectors = [
    {
      id: 'b81c6603',
      created: '2023-05-08T10:25:27',
      updated: '2023-05-08T10:25:27',
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
      name: 'gcp_connector',
      isShared: false,
      resourceId: 'gamma_3',
      authentication: 'secret-key',
      scope: 'workspace',
      values: {},
    },
    {
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
      resourceId: '',
      authentication: 'service-account',
      scope: 'workspace',
      values: {},
    },
  ];

  useEffect(() => {
    setFilteredConnectors(connectors as any[]);
  }, [connectors, filter]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const applySorting =
        activeSortingDirection?.toLowerCase() + ':' + activeSorting;
      // const intervalId = setInterval(() => {
      //   dispatch(
      //     secretsActions.getMy({
      //       // component_id: secretComponentId,
      //       sort_by: applySorting ? applySorting : 'created',
      //       logical_operator: 'and',
      //       workspace: selectedWorkspace,
      //       page: secretsPaginated.page,
      //       size: secretsPaginated.size,
      //     }),
      //   );
      // }, 5000);

      // return () => clearInterval(intervalId); //This is important
    }
  });

  const setSelectedRunIds = (runIds: TId[]) => {
    // dispatch(secretPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    filteredConnectors,
    setFilteredConnectors,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
    openConnectorIds,
    setOpenConnectorIds,
    fetching,
  };
};
