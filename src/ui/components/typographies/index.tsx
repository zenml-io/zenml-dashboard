import React, { CSSProperties } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import { addStyle } from '../../../utils';

export type Sizes = 'tiny' | 'small' | 'body';

type Colors =
  | 'black'
  | 'grey'
  | 'primary'
  | 'secondary'
  | 'red'
  | 'green'
  | 'darkGrey'
  | 'grey'
  | 'white'
  | 'orange'
  | 'lightGreen'
  | 'butterflyBlue';

type TypographyProps = {
  className?: string;
  color?: Colors;
  style?: React.CSSProperties | undefined;
  bold?: boolean;
};

export const H1: React.FC<TypographyProps> = ({
  children,
  className,
  style,
  color = 'black',
  bold = false,
}) => (
  <h1
    style={style}
    className={cn(styles.h1, styles[color], className, bold && styles.bold)}
  >
    {children}
  </h1>
);

export const H2: React.FC<TypographyProps> = ({
  children,
  className,
  style,
  color = 'black',
  bold = false,
}) => (
  <h1
    style={style}
    className={cn(styles.h2, styles[color], className, bold && styles.bold)}
  >
    {children}
  </h1>
);

export const H3: React.FC<TypographyProps> = ({
  children,
  className,
  style,
  color = 'black',
  bold = false,
}) => (
  <h4
    style={style}
    className={cn(styles.h3, styles[color], className, bold && styles.bold)}
  >
    {children}
  </h4>
);

export const H4: React.FC<TypographyProps> = ({
  children,
  className,
  style,
  color = 'black',
  bold = false,
}) => (
  <h4
    style={style}
    className={cn(styles.h4, styles[color], className, bold && styles.bold)}
  >
    {children}
  </h4>
);

export const Paragraph: React.FC<
  {
    children?: React.ReactNode;
    color?: Colors;
    size?: Sizes;
    style?: React.CSSProperties | undefined;
    underlined?: boolean;
    className?: string;
    bold?: boolean;
  } & React.HTMLAttributes<HTMLParagraphElement>
> = ({
  children,
  color,
  size,
  bold,
  style,
  underlined,
  className,
  ...other
}) => (
  <p
    className={cn(
      styles.baseParagraph,
      size && styles[size],
      color && styles[color],
      styles.size,
      styles.color,
      addStyle(bold === true, styles.bold),
      addStyle(underlined === true, styles.underlined),
      className,
    )}
    style={style}
    {...other}
  >
    {children}
  </p>
);

Paragraph.defaultProps = {
  color: 'black',
  size: 'body',
  underlined: false,
  bold: false,
};

export const Truncate = ({
  maxLines,
  children,
  style,
}: {
  maxLines: number;
  children: any;
  style?: CSSProperties;
}) => (
  <div
    className={styles.truncate}
    style={{
      WebkitLineClamp: maxLines,
      ...style,
    }}
  >
    {children}
  </div>
);
