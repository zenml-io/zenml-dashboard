import React from 'react';

import { FlexBox, Box, Paragraph, icons } from '../../../components';

import styles from './index.module.scss';
import { joinClassNames, addStyle } from '../../../../utils';

const PaginationItem = (props: {
  isActive: boolean;
  index: string;
  onClick: any;
}) => (
  <div
    tabIndex={props.isActive ? -1 : 0}
    role="button"
    onClick={props.onClick}
    className={joinClassNames(
      styles.paginationNumbers,
      addStyle(props.isActive, styles.active),
    )}
  >
    <Paragraph color={props.isActive ? 'white' : 'grey'}>
      {props.index}
    </Paragraph>
  </div>
);

const PaginationNavigationItem = (props: {
  onClick: any;
  hasNext: boolean;
  icon: any;
  style?: any;
}) => (
  <div
    style={props.style}
    role="button"
    onClick={props.onClick}
    className={joinClassNames(
      styles.paginationNavigationItem,
      addStyle(!props.hasNext, styles.hidden),
    )}
  >
    <props.icon color="grey" size="md" />
  </div>
);

interface Props {
  pageIndex: number;
  setPageIndex: (arg1: number) => void;
  pages: any[];
  totalOfPages: number;
  totalLength: number;
}

export const Pagination: React.FC<Props> = (props) => (
  <FlexBox.Column justifyContent="center" alignItems="center">
    <FlexBox marginTop="xxxl" marginBottom="xxxl" justifyContent="center">
      <PaginationNavigationItem
        style={{ paddingRight: 2 }}
        hasNext={props.pageIndex !== 0}
        onClick={() => {
          props.setPageIndex(props.pageIndex - 1);
        }}
        icon={icons.chevronLeft}
      />
      <FlexBox>
        {Object.values(props.pages).map((p: any) => (
          <Box key={p}>
            <PaginationItem
              onClick={() => props.setPageIndex(p - 1)}
              index={p}
              isActive={props.pageIndex === p - 1}
            />
          </Box>
        ))}
      </FlexBox>
      <Box>
        <PaginationNavigationItem
          style={{ paddingLeft: 2 }}
          hasNext={props.pageIndex + 1 < props.totalOfPages}
          onClick={() => {
            props.setPageIndex(props.pageIndex + 1);
          }}
          icon={icons.chevronRight}
        />
      </Box>
    </FlexBox>
  </FlexBox.Column>
);
