import React, { useState } from 'react';
import cn from 'classnames';

import {
  FlexBox,
  Paragraph,
  AnimateFromRight,
  Truncate,
} from '../../components';
import { millisecondsIn } from '../../../utils';

import styles from './Toaster.module.scss';

import { useSelector, useDispatch } from '../../hooks';

import { showToasterAction } from '../../../redux/actions';
import {
  getToasterDescription,
  getToasterType,
} from '../../../redux/selectors';
import { animationDurationsInSeconds } from '../../../constants';

export const DISTANCE_FROM_THE_RIGHT_OF_THE_PAGE = 384;
export const TOASTER_DISPLAY_TIME_IN_SECONDS = millisecondsIn.seconds(2.5);
export const TIMEOUT_TO_HIDE_TOASTER_IN_SECONDS = millisecondsIn.seconds(
  animationDurationsInSeconds.md,
);

const useShowToaster = (): {
  isVisible: boolean;
  description: string;
  type: string;
} => {
  const dispatch = useDispatch();
  const description = useSelector(getToasterDescription) as string;
  const type = useSelector(getToasterType) as string;

  const [isVisible, setIsVisible] = useState(!!description);

  React.useEffect(() => {
    const removeDataFromToasterAfterHideAnimation = (): void => {
      const displayTime = Math.max(description.length * 100, 2500);

      setTimeout(() => {
        dispatch(showToasterAction({ description: null }));
      }, displayTime);
    };

    const showToasterThenHideItAfterAwhile = (): void => {
      const displayTime = Math.max(description.length * 100, 2500);
      setTimeout(() => {
        setIsVisible(false);
        removeDataFromToasterAfterHideAnimation();
      }, displayTime);
    };

    if (description) {
      setIsVisible(true);
      showToasterThenHideItAfterAwhile();
    }
  }, [description, dispatch]);

  return { isVisible, description, type };
};

export const Toaster = (): JSX.Element => {
  const { description, isVisible, type } = useShowToaster();

  return (
    <AnimateFromRight
      data-cy="toaster"
      isVisible={isVisible}
      className={cn(styles.toaster, styles[type])}
      distanceFromTheRightOfThePage={DISTANCE_FROM_THE_RIGHT_OF_THE_PAGE}
    >
      <FlexBox paddingLeft="md" justifyContent="flex-start" alignItems="center">
        <Truncate maxLines={10}>
          <Paragraph size="body" color="black">
            {description}
          </Paragraph>
        </Truncate>
      </FlexBox>
    </AnimateFromRight>
  );
};

export default Toaster;
