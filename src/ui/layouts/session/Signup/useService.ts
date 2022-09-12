import { useEffect, useState } from 'react';
import { loggedOutRoute, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { signUpAction } from '../../../../redux/actions/session/signupAction';
import { useDispatch, usePushRoute } from '../../../hooks';
import { translate } from './translate';
import { useGetSearchParam } from '../../../hooks/routes';
import { useRequestOnMount, useSelector } from '../../../hooks/store';
import { getInviteByCodeAction } from '../../../../redux/actions/organizations/getInviteByCodeAction';
import { organizationSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  signup: () => void;
  hasSubmittedWithErrors: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  invite: TInvite | undefined;
}

export const useService = (): ServiceInterface => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);

  const dispatch = useDispatch();
  const { push } = usePushRoute();
  const code = useGetSearchParam('code');

  const invite = useSelector(organizationSelectors.inviteForCode(code));

  useEffect(() => {
    setEmail(invite ? invite.email : '');
  }, [invite]);

  useRequestOnMount(() =>
    getInviteByCodeAction({
      code,
      onFailure: () => {
        if (code) {
          dispatch(
            showToasterAction({
              type: 'failure',
              description: translate('toasts.invalidCode.text'),
            }),
          );
        }
      },
    }),
  );

  return {
    signup: () => {
      setLoading(true);
      setHasSubmittedWithErrors(true);
      if (email.trim() !== '' && password.trim() !== '') {
        dispatch(
          signUpAction({
            password,
            email,
            onFailure: (errorMessage) => {
              dispatch(
                showToasterAction({
                  description: errorMessage,
                  type: toasterTypes.failure,
                }),
              );
              setLoading(false);
            },
            onSuccess: () => {
              dispatch(
                showToasterAction({
                  description: translate('toasts.successfulSignup.text'),
                  type: toasterTypes.success,
                }),
              );
              push(loggedOutRoute);
              setLoading(false);
            },
          }),
        );
      }
    },
    hasSubmittedWithErrors,
    email,
    setEmail,
    password,
    setPassword,
    invite,
    loading,
  };
};
