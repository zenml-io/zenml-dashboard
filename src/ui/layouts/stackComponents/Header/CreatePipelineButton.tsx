import React from 'react';
import styles from './index.module.scss'
import { Box, PrimaryButton, FlexBox, H3, Paragraph, icons } from '../../../components';
import { useService } from './useService';

import { useDispatch } from '../../../hooks';
import { showToasterAction } from '../../../../redux/actions';
import { toasterTypes } from '../../../../constants';

// import { CommandPopup } from '../../common/CommandPopup';
import { iconSizes, iconColors } from '../../../../constants';
import { Popup } from '../../common/Popup';
import { CommandBoxWScroll } from '../../common/CommandBox';
import { DocumentationLink } from './DocumentationLink'


export const CreatePipelineButton: React.FC = () => {

  const dispatch = useDispatch();
  const [createComponentPopupOpen, setCreateComponentPopupOpen] = React.useState<
    boolean
  >(false);

  const { currentWorkspace } = useService();

  const commandText = `zenml workspace set ${
    currentWorkspace && currentWorkspace.id
  }`;

  const handleCopy = () => { 
    navigator.clipboard.writeText(commandText)
    dispatch(
      showToasterAction({
        description: 'Command copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  }

  return (
    <Box
      style={{ position: 'relative' }}
      paddingVertical="sm"
      paddingHorizontal="sm"
    >
      <PrimaryButton onClick={() => setCreateComponentPopupOpen(true)}>Create Component</PrimaryButton>

      {createComponentPopupOpen && (
        <Popup onClose={() => setCreateComponentPopupOpen(false)} >
          <FlexBox.Row >
            <H3 bold color="darkGrey">Create Component</H3>
          </FlexBox.Row>
        
          <FlexBox.Row>
            <Box marginTop="md">
              <Paragraph>you can set it active</Paragraph>
            </Box>
          </FlexBox.Row>
        
          <FlexBox alignItems='center' marginTop="md">
            <CommandBoxWScroll command={commandText} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>    
        
          <FlexBox alignItems='center' marginTop="sm">
            <CommandBoxWScroll command={commandText} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>

          <FlexBox alignItems='center' marginTop="sm">
            <CommandBoxWScroll command={commandText} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>

          <FlexBox.Row>
            <Box marginTop="md">
              <Paragraph>you can set it active</Paragraph>
            </Box>
          </FlexBox.Row>

          <FlexBox alignItems='center' marginTop="sm">
            <CommandBoxWScroll command={commandText} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>

          <FlexBox justifyContent="end" marginTop="xl" flexWrap>
           <DocumentationLink />
          </FlexBox>
        </Popup>
      
      )}


      {/* <CommandPopup
        commandText={commandText}
        open={createPipelinePopupOpen}
        setOpen={setCreateComponentPopupOpen}
      /> */}
    </Box>
  );
};
