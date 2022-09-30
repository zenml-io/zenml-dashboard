// import React from 'react';
// import { translate } from './translate';
// import { Box, PrimaryButton } from '../../../components';
// import { useService } from './useService';

// import { CommandPopup } from '../../common/CommandPopup';

// export const CreatePipelineButton: React.FC = () => {
//   const [createPipelinePopupOpen, setCreatePipelinePopupOpen] = React.useState<
//     boolean
//   >(false);

//   const { currentWorkspace } = useService();

//   const commandText = `zenml workspace set ${
//     currentWorkspace && currentWorkspace.id
//   }`;

//   return (
//     <Box
//       style={{ position: 'relative' }}
//       paddingVertical="sm"
//       paddingHorizontal="sm"
//     >
//       <PrimaryButton onClick={() => setCreatePipelinePopupOpen(true)}>
//         {translate('createButton.text')}
//       </PrimaryButton>
//       <CommandPopup
//         commandText={commandText}
//         open={createPipelinePopupOpen}
//         setOpen={setCreatePipelinePopupOpen}
//       />
//     </Box>
//   );
// };

import React from 'react';
import styles from './index.module.scss';

import { useDispatch } from '../../../hooks';
import { showToasterAction } from '../../../../redux/actions';
import { toasterTypes } from '../../../../constants';

import {
  Box,
  PrimaryButton,
  FlexBox,
  H3,
  Paragraph,
  icons,
} from '../../../components';
import { iconSizes, iconColors } from '../../../../constants';
import { Popup } from '../../common/Popup';
import { DocumentationLink } from './DocumentationLink';
import { CommandBoxWScroll } from '../../common/CommandBox';
import { constantCommandsToCreatePipeline } from '../../../../constants/constantCommands';

export const CreatePipelineButton: React.FC = () => {
  const dispatch = useDispatch();
  const [createPipelinePopupOpen, setCreatePipelinePopupOpen] = React.useState<
    boolean
  >(false);

  const codeString = '#!/bin/bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    dispatch(
      showToasterAction({
        description: 'Command copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  return (
    <Box
      style={{ position: 'relative' }}
      paddingVertical="sm"
      paddingHorizontal="sm"
    >
      <PrimaryButton onClick={() => setCreatePipelinePopupOpen(true)}>
        Create Pipeline
      </PrimaryButton>

      {createPipelinePopupOpen && (
        <Popup onClose={() => setCreatePipelinePopupOpen(false)}>
          <FlexBox.Row>
            <H3 bold color="darkGrey">
              {constantCommandsToCreatePipeline.title}
            </H3>
          </FlexBox.Row>
          {constantCommandsToCreatePipeline.body.map((item): any =>
            item.isCode ? (
              <FlexBox alignItems="center" marginTop="md">
                <CommandBoxWScroll command={item.text} />
                <Box
                  className={styles.iconStyle}
                  style={{ paddingTop: '7px' }}
                  onClick={handleCopy}
                >
                  <icons.copy size={iconSizes.sm} color={iconColors.black} />
                </Box>
              </FlexBox>
            ) : (
              <FlexBox.Row>
                <Box marginTop="md">
                  <Paragraph>{item.text}</Paragraph>
                </Box>
              </FlexBox.Row>
            ),
          )}

          {/* <FlexBox.Row>
            <Box marginTop="md">
              <Paragraph>you can set it active</Paragraph>
            </Box>
          </FlexBox.Row>

          <FlexBox alignItems="center" marginTop="md">
            <CommandBoxWScroll command={codeString} />
            <Box
              className={styles.iconStyle}
              style={{ paddingTop: '7px' }}
              onClick={handleCopy}
            >
              <icons.copy size={iconSizes.sm} color={iconColors.black} />
            </Box>
          </FlexBox>  */}

          {/* <FlexBox alignItems="center" marginTop="sm">
            <CommandBoxWScroll command={codeString} />
            <Box
              className={styles.iconStyle}
              style={{ paddingTop: '7px' }}
              onClick={handleCopy}
            >
              <icons.copy size={iconSizes.sm} color={iconColors.black} />
            </Box>
          </FlexBox>

          <FlexBox alignItems="center" marginTop="sm">
            <CommandBoxWScroll command={codeString} />
            <Box
              className={styles.iconStyle}
              style={{ paddingTop: '7px' }}
              onClick={handleCopy}
            >
              <icons.copy size={iconSizes.sm} color={iconColors.black} />
            </Box>
          </FlexBox> */}

          {/* <FlexBox.Row>
            <Box marginTop="md">
              <Paragraph>you can set it active</Paragraph>
            </Box>
          </FlexBox.Row> */}

          {/* <FlexBox alignItems="center" marginTop="sm">
            <CommandBoxWScroll command={codeString} />
            <Box
              className={styles.iconStyle}
              style={{ paddingTop: '7px' }}
              onClick={handleCopy}
            >
              <icons.copy size={iconSizes.sm} color={iconColors.black} />
            </Box>
          </FlexBox> */}

          <FlexBox justifyContent="end" marginTop="xl" flexWrap>
            <DocumentationLink
              text={constantCommandsToCreatePipeline.documentation}
            />
          </FlexBox>
        </Popup>
      )}
    </Box>
  );
};
