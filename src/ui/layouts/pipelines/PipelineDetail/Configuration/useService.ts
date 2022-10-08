import { useSelector } from 'react-redux';
import {
  pipelineSelectors,
  // runSelectors,
} from '../../../../../redux/selectors';

import YAML from 'json2yaml';

interface ServiceInterface {
  downloadYamlFile: () => void;
  pipelineConfig: string;
}

export const useService = ({
  pipelineId,
}: {
  pipelineId: TId;
}): ServiceInterface => {
  const pipeline: TPipeline = useSelector(
    pipelineSelectors.pipelineForId(pipelineId),
  );

  const pipelineConfig = YAML.stringify(pipeline.spec);

  const downloadYamlFile = () => {
    const element = document.createElement('a');

    const file = new Blob([pipelineConfig], {
      type: 'text/yaml',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${pipeline.id}-config.yaml`;
    document.body.appendChild(element);
    element.click();
  };

  return { downloadYamlFile, pipelineConfig };
};
