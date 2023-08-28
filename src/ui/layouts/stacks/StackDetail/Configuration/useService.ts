import { useSelector } from 'react-redux';
import { stackSelectors } from '../../../../../redux/selectors';
import { Stack, StackComponent } from '../../../../../api/types';

import YAML from 'json2yaml';

interface ServiceInterface {
  downloadYamlFile: () => void;
  stackConfig: string;
  stack: any;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stack: Stack = useSelector(stackSelectors.stackForId(stackId));

  const yamlConfigObj: any = {
    stack_name: stack.name,
    components: {},
  };

  Object.keys(stack.components).forEach((element) => {
    const componentArray = stack.components[element] as StackComponent[]; // Type assertion
    yamlConfigObj.components[element] = {
      flavor: componentArray[0].flavor,
      name: componentArray[0].name,
      id: componentArray[0].id,
      ...componentArray[0].configuration,
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

  return { downloadYamlFile, stackConfig, stack };
};
