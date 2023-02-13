/* eslint-disable */

import { useEffect } from 'react';
import { flavorsActions, flavorPagesActions } from '../../../../redux/actions';
// import { workspaceSelectors } from '../../../../redux/selectors';
import {
  useDispatch,
  useLocationPath,
  useParams,
  useSelector,
} from '../../../hooks';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import {
  flavorSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { filterObjectForParam } from '../../../../utils';
import { FlavorDetailRouteParams } from '.';

interface ServiceInterface {
  flavor: any;
  id: any;
}

export const useService = (): ServiceInterface => {
  const { id } = useParams<FlavorDetailRouteParams>();
  const flavor: any = useSelector(flavorSelectors.flavorForId(id));

  return {
    id,
    flavor,
  };
};
