/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  flavorSelectors,
  flavorPagesSelectors,
} from '../../../../../redux/selectors';
import axios from 'axios';
import { Flavor } from '../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  version: string;
  setAllFlavors: (flavors: Flavor[]) => void;
  allFlavors: Flavor[];
}

export const useService = (): ServiceInterface => {
  const [allFlavors, setAllFlavors] = useState<Flavor[]>([]);
  const [version, setVersion] = useState('');

  const fetching = useSelector(flavorPagesSelectors.fetching);

  const flavors = useSelector(flavorSelectors.myFlavorsAll);

  const getVersion = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/version`,
    );
    setVersion(data);
  };
  useEffect(() => {
    setAllFlavors(flavors as Flavor[]);
    getVersion();
  }, [flavors]);

  return {
    allFlavors,
    version,
    setAllFlavors,
    fetching,
  };
};
