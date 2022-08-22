import React from 'react';

import { Box, Col, H3, Row } from '../../../components';
import { getTranslateByScope } from '../../../../services';
import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';

export const translate = getTranslateByScope(
  'ui.layouts.BillingSettings.Invoices',
);

export const Invoices: React.FC<{
  invoices: TInvoice[];
  fetching: boolean;
}> = ({ invoices, fetching }) => {
  const headerCols = useHeaderCols();

  return (
    <Box style={{ width: '100%' }}>
      <Row>
        <Col xs={12}>
          <Box marginBottom="md">
            <H3 color="darkGrey" bold>
              {translate('title')}
            </H3>
          </Box>
          <Table
            pagination={true}
            headerCols={headerCols}
            loading={fetching}
            showHeader={true}
            tableRows={invoices}
            emptyState={{ text: translate('table.emptyState.text') }}
          />
        </Col>
      </Row>
    </Box>
  );
};
