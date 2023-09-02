/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  flavorSelectors,
  flavorPagesSelectors,
} from '../../../../../redux/selectors';
import { Flavor } from '../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  setAllFlavors: (flavors: Flavor[]) => void;
  allFlavors: Flavor[];
}

export const useService = (): ServiceInterface => {
  const [allFlavors, setAllFlavors] = useState<Flavor[]>([]);

  const fetching = useSelector(flavorPagesSelectors.fetching);

  const flavors = useSelector(flavorSelectors.myFlavorsAll);

  useEffect(() => {
    setAllFlavors(flavors as Flavor[]);
  }, [flavors]);

  return {
    allFlavors,
    setAllFlavors,
    fetching,
  };
};
