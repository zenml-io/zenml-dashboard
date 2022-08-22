import React from 'react';
import { getInitials } from '../../../utils';
import {
  Box,
  ColoredSquare,
  FlexBox,
  FormTextField,
  Paragraph,
  Row,
  Col,
} from '../../components';
import { useRequestOnMount, useSelector } from '../../hooks';
import {
  organizationActions,
  sessionActions,
  showToasterAction,
  userActions,
} from '../../../redux/actions';
import { organizationSelectors, userSelectors } from '../../../redux/selectors';

import { getTranslateByScope } from '../../../services';
import { useDispatch } from 'react-redux';
import { toasterTypes } from '../../../constants';
import { PrimaryButton } from '../../components/buttons/index';

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(organizationActions.getMy, {});
  useRequestOnMount(userActions.getMy, {});
  const dispatch = useDispatch();

  const organization = useSelector(organizationSelectors.myOrganization);
  const user = useSelector(userSelectors.myUser);

  if (!organization || !user) return null;

  const forgotPassword = () => {
    dispatch(
      sessionActions.forgotPassword({
        email: user.email,
        onFailure: () => {
          dispatch(
            showToasterAction({
              description: translate('toasts.failed.text'),
              type: toasterTypes.failure,
            }),
          );
        },
        onSuccess: () => {
          dispatch(
            showToasterAction({
              description: translate('toasts.successful.text'),
              type: toasterTypes.success,
            }),
          );
        },
      }),
    );
  };

  return (
    <FlexBox.Column flex={1}>
      <FlexBox.Row alignItems="center">
        <Box>
          <ColoredSquare size="md" color="secondary">
            <Paragraph color="white">
              {getInitials(organization.name)}
            </Paragraph>
          </ColoredSquare>
        </Box>
        <Box marginLeft="md">
          <Paragraph bold>{organization.name}</Paragraph>
        </Box>
      </FlexBox.Row>
      <Box marginTop="lg">
        <Paragraph color="grey">
          {translate('accountManagedText')} {organization.name}
        </Paragraph>
      </Box>
      <Box marginBottom="lg" marginTop="xl">
        <Row>
          <Col lg={6}>
            <FormTextField
              label={translate('form.fullName.label')}
              placeholder={translate('form.fullName.placeholder')}
              value={user.fullName}
              disabled
            />
          </Col>
          <Col lg={6}>
            <Box marginBottom="xs">
              <Paragraph>{translate('passwordReset.label')}</Paragraph>
            </Box>
            <PrimaryButton onClick={forgotPassword}>
              {translate('passwordReset.button')}
            </PrimaryButton>
          </Col>
        </Row>
      </Box>
      <Box marginBottom="lg">
        <Row>
          <Col lg={6}>
            <FormTextField
              label={translate('form.email.label')}
              placeholder={translate('form.email.placeholder')}
              value={user.email}
              disabled
            />
          </Col>
        </Row>
      </Box>
    </FlexBox.Column>
  );
};
