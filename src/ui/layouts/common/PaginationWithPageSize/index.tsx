import React, { useEffect, useState } from 'react';
import './styles.css';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  IfElse,
  If,
  H3,
  FullWidthSpinner,
  icons,
} from '../../../components';

import { PaginationForFlavor } from '../PaginationForFlavor';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';

import { iconColors, iconSizes } from '../../../../constants/icons';
import OutsideClickHandler from 'react-outside-click-handler';

export interface Props {
  type: string;
  flavors: any;
  paginated?: any;
  pagination?: boolean;
  loading?: boolean;
  emptyState?: {
    text: string;
  };
  renderAfterRow?: (arg: any) => JSX.Element;
  trOnClick?: (arg: any) => void;
}

export const PaginationWithPageSize: React.FC<Props> = ({
  type,
  flavors,
  paginated,
  pagination = true,
  loading = false,
  emptyState,
  renderAfterRow,
  trOnClick,
}) => {
  const [showItems, setShowItems] = useState(false);

  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();

  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );

  const DEFAULT_ITEMS_PER_PAGE = 10;
  const itemPerPageOptions = [5, 10, 15, 20];

  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setItemPerPage(paginated.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  const onChangePagePerItem = (size: number) => {
    setItemPerPage(size);
  };

  return (
    <FlexBox.Column fullWidth>
      <IfElse
        condition={flavors.length > 0 && !loading}
        renderWhenTrue={() => (
          <>
            <If condition={pagination}>
              {() => (
                <FlexBox
                  marginTop="xxxl"
                  marginBottom="xxxl"
                  justifyContent="center"
                >
                  <PaginationForFlavor
                    ref={childRef}
                    itemPerPage={itemPerPage}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pages={paginated?.totalPages}
                    totalOfPages={paginated?.totalPages}
                    totalLength={flavors?.length}
                    totalCount={paginated?.totalitem}
                  />

                  <If
                    condition={flavors.length > 0 && paginated?.totalitem > 7}
                  >
                    {() => (
                      <>
                        <Box marginLeft="xxxl" className="d-none d-md-block">
                          <Box>
                            <FlexBox>
                              <Box
                                style={{
                                  marginTop: '4px',
                                  marginRight: '10px',
                                }}
                              >
                                <span className={styles.itemText1}>
                                  Items Showing
                                </span>
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
                                      <span className={styles.itemText}>
                                        {itemPerPage}
                                      </span>
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
                                      <OutsideClickHandler
                                        onOutsideClick={() => {}}
                                      >
                                        <Box
                                          className={styles.popup}
                                          marginTop="sm"
                                        >
                                          <Box
                                            marginVertical="sm"
                                            marginLeft="md"
                                            className="d-none d-md-block"
                                          >
                                            <Box marginTop="sm">
                                              {itemPerPageOptions.map(
                                                (option, index) => (
                                                  <Box
                                                    marginTop="sm"
                                                    key={index}
                                                    onClick={() => {
                                                      onChangePagePerItem(
                                                        parseInt(`${option}`),
                                                      );
                                                      childRef?.current?.callOnChange(
                                                        1,
                                                        parseInt(`${option}`),
                                                      );
                                                      setShowItems(false);
                                                    }}
                                                  >
                                                    <span
                                                      className={
                                                        styles.itemText
                                                      }
                                                      style={{
                                                        cursor: 'pointer',
                                                      }}
                                                    >
                                                      {option}
                                                    </span>
                                                  </Box>
                                                ),
                                              )}
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
                      </>
                    )}
                  </If>
                </FlexBox>
              )}
            </If>
          </>
        )}
        renderWhenFalse={() => (
          <Box
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
            paddingVertical="xxl"
          >
            <H3>{emptyState && emptyState.text}</H3>
          </Box>
        )}
      />
    </FlexBox.Column>
  );
};
