import React from 'react';
import { useSelector } from 'react-redux';
import { iconSizes, iconColors } from '../../../../constants';
import { stripeSelectors } from '../../../../redux/selectors';
import { translate } from './.';
import {
  FlexBox,
  icons,
  Box,
  H4,
  Paragraph,
  GhostButton,
  Image,
} from '../../../components';

import styles from './index.module.scss';
import creditCardImage from './credit-card.png';

export const ShowPaymentMethod: React.FC<{
  setChangePaymentMethodMode: (mode: boolean) => void;
  invalidCreditCard: boolean;
}> = ({ setChangePaymentMethodMode, invalidCreditCard }) => {
  const currentPaymentMethod = useSelector(
    stripeSelectors.currentPaymentMethod,
  );

  return (
    <Box marginBottom="lg">
      <Box className={styles.creditCard}>
        {invalidCreditCard && (
          <>
            <FlexBox.Column
              justifyContent="center"
              alignItems="center"
              className={styles.creditCardError}
            >
              <Box>
                <icons.alertTriangle
                  size={iconSizes.xl}
                  color={iconColors.orange}
                />
              </Box>
              <Paragraph color="orange">
                {translate('creditCard.creditCardErrorText')}
              </Paragraph>
            </FlexBox.Column>
          </>
        )}
        <Box className={styles.creditCardImage}>
          <Image style={{ maxWidth: '100%' }} src={creditCardImage} />
        </Box>
        <Box className={styles.creditCardNumber}>
          <H4 color="primary" bold>
            <Box className={styles.bulletGroup}>
              <Box className={styles.bullet}></Box>
              <Box className={styles.bullet}></Box>
              <Box className={styles.bullet}></Box>
              <Box className={styles.bullet}></Box>
            </Box>
            <Box className={styles.bulletGroup}>
              <Box className={styles.bullet}></Box>
              <Box className={styles.bullet}></Box>
              <Box className={styles.bullet}></Box>
              <Box className={styles.bullet}></Box>
            </Box>
            {currentPaymentMethod && currentPaymentMethod.card.last4}
          </H4>
        </Box>
        <Box className={styles.creditCardName}>
          <H4 color="primary" bold>
            {currentPaymentMethod && currentPaymentMethod.billingDetails.name}
          </H4>
        </Box>
        <Box className={styles.creditCardExpiration}>
          <H4 color="primary" bold>
            {currentPaymentMethod && currentPaymentMethod.card.exp_month}/
            {currentPaymentMethod &&
              String(currentPaymentMethod.card.exp_year).substr(2, 4)}
          </H4>
        </Box>
      </Box>
      <FlexBox marginTop="xl" justifyContent="center">
        {invalidCreditCard ? (
          <GhostButton onClick={() => setChangePaymentMethodMode(true)}>
            {translate('creditCard.reviewPaymentMethod')}
          </GhostButton>
        ) : (
          <GhostButton onClick={() => setChangePaymentMethodMode(true)}>
            {translate('creditCard.changeButton')}
          </GhostButton>
        )}
      </FlexBox>
    </Box>
  );
};
