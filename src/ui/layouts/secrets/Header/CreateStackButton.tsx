import React, { useState } from 'react';
import styles from './index.module.scss';

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
import { constantCommandsToCreateStack } from '../../../../constants/constantCommands';

export const CreateStackButton: React.FC = () => {
  const [createStackPopupOpen, setCreateStackPopupOpen] = React.useState<
    boolean
  >(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (codeString: string) => {
    navigator.clipboard.writeText(codeString);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Box
      style={{ position: 'relative' }}
      paddingVertical="sm"
      paddingHorizontal="sm"
    >
      <PrimaryButton onClick={() => setCreateStackPopupOpen(true)}>
        Stack Cheatsheet
      </PrimaryButton>

      {createStackPopupOpen && (
        <Popup onClose={() => setCreateStackPopupOpen(false)}>
          <FlexBox.Row>
            <H3 bold color="darkGrey">
              {constantCommandsToCreateStack.title}
            </H3>
          </FlexBox.Row>
          {constantCommandsToCreateStack.body.map((item, index): any =>
            item.isCode ? (
              <FlexBox key={index} alignItems="center" marginTop="md">
                <CommandBoxWScroll command={item.text} />
                <Box
                  className={styles.iconStyle}
                  style={{ paddingTop: '7px' }}
                  onClick={() => handleCopy(item.text)}
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

          <FlexBox justifyContent="space-between" marginTop="xl" flexWrap>
            <Box>{isCopied && <Paragraph>Copied!</Paragraph>}</Box>

            <DocumentationLink
              text={constantCommandsToCreateStack.documentation}
            />
          </FlexBox>
        </Popup>
      )}
    </Box>
  );
};
