import { useDispatch, useSelector } from 'react-redux';
// import { stackComponentSelectors } from '../../../redux/selectors';

// import YAML from 'json2yaml';
import { useEffect, useState } from 'react';
// import { useLocationPath } from '../../hooks';
import {
  flavorPagesActions,
  flavorsActions,
  secretsActions,
} from '../../../redux/actions';
import { workspaceSelectors } from '../../../redux/selectors';

interface ServiceInterface {
  flavor: any;
}

export const useService = ({ details }: { details: any }): ServiceInterface => {
  // const locationPath = useLocationPath();
  const [flavor, setFlavor] = useState();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  useEffect(() => {
    setFetching(true);

    dispatch(
      flavorsActions.getType({
        type: details?.type,
        name: details?.flavor,
        onSuccess: (res: any) => {
          setFlavor(res.items[0]);
        },
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      secretsActions.getMy({
        size: 1000,
        workspace: selectedWorkspace,
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
