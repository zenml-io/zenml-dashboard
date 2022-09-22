import React from 'react';
import styles from './index.module.scss'

import { useDispatch } from '../../../hooks';
import { showToasterAction } from '../../../../redux/actions';
import { toasterTypes } from '../../../../constants';

import { Box, PrimaryButton, FlexBox, H3, Paragraph, icons} from '../../../components';
import { iconSizes, iconColors } from '../../../../constants';
import { Popup } from '../../common/Popup';
import { DocumentationLink } from './DocumentationLink'
import { CommandBoxWScroll } from '../../common/CommandBox';

export const CreateStackButton: React.FC = () => {
  
  const dispatch = useDispatch();
  const [createStackPopupOpen, setCreateStackPopupOpen] = React.useState<
    boolean
  >(false);

  const codeString = '#!/bin/bash';

  const handleCopy = () => { 
    navigator.clipboard.writeText(codeString)
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
      <PrimaryButton onClick={() => setCreateStackPopupOpen(true)}>Create Stack</PrimaryButton>
   
      {createStackPopupOpen && (
        <Popup onClose={() => setCreateStackPopupOpen(false)} >
          <FlexBox.Row >
            <H3 bold color="darkGrey">Create Stack</H3>
          </FlexBox.Row>
        
          <FlexBox.Row>
            <Box marginTop="md">
              <Paragraph>you can set it active</Paragraph>
            </Box>
          </FlexBox.Row>
        
          <FlexBox alignItems='center' marginTop="md">
            <CommandBoxWScroll command={codeString} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>    
        
          <FlexBox alignItems='center' marginTop="sm">
            <CommandBoxWScroll command={codeString} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>

          <FlexBox alignItems='center' marginTop="sm">
            <CommandBoxWScroll command={codeString} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>

          <FlexBox.Row>
            <Box marginTop="md">
              <Paragraph>you can set it active</Paragraph>
            </Box>
          </FlexBox.Row>

          <FlexBox alignItems='center' marginTop="sm">
            <CommandBoxWScroll command={codeString} />
            <Box className={styles.iconStyle} style={{ paddingTop: '7px' }} onClick={handleCopy}>
              <icons.copy size={iconSizes.sm} color={iconColors.black} /></Box>
          </FlexBox>

          <FlexBox justifyContent="end" marginTop="xl" flexWrap>
           <DocumentationLink />
          </FlexBox>
        </Popup>
      
      )}

    </Box>
  );
};
