import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../redux/selectors';

export const useAuthToken = (): string | null =>
  useSelector(sessionSelectors.authenticationToken);

export const useHubToken = (): string | null =>
  useSelector(sessionSelectors.hubToken);
