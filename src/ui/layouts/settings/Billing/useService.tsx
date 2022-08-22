import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '.';
import {
  organizationActions,
  showToasterAction,
  stripeActions,
} from '../../../../redux/actions';
import {
  organizationSelectors,
  stripeSelectors,
} from '../../../../redux/selectors';
import { useRequestOnMount } from '../../../hooks';

export const useService = () => {
  const [submitting, setSubmitting] = useState(false);
  const [changePaymentMethodMode, setChangePaymentMethodMode] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchingInvoices, setFetchingInvoices] = useState(true);
  const [company, setCompany] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const invoices = useSelector(organizationSelectors.invoices);

  const currentPaymentMethod = useSelector(
    stripeSelectors.currentPaymentMethod,
  );

  useRequestOnMount(() =>
    stripeActions.getPaymentMethod({
      onSuccess: () => setFetching(false),
      onFailure: () => setFetching(false),
    }),
  );
  useRequestOnMount(() =>
    organizationActions.getInvoices({
      onSuccess: () => setFetchingInvoices(false),
      onFailure: () => setFetchingInvoices(false),
    }),
  );

  useEffect(() => {
    if (currentPaymentMethod) {
      setCompany(currentPaymentMethod.billingDetails.name);
      setBillingAddress(currentPaymentMethod.billingDetails.address.line1);
      setCountry(currentPaymentMethod.billingDetails.address.country);
      setCity(currentPaymentMethod.billingDetails.address.city);
      setZipCode(currentPaymentMethod.billingDetails.address.postal_code);
    }
  }, [currentPaymentMethod]);

  const dispatch = useDispatch();

  const showErrorToaster = (message: string) => {
    dispatch(
      showToasterAction({
        type: 'failure',
        description: message,
      }),
    );
  };

  const hasWrongInvoices = () => {
    const failedInvoices = invoices.filter(
      (invoice) => invoice.status === 'uncollectible',
    );

    return failedInvoices && failedInvoices.length > 0;
  };

  const invoiceInformationHasError =
    !billingAddress ||
    billingAddress.trim() === '' ||
    !country ||
    country.trim() === '' ||
    !company ||
    company.trim() === '' ||
    !city ||
    city.trim() === '' ||
    !zipCode ||
    zipCode.trim() === '';

  return {
    setCompany,
    setBillingAddress,
    setCountry,
    setCity,
    setZipCode,
    invoiceInformationHasError,
    company,
    billingAddress,
    country,
    city,
    zipCode,
    fetching,
    fetchingInvoices,
    currentPaymentMethod,
    invoices,
    changePaymentMethodMode,
    setChangePaymentMethodMode,
    submitting,
    setSubmitting,
    showErrorToaster,
    hasWrongInvoices,
    cancelChangePaymentMethod: () => {
      setChangePaymentMethodMode(false);
      if (currentPaymentMethod) {
        setCompany(currentPaymentMethod.billingDetails.name);
        setBillingAddress(currentPaymentMethod.billingDetails.address.line1);
        setCountry(currentPaymentMethod.billingDetails.address.country);
        setCity(currentPaymentMethod.billingDetails.address.city);
        setZipCode(currentPaymentMethod.billingDetails.address.postal_code);
      }
    },
    updatePaymentMethod: ({ id }: { id: string | undefined }) => {
      dispatch(
        stripeActions.updatePaymentMethod({
          id,
          onSuccess: () => {
            dispatch(
              stripeActions.getPaymentMethod({
                onFailure: () => {
                  showErrorToaster(translate('toasters.error'));
                  setSubmitting(false);
                },
                onSuccess: () => {
                  dispatch(
                    showToasterAction({
                      type: 'success',
                      description: translate('toasters.success'),
                    }),
                  );
                  setChangePaymentMethodMode(false);
                  setSubmitting(false);
                },
              }),
            );

            if (hasWrongInvoices()) {
              const wrongInvoices = invoices.filter(
                (invoice) => invoice.status === 'uncollectible',
              );

              wrongInvoices.forEach((invoice) => {
                dispatch(
                  stripeActions.retryInvoice({
                    invoiceId: invoice.id,
                    paymentMethodId: id,
                  }),
                );
              });
            }
          },
          onFailure: (error: string) => {
            showErrorToaster(error || translate('toasters.error'));
            setSubmitting(false);
          },
        }),
      );
    },
  };
};
