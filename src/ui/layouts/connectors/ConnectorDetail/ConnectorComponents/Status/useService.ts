import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
import { useSelector } from '../../../../../hooks';
import { Run, ServiceConnector } from '../../../../../../api/types';

interface ServiceInterface {
  lastThreeRuns: Run[];
}

export const useService = ({
  connector,
}: {
  connector: ServiceConnector;
}): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(connector.id));

  const lastThreeRuns = getLastThreeRuns(runs);

  return { lastThreeRuns };
};
