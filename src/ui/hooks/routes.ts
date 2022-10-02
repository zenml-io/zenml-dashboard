import { useLocation, useHistory, useParams } from 'react-router';
import { getSearchParam } from '../../utils';

export const useGetSearchParam = (paramName: string): string | null => {
  const location = useLocation();

  return getSearchParam(location, paramName);
};

export const useReplaceRoute = (): { replaceRoute: (arg1: string) => void } => {
  const history = useHistory();

  return {
    replaceRoute: (routeName: string): void => {
      history.replace(routeName);
    },
  };
};

export const usePushRoute = (): { push: (arg1: string) => void } => {
  const history = useHistory();

  return {
    push: (routeName: string): void => {
      history.push(routeName);
    },
  };
};

export const useLocationPath = () => {
  const location = useLocation();

  return location.pathname;
};

export { useParams, useHistory, useLocation };
