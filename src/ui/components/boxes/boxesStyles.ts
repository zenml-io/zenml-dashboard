import _ from 'lodash';
import { spacings } from '../../../constants';

type SpacingsEnum =
  | 'xxs'
  | 'xs'
  | 'xs2'
  | 'sm'
  | 'sm2'
  | 'md'
  | 'lg'
  | 'lg2'
  | 'xl'
  | 'xl2'
  | 'xxl'
  | 'xxxl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '8xl'
  | '10xl';

export const getSpacing = (value: SpacingsEnum | null | undefined): any => {
  if (!value) return 0;

  return spacings[value];
};

declare global {
  type SpacingOrNil = SpacingsEnum | null | undefined;

  interface MarginProps {
    margin?: SpacingOrNil;
    marginRight?: SpacingOrNil;
    marginLeft?: SpacingOrNil;
    marginBottom?: SpacingOrNil;
    marginTop?: SpacingOrNil;
    marginVertical?: SpacingOrNil;
    marginHorizontal?: SpacingOrNil;
  }

  interface PaddingProps {
    padding?: SpacingOrNil;
    paddingRight?: SpacingOrNil;
    paddingLeft?: SpacingOrNil;
    paddingBottom?: SpacingOrNil;
    paddingTop?: SpacingOrNil;
    paddingVertical?: SpacingOrNil;
    paddingHorizontal?: SpacingOrNil;
  }
}

export const getMarginsByProps = (props: MarginProps): any => {
  const margins = {
    marginRight: getSpacing(props.marginRight),
    marginLeft: getSpacing(props.marginLeft),
    marginBottom: getSpacing(props.marginBottom),
    marginTop: getSpacing(props.marginTop),
  };
  if (!_.isNil(props.marginHorizontal)) {
    margins.marginLeft = getSpacing(props.marginHorizontal);
    margins.marginRight = getSpacing(props.marginHorizontal);
  }

  if (!_.isNil(props.marginVertical)) {
    margins.marginBottom = getSpacing(props.marginVertical);
    margins.marginTop = getSpacing(props.marginVertical);
  }

  if (!_.isNil(props.margin)) {
    margins.marginBottom = getSpacing(props.margin);
    margins.marginTop = getSpacing(props.margin);
    margins.marginLeft = getSpacing(props.margin);
    margins.marginRight = getSpacing(props.margin);
  }

  return margins;
};

export const getPaddingsByProps = (props: PaddingProps): any => {
  const paddings = {
    paddingRight: getSpacing(props.paddingRight),
    paddingLeft: getSpacing(props.paddingLeft),
    paddingBottom: getSpacing(props.paddingBottom),
    paddingTop: getSpacing(props.paddingTop),
  };
  if (!_.isNil(props.paddingHorizontal)) {
    paddings.paddingLeft = getSpacing(props.paddingHorizontal);
    paddings.paddingRight = getSpacing(props.paddingHorizontal);
  }

  if (!_.isNil(props.paddingVertical)) {
    paddings.paddingBottom = getSpacing(props.paddingVertical);
    paddings.paddingTop = getSpacing(props.paddingVertical);
  }

  if (!_.isNil(props.padding)) {
    paddings.paddingBottom = getSpacing(props.padding);
    paddings.paddingTop = getSpacing(props.padding);
    paddings.paddingLeft = getSpacing(props.padding);
    paddings.paddingRight = getSpacing(props.padding);
  }

  return paddings;
};
