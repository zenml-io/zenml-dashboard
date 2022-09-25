import React from 'react';

import { ReactComponent as Burger } from './assets/Burger.svg';
import { ReactComponent as Calendar } from './assets/Calendar.svg';
import { ReactComponent as ChevronDown } from './assets/ChevronDown.svg';
import { ReactComponent as ChevronDownLight } from './assets/ChevronDownLight.svg';
import { ReactComponent as Clock } from './assets/Clock.svg';
import { ReactComponent as CloseWithBorder } from './assets/CloseWithBorder.svg';
import { ReactComponent as Code } from './assets/Code.svg';
import { ReactComponent as Dashboard } from './assets/Dashboard.svg';
import { ReactComponent as Data } from './assets/Data.svg';
import { ReactComponent as Filter } from './assets/Filter.svg';
import { ReactComponent as History } from './assets/History.svg';
import { ReactComponent as Home } from './assets/Home.svg';
import { ReactComponent as Rocket } from './assets/Rocket.svg';
import { ReactComponent as SignOut } from './assets/SignOut.svg';
import { ReactComponent as Stream } from './assets/Stream.svg';
import { ReactComponent as Table } from './assets/Table.svg';
import { ReactComponent as Check } from './assets/Check.svg';
import { ReactComponent as Close } from './assets/Close.svg';
import { ReactComponent as ChevronLeft } from './assets/ChevronLeft.svg';
import { ReactComponent as Copy } from './assets/Copy.svg';
import { ReactComponent as Eye } from './assets/Eye.svg';
import { ReactComponent as UserPlus } from './assets/UserPlus.svg';
import { ReactComponent as BookOpen } from './assets/BookOpen.svg';
import { ReactComponent as Tool } from './assets/Tool.svg';
import { ReactComponent as Plus } from './assets/Plus.svg';
import { ReactComponent as FileText } from './assets/FileText.svg';
import { ReactComponent as Download } from './assets/Download.svg';
import { ReactComponent as AlertTriangle } from './assets/AlertTriangle.svg';
import { ReactComponent as Settings } from './assets/Settings.svg';
import { ReactComponent as SingleUser } from './assets/SingleUser.svg';
import { ReactComponent as MultiUser } from './assets/MultiUser.svg';
import { ReactComponent as FunnelFill } from './assets/FunnelFill.svg';
import { ReactComponent as Delete } from './assets/Delete.svg';
import { ReactComponent as SimplePlus } from './assets/SimplePlus.svg';

import styles from './index.module.scss';
import { joinClassNames } from '../../../utils/styles';
import { iconColors, iconSizes } from '../../../constants';
import { Box, BoxProps } from '../.';

interface Props {
  color?: iconColors;
  size?: iconSizes;
  className?: string;
}

const mapSizes = {
  xs: 12,
  sm: 18,
  md: 24,
  lg: 30,
  xl: 36,
};

const createIcon = ({
  Component,
  transform,
  useStroke = false,
}: {
  Component: any;
  useStroke?: boolean;
  transform?: any;
}) => ({ size, color, ...props }: Props & BoxProps) => {
  return (
    <Box {...props}>
      <Component
        {...props}
        transform={transform}
        style={{ transform }}
        width={mapSizes[size || 'md']}
        height={mapSizes[size || 'md']}
        className={joinClassNames(
          styles.svg,
          styles[color || 'black'],
          props.className,
          useStroke && styles.useStroke,
          !useStroke && styles.useFill,
        )}
      />
    </Box>
  );
};

const icons = {
  burger: createIcon({ Component: Burger }),
  calendar: createIcon({ Component: Calendar }),
  chevronDown: createIcon({ Component: ChevronDown }),
  chevronDownLight: createIcon({ Component: ChevronDownLight }),
  chevronUpLight: createIcon({
    Component: ChevronDownLight,
    transform: 'rotate(180deg)',
  }),
  clock: createIcon({ Component: Clock }),
  closeWithBorder: createIcon({ Component: CloseWithBorder }),
  code: createIcon({ Component: Code }),
  dashboard: createIcon({ Component: Dashboard }),
  data: createIcon({ Component: Data }),
  filter: createIcon({ Component: Filter }),
  history: createIcon({ Component: History }),
  home: createIcon({ Component: Home }),
  rocket: createIcon({ Component: Rocket }),
  signOut: createIcon({ Component: SignOut }),
  stream: createIcon({ Component: Stream }),
  table: createIcon({ Component: Table }),
  check: createIcon({ Component: Check, useStroke: true }),
  close: createIcon({ Component: Close, useStroke: true }),
  chevronLeft: createIcon({ Component: ChevronLeft }),
  chevronRight: createIcon({
    Component: ChevronLeft,
    transform: 'rotate(180deg)',
  }),
  copy: createIcon({ Component: Copy }),
  eye: createIcon({ Component: Eye, useStroke: true }),
  userPlus: createIcon({ Component: UserPlus, useStroke: true }),
  bookOpen: createIcon({ Component: BookOpen, useStroke: true }),
  tool: createIcon({ Component: Tool, useStroke: true }),
  plus: createIcon({ Component: Plus }),
  simplePlus: createIcon({ Component: SimplePlus }),
  fileText: createIcon({ Component: FileText, useStroke: true }),
  download: createIcon({ Component: Download, useStroke: true }),
  alertTriangle: createIcon({ Component: AlertTriangle, useStroke: true }),
  settings: createIcon({ Component: Settings }),
  singleUser: createIcon({ Component: SingleUser }),
  multiUser: createIcon({ Component: MultiUser }),
  funnelFill: createIcon({ Component: FunnelFill }),
  delete: createIcon({ Component: Delete }),
};

export { icons };
