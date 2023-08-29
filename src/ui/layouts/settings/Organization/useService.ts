/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizationSelectors } from '../../../../redux/selectors';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  setFilteredMembers: (members: TMember[]) => void;
  filteredMembers: TMember[];
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
}

export const useService = (): ServiceInterface => {
  const [filteredMembers, setFilteredMembers] = useState<TMember[]>([]);
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');

  const members = useSelector(organizationSelectors.myMembers);

  useEffect(() => {
    let filteredMembers = _.orderBy(
      members,
      [activeSorting],
      [activeSortingDirection === 'DESC' ? 'desc' : 'asc'],
    );

    setFilteredMembers(filteredMembers as any);
  }, [members]);

  return {
    filteredMembers,
    setFilteredMembers,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  };
};
