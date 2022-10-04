import { useEffect } from 'react';
import { pipelinesActions, runsActions } from '../../../redux/actions';
import { organizationSelectors } from '../../../redux/selectors';
import { useSelector, useDispatch } from '../../hooks';

interface ServiceInterface {
  organization: TOrganization | null;
}

export const useService = (): ServiceInterface => {
  const organization = useSelector(organizationSelectors.myOrganization);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(pipelinesActions.getMy());
  // }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(runsActions.allRuns({}));
      dispatch(pipelinesActions.getMy());
    }, 10000);

    return () => clearInterval(intervalId); //This is important
  });
  return {
    organization,
  };
};
