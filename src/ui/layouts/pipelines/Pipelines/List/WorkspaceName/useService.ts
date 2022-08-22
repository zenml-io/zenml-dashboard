import { workspaceSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  workspace: TWorkspace;
}

export const useService = ({
  pipeline,
}: {
  pipeline: TPipeline;
}): ServiceInterface => {
  const workspace = useSelector(
    workspaceSelectors.workspaceForId(pipeline.workspaceId),
  );

  return { workspace };
};
