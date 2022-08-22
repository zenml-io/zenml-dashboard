import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import {
  Box,
  Paragraph,
  H2,
  H4,
  FlexBox,
  PrimaryButton,
  Image,
} from '../../../components';
import { usePushRoute, useSelector } from '../../../hooks';
import { useService } from './useService';

import unlimited from './unlimited.png';

import styles from './index.module.scss';
import { SwitchPlanPopup, BulletPointText } from './components';
import { billingSelectors } from '../../../../redux/selectors';
import { formatMoney } from '../../../../utils';

const Datapoints = () => {
  const organizationBilling = useSelector(billingSelectors.organizationBilling);

  console.log(organizationBilling);

  return (
    <Box marginTop="xl">
      <Paragraph color="grey">
        Datapoints used this month:{' '}
        {(organizationBilling &&
          organizationBilling.processedDatapointsThisMonth) ||
          0}{' '}
        {`(${formatMoney(
          organizationBilling ? organizationBilling.costThisMonth : 0,
        )})`}
      </Paragraph>
    </Box>
  );
};

export const UnlimitedPlan: React.FC<{
  isCurrentPlan: boolean;
  currentPaymentMethod: TPaymentMethod | null;
}> = ({ isCurrentPlan, currentPaymentMethod }) => {
  const {
    submitting,
    popupOpen,
    switchToUnlimited,
    setPopupOpen,
    showErrorToaster,
  } = useService();
  const { push } = usePushRoute();

  const openPopup = () => {
    if (currentPaymentMethod) {
      setPopupOpen(true);
    } else {
      showErrorToaster('Fill out your Billing Information first!');
      push(routePaths.settings.billing);
    }
  };

  return (
    <>
      {popupOpen && (
        <SwitchPlanPopup
          onConfirm={switchToUnlimited}
          onClose={() => setPopupOpen(false)}
          title="Are you sure you want to switch to Unlimited Plan?"
          confirmButtonText="Switch to Unlimited"
          cancelButtonText="Stay a free plan customer"
          submitting={submitting}
        />
      )}
      <Box
        className={styles.planBox}
        style={isCurrentPlan ? { borderColor: '#2BD978' } : { border: 'none' }}
      >
        <Box
          paddingTop="sm"
          paddingBottom="sm"
          paddingLeft="xs"
          paddingRight="xs"
          className={styles.planBoxHeader}
          style={{ backgroundColor: '#2BD978' }}
        >
          <Paragraph bold color="white">
            {isCurrentPlan ? 'Your current plan' : 'Unlimited Plan'}
          </Paragraph>
        </Box>
        <Box
          paddingBottom="xl"
          paddingTop="xxl"
          paddingLeft="md"
          paddingRight="md"
        >
          <Box style={{ width: 92, margin: '0 auto' }}>
            <Image style={{ maxWidth: '100%' }} src={unlimited} />
          </Box>
          <Box paddingBottom="md" paddingTop="lg">
            <H2 bold>Unlimited</H2>
          </Box>
          <Box paddingTop="sm">
            <H4 bold>Price: EUR 100/month</H4>
          </Box>
          <Box paddingTop="sm">
            <H4 bold>+ EUR 0,25 per million processed datapoints</H4>
          </Box>
          <Box
            paddingLeft="xl"
            paddingRight="xl"
            style={{ textAlign: 'left' }}
            paddingTop="xl"
            paddingBottom="md"
          >
            <Paragraph bold color="darkGrey">
              Get all functions of the free plan plus:
            </Paragraph>
          </Box>
          <BulletPointText text="Unlimited users" />
          <BulletPointText text="Unlimited workspaces" />
          <BulletPointText text="Unlimited datasources" />
          <BulletPointText text="Run all workloads in YOUR cloud environment" />
          <BulletPointText text="Tailor-made support plans and SLAs" />
          <BulletPointText text="Full access to trained model artifacts and managed serving of models" />
          <BulletPointText text="Trigger-based retraining (Time, Data, Webhooks)" />
          <BulletPointText text="Continuous training and evaluation" />
          {isCurrentPlan && <Datapoints />}
          {!isCurrentPlan && (
            <Box>
              <FlexBox
                justifyContent="center"
                paddingTop="xl"
                paddingBottom="sm"
              >
                <PrimaryButton onClick={openPopup}>
                  Get Unlimited Plan
                </PrimaryButton>
              </FlexBox>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
