import { useSelector } from 'react-redux';
import {
  flavorSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';

import YAML from 'json2yaml';
import { useEffect } from 'react';
import { useLocationPath } from '../../../../hooks';
import { Flavor, StackComponent } from '../../../../../api/types';

interface ServiceInterface {
  downloadYamlFile: () => void;
  stackConfig: string;
  stackComponent: StackComponent;
  flavor: Flavor;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stackComponent: StackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(stackId),
  );
  const locationPath = useLocationPath();

  const flavors = useSelector(flavorSelectors.myFlavorsAll);
  const flavor = flavors[0];

  useEffect(() => {}, [locationPath]);

  const yamlConfigObj = {
    [stackComponent.type]: {
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

  return { stackComponent, flavor, downloadYamlFile, stackConfig };
};
