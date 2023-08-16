import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../utils';
import { Box, FlexBox, icons, Paragraph } from '../../../components';
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
              <ReactTooltip id={secret.id} place="top" effect="solid">
                <Paragraph color="white">{secret.id}</Paragraph>
              </ReactTooltip>
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
              <ReactTooltip id={secret.name} place="top" effect="solid">
                <Paragraph color="white">{secret.name}</Paragraph>
              </ReactTooltip>
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
              <ReactTooltip id={secret.scope} place="top" effect="solid">
                <Paragraph color="white">{secret.scope}</Paragraph>
              </ReactTooltip>
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
                <ReactTooltip
                  id={
                    secret?.user?.full_name
                      ? secret?.user?.full_name
                      : secret?.user?.name
                  }
                  place="top"
                  effect="solid"
                >
                  <Paragraph color="white">
                    {secret?.user?.full_name
                      ? secret.user?.full_name
                      : secret?.user?.name}
                  </Paragraph>
                </ReactTooltip>
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
              <ReactTooltip
                id={formatDateToSort(secret.created)}
                place="top"
                effect="solid"
              >
                <Paragraph color="white">
                  {formatDateToDisplayOnTable(secret.created)}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>
          )}
        </>
      ),
    },
  ];
};
