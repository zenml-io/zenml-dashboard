import { useDispatch, useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import { repositoryActions } from '../../../../redux/actions';
import { filterObjectForParam } from '../../../../utils';
import { useCallback } from 'react';

export const useUpdateRepositoryPagination = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const dispatchRepositoryPagination = useCallback(
    (page: number, size: number, filters?: any[]) => {
      let filtersParam = filterObjectForParam(filters);
      const logicalOperator = localStorage.getItem('logical_operator');
      dispatch(
        repositoryActions.getAll({
          workspace: selectedWorkspace,
          page,
          logical_operator: logicalOperator
            ? JSON.parse(logicalOperator)
            : 'and',
          size,
          filtersParam,
        }),
      );
    },
    [dispatch, selectedWorkspace],
  );
  return {
    dispatchRepositoryPagination,
  };
};
