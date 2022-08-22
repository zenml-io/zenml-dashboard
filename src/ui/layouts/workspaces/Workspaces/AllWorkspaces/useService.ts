import {
  workspacePagesSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { useSelector } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  workspaces: TWorkspace[];
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(workspacePagesSelectors.fetching);

  const workspaces = useSelector(workspaceSelectors.myWorkspaces);

  return {
    fetching,
    workspaces,
  };
};
