import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { FlexBox, Box, Paragraph, icons } from '../../../components';

import styles from './index.module.scss';
import { joinClassNames, addStyle } from '../../../../utils';
import { useLocation } from 'react-router-dom';
import { callActionForStacksForPagination } from '../../stacks/Stacks/useService';
import { callActionForStackComponentsForPagination } from '../../stackComponents/Stacks/useService';
import { callActionForPipelinesForPagination } from '../../pipelines/Pipelines/useService';

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
  ref: any;
  pageIndex: number;
  setPageIndex: (arg1: number) => void;
  pages: any;
  filters?: any[];
  totalOfPages: number;
  totalLength: number;
  itemPerPage: number;
}

export const Pagination: React.FC<Props> = forwardRef((props, ref) => {
  const { dispatchStackData } = callActionForStacksForPagination();
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();

  const { dispatchPipelineData } = callActionForPipelinesForPagination();
  const locationPath = useLocation();
  const componentName = locationPath.pathname.split('/')[3];
  // const isValidFilter = props.filters?.map((f) => f.value).join('');

  useImperativeHandle(ref, () => ({
    callOnChange(page: number, size: number, filters: any) {
      onChange(page + 1, size, componentName, filters);
    },
  }));

  const onChange = (
    page: any,
    size: number,
    componentName: string,
    filters: any,
  ) => {
    switch (componentName) {
      case 'stacks':
        dispatchStackData(page, size, filters as any);
        break;
      case 'components':
        dispatchStackComponentsData(page, size, filters as any);
        break;
      case 'pipelines':
        dispatchPipelineData(page, size, filters as any);
        break;

      default:
        break;
    }
  };
  // console.log(itemPerPage, 'itemPerPage');
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalOfPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <FlexBox.Column justifyContent="center" alignItems="center">
      <FlexBox marginTop="xxxl" marginBottom="xxxl" justifyContent="center">
        <PaginationNavigationItem
          style={{ paddingRight: 2 }}
          hasNext={props.pageIndex !== 0}
          onClick={() => {
            // switch (componentName) {
            //   case 'stacks':
            //     onChange(props.pageIndex, props.itemPerPage);
            //     break;

            //   default:
            //     break;
            // }

            onChange(
              props.pageIndex,
              props.itemPerPage,
              componentName,
              props.filters,
            );

            props.setPageIndex(props.pageIndex - 1);
          }}
          icon={icons.chevronLeft}
        />
        <FlexBox>
          {pageNumbers.map((p: any) => (
            <Box key={p}>
              <PaginationItem
                onClick={() => {
                  onChange(p, props.itemPerPage, componentName, props.filters);

                  props.setPageIndex(p - 1);
                }}
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
              onChange(
                props.pageIndex + 2,
                props.itemPerPage,
                componentName,
                props.filters,
              );
              props.setPageIndex(props.pageIndex + 1);
            }}
            icon={icons.chevronRight}
          />
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
});
