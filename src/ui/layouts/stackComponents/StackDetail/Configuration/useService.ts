import { useSelector } from 'react-redux';
import {
  // flavorSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';
import {
  // Flavor,
  StackComponent,
} from '../../../../../api/types';

interface ServiceInterface {
  stackComponent: StackComponent;
  // flavor: Flavor;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stackComponent: StackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(stackId),
  );

  // const flavor = useSelector(flavorSelectors.flavorForId(flavorId));

  // const flavor = flavors[0];

  return { stackComponent };
};
