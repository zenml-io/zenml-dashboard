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
import {
  constantCommandsToCreatePipeline,
  constantCommandsToCreateRuns,
} from '../../../../constants/constantCommands';

export const CreatePipelineButton: React.FC = () => {
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
        {window.location.href?.includes('runs')
          ? constantCommandsToCreateRuns?.title
          : constantCommandsToCreatePipeline?.title}
      </PrimaryButton>

      {createPipelinePopupOpen && (
        <Popup onClose={() => setCreatePipelinePopupOpen(false)}>
          <FlexBox.Row>
            <H3 bold color="darkGrey">
              {window.location.href?.includes('runs')
                ? constantCommandsToCreateRuns?.title
                : constantCommandsToCreatePipeline.title}
            </H3>
          </FlexBox.Row>

          {window.location.href?.includes('runs')
            ? constantCommandsToCreateRuns.body.map((item, index) =>
                item.isCode ? (
                  <FlexBox alignItems="center" marginTop="md" key={index}>
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
            : constantCommandsToCreatePipeline.body.map((item, index) =>
                item.isCode ? (
                  <FlexBox alignItems="center" marginTop="md" key={index}>
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
              text={constantCommandsToCreatePipeline.documentation}
            />
          </FlexBox>
        </Popup>
      )}
    </Box>
  );
};
