import React, { PropsWithChildren, useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as ArrowClose } from '../../../../../components/icons/assets/arrowClose.svg';
import { ReactComponent as ArrowOpen } from '../../../../../components/icons/assets/arrowOpen.svg';
import { H4 } from '../../../../../components';

interface DetailCardProps {
  heading: string;
  isInitiallyOpen: boolean;
}

export const DetailCard = ({
  heading,
  children,
  isInitiallyOpen,
}: PropsWithChildren<DetailCardProps>) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <div className={styles.card}>
      <button
        style={{
          width: '100%',
          textAlign: 'left',
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontStyle: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen ? (
          <ArrowOpen style={{ transform: 'scale(1.5)' }} />
        ) : (
          <ArrowClose style={{ transform: 'scale(1.5)' }} />
        )}
        <H4 className={styles.card__heading}>{heading}</H4>
      </button>
      {isOpen && (
        <div className={styles.card__contentContainer}>{children}</div>
      )}
    </div>
  );
};

export default DetailCard;
