import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { repositoryActions } from '../../../../redux/actions/repositories';
import { workspaceSelectors } from '../../../../redux/selectors';

function RepositoriesList() {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  useEffect(() => {
    dispatch(repositoryActions.getAll({ workspace: selectedWorkspace }));
  }, [selectedWorkspace, dispatch]);
  return <div>RepositoriesList</div>;
}

export default RepositoriesList;
