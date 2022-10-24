import React from 'react';
import { Link } from 'react-router-dom';
import { Paragraph, Sizes } from '..';

import styles from './index.module.scss';

export const SecondaryLink = (props: {
  route: string;
  text: string;
  state?: any;
  size?: Sizes;
}): JSX.Element => (
  <Link
    className={styles.link}
    to={{
      pathname: props.route,
      state: props.state,
    }}
  >
    <Paragraph color="secondary" size={props.size && props.size}>
      {props.text}
    </Paragraph>
  </Link>
);

export const ExternalSecondaryLink = (props: {
  href?: string;
  text: string;
  size?: Sizes;
}): JSX.Element => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={styles.link}
    href={props.href}
  >
    <Paragraph color="secondary" size={props.size && props.size}>
      {props.text}
    </Paragraph>
  </a>
);

export const InnerTextLink = (props: {
  href?: string;
  text: string;
  size?: Sizes;
}): JSX.Element => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={styles.link}
    style={{ color: '#22BBDD' }}
    href={props.href}
  >
    {props.text}
  </a>
);
