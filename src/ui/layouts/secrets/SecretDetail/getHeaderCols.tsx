import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../utils';
import { Box, FlexBox, icons, Paragraph, Tooltip } from '../../../components';
import { HeaderCol } from '../../common/Table';

export const GetHeaderCols = ({
  filteredSecret,
}: {
  filteredSecret: any[];
}): HeaderCol[] => {
  return [
    {
      render: () => (
        <Paragraph
          size="small"
          color="black"
          style={{ fontSize: '14px', marginLeft: '33px' }}
        >
          SECRET ID
        </Paragraph>
      ),
      width: '20%',
      renderRow: (secret: any) => (
        <>
          {secret.id && (
            <FlexBox alignItems="center">
              <div data-tip data-for={secret?.id}>
                <FlexBox.Row style={{ alignItems: 'center' }}>
                  <icons.chevronDown
                    color={iconColors.grey}
                    size={iconSizes.xs}
                  />

                  <Paragraph size="small" style={{ marginLeft: '20px' }}>
                    {truncate(secret.id, ID_MAX_LENGTH)}
                  </Paragraph>
                </FlexBox.Row>
              </div>
              <Tooltip id={secret.id} text={secret.id} />
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          NAME
        </Paragraph>
      ),
      width: '30%',
      renderRow: (secret: any) => (
        <>
          {secret.name && (
            <FlexBox alignItems="center">
              <div data-tip data-for={secret.name}>
                <Paragraph size="small" color="black">
                  {secret.name}
                </Paragraph>
              </div>
              <Tooltip id={secret.name} text={secret.name} />
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => (
        <Box>
          <Paragraph size="small" color="black">
            SCOPE
          </Paragraph>
        </Box>
      ),
      width: '15%',
      renderRow: (secret: any) => (
        <>
          {secret.scope && (
            <FlexBox alignItems="center">
              <div data-tip data-for={secret.scope}>
                <Paragraph size="small" color="black">
                  {secret.scope}
                </Paragraph>
              </div>
              <Tooltip id={secret.scope} text={secret.scope} />
            </FlexBox>
          )}
        </>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          AUTHOR
        </Paragraph>
      ),
      width: '15%',
      renderRow: (secret: any) => {
        return (
          <>
            {secret.user && (
              <FlexBox alignItems="center">
                <div
                  data-tip
                  data-for={
                    secret?.user?.full_name
                      ? secret?.user?.full_name
                      : secret?.user?.name
                  }
                >
                  <FlexBox alignItems="center">
                    <Paragraph size="small">
                      {secret?.user?.full_name
                        ? secret?.user?.full_name
                        : secret?.user?.name}
                    </Paragraph>
                  </FlexBox>
                </div>
                <Tooltip
                  id={
                    secret?.user?.full_name
                      ? secret.user?.full_name
                      : secret?.user?.name
                  }
                  text={
                    secret?.user?.full_name
                      ? secret.user?.full_name
                      : secret?.user?.name
                  }
                />
              </FlexBox>
            )}
          </>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          CREATED AT
        </Paragraph>
      ),
      width: '20%',
      renderRow: (secret: any) => (
        <>
          {secret.created && (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToSort(secret.created)}>
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(secret.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToSort(secret.created)}
                text={formatDateToDisplayOnTable(secret.created)}
              />
            </FlexBox>
          )}
        </>
      ),
    },
  ];
};
