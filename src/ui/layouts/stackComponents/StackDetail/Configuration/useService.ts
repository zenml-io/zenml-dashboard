import { useSelector } from 'react-redux';
import { stackSelectors } from '../../../../../redux/selectors';

import YAML from 'json2yaml';

interface ServiceInterface {
  downloadYamlFile: () => void;
  stackConfig: string;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stack: TStack = useSelector(stackSelectors.stackForId(stackId));

  const yamlConfigObj: any = {
    stack_name: stack.name,
    components: {},
  };
  Object.keys(stack.components).forEach((element) => {
    yamlConfigObj.components[element] = {
      flavor: stack.components[element].flavor_name,
      name: stack.components[element].name,
      ...stack.components[element].configuration,
    };
  });

  const stackConfig = YAML.stringify(yamlConfigObj);

  const downloadYamlFile = () => {
    const element = document.createElement('a');

    const file = new Blob([stackConfig], {
      type: 'text/yaml',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${stack.id}-config.yaml`;
    document.body.appendChild(element);
    element.click();
  };

  return { downloadYamlFile, stackConfig };
};
