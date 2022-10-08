// import { useEffect } from 'react';
// import { stackComponentsActions } from '../../../redux/actions';
import { organizationSelectors } from '../../../redux/selectors';
import {
  // useLocationPath,
  // useRequestOnMount,
  useSelector,
} from '../../hooks';

interface ServiceInterface {
  organization: TOrganization | null;
}

export const useService = (): ServiceInterface => {
  // const locationPath = useLocationPath();
  // const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const organization = useSelector(organizationSelectors.myOrganization);

  return {
    organization,
  };
};
