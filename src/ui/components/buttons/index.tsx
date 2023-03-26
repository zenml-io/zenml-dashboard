import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.scss';
import { joinClassNames } from '../../../utils';
import { BoxProps } from '..';
import { getMarginsByProps, getPaddingsByProps } from '../boxes/boxesStyles';
import { Spinner } from '../.';

export type ButtonInterface = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export const PrimaryButton: React.FC<
  ButtonInterface & BoxProps & { loading?: boolean }
> = ({ className, loading, children, ...props }) => (
  <button
    style={{
      ...getMarginsByProps(props),
      ...getPaddingsByProps(props),
      ...props.style,
    }}
    className={joinClassNames(
      styles.primaryButton,
      className,
      loading && styles.loading,
    )}
    {...props}
  >
    {loading ? (
      <div className={styles.spinner}>
        <Spinner size="xs" color="white" />
      </div>
    ) : (
      children
    )}
  </button>
);

export const OrangeButton: React.FC<
  ButtonInterface & BoxProps & { loading?: boolean }
> = ({ className, loading, children, ...props }) => (
  <button
    style={{
      ...getMarginsByProps(props),
      ...getPaddingsByProps(props),
      ...props.style,
    }}
    className={joinClassNames(
      styles.orangeButton,
      className,
      loading && styles.loading,
    )}
    {...props}
  >
    {loading && (
      <div className={styles.spinner}>
        <Spinner size="xs" color="white" />
      </div>
    )}
    {children}
  </button>
);

export const GhostButton: React.FC<
  ButtonInterface & BoxProps & { loading?: boolean }
> = ({ className, loading, children, ...props }) => (
  <button
    style={{
      ...getMarginsByProps(props),
      ...getPaddingsByProps(props),
      ...props.style,
    }}
    className={joinClassNames(
      styles.ghostButton,
      className,
      loading && styles.loading,
    )}
    {...props}
  >
    {loading && (
      <div className={styles.spinner}>
        <Spinner size="xs" color="white" />
      </div>
    )}
    {children}
  </button>
);
