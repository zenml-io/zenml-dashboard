import React from 'react';
import { Row, Col, FlexBox } from '../../../components';

import { useRequestOnMount } from '../../../hooks/store';
import {
  stripeActions,
  billingActions,
} from '../../../../redux/actions/billing/index';
import { useSelector } from 'react-redux';
import { stripeSelectors } from '../../../../redux/selectors';

import {
  STRIPE_EXPLORER_SUBSCRIPTION_TYPE,
  STRIPE_UNLIMITED_SUBSCRIPTION_TYPE,
} from '../../../../constants';
import { UnlimitedPlan } from './UnlimitedPlan';
import { ExplorerPlan } from './ExplorerPlan';

export const Plan: React.FC = () => {
  useRequestOnMount(() => stripeActions.getSubscription({}));
  // useRequestOnMount(() => billingActions.getOrganizationBilling({}));
  useRequestOnMount(() => stripeActions.getPaymentMethod({}));

  const currentSubscription = useSelector(stripeSelectors.currentSubscription);
  const currentPaymentMethod = useSelector(
    stripeSelectors.currentPaymentMethod,
  );

  const currentPlanName = currentSubscription
    ? currentSubscription.planType
    : STRIPE_EXPLORER_SUBSCRIPTION_TYPE;

  return (
    <FlexBox flex={1}>
      <Row style={{ width: '100%' }}>
        <Col xs={12} lg={6}>
          <ExplorerPlan
            isCurrentPlan={
              currentPlanName === STRIPE_EXPLORER_SUBSCRIPTION_TYPE
            }
          />
        </Col>
        <Col xs={12} lg={6}>
          <UnlimitedPlan
            currentPaymentMethod={currentPaymentMethod}
            isCurrentPlan={
              currentPlanName === STRIPE_UNLIMITED_SUBSCRIPTION_TYPE
            }
          />
        </Col>
      </Row>
    </FlexBox>
  );
};
