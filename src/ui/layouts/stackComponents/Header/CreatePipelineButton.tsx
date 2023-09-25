import React, { useState } from 'react';
import styles from './index.module.scss';

import { useLocationPath } from '../../../hooks';

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
  const [createPipelinePopupOpen, setCreatePipelinePopupOpen] = React.useState<
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
      <PrimaryButton onClick={() => setCreatePipelinePopupOpen(true)}>
        {camelCaseToParagraph(locationPath.split('/')[4])} Cheatsheet
      </PrimaryButton>

      {createPipelinePopupOpen && (
        <Popup onClose={() => setCreatePipelinePopupOpen(false)}>
          <FlexBox.Row>
            <H3 bold color="darkGrey">
              {camelCaseToParagraph(locationPath.split('/')[4])} Cheatsheet
            </H3>
          </FlexBox.Row>
          {locationPath.split('/')[4] ===
          constantCommandsToCreateComponent.componentCommand.type
            ? constantCommandsToCreateComponent.componentCommand.body.map(
                (item): any =>
                  item.isCode ? (
                    <FlexBox key={item.text} alignItems="center" marginTop="md">
                      <CommandBoxWScroll command={item.text} />
                      <Box
                        className={styles.iconStyle}
                        style={{ paddingTop: '7px' }}
                        onClick={() => handleCopy(item.text)}
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
                  <FlexBox key={item.text} alignItems="center" marginTop="md">
                    <CommandBoxWScroll command={item.text} />
                    <Box
                      className={styles.iconStyle}
                      style={{ paddingTop: '7px' }}
                      onClick={() => handleCopy(item.text)}
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

          <FlexBox justifyContent="space-between" marginTop="xl" flexWrap>
            <Box>{isCopied && <Paragraph>Copied!</Paragraph>}</Box>

            <DocumentationLink
              text={constantCommandsToCreateComponent.documentation}
            />
          </FlexBox>
        </Popup>
      )}
    </Box>
  );
};
