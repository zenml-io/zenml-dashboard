import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
  getInitialsFromEmail,
} from '../../../../utils';
import {
  Box,
  ColoredCircle,
  FlexBox,
  icons,
  Paragraph,
  Tooltip,
} from '../../../components';
import { HeaderCol } from '../../common/Table';
import { Secret } from '../../../../api/types';

export const GetHeaderCols = ({
  filteredSecret,
}: {
  filteredSecret: Secret[];
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
      renderRow: (secret: Secret) => (
        <>
          {secret.id && (
            <FlexBox alignItems="center">
              <div data-tip data-for={secret.id}>
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
      renderRow: (secret: Secret) => (
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
      renderRow: (secret: Secret) => (
        <>
          {secret.body?.scope && (
            <FlexBox alignItems="center">
              <div data-tip data-for={secret.body?.scope}>
                <Paragraph size="small" color="black">
                  {secret.body?.scope}
                </Paragraph>
              </div>
              <Tooltip id={secret.body?.scope} text={secret.body?.scope} />
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
      renderRow: (secret: Secret) => {
        const initials = getInitialsFromEmail(
          secret?.body?.user?.name as string,
        );
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={secret?.body?.user?.name}>
              <FlexBox alignItems="center">
                {secret?.body?.user?.name && (
                  <Box paddingRight="sm">
                    <ColoredCircle color="secondary" size="sm">
                      {initials}
                    </ColoredCircle>
                  </Box>
                )}

                <Paragraph size="small">{secret?.body?.user?.name}</Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={secret?.body?.user?.name}
              text={secret?.body?.user?.name}
            />
          </FlexBox>
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
      renderRow: (secret: Secret) => (
        <>
          {secret.body?.created && (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToSort(secret.body?.created)}>
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(secret.body?.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToSort(secret.body?.created)}
                text={formatDateToDisplayOnTable(secret.body?.created)}
              />
            </FlexBox>
          )}
        </>
      ),
    },
  ];
};
