import React from 'react';
import { translate } from './.';
import { Box, FlexBox, Paragraph } from '../../../components';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

import styles from './index.module.scss';

const inputClassAndStyles = {
  classes: {
    base: styles.input,
    invalid: styles.error,
    focus: styles.focus,
  },
  style: {
    base: {
      fontSize: '16px',
      color: '#424240',
      '::placeholder': {
        color: '#A1A4AB',
      },
    },
  },
};

export const CreditCardForm: React.FC = () => {
  return (
    <Box style={{ width: '100%' }} marginTop="md">
      <Box marginBottom="md">
        <Box paddingBottom="xs">
          <Paragraph size="body" color="black">
            <label>{translate('creditCard.cardNumber.label')}</label>
          </Paragraph>
        </Box>
        <CardNumberElement
          options={{
            placeholder: translate('creditCard.cardNumber.placeholder'),
            ...inputClassAndStyles,
          }}
        />
      </Box>
      <FlexBox.Row marginBottom="md">
        <Box style={{ width: '50%' }}>
          <Box paddingBottom="xs">
            <Paragraph size="body" color="black">
              <label>{translate('creditCard.expires.label')}</label>
            </Paragraph>
          </Box>
          <CardExpiryElement
            options={{
              ...inputClassAndStyles,
            }}
          />
        </Box>
        <Box style={{ width: '50%' }} marginLeft="md">
          <Box paddingBottom="xs">
            <Paragraph size="body" color="black">
              <label>{translate('creditCard.cvv.label')}</label>
            </Paragraph>
          </Box>
          <CardCvcElement
            options={{
              placeholder: translate('creditCard.cvv.placeholder'),
              ...inputClassAndStyles,
            }}
          />
        </Box>
      </FlexBox.Row>
    </Box>
  );
};
