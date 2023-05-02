import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  Paragraph,
  H3,
  PrimaryButton,
} from '../../../../../../components';

import styles from './index.module.scss';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const SidePopup: React.FC<{
  isCreate?: boolean;
  onSelect?: any;
  canSelect?: boolean;
  onSeeExisting: () => void;
  onClose: () => void;
  registerStack?: any;
  selectedStack?: any;
  selectedStackBox?: any;
}> = ({
  children,
  onClose,
  registerStack,
  onSeeExisting,
  isCreate = true,
  canSelect = false,
  onSelect,
  selectedStack,
  selectedStackBox,
}) => {
  const find = selectedStack?.filter(
    (item: any) => item?.id === selectedStackBox?.id,
  );
  window.onkeydown = function (event: any) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      return onClose();
    }
  };
  console.log(find, selectedStackBox, selectedStack, 'findddd');
  return (
    <>
      <Dimmer />
      <FlexBox
        alignItems="center"
        justifyContent="center"
        className={styles.popupContainer}
      >
        <Box className={styles.popupClose}>
          <LinkBox onClick={onClose}>
            <icons.close />
          </LinkBox>
        </Box>

        <Box className={styles.sidePopup}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <Box paddingVertical="lg" paddingHorizontal="xxl">
              <H3
                style={{
                  color: '#443E99',
                  fontWeight: 'bold',
                  marginLeft: '13px',
                }}
              >
                Configurations
              </H3>
              {children}
            </Box>

            <Box
              paddingVertical="lg"
              paddingHorizontal="md"
              className={styles.actionSection}
            >
              <FlexBox.Row justifyContent="space-between" alignItems="center">
                <Box paddingHorizontal="xxl">
                  <LinkBox onClick={onSeeExisting}>
                    <Paragraph
                      style={{
                        fontSize: '16px',
                        textDecoration: 'underline',
                        color: '#443E99',
                      }}
                    >
                      See Component Page
                    </Paragraph>
                  </LinkBox>
                </Box>

                {canSelect && (
                  <Box>
                    <PrimaryButton onClick={onSelect}>
                      {find.length ? 'Deselect' : 'Select'}
                    </PrimaryButton>
                  </Box>
                )}
              </FlexBox.Row>
            </Box>
          </OutsideClickHandler>
        </Box>
      </FlexBox>
    </>
  );
};
