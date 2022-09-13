import { workspaceSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  workspace: TWorkspace;
}

export const useService = ({
  pipeline,
}: {
  pipeline: TStack;
}): ServiceInterface => {
  const workspace = useSelector(
    workspaceSelectors.workspaceForId(pipeline.projectName),
  );

  return { workspace };
};
