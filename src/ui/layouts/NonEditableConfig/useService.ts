import { useDispatch } from 'react-redux';
// import { stackComponentSelectors } from '../../../redux/selectors';

// import YAML from 'json2yaml';
import { useEffect, useState } from 'react';
// import { useLocationPath } from '../../hooks';
import { flavorPagesActions, flavorsActions } from '../../../redux/actions';

interface ServiceInterface {
  flavor: any;
}

export const useService = ({ details }: { details: any }): ServiceInterface => {
  // const locationPath = useLocationPath();
  const [flavor, setFlavor] = useState();
  // debugger;
  const dispatch = useDispatch();
  useEffect(() => {
    setFetching(true);

    dispatch(
      flavorsActions.getType({
        type: details?.type,
        name: details?.flavor.name,
        onSuccess: (res: any) => {
          setFlavor(res.items[0]);
        },
        onFailure: () => setFetching(false),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFetching = (fetching: boolean) => {
    dispatch(flavorPagesActions.setFetching({ fetching }));
  };
  // const yamlConfigObj: any = {
  //   [stackComponent.type as string]: {
  //     flavor: stackComponent.flavor,
  //     name: stackComponent.name,
  //     ...stackComponent.configuration,
  //   },
  // };

  // const stackConfig = YAML.stringify(yamlConfigObj);

  // const downloadYamlFile = () => {
  //   const element = document.createElement('a');

  //   const file = new Blob([stackConfig], {
  //     type: 'text/yaml',
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = `${stackComponent.id}-config.yaml`;
  //   document.body.appendChild(element);
  //   element.click();
  // };

  return { flavor };
};
