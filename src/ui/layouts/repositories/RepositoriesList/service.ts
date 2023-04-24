import { useDispatch, useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import {
  repositoryActions,
  repositoryPagesActions,
} from '../../../../redux/actions';
import { filterObjectForParam } from '../../../../utils';
import { useCallback } from 'react';

export const useUpdateRepositoryPagination = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const dispatchRepositoryPagination = useCallback(
    (page: number, size: number, filters?: any[]) => {
      dispatch(repositoryPagesActions.setFetching({ fetching: true }));
      let filtersParam = filterObjectForParam(filters);
      const logicalOperator = localStorage.getItem('logical_operator');

      dispatch(
        repositoryActions.getAll({
          onSuccess() {
            dispatch(repositoryPagesActions.setFetching({ fetching: false }));
          },
          onFailure() {
            dispatch(repositoryPagesActions.setFetching({ fetching: false }));
          },
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
