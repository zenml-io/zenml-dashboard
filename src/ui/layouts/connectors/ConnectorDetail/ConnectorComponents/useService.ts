/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  secretPagesSelectors,
  connectorSelectors,
} from '../../../../../redux/selectors';

import { Sorting, SortingDirection } from './ForSorting/types';
import { GetFlavorsListForLogo } from './GetFlavorsListForLogo';
import { ServiceConnector } from '../../../../../api/types';

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
  filter,
  isExpended,
}: {
  connectorDetail?: any;

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

  const { flavourList } = GetFlavorsListForLogo();
  const [openConnectorIds, setOpenConnectorIds] = useState<TId[]>([]);
  const [filteredConnectors, setFilteredConnectors] = useState<any[]>([]);

  const fetching = useSelector(secretPagesSelectors.fetching);

  const isValidFilter = filter.map((f) => f.value).join('');

  const connectorComponent: any = useSelector(
    connectorSelectors.connectorComponents,
  );

  useEffect(() => {
    // if (flavourList.length) {

    const mappedConnectorComponent = connectorComponent.map((item: any) => {
      const temp: any = flavourList.find(
        (fl: any) =>
          fl.name === item?.body?.flavor && fl.body?.type === item.body?.type,
      );

      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: temp.body.logo_url,
            name: item.body.flavor,
            connectorResourceType: temp.metadata.connector_resource_type,
          },
        };
      }

      return item;
    });

    setFilteredConnectors(mappedConnectorComponent as ServiceConnector[]);
    // }
  }, [connectorComponent, filter, flavourList]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const applySorting =
        activeSortingDirection?.toLowerCase() + ':' + activeSorting;
    }
  });

  const setSelectedRunIds = (runIds: TId[]) => {};

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
