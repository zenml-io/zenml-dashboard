import React from 'react';
import { formatDateToDisplay, formatMoney } from '../../../../utils';
import {
  Box,
  Paragraph,
  icons,
  ColoredCircle,
  FlexBox,
  LinkBox,
} from '../../../components';
import { HeaderCol } from '../../common/Table';

import { getTranslateByScope } from '../../../../services';
import { iconSizes } from '../../../../constants';
import { iconColors } from '../../../../constants/icons';
import ReactTooltip from 'react-tooltip';

export const translate = getTranslateByScope(
  'ui.layouts.BillingSettings.Invoices.table',
);

const GreenCircle = () => (
  <ColoredCircle size="xs" color="green">
    <icons.check size={iconSizes.xs} color={iconColors.white} />
  </ColoredCircle>
);

const RedCircle = () => <ColoredCircle size="xs" color="red" />;
const OrangeCircle = () => <ColoredCircle size="xs" color="orange" />;

const getBGColorFromInvoiceStatus = (status: TInvoiceStatus) => {
  if (status === 'paid') return 'var(--green)';
  if (status === 'uncollectible') return 'var(--red)';
  return 'var(--orange)';
};

export const useHeaderCols = (): HeaderCol[] => {
  return [
    {
      render: () => <Paragraph size="small" color="grey"></Paragraph>,
      width: '5%',
      renderRow: (invoice: TInvoice) => (
        <Box marginLeft="md">
          <icons.fileText />
        </Box>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('invoiceId')}
        </Paragraph>
      ),
      width: '30%',
      renderRow: (invoice: TInvoice) => (
        <Paragraph size="small">{invoice.id}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('type')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (invoice: TInvoice) => <Paragraph size="small">PDF</Paragraph>,
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('amount')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (invoice: TInvoice) => (
        <Paragraph size="small">{formatMoney(invoice.total / 100)}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('paid')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (invoice: TInvoice) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={invoice.status}>
              {invoice.status === 'paid' && <GreenCircle />}
              {invoice.status === 'uncollectible' && <RedCircle />}
              {invoice.status !== 'paid' &&
                invoice.status !== 'uncollectible' && <OrangeCircle />}
            </div>
            <ReactTooltip
              id={invoice.status}
              place="top"
              effect="solid"
              backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
            >
              <Paragraph color="white">
                {translate(`tooltips.${invoice.status}`)}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('date')}
        </Paragraph>
      ),
      width: '20%',
      renderRow: (invoice: TInvoice) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(new Date(invoice.created * 1000))}
          </Paragraph>
        </FlexBox>
      ),
    },
    {
      render: () => <Paragraph size="small" color="grey"></Paragraph>,
      width: '20%',
      renderRow: (invoice: TInvoice) => (
        <FlexBox justifyContent="flex-end" marginRight="xl">
          <LinkBox onClick={() => window.open(invoice.invoicePdf, '_blank')}>
            <icons.download />
          </LinkBox>
        </FlexBox>
      ),
    },
  ];
};
