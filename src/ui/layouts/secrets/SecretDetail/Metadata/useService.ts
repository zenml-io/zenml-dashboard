import { useSelector } from 'react-redux';

import {
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
  runsPaginated: any;
}
interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = ({
  sortBy,
  secretId,
  filter,
  isExpended,
}: {
  isExpended?: any;
  secretId: TId;
  sortBy: string;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);

  const runsPaginated = useSelector(runSelectors.myRunsPaginated);

  const runIds: any = [];

  return { fetching, runIds, runsPaginated };
};
