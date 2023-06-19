/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  stackComponentsActions,
  stackPagesActions,
} from '../../../../../redux/actions';
import {
  workspaceSelectors,
  stackComponentSelectors,
  stackPagesSelectors,
  stackSelectors,
  flavorSelectors,
  flavorPagesSelectors,
  connectorSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { useLocationPath } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  setAllConnectorsTypes: (flavors: any[]) => void;
  allConnectorsTypes: any[];
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const locationPath = useLocationPath();
  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [allConnectorsTypes, setAllConnectorsTypes] = useState<any[]>([]);

  const fetching = useSelector(flavorPagesSelectors.fetching);

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const connectors = useSelector(connectorSelectors.myConnectorsTypes);

  useEffect(() => {
    setAllConnectorsTypes(connectors as any[]);
  }, [connectors]);

  // useEffect(() => {
  //   if (!isValidFilter && !isExpended) {
  //     const intervalId = setInterval(() => {
  //       const applySorting =
  //         activeSortingDirection?.toLowerCase() + ':' + activeSorting;
  //       dispatch(
  //         stackComponentsActions.getMy({
  //           sort_by: applySorting ? applySorting : 'created',
  //           logical_operator: 'and',
  //           page: stackComponentsPaginated.page,
  //           size: stackComponentsPaginated.size,
  //           type: locationPath.split('/')[4],
  //           workspace: selectedWorkspace
  //             ? selectedWorkspace
  //             : locationPath.split('/')[2],
  //         }),
  //       );
  //     }, 5000);

  //     return () => clearInterval(intervalId);
  //   }
  // });

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    allConnectorsTypes,
    setAllConnectorsTypes,
    fetching,
  };
};
