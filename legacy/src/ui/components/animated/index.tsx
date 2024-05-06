import React from 'react';
import { motion } from 'framer-motion';
import { millisecondsIn } from '../../../utils';
import { animationDurationsInSeconds } from '../../../constants';

const defaultConfiguration = {
  ease: 'easeInOut',
  duration: animationDurationsInSeconds.md,
};

export const AnimateFromRight = ({
  children,
  distanceFromTheRightOfThePage,
  isVisible,
  className,
  ...props
}: {
  children: any;
  distanceFromTheRightOfThePage: number;
  isVisible: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <motion.div
      {...props}
      initial={{ x: distanceFromTheRightOfThePage }}
      animate={isVisible ? { x: 0 } : { x: distanceFromTheRightOfThePage }}
      transition={defaultConfiguration}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimateFromLeft = ({
  children,
  elementWidth,
  isVisible,
  style,
  distanceFromTheLeftOfThePage = 0,
  className,
  duration,
}: {
  children: React.ReactNode | string;
  elementWidth: number;
  isVisible: boolean;
  style?: any;
  distanceFromTheLeftOfThePage?: number;
  className?: string;
  duration?: number;
}): JSX.Element => (
  <motion.div
    initial={{ x: -elementWidth }}
    animate={
      isVisible ? { x: distanceFromTheLeftOfThePage } : { x: -elementWidth }
    }
    transition={
      duration ? { ...defaultConfiguration, duration } : defaultConfiguration
    }
    style={{ width: '100%', ...style }}
    className={className}
  >
    {children}
  </motion.div>
);

export const WaitToShow = (
  time: number = millisecondsIn.oneHundredMilliseconds,
) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setShow(true);
      }, time);
    }
  }, [show, time]);

  return { show };
};

const easeInBox = {
  ease: 'easeInOut',
  duration: 0.9,
};
interface EaseInBoxProps {
  children: JSX.Element | JSX.Element[] | null;
  style: any;
  fullWidth?: boolean;
  duration?: number;
}

export const EaseInBox = ({
  children,
  style,
  fullWidth,
  duration,
}: EaseInBoxProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={duration ? { ...easeInBox, duration } : easeInBox}
    style={{ width: fullWidth ? '100%' : style.width, ...style }}
  >
    {children}
  </motion.div>
);
EaseInBox.defaultProps = { style: {} };

export const ScaleOnEnter: React.FC = ({ children }) => (
  <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
    {children}
  </motion.div>
);
EaseInBox.defaultProps = { style: {} };

export const WaitToEnter = (props: Record<string, any>) => {
  const { show } = WaitToShow(props.timeToEnter);

  if (!show) return null;

  return <EaseInBox>{props.children}</EaseInBox>;
};
