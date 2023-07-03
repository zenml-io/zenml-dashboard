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
  // workspaceSelectors,
  // secretPagesSelectors,
  secretPagesSelectors,
  // secretSelectors,
  // secretSelectors,
  connectorSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';
import { GetFlavorsListForLogo } from './GetFlavorsListForLogo';

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
  connectorDetail,
  filter,
  isExpended,
}: {
  connectorDetail?: any;
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
  const { flavourList } = GetFlavorsListForLogo();
  const [openConnectorIds, setOpenConnectorIds] = useState<TId[]>([]);
  const [filteredConnectors, setFilteredConnectors] = useState<any[]>([]);

  const fetching = useSelector(secretPagesSelectors.fetching);

  // const secrets = useSelector(secretSelectors.mySecrets);
  // const secretsPaginated = useSelector(secretSelectors.mySecretsPaginated);
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const isValidFilter = filter.map((f) => f.value).join('');

  const connectorComponent: any = useSelector(
    connectorSelectors.connectorComponents,
  );

  // useEffect(() => {
  //   setFilteredConnectors(connectors as any[]);
  // }, [connectors, filter]);
  useEffect(() => {
    const mappedConnectorComponent = connectorComponent.map((item: any) => {
      const temp: any = flavourList.find(
        (fl: any) => fl.name === item.flavor && fl.type === item.type,
      );

      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: temp.logo_url,
            name: item.flavor,
            connectorResourceType: temp.connector_resource_type,
          },
        };
      }

      return item;
    });

    setFilteredConnectors(mappedConnectorComponent as TStack[]);
    // console.log(mappedConnectorComponent, 'mappedConnectorComponent');
  }, [connectorComponent, filter, flavourList]);

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
