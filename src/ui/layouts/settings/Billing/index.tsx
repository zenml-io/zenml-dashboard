import React, { useState } from 'react';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  Box,
  Row,
  H3,
  Col,
  PrimaryButton,
  H4,
  FlexBox,
  GhostButton,
} from '../../../components';

import { getTranslateByScope } from '../../../../services';
import { Invoices } from './Invoices';

import { ShowPaymentMethod } from './ShowPaymentMethod';
import { Spinner } from '../../../components/spinners/index';
import { useService } from './useService';
import { InvoiceInformationForm } from './InvoiceInformationForm';
import { CreditCardForm } from './CreditCardForm';

export const translate = getTranslateByScope('ui.layouts.BillingSettings');

export const Billing: React.FC = () => {
  const {
    changePaymentMethodMode,
    setChangePaymentMethodMode,
    submitting,
    setSubmitting,
    showErrorToaster,
    updatePaymentMethod,
    currentPaymentMethod,
    invoices,
    fetching,
    fetchingInvoices,
    cancelChangePaymentMethod,
    company,
    billingAddress,
    country,
    city,
    zipCode,
    invoiceInformationHasError,
    setCompany,
    setBillingAddress,
    setCountry,
    setCity,
    setZipCode,
    hasWrongInvoices,
  } = useService();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string,
  );

  if (fetching)
    return (
      <FlexBox
        flex={1}
        style={{ width: '100%', minHeight: '15rem' }}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="md" color="black" />
      </FlexBox>
    );

  return (
    <Box style={{ width: '100%' }}>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => {
            if (!stripe || !elements) return null;
            const handleSubmit = async () => {
              setHasSubmitted(true);
              const cardElement = elements.getElement('cardNumber');

              if (invoiceInformationHasError) return;

              if (cardElement) {
                setSubmitting(true);

                const {
                  error,
                  paymentMethod,
                } = await stripe.createPaymentMethod({
                  type: 'card',
                  card: cardElement,
                  billing_details: {
                    name: company,
                    address: {
                      city,
                      country,
                      line1: billingAddress,
                      postal_code: zipCode,
                    },
                  },
                });

                if (!error) {
                  const id = paymentMethod?.id;
                  updatePaymentMethod({ id });
                } else {
                  setSubmitting(false);
                  showErrorToaster(
                    error.message ? error.message : translate('toasters.error'),
                  );
                }
              }
            };

            return (
              <Row>
                <Col xs={12}>
                  <Box marginBottom="md">
                    <H3 color="darkGrey" bold>
                      {translate('title')}
                    </H3>
                  </Box>
                </Col>
                <Col lg={6}>
                  <Box marginRight="xxl">
                    <Box marginBottom="md">
                      <H4 color="darkGrey" bold>
                        {translate('creditCard.title')}
                      </H4>
                    </Box>
                    {currentPaymentMethod && !changePaymentMethodMode ? (
                      <ShowPaymentMethod
                        invalidCreditCard={hasWrongInvoices()}
                        setChangePaymentMethodMode={setChangePaymentMethodMode}
                      />
                    ) : (
                      <CreditCardForm />
                    )}
                  </Box>
                </Col>
                <Col lg={6}>
                  <InvoiceInformationForm
                    company={company}
                    billingAddress={billingAddress}
                    country={country}
                    city={city}
                    zipCode={zipCode}
                    setCompany={setCompany}
                    setBillingAddress={setBillingAddress}
                    setCountry={setCountry}
                    setCity={setCity}
                    setZipCode={setZipCode}
                    hasSubmitted={hasSubmitted}
                    disabled={
                      !!currentPaymentMethod && !changePaymentMethodMode
                    }
                  />
                  <FlexBox.Row
                    alignItems="center"
                    marginTop="xl"
                    justifyContent="flex-end"
                  >
                    {changePaymentMethodMode && (
                      <Box marginRight="lg">
                        <GhostButton
                          disabled={submitting}
                          loading={submitting}
                          onClick={cancelChangePaymentMethod}
                        >
                          {translate('creditCard.cancelButton')}
                        </GhostButton>
                      </Box>
                    )}
                    {!currentPaymentMethod || changePaymentMethodMode ? (
                      <PrimaryButton
                        disabled={submitting || invoiceInformationHasError}
                        loading={submitting}
                        onClick={handleSubmit}
                      >
                        {translate('creditCard.saveButton')}
                      </PrimaryButton>
                    ) : null}
                  </FlexBox.Row>
                </Col>
              </Row>
            );
          }}
        </ElementsConsumer>
      </Elements>
      <Invoices invoices={invoices} fetching={fetchingInvoices} />
    </Box>
  );
};
