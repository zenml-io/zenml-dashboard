import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../utils';
import { Box, FlexBox, icons, Paragraph, Tooltip } from '../../../components';
import { HeaderCol } from '../../common/Table';
import { Stack } from '../../../../api/types';

const HeaderText = ({ text, margin }: { text: string; margin?: string }) => (
  <Paragraph
    size="small"
    color="black"
    style={{ fontSize: '14px', marginLeft: margin }}
  >
    {text}
  </Paragraph>
);

export const GetHeaderCols = ({
  filteredStacks,
}: {
  expendedRow?: any;
  filteredStacks: Stack[];
}): HeaderCol[] => {
  return [
    {
      render: () => <HeaderText text="ID" margin="33px" />,
      width: '20%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(stack.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={stack.id} text={stack.id} />
        </FlexBox>
      ),
    },
    {
      render: () => <HeaderText text="ID" />,
      width: '30%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.name}>
            <Paragraph size="small" color="black">
              {stack.name}
            </Paragraph>
          </div>
          <Tooltip id={stack.name} text={stack.name} />
        </FlexBox>
      ),
    },
    // {
    //   render: () => (
    //     <Box style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
    //       <HeaderText text="SHARED" margin="-16px" />
    //     </Box>
    //   ),
    //   width: '15%',
    //   renderRow: (stack: Stack) => (
    //     <FlexBox alignItems="center">
    //       <div
    //         style={{ margin: '0 auto 0 auto' }}
    //         data-tip
    //         data-for={`tooltip-${String(stack.body?.is_shared)}`}
    //       >
    //         <Box>
    //           <FlexBox
    //             justifyContent="center"
    //             style={{
    //               borderRadius: '50%',

    //               marginLeft: '-16px',
    //               textAlign: 'center',
    //             }}
    //           >
    //             {stack.body?.is_shared ? (
    //               <icons.multiUser
    //                 color={iconColors.white}
    //                 size={iconSizes.md}
    //               />
    //             ) : (
    //               <icons.singleUser
    //                 color={iconColors.white}
    //                 size={iconSizes.md}
    //               />
    //             )}
    //           </FlexBox>
    //         </Box>
    //       </div>
    //       <Tooltip
    //         id={`tooltip-${String(stack.body?.is_shared)}`}
    //         text={stack.body?.is_shared ? 'True' : 'False'}
    //       />
    //     </FlexBox>
    //   ),
    // },

    {
      render: () => <HeaderText text="AUTHOR" />,
      width: '25%',
      renderRow: (stack: Stack) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={stack?.body?.user?.name}>
              <FlexBox alignItems="center">
                <Paragraph size="small">{stack?.body?.user?.name}</Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={stack?.body?.user?.name}
              text={stack?.body?.user?.name}
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => <HeaderText text="CREATED AT" />,
      width: '25%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={formatDateToSort(stack.body?.created as string)}
          >
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stack.body?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToSort(stack.body?.created as string)}
            text={formatDateToDisplayOnTable(stack.body?.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
