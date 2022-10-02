import React from 'react';
import { iconColors, iconSizes } from '../../../../constants';
import {
  FlexBox,
  icons,
  Box,
  Paragraph,
  Image,
  OrangeButton,
  H2,
  H4,
} from '../../../components';
import { useService } from './useService';
import { useSelector } from '../../../hooks';

import explorer from './explorer.png';

import styles from './index.module.scss';
import { billingSelectors } from '../../../../redux/selectors';
import { SwitchPlanPopup } from './components';

const MAX_DATAPOINTS_FOR_EXPLORER = 1000000;

const DatapointsUsageExplorer = () => {
  const organizationBilling = useSelector(billingSelectors.organizationBilling);

  console.log(organizationBilling);

  const datapointsThisMonth = organizationBilling
    ? organizationBilling.processedDatapointsThisMonth
    : 0;

  const percentage = (datapointsThisMonth * 100) / MAX_DATAPOINTS_FOR_EXPLORER;

  const maxPercentage = percentage > 100 ? 100 : percentage;

  return (
    <Box>
      <Box className={styles.progressBar} marginBottom="md">
        <Box
          style={{ width: `${maxPercentage.toFixed(0)}%` }}
          className={styles.currentProgress}
        >
          <Box className={styles.currentPercentage}>
            <Paragraph color="white">{`${maxPercentage.toFixed(
              0,
            )} %`}</Paragraph>
          </Box>
        </Box>
      </Box>
      <Paragraph color="grey">Included Datapoints used this month</Paragraph>
      <Paragraph color="grey">
        ({datapointsThisMonth.toFixed(0)}/{MAX_DATAPOINTS_FOR_EXPLORER})
      </Paragraph>
    </Box>
  );
};

export const ExplorerPlan: React.FC<{ isCurrentPlan: boolean }> = ({
  isCurrentPlan,
}) => {
  const {
    submitting,
    popupOpen,
    switchToExplorer,
    setPopupOpen,
  } = useService();

  return (
    <>
      {popupOpen && (
        <SwitchPlanPopup
          onConfirm={switchToExplorer}
          onClose={() => setPopupOpen(false)}
          title="Are you sure you want to cancel?"
          confirmButtonText="Switch back to Explorer"
          cancelButtonText="Stay a premium customer"
          orangeConfirmButton
          submitting={submitting}
        />
      )}
      <Box
        className={styles.planBox}
        style={isCurrentPlan ? { borderColor: '#ffc260' } : { border: 'none' }}
      >
        <Box
          paddingTop="sm"
          paddingBottom="sm"
          paddingLeft="xs"
          paddingRight="xs"
          className={styles.planBoxHeader}
          style={{ backgroundColor: '#ffc260' }}
        >
          <Paragraph bold color="white">
            {isCurrentPlan ? 'Your current plan' : 'Free Plan'}
          </Paragraph>
        </Box>
        <Box
          paddingBottom="xl"
          paddingTop="xxl"
          paddingLeft="md"
          paddingRight="md"
        >
          <Box style={{ width: 70, margin: '0 auto' }}>
            <Image style={{ maxWidth: '100%' }} src={explorer} />
          </Box>
          <Box paddingBottom="md" paddingTop="lg">
            <H2 bold>Explorer</H2>
          </Box>
          <Box paddingTop="sm">
            <H4 bold>Price: FREE</H4>
          </Box>
        </Box>
        {!isCurrentPlan && (
          <FlexBox.Column
            justifyContent="center"
            alignItems="center"
            paddingBottom="xl"
          >
            <OrangeButton onClick={() => setPopupOpen(true)}>
              Switch back to Explorer
            </OrangeButton>
            <FlexBox.Row alignItems="center" marginTop="md">
              <Box marginRight="xs">
                <icons.alertTriangle
                  color={iconColors.orange}
                  size={iconSizes.md}
                />
              </Box>
              <Paragraph color="grey">
                You will loose access to all premium features
              </Paragraph>
            </FlexBox.Row>
          </FlexBox.Column>
        )}
        {isCurrentPlan && (
          <Box paddingBottom="lg">
            <DatapointsUsageExplorer />
          </Box>
        )}
      </Box>
    </>
  );
};
