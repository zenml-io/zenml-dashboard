import { useSelector } from 'react-redux';
import { pipelineSelectors } from '../../../../../redux/selectors';

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

  const yamlConfigObj: any = {
    stack_name: pipeline.name,
    components: {},
  };
  Object.keys(pipeline.components).forEach((element) => {
    yamlConfigObj.components[element] = {
      flavor: pipeline.components[element].flavor_name,
      name: pipeline.components[element].name,
      ...pipeline.components[element].configuration,
    };
  });

  const pipelineConfig = YAML.stringify(yamlConfigObj);

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
