import { organizationSelectors } from '../../../redux/selectors';
import { useSelector } from '../../hooks';

interface ServiceInterface {
  organization: TOrganization | null;
}

export const useService = (): ServiceInterface => {
  const organization = useSelector(organizationSelectors.myOrganization);

  return {
    organization,
  };
};
