import { useSelector } from 'react-redux';
import { runSelectors } from '../../../../../redux/selectors';

import YAML from 'json2yaml';

interface ServiceInterface {
  downloadYamlFile: () => void;
  pipelineConfig: string;
  run: any;
}

export const useService = ({ runId }: { runId: TId }): ServiceInterface => {
  const run: TRun = useSelector(runSelectors.runForId(runId));
  const pipelineConfig = YAML.stringify(run.pipelineConfiguration);

  const downloadYamlFile = () => {
    const element = document.createElement('a');

    const file = new Blob([pipelineConfig], {
      type: 'text/yaml',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${run.id}-config.yaml`;
    document.body.appendChild(element);
    element.click();
  };

  return { downloadYamlFile, pipelineConfig, run };
};
