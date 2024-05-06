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
import { StackComponent } from '../../../../api/types';
import { sanitizeUrl } from '../../../../utils/url';

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
  mappedStackComponentWithLogo,
}: {
  mappedStackComponentWithLogo: any;
}): HeaderCol[] => {
  return [
    {
      render: () => <HeaderText text="ID" margin="33px" />,
      width: '20%',
      renderRow: (stack: StackComponent) => (
        <>
          {stack?.id && (
            <FlexBox alignItems="center">
              <div data-tip data-for={stack.id}>
                <FlexBox.Row style={{ alignItems: 'center' }}>
                  <icons.chevronDown
                    color={iconColors.grey}
                    size={iconSizes.xs}
                  />

                  <Paragraph size="small" style={{ marginLeft: '20px' }}>
                    {truncate(stack?.id, ID_MAX_LENGTH)}
                  </Paragraph>
                </FlexBox.Row>
              </div>
              <Tooltip id={stack?.id} text={stack?.id} />
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => <HeaderText text="NAME" />,
      width: '30%',
      renderRow: (stack: StackComponent) => (
        <>
          {stack?.name && (
            <FlexBox alignItems="center">
              <div data-tip data-for={stack?.name}>
                <Paragraph size="small" color="black">
                  {stack.name}
                </Paragraph>
              </div>
              <Tooltip id={stack?.name} text={stack?.name} />
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => (
        <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
          <HeaderText text="FLAVOR" margin="-24px" />
        </div>
      ),
      width: '10%',
      renderRow: (stackComponent: any) => (
        <>
          {stackComponent?.flavor && (
            <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
              <div
                data-tip
                data-for={
                  stackComponent?.flavor?.name || stackComponent?.flavor
                }
                style={{ margin: ' 0 auto 0 auto' }}
              >
                <img
                  alt={stackComponent?.flavor?.logoUrl}
                  src={sanitizeUrl(stackComponent?.flavor?.logoUrl)}
                  style={{
                    height: '28px',
                    width: '28px',
                  }}
                />
              </div>
              <Tooltip
                id={stackComponent?.flavor?.name || stackComponent?.flavor}
                text={stackComponent?.flavor?.name}
              />
            </FlexBox>
          )}
        </>
      ),
    },
    // {
    //   render: () => (
    //     <Box style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
    //       <HeaderText text="SHARED" margin="-24px" />
    //     </Box>
    //   ),
    //   width: '10%',
    //   renderRow: (stack: StackComponent) => (
    //     <>
    //       {stack?.body && (
    //         <FlexBox alignItems="center">
    //           <div
    //             style={{ margin: '0 auto 0 auto' }}
    //             data-tip
    //             data-for={`tooltip-${String(stack?.body?.is_shared)}`}
    //           >
    //             <Box>
    //               <FlexBox
    //                 justifyContent="center"
    //                 style={{
    //                   borderRadius: '50%',

    //                   marginLeft: '-24px',
    //                   textAlign: 'center',
    //                 }}
    //               >
    //                 {stack?.body?.is_shared ? (
    //                   <icons.multiUser
    //                     color={iconColors.white}
    //                     size={iconSizes.md}
    //                   />
    //                 ) : (
    //                   <icons.singleUser
    //                     color={iconColors.white}
    //                     size={iconSizes.md}
    //                   />
    //                 )}
    //               </FlexBox>
    //             </Box>
    //           </div>
    //           <Tooltip
    //             id={`tooltip-${String(stack?.body?.is_shared)}`}
    //             text={stack?.body?.is_shared ? 'True' : 'False'}
    //           />
    //         </FlexBox>
    //       )}
    //     </>
    //   ),
    // },

    {
      render: () => <HeaderText text="AUTHOR" />,
      width: '10%',
      renderRow: (stackComponent: StackComponent) => {
        const initials = getInitialsFromEmail(
          stackComponent?.body?.user?.name as string,
        );
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={stackComponent?.body?.user?.name}>
              <FlexBox alignItems="center">
                {stackComponent?.body?.user?.name && (
                  <Box paddingRight="sm">
                    <ColoredCircle color="secondary" size="sm">
                      {initials}
                    </ColoredCircle>
                  </Box>
                )}

                <Paragraph size="small">
                  {stackComponent?.body?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={stackComponent?.body?.user?.name}
              text={stackComponent?.body?.user?.name}
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => <HeaderText text="CREATED AT" />,
      width: '30%',
      renderRow: (stack: StackComponent) => (
        <>
          {stack?.body?.created && (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToSort(stack?.body?.created)}>
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(stack?.body?.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToSort(stack?.body?.created)}
                text={formatDateToDisplayOnTable(stack?.body?.created)}
              />
            </FlexBox>
          )}
        </>
      ),
    },
  ];
};
