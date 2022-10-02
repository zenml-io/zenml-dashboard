import React from 'react';
import styles from './index.module.scss';

import { useDispatch, useLocationPath } from '../../../hooks';
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
import { constantCommandsToCreateComponent } from '../../../../constants/constantCommands';
import { camelCaseToParagraph } from '../../../../utils';

export const CreatePipelineButton: React.FC = () => {
  const locationPath = useLocationPath();
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
        Create {camelCaseToParagraph(locationPath.split('/')[2])}
      </PrimaryButton>

      {createPipelinePopupOpen && (
        <Popup onClose={() => setCreatePipelinePopupOpen(false)}>
          <FlexBox.Row>
            <H3 bold color="darkGrey">
              Create {camelCaseToParagraph(locationPath.split('/')[2])}
            </H3>
          </FlexBox.Row>
          {locationPath.split('/')[2] ===
          constantCommandsToCreateComponent.componentCommand.type
            ? constantCommandsToCreateComponent.componentCommand.body.map(
                (item): any =>
                  item.isCode ? (
                    <FlexBox alignItems="center" marginTop="md">
                      <CommandBoxWScroll command={item.text} />
                      <Box
                        className={styles.iconStyle}
                        style={{ paddingTop: '7px' }}
                        onClick={handleCopy}
                      >
                        <icons.copy
                          size={iconSizes.sm}
                          color={iconColors.black}
                        />
                      </Box>
                    </FlexBox>
                  ) : (
                    <FlexBox.Row>
                      <Box marginTop="md">
                        <Paragraph>{item.text}</Paragraph>
                      </Box>
                    </FlexBox.Row>
                  ),
              )
            : constantCommandsToCreateComponent.defaultBody.map((item): any =>
                item.isCode ? (
                  <FlexBox alignItems="center" marginTop="md">
                    <CommandBoxWScroll command={item.text} />
                    <Box
                      className={styles.iconStyle}
                      style={{ paddingTop: '7px' }}
                      onClick={handleCopy}
                    >
                      <icons.copy
                        size={iconSizes.sm}
                        color={iconColors.black}
                      />
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
              text={constantCommandsToCreateComponent.documentation}
            />
          </FlexBox>
        </Popup>
      )}
    </Box>
  );
};
