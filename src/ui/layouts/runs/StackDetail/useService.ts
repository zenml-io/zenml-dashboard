/* eslint-disable */

import { StackDetailRouteParams } from '.';

import { stackSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';

interface ServiceInterface {
  stack: TStack;
}

export const useService = (): ServiceInterface => {
  const { id } = useParams<StackDetailRouteParams>();

  const stack = useSelector(stackSelectors.stackForId(id));

  return { stack };
};
