// import { useEffect } from 'react';
// import { pipelinesActions, runsActions } from '../../../redux/actions';
import { organizationSelectors } from '../../../redux/selectors';
import { useSelector } from '../../hooks';

interface ServiceInterface {
  organization: TOrganization | null;
}

export const useService = (): ServiceInterface => {
  const organization = useSelector(organizationSelectors.myOrganization);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(pipelinesActions.getMy());
  // }, []);

  return {
    organization,
  };
};
