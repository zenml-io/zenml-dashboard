import React from 'react';
import { getData } from 'country-list';
import { translate } from '.';
import {
  Box,
  H4,
  FormTextField,
  FlexBox,
  FormDropdownField,
} from '../../../components';

const countryList = getData();

const countries = countryList.map((country) => ({
  value: country.code,
  label: country.name,
}));

export const InvoiceInformationForm: React.FC<{
  company: string;
  setCompany: (val: string) => void;
  billingAddress: string;
  setBillingAddress: (val: string) => void;
  zipCode: string;
  setZipCode: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  country: string;
  setCountry: (val: string) => void;
  disabled: boolean;
  hasSubmitted: boolean;
}> = ({
  company,
  setCompany,
  billingAddress,
  setBillingAddress,
  zipCode,
  setZipCode,
  city,
  setCity,
  country,
  setCountry,
  disabled,
  hasSubmitted,
}) => {
  return (
    <Box marginBottom="md">
      <H4 color="darkGrey" bold>
        {translate('invoiceInformation.title')}
      </H4>
      <Box marginTop="md">
        <Box marginBottom="lg">
          <FormTextField
            disabled={disabled}
            label={translate('invoiceInformation.company.label')}
            placeholder={translate('invoiceInformation.company.placeholder')}
            value={company}
            onChange={(val: string) => setCompany(val)}
            error={{
              hasError: hasSubmitted && (!company || company.trim() === ''),
              text: translate('invoiceInformation.company.required'),
            }}
          />
        </Box>
        <Box marginBottom="lg">
          <FormTextField
            disabled={disabled}
            label={translate('invoiceInformation.billingAddress.label')}
            placeholder={translate(
              'invoiceInformation.billingAddress.placeholder',
            )}
            value={billingAddress}
            onChange={(val: string) => setBillingAddress(val)}
            error={{
              hasError:
                hasSubmitted &&
                (!billingAddress || billingAddress.trim() === ''),
              text: translate('invoiceInformation.billingAddress.required'),
            }}
          />
        </Box>
        <FlexBox.Row marginBottom="lg">
          <Box style={{ width: '50%' }}>
            <FormTextField
              disabled={disabled}
              label={translate('invoiceInformation.zipCode.label')}
              placeholder={translate('invoiceInformation.zipCode.placeholder')}
              value={zipCode}
              onChange={(val: string) => setZipCode(val)}
              error={{
                hasError: hasSubmitted && (!zipCode || zipCode.trim() === ''),
                text: translate('invoiceInformation.zipCode.required'),
              }}
            />
          </Box>
          <Box style={{ width: '50%' }} marginLeft="lg">
            <FormTextField
              disabled={disabled}
              label={translate('invoiceInformation.city.label')}
              placeholder={translate('invoiceInformation.city.placeholder')}
              value={city}
              onChange={(val: string) => setCity(val)}
              error={{
                hasError: hasSubmitted && (!city || city.trim() === ''),
                text: translate('invoiceInformation.city.required'),
              }}
            />
          </Box>
        </FlexBox.Row>
        <Box marginBottom="lg">
          <FormDropdownField
            label={translate('invoiceInformation.country.label')}
            placeholder={translate('invoiceInformation.country.placeholder')}
            disabled={disabled}
            value={country}
            options={countries}
            onChange={(value: any) => {
              setCountry(value);
            }}
            error={{
              hasError: hasSubmitted && (!country || country.trim() === ''),
              text: translate('invoiceInformation.country.required'),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
