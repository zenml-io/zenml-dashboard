import React, { useState } from 'react';

// import './styles.css';
import styles from './index.module.scss';
import { Box, FlexBox, If, icons } from '../../../components';
// import { getPaginationData } from '../../../../utils/pagination';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';

import { iconColors, iconSizes } from '../../../../constants/icons';
import OutsideClickHandler from 'react-outside-click-handler';

export interface PageProps {
  isExpended?: boolean;
  itemPerPage: any;
  onChangePagePerItem?: any;
  activeSorting?: any;
  paginated?: any;
  filters?: any[];

  emptyState?: {
    text: string;
  };
  renderAfterRow?: (arg: any) => JSX.Element;
  trOnClick?: (arg: any) => void;
}

export const ItemPerPage: React.FC<PageProps> = ({
  activeSorting,
  filters,
  itemPerPage,
  onChangePagePerItem,
}) => {
  const [showItems, setShowItems] = useState(false);
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);

  const itemPerPageOptions = [5, 10, 15, 20];

  const validFilters = filters?.filter((item) => item.value);

  return (
    <FlexBox.Column fullWidth>
      <Box marginLeft="xxxl" className="d-none d-md-block">
        <Box>
          <FlexBox>
            <Box
              style={{
                marginTop: '4px',
                marginRight: '10px',
              }}
            >
              <span className={styles.itemText1}>Items Showing</span>
            </Box>

            <FlexBox flexDirection="column">
              <Box>
                <FlexBox
                  alignItems="center"
                  justifyContent="space-between"
                  paddingHorizontal="sm"
                  className={styles.dropdown}
                  onClick={() => setShowItems(!showItems)}
                >
                  <Box paddingRight="sm">
                    <span className={styles.itemText}>{itemPerPage}</span>
                  </Box>
                  <Box>
                    <icons.chevronDownLight
                      size={iconSizes.xs}
                      color={iconColors.black}
                    />
                  </Box>
                </FlexBox>
              </Box>

              <Box>
                <If condition={showItems}>
                  {() => (
                    <OutsideClickHandler onOutsideClick={() => {}}>
                      <Box className={styles.popup} marginTop="sm">
                        <Box
                          marginVertical="sm"
                          marginLeft="md"
                          className="d-none d-md-block"
                        >
                          <Box marginTop="sm">
                            {itemPerPageOptions.map((option, index) => (
                              <Box
                                marginTop="sm"
                                key={index}
                                onClick={() => {
                                  onChangePagePerItem(parseInt(`${option}`));

                                  childRef?.current?.callOnChange(
                                    1,
                                    parseInt(`${option}`),
                                    validFilters,
                                    activeSorting,
                                  );
                                  setShowItems(false);
                                }}
                              >
                                <span
                                  className={styles.itemText}
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  {option}
                                </span>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </OutsideClickHandler>
                  )}
                </If>
              </Box>
            </FlexBox>
          </FlexBox>
        </Box>
      </Box>
    </FlexBox.Column>
  );
};
