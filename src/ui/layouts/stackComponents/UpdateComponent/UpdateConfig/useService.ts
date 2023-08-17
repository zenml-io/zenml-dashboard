import { useSelector } from 'react-redux';
import {
  flavorSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';

import YAML from 'json2yaml';
import { useEffect } from 'react';
import { useLocationPath } from '../../../../hooks';

interface ServiceInterface {
  downloadYamlFile: () => void;
  stackConfig: string;
  stackComponent: any;
  flavor: any;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stackComponent: TStack = useSelector(
    stackComponentSelectors.stackComponentForId(stackId),
  );
  const locationPath = useLocationPath();

  const flavors = useSelector(flavorSelectors.myFlavorsAll);
  const flavor = flavors[0];

  useEffect(() => {}, [locationPath]);

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

  return { downloadYamlFile, stackConfig, stackComponent, flavor };
};
