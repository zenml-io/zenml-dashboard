import { useEffect, useState } from 'react';

import { workspaceSelectors } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

interface ServiceInterface {}
interface filterValue {
  label: string;
  type: string;
  value: string;
}

export const usePollingService = ({
  pipelineId,
  stackId,
  stackComponentId,
  filter,
  sortBy,
  isExpended,
  dispatchFun,
  paginatedValue,
}: {
  pipelineId?: TId;
  stackId?: TId;
  stackComponentId?: TId;
  isExpended?: any;
  sortBy: string;
  dispatchFun: Function;

  paginatedValue: any;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const isValidFilter = filter?.map((f) => f.value).join('');
  const [pending, setPending] = useState(false);
  console.log(stackComponentId, 'dispatchFun');
  useEffect(() => {
    if (!isValidFilter && !isExpended && !pending) {
      const intervalId = setInterval(() => {
        setPending(true);

        dispatch(
          dispatchFun({
            pipelineId: pipelineId,
            stackId: stackId,
            component_id: stackComponentId,
            sort_by: sortBy,
            logical_operator: 'and',
            workspace: selectedWorkspace,
            page: paginatedValue.page,
            size: paginatedValue.size,
            onSuccess: () => {
              setPending(false);
            },
            onFailure: () => {
              setPending(false);
            },
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
  });

  return {};
};
