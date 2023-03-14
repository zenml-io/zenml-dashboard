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
} from '../../../../../components';

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
            <Box paddingVertical="lg" paddingHorizontal="xxxl">
              <H3 style={{ color: '#443E99', fontWeight: 'bold' }}>
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
                <Box>
                  <LinkBox onClick={onSeeExisting}>
                    <Paragraph>See Component Page</Paragraph>
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
