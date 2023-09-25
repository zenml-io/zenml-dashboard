import React from 'react';

import { ReactComponent as ArrowSquareOut } from './assets/ArrowSquareOut.svg';
import { ReactComponent as Burger } from './assets/Burger.svg';
import { ReactComponent as Calendar } from './assets/Calendar.svg';
import { ReactComponent as ChevronDown } from './assets/ChevronDown.svg';
import { ReactComponent as ChevronDownLight } from './assets/ChevronDownLight.svg';
import { ReactComponent as Clock } from './assets/Clock.svg';
import { ReactComponent as CloseWithBorder } from './assets/CloseWithBorder.svg';
import { ReactComponent as CloseWithoutBorder } from './assets/CloseWithoutBorder.svg';
import { ReactComponent as Code } from './assets/Code.svg';
import { ReactComponent as Dashboard } from './assets/Dashboard.svg';
import { ReactComponent as Data } from './assets/Data.svg';
import { ReactComponent as Extension } from './assets/Extension.svg';
import { ReactComponent as Filter } from './assets/Filter.svg';
import { ReactComponent as History } from './assets/History.svg';
import { ReactComponent as Home } from './assets/Home.svg';
import { ReactComponent as Rocket } from './assets/Rocket.svg';
import { ReactComponent as SignOut } from './assets/SignOut.svg';
import { ReactComponent as Stream } from './assets/Stream.svg';
import { ReactComponent as Table } from './assets/Table.svg';
import { ReactComponent as Check } from './assets/Check.svg';
import { ReactComponent as CircleCheck } from './assets/CircleCheck.svg';
import { ReactComponent as CheckCircleFilled } from './assets/CheckCircleFilled.svg';
import { ReactComponent as Close } from './assets/Close.svg';
import { ReactComponent as Checkbox } from './assets/Checkbox.svg';
import { ReactComponent as ChevronLeft } from './assets/ChevronLeft.svg';
import { ReactComponent as Copy } from './assets/Copy.svg';
import { ReactComponent as Eye } from './assets/Eye.svg';
import { ReactComponent as UserPlus } from './assets/UserPlus.svg';
import { ReactComponent as BookOpen } from './assets/BookOpen.svg';
import { ReactComponent as Tool } from './assets/Tool.svg';
import { ReactComponent as Plus } from './assets/Plus.svg';
import { ReactComponent as PhotoCamera } from './assets/PhotoCamera.svg';
import { ReactComponent as FileText } from './assets/FileText.svg';
import { ReactComponent as Download } from './assets/Download.svg';
import { ReactComponent as AlertTriangle } from './assets/AlertTriangle.svg';
import { ReactComponent as Settings } from './assets/Settings.svg';
import { ReactComponent as SingleUser } from './assets/SingleUser.svg';
import { ReactComponent as MultiUser } from './assets/MultiUser.svg';
import { ReactComponent as Docs } from './assets/Docs.svg';
import { ReactComponent as Example } from './assets/Example.svg';
import { ReactComponent as Pipeline } from './assets/Pipeline.svg';
import { ReactComponent as Share2 } from './assets/Share2.svg';
import { ReactComponent as Stack } from './assets/Stack.svg';
import { ReactComponent as StackComponent } from './assets/StackComponent.svg';
import { ReactComponent as StarOutline } from './assets/StarOutline.svg';
import { ReactComponent as Storefront } from './assets/Storefront.svg';
import { ReactComponent as FunnelFill } from './assets/FunnelFill.svg';
import { ReactComponent as Delete } from './assets/Delete.svg';
import { ReactComponent as SimplePlus } from './assets/SimplePlus.svg';
import { ReactComponent as Inprogress } from './assets/InProgress.svg';
import { ReactComponent as Cached } from './assets/Cached.svg';
import { ReactComponent as RightArrow } from './assets/RightArrow.svg';
import { ReactComponent as Edit } from './assets/Edit.svg';
import { ReactComponent as Search } from './assets/Search.svg';
import { ReactComponent as Link } from './assets/Link.svg';
import { ReactComponent as Lock } from './assets/Lock.svg';
import { ReactComponent as Lock2 } from './assets/Lock2.svg';
import { ReactComponent as Logs } from './assets/Logs.svg';
import { ReactComponent as PlusCircle } from './assets/PlusCircle.svg';
import { ReactComponent as MinusCircle } from './assets/MinusCircle.svg';
import { ReactComponent as Config } from './assets/Config.svg';
import { ReactComponent as Failed } from './assets/Failed.svg';

import { ReactComponent as Folders } from './assets/Folders.svg';
import { ReactComponent as BoundingBox } from './assets/BoundingBox.svg';
import { ReactComponent as CloudArrowUp } from './assets/CloudArrowUp.svg';
import { ReactComponent as ChartBarHorizontal } from './assets/ChartBarHorizontal.svg';
import { ReactComponent as ChartLine } from './assets/ChartLine.svg';
import { ReactComponent as RocketLaunch } from './assets/RocketLaunch.svg';
import { ReactComponent as Info } from './assets/Info.svg';
import { ReactComponent as KeyboardReturn } from './assets/KeyboardReturn.svg';
import { ReactComponent as LockKey } from './assets/LockKey.svg';
import { ReactComponent as Graph } from './assets/Graph.svg';
import { ReactComponent as GitCommit } from './assets/GitCommit.svg';
import { ReactComponent as ChatDots } from './assets/ChatDots.svg';
import { ReactComponent as Run } from './assets/Run.svg';
import { ReactComponent as ImageBuilder } from './assets/ImageBuilder.svg';
import { ReactComponent as Pen } from './assets/Pen.svg';
import { ReactComponent as ModelRegistry } from './assets/ModelRegistry.svg';
import { ReactComponent as Share } from './assets/share.svg';
import { ReactComponent as Star } from './assets/Star.svg';
import { ReactComponent as Verified } from './assets/Verified.svg';
import { ReactComponent as EmptyRightArrow } from './assets/EmptyRightArrow.svg';
import { ReactComponent as AddNew } from './assets/addNew.svg';
import { ReactComponent as SupportAgent } from './assets/SupportAgent.svg';
import { ReactComponent as Connector } from './assets/Connector.svg';
import { ReactComponent as NotConnected } from './assets/notConnected.svg';
import { ReactComponent as Back } from './assets/Back.svg';

import { ReactComponent as PaginationFirst } from './assets/PaginationFirst.svg';
import { ReactComponent as PaginationLast } from './assets/PaginationLast.svg';
import { ReactComponent as PaginationNext } from './assets/PaginationNext.svg';
import { ReactComponent as PaginationPrev } from './assets/PaginationPrev.svg';
import { ReactComponent as Repository } from './assets/Repositories.svg';

import styles from './index.module.scss';
import { joinClassNames } from '../../../utils/styles';
import { iconColors, iconSizes } from '../../../constants';
import { Box, BoxProps } from '../.';

const mapSizes = {
  xxs: 8,
  xs: 12,
  sml: 16,
  sm: 18,
  md: 24,
  lg: 30,
  xl: 36,
  xxl: 64,
};

interface Props {
  color?: iconColors;
  size?: iconSizes | keyof typeof mapSizes;
  className?: string;
}

const createIcon = ({
  Component,
  transform,
  useStroke = false,
  isSidebarFilled = false,
}: {
  Component: any;
  useStroke?: boolean;
  transform?: any;
  isSidebarFilled?: boolean;
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
          isSidebarFilled && 'sidebar-fill',
        )}
      />
    </Box>
  );
};

const icons = {
  arrowSquareOut: createIcon({ Component: ArrowSquareOut, useStroke: true }),
  burger: createIcon({ Component: Burger }),
  calendar: createIcon({ Component: Calendar }),
  checkbox: createIcon({ Component: Checkbox }),
  checkCircleFilled: createIcon({ Component: CheckCircleFilled }),
  chevronDown: createIcon({ Component: ChevronDown }),
  chevronDownLight: createIcon({ Component: ChevronDownLight }),
  chevronUpLight: createIcon({
    Component: ChevronDownLight,
    transform: 'rotate(180deg)',
  }),
  clock: createIcon({ Component: Clock }),
  closeWithBorder: createIcon({ Component: CloseWithBorder }),
  closeWithoutBorder: createIcon({ Component: CloseWithoutBorder }),
  code: createIcon({ Component: Code }),
  dashboard: createIcon({ Component: Dashboard }),
  data: createIcon({ Component: Data }),
  extension: createIcon({ Component: Extension }),
  filter: createIcon({ Component: Filter }),
  history: createIcon({ Component: History }),
  home: createIcon({ Component: Home }),
  rocket: createIcon({ Component: Rocket }),
  signOut: createIcon({ Component: SignOut }),
  stream: createIcon({ Component: Stream }),
  table: createIcon({ Component: Table }),
  check: createIcon({ Component: Check, useStroke: true }),
  close: createIcon({ Component: Close, useStroke: true }),
  cached: createIcon({ Component: Cached }),
  inProgress: createIcon({ Component: Inprogress }),
  chevronLeft: createIcon({ Component: ChevronLeft }),
  chevronRight: createIcon({
    Component: ChevronLeft,
    transform: 'rotate(180deg)',
  }),
  repository: createIcon({ Component: Repository, isSidebarFilled: true }),
  rightArrow: createIcon({ Component: RightArrow }),
  copy: createIcon({ Component: Copy }),
  eye: createIcon({ Component: Eye, useStroke: true }),
  failed: createIcon({ Component: Failed }),
  userPlus: createIcon({ Component: UserPlus, useStroke: true }),
  bookOpen: createIcon({ Component: BookOpen, useStroke: true }),
  tool: createIcon({ Component: Tool, useStroke: true }),
  plus: createIcon({ Component: Plus }),
  photoCamera: createIcon({ Component: PhotoCamera }),
  simplePlus: createIcon({ Component: SimplePlus }),
  fileText: createIcon({ Component: FileText, useStroke: true }),
  download: createIcon({ Component: Download, useStroke: true }),
  alertTriangle: createIcon({ Component: AlertTriangle, useStroke: true }),
  settings: createIcon({ Component: Settings, useStroke: true }),
  singleUser: createIcon({ Component: SingleUser }),
  multiUser: createIcon({ Component: MultiUser }),
  docs: createIcon({ Component: Docs, useStroke: true }),
  example: createIcon({ Component: Example, useStroke: true }),
  pipeline: createIcon({ Component: Pipeline, useStroke: true }),
  share2: createIcon({ Component: Share2 }),
  stack: createIcon({ Component: Stack, useStroke: true }),
  stackComponent: createIcon({ Component: StackComponent, useStroke: true }),
  starOutline: createIcon({ Component: StarOutline }),
  storefront: createIcon({ Component: Storefront, isSidebarFilled: true }),
  funnelFill: createIcon({ Component: FunnelFill }),
  delete: createIcon({ Component: Delete }),
  edit: createIcon({ Component: Edit }),
  search: createIcon({ Component: Search }),
  run: createIcon({ Component: Run, useStroke: true }),
  info: createIcon({ Component: Info }),
  keyboardReturn: createIcon({ Component: KeyboardReturn }),
  link: createIcon({ Component: Link, useStroke: true }),
  lock: createIcon({ Component: Lock, useStroke: true }),
  lock2: createIcon({ Component: Lock2 }),
  logs: createIcon({ Component: Logs, useStroke: true }),
  config: createIcon({ Component: Config }),
  plusCircle: createIcon({ Component: PlusCircle, useStroke: true }),
  minusCircle: createIcon({ Component: MinusCircle, useStroke: true }),
  emptyRightArrow: createIcon({ Component: EmptyRightArrow, useStroke: true }),
  circleCheck: createIcon({ Component: CircleCheck }),
  addNew: createIcon({ Component: AddNew }),
  supportAgent: createIcon({ Component: SupportAgent }),
  connector: createIcon({ Component: Connector, useStroke: true }),
  notConnected: createIcon({ Component: NotConnected, useStroke: true }),
  back: createIcon({ Component: Back, useStroke: true }),
  //icons for stackComponents
  artifact_store: createIcon({ Component: Folders, useStroke: true }),
  alerter: createIcon({ Component: ChatDots, useStroke: true }),
  annotator: createIcon({ Component: BoundingBox, useStroke: true }),
  container_registry: createIcon({ Component: CloudArrowUp, useStroke: true }),
  experiment_tracker: createIcon({ Component: ChartLine, useStroke: true }),
  feature_store: createIcon({ Component: Table, useStroke: true }),
  model_deployer: createIcon({ Component: RocketLaunch, useStroke: true }),
  secrets_manager: createIcon({ Component: LockKey, useStroke: true }),
  orchestrator: createIcon({ Component: Graph, useStroke: true }),
  step_operator: createIcon({ Component: GitCommit, useStroke: true }),
  data_validator: createIcon({
    Component: ChartBarHorizontal,
    useStroke: true,
  }),
  image_builder: createIcon({
    Component: ImageBuilder,
    useStroke: true,
  }),
  pen: createIcon({ Component: Pen, useStroke: true }),
  model_registry: createIcon({ Component: ModelRegistry, useStroke: true }),
  share: createIcon({ Component: Share, useStroke: true }),
  star: createIcon({ Component: Star }),
  verified: createIcon({ Component: Verified }),

  // paginations
  paginationFirst: createIcon({ Component: PaginationFirst, useStroke: true }),
  paginationLast: createIcon({ Component: PaginationLast, useStroke: true }),
  paginationNext: createIcon({ Component: PaginationNext, useStroke: true }),
  paginationPrev: createIcon({ Component: PaginationPrev, useStroke: true }),
};

export { icons };
