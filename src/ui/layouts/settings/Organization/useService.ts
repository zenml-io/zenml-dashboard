/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import {
  organizationSelectors,
  stackComponentSelectors,
  stackPagesSelectors,
  stackSelectors,
} from '../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  setFilteredMembers: (members: TMember[]) => void;
  filteredMembers: TMember[];
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

export const useService = (): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'createdAt',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const dispatch = useDispatch();

  const [filteredMembers, setFilteredMembers] = useState<TMember[]>([]);

  const members = useSelector(organizationSelectors.myMembers);

  useEffect(() => {
    let filteredMembers = _.sortBy(members, (stack: TMember) =>
      new Date(stack.created).getTime(),
    ).reverse();

    setFilteredMembers(filteredMembers);
  }, [members]);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    filteredMembers,
    setFilteredMembers,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  };
};
