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
  <FlexBox.Row style={{ minWidth: '0' }} fullWidth>
    {breadcrumbs?.map((breadcrumb: TBreadcrumb, index: number) => {
      return (
        <FlexBox
          key={index}
          style={index == breadcrumbs.length - 1 ? { overflow: 'hidden' } : {}}
          paddingVertical="sm"
        >
          <IfElse
            condition={!!breadcrumb.clickable}
            renderWhenFalse={() => (
              <Truncate
                style={{
                  width: '100%',
                }}
                maxLines={1}
              >
                <Paragraph
                  style={{
                    fontSize: '42px',
                    fontWeight: 'bold',
                    lineHeight: '48px',
                    color: '#424240',
                  }}
                >
                  {breadcrumb.name}
                </Paragraph>
              </Truncate>
            )}
            renderWhenTrue={() => (
              <NavLink
                style={{ overflow: 'hidden' }}
                exact
                className={styles.breadcrumbLink}
                to={breadcrumb.to ? breadcrumb.to : ''}
              >
                <Truncate
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  maxLines={1}
                >
                  <IfElse
                    condition={breadcrumbs.length === index + 1}
                    renderWhenFalse={() => (
                      <Paragraph
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        color="grey"
                      >
                        {breadcrumb.name}
                      </Paragraph>
                    )}
                    renderWhenTrue={() => (
                      <Paragraph
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        color="black"
                      >
                        {breadcrumb.name}
                      </Paragraph>
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
