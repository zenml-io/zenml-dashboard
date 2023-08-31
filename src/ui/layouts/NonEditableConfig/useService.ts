import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import {
  flavorPagesActions,
  flavorsActions,
  secretsActions,
} from '../../../redux/actions';
import { workspaceSelectors } from '../../../redux/selectors';
import { Flavor } from '../../../api/types';

interface ServiceInterface {
  flavor?: Flavor;
}

export const useService = ({ details }: { details: any }): ServiceInterface => {
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

  return { flavor };
};
