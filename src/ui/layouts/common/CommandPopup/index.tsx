import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { iconSizes } from '../../../../constants';
import {
  If,
  Box,
  Paragraph,
  LinkBox,
  FlexBox,
  icons,
} from '../../../components';
import { translate } from '../../pipelines/Header/translate';

import styles from './index.module.scss';
import { useDispatch } from '../../../hooks';
import { showToasterAction } from '../../../../redux/actions';

export const CommandPopup: React.FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
  commandText: string;
}> = ({ open, setOpen, commandText }) => {
  const dispatch = useDispatch();

  const copyToClipboard = () => {
    const dummyInputElement = document.createElement('input');
    document.body.appendChild(dummyInputElement);
    dummyInputElement.setAttribute('value', commandText);
    dummyInputElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyInputElement);
    dispatch(
      showToasterAction({
        type: 'success',
        description: translate('copyWorkspaceCommand.successToaster.text'),
      }),
    );
  };

  window.onkeydown = function( event: any ) {
    if ( event.key === 'Esc' || event.key === 'Escape' ) {
      return setOpen(false)
    }
  };

  return (
    <If condition={open}>
      {() => (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
          <Box
            paddingHorizontal="md"
            paddingVertical="md"
            className={styles.popup}
          >
            <Box
              className={styles.fakeInput}
              paddingHorizontal="md"
              paddingVertical="sm"
            >
              <Paragraph color="black">{commandText}</Paragraph>
              <LinkBox onClick={() => copyToClipboard()}>
                <FlexBox
                  paddingHorizontal="sm"
                  justifyContent="center"
                  alignItems="center"
                  className={styles.copy}
                >
                  <icons.copy size={iconSizes.sm} />
                </FlexBox>
              </LinkBox>
            </Box>
          </Box>
        </OutsideClickHandler>
      )}
    </If>
  );
};
