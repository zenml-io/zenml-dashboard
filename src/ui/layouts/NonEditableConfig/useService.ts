import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import {
  flavorPagesActions,
  flavorsActions,
  secretsActions,
  stackComponentsActions,
} from '../../../redux/actions';
import { workspaceSelectors } from '../../../redux/selectors';
import { Flavor } from '../../../api/types';

interface ServiceInterface {
  flavor?: Flavor;
  fetching: boolean;
}

export const useService = ({ details }: { details: any }): ServiceInterface => {
  const [flavor, setFlavor] = useState();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: details.id,
        onSuccess: () => {
          dispatch(
            flavorsActions.getType({
              type: details.body?.type,
              name: details.body?.flavor,
              onSuccess: (res: any) => {
                // setFlavor(res.items[0]);
                dispatch(
                  flavorsActions.getById({
                    flavorId: res.items[0].id,
                    onSuccess: (item: any) => {
                      setFlavor(item);

                      setFetching(false);
                    },
                    onFailure: () => setFetching(false),
                  }),
                );
              },
              onFailure: () => setFetching(false),
            }),
          );
        },
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

  // const setFetching = (fetching: boolean) => {
  //   dispatch(flavorPagesActions.setFetching({ fetching }));
  // };

  return { flavor, fetching };
};
