import { useSelector } from 'react-redux';
import {
  flavorSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';

// import {
//   flavorPagesActions,
//   // flavorsActions,
// } from '../../../../../redux/actions';

interface ServiceInterface {
  stackComponent: any;
  flavor: any;
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const stackComponent: TStack = useSelector(
    stackComponentSelectors.stackComponentForId(stackId),
  );
  // const [flavor, setFlavor] = useState();
  const flavors = useSelector(flavorSelectors.myFlavorsAll);

  const flavor: any = flavors[0];

  return { stackComponent, flavor };
};
