import React, { useState } from 'react';
import { joinClassNames } from '../../../utils';

import styles from './index.module.scss';

export const Image = ({
  src,
  style,
  className,
  alt,
}: {
  src: string | null | undefined;
  className?: string;
  style?: React.CSSProperties | undefined;
  alt?: string;
}): JSX.Element => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        style={style}
        className={joinClassNames(className, styles.imageFallback)}
      />
    );
  }
  return (
    <img
      alt={alt}
      onError={(): void => setHasError(true)}
      src={src}
      style={style}
      className={className}
    />
  );
};
