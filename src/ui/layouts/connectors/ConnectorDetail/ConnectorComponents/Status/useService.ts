import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
import { useSelector } from '../../../../../hooks';
import { ServiceConnector } from '../../../../../../api/types';

interface ServiceInterface {
  lastThreeRuns: TRun[];
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
