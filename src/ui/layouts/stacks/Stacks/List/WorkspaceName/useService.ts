import { workspaceSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  workspace: TWorkspace;
}

export const useService = ({ stack }: { stack: TStack }): ServiceInterface => {
  const workspace = useSelector(
    workspaceSelectors.workspaceForId(stack.projectName),
  );

  return { workspace };
};
