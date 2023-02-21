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
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { useLocationPath } from '../../../../hooks';
import { Sorting, SortingDirection } from './ForSorting/types';
import { GetFlavorsListForLogo } from './GetFlavorsListForLogo';
interface ServiceInterface {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
  fetching: boolean;
  setFilteredStacks: (stacks: TStack[]) => void;
  filteredStacks: TStack[];
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
  isExpended?: any;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const { flavourList } = GetFlavorsListForLogo();
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const dispatch = useDispatch();
  const locationPath = useLocationPath();
  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const stackComponents = useSelector(
    stackComponentSelectors.mystackComponents,
  );
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const stackComponentsPaginated = useSelector(
    stackComponentSelectors.mystackComponentsPaginated,
  );
  const isValidFilter = filter?.map((f) => f.value).join('');
  useEffect(() => {
    const stackComponentsMap = stackComponents.map((item) => {
      const temp: any = flavourList.find(
        (fl: any) => fl.name === item.flavor && fl.type === item.type,
      );
      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: temp.logo_url,
            name: item.flavor,
          },
        };
      }
      return item;
    });
    console.log(stackComponentsMap, 'aaaaaaaaaa');
    console.log(flavourList, 'aaaaaaaaaa');
    setFilteredStacks(stackComponentsMap as TStack[]);
  }, [stackComponents, filter, flavourList]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const intervalId = setInterval(() => {
        const applySorting =
          activeSortingDirection?.toLowerCase() + ':' + activeSorting;
        dispatch(
          stackComponentsActions.getMy({
            sort_by: applySorting ? applySorting : 'created',
            logical_operator: 'and',
            index: stackComponentsPaginated.page,
            max_size: stackComponentsPaginated.size,
            type: locationPath.split('/')[4],
            workspace: selectedWorkspace
              ? selectedWorkspace
              : locationPath.split('/')[2],
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
  });

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    filteredStacks,
    setFilteredStacks,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
    openStackIds,
    setOpenStackIds,
    fetching,
  };
};
