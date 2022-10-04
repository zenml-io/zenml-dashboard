import { useEffect } from 'react';
import { stackComponentsActions } from '../../../redux/actions';
import { organizationSelectors } from '../../../redux/selectors';
import {
  useDispatch,
  useLocationPath,
  // useRequestOnMount,
  useSelector,
} from '../../hooks';

interface ServiceInterface {
  organization: TOrganization | null;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  // const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const dispatch = useDispatch();
  const organization = useSelector(organizationSelectors.myOrganization);
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(
        stackComponentsActions.getMy({
          // id: currentWorkspace.id,
          type: locationPath.split('/')[2],
        }),
      );
    }, 10000);

    return () => clearInterval(intervalId);
  });

  return {
    organization,
  };
};
