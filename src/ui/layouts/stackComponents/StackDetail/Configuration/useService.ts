import { useSelector } from 'react-redux';
import { stackComponentSelectors } from '../../../../../redux/selectors';

import YAML from 'json2yaml';

interface ServiceInterface {
  downloadYamlFile: () => void;
  stackConfig: string;
  stackComponent: any;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stackComponent: TStack = useSelector(
    stackComponentSelectors.stackComponentForId(stackId),
  );

  const yamlConfigObj: any = {
    [stackComponent.type as string]: {
      flavor: stackComponent.flavor,
      name: stackComponent.name,
      ...stackComponent.configuration,
    },
  };

  const stackConfig = YAML.stringify(yamlConfigObj);

  const downloadYamlFile = () => {
    const element = document.createElement('a');

    const file = new Blob([stackConfig], {
      type: 'text/yaml',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${stackComponent.id}-config.yaml`;
    document.body.appendChild(element);
    element.click();
  };

  return { downloadYamlFile, stackConfig, stackComponent };
};
