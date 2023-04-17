import { useDispatch, useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import { repositoryActions } from '../../../../redux/actions';

export const useUpdateRepositoryPagination = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchRepositoryPagination(page: number, size: number) {
    dispatch(
      repositoryActions.getAll({
        workspace: selectedWorkspace,
        page,
        size,
      }),
    );
  }
  return {
    dispatchRepositoryPagination,
  };
};
