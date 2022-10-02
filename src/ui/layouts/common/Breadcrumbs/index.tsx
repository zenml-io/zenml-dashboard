import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Paragraph,
  IfElse,
  FlexBox,
  Box,
  If,
  Truncate,
} from '../../../components';

import styles from './index.module.scss';

interface BreadcrumbsInterface {
  breadcrumbs: TBreadcrumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsInterface> = ({
  breadcrumbs,
}) => (
  <FlexBox.Row flexWrap>
    {breadcrumbs.map((breadcrumb: TBreadcrumb, index: number) => {
      return (
        <FlexBox key={index} paddingVertical="sm">
          <IfElse
            condition={!!breadcrumb.clickable}
            renderWhenFalse={() => (
              <Truncate maxLines={1}>
                <Paragraph color="grey">{breadcrumb.name}</Paragraph>
              </Truncate>
            )}
            renderWhenTrue={() => (
              <NavLink
                exact
                className={styles.breadcrumbLink}
                to={breadcrumb.to ? breadcrumb.to : ''}
              >
                <Truncate maxLines={1}>
                  <IfElse
                    condition={breadcrumbs.length === index + 1}
                    renderWhenFalse={() => (
                      <Paragraph color="grey">{breadcrumb.name}</Paragraph>
                    )}
                    renderWhenTrue={() => (
                      <Paragraph color="black">{breadcrumb.name}</Paragraph>
                    )}
                  />
                </Truncate>
              </NavLink>
            )}
          />
          <If condition={breadcrumbs.length > index + 1}>
            {() => (
              <Box paddingHorizontal="sm">
                <Paragraph color="grey">{'>'}</Paragraph>
              </Box>
            )}
          </If>
        </FlexBox>
      );
    })}
  </FlexBox.Row>
);
