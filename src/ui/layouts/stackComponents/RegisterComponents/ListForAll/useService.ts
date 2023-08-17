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
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { useLocationPath } from '../../../../hooks';
import axios from 'axios';

interface ServiceInterface {
  fetching: boolean;
  version: string;
  setAllFlavors: (flavors: any[]) => void;
  allFlavors: any[];
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const locationPath = useLocationPath();
  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [allFlavors, setAllFlavors] = useState<any[]>([]);
  const [version, setVersion] = useState('');

  const fetching = useSelector(flavorPagesSelectors.fetching);

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavors = useSelector(flavorSelectors.myFlavorsAll);

  const getVersion = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/version`,
    );
    setVersion(data);
  };
  useEffect(() => {
    setAllFlavors(flavors as any[]);
    getVersion();
  }, [flavors]);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    allFlavors,
    version,
    setAllFlavors,
    fetching,
  };
};
