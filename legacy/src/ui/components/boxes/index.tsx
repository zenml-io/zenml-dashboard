import React, { HTMLAttributes } from 'react';
import { getMarginsByProps, getPaddingsByProps } from './boxesStyles';
import { joinClassNames } from '../../../utils';
import styles from './index.module.scss';
import { keys } from '../../../constants';

export interface BoxProps
  extends HTMLAttributes<HTMLDivElement>,
    PaddingProps,
    MarginProps {
  backgroundColor?: string;
}

const onlyMarginProps = (
  props: BoxProps & MarginProps & PaddingProps,
): MarginProps => {
  const {
    margin,
    marginRight,
    marginLeft,
    marginBottom,
    marginTop,
    marginVertical,
    marginHorizontal,
  } = props;

  return {
    margin,
    marginRight,
    marginLeft,
    marginBottom,
    marginTop,
    marginVertical,
    marginHorizontal,
  };
};

const onlyPaddingProps = (
  props: BoxProps & MarginProps & PaddingProps,
): PaddingProps => {
  const {
    padding,
    paddingRight,
    paddingLeft,
    paddingBottom,
    paddingTop,
    paddingVertical,
    paddingHorizontal,
  } = props;

  return {
    padding,
    paddingRight,
    paddingLeft,
    paddingBottom,
    paddingTop,
    paddingVertical,
    paddingHorizontal,
  };
};

export const Box: React.FC<BoxProps> = ({ style, ...props }) => (
  <div
    {...props}
    style={{
      ...getMarginsByProps(onlyMarginProps(props)),
      ...getPaddingsByProps(onlyPaddingProps(props)),
      ...{ backgroundColor: props.backgroundColor },
      ...style,
    }}
  />
);

Box.defaultProps = {
  children: null,
};

interface FlexBoxProps extends PaddingProps {
  flexDirection?: 'row' | 'column';
  flex?: number;
  justifyContent?: string;
  alignItems?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  flexWrap?: boolean;
}

export const FlexBox: {
  Row: any;
  Column: any;
} & React.FC<FlexBoxProps & BoxProps & MarginProps & PaddingProps> = ({
  flexDirection,
  flex,
  justifyContent,
  alignItems,
  style,
  fullWidth,
  fullHeight,
  flexWrap,
  ...props
}) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      flexDirection,
      flex,
      justifyContent,
      alignItems,
      width: fullWidth ? '100%' : style?.width,
      height: fullHeight ? '100%' : style?.height,
      flexWrap: flexWrap ? 'wrap' : undefined,
      ...style,
    }}
  >
    {props.children}
  </Box>
);

FlexBox.defaultProps = {
  style: {},
};

const FlexBoxColumn: React.FC<FlexBoxProps> = (props) => (
  <FlexBox flexDirection="column" {...props} />
);

FlexBox.Column = FlexBoxColumn;
FlexBox.Row = FlexBox;

interface LinkBoxInterface {
  onClick: any;
  onMouseEnter?: TClickEvent;
  className?: string;
  style?: React.CSSProperties | undefined;
}

export const LinkBox: React.FC<LinkBoxInterface> = ({
  children,
  onClick,
  onMouseEnter,
  className,
  style,
}) => {
  const handleKeyPress = (e: any) => {
    if (!e) return null;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === keys.Enter) onClick();
    return null;
  };

  return (
    <div
      onKeyPress={handleKeyPress}
      onMouseEnter={onMouseEnter}
      role="button"
      tabIndex={0}
      style={style}
      className={joinClassNames(styles.linkBox, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface AbsolutePropsInterface {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
const getAbsoluteProps = (props: AbsolutePropsInterface) => ({
  left: props.left,
  right: props.right,
  top: props.top,
  bottom: props.bottom,
});

export const AbsoluteBox: React.FC<AbsolutePropsInterface> = (props) => {
  return (
    <div style={getAbsoluteProps(props)} className={styles.absoluteBox}>
      {props.children}
    </div>
  );
};

export const RelativeBox: React.FC = (props) => {
  return <div className={styles.relativeBox}>{props.children}</div>;
};
