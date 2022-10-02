import { useDispatch } from './store';
import { showToasterAction } from '../../redux/actions';
import { toasterTypes } from '../../constants';

interface Return {
  successToast: (param1: { description: string }) => void;
  failureToast: (param1: { description: string }) => void;
}

export const useToaster = (): Return => {
  const dispatch = useDispatch();

  return {
    successToast: ({ description }: { description: string }): void => {
      dispatch(
        showToasterAction({
          description,
          type: toasterTypes.success,
        }),
      );
    },

    failureToast: ({ description }: { description: string }): void => {
      dispatch(
        showToasterAction({
          description,
          type: toasterTypes.failure,
        }),
      );
    },
  };
};
