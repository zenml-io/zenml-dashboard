import React from 'react';
import { Box, FlexBox, icons, LinkBox } from '../../../../../components';

import styles from './index.module.scss';
import CookieConsent from 'react-cookie-consent';
import cookieImage from '../../../../../assets/cookie.svg';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const CookiePopup: React.FC<{ setShowCookie: any }> = ({
  setShowCookie,
}) => {
  const onClose = () => {
    setShowCookie('false');
    localStorage.setItem('showCookie', 'false');
  };

  return (
    <>
      <Dimmer />

      <CookieConsent
        buttonText="Accept"
        cookieName="My Cookie"
        onAccept={onClose}
        style={{
          background: '#fff',
          borderRadius: '15px',
          color: '#424240',
          fontFamily: 'Rubik',
          fontSize: '1.6rem',
          fontWeight: 'bold',
          maxWidth: `336px`,
          maxHeight: '385px',

          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          margin: '0 auto 0 auto',
          top: '30%',
          left: '42%',
          zIndex: 9999,
        }}
        buttonStyle={{
          backgroundColor: '#fff',
          color: '#8045FF',
          fontFamily: 'Rubik',
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '0 3.2rem',
          marginTop: '-40px',
        }}
        expires={120}
      >
        <>
          <LinkBox
            style={{ position: 'absolute', top: '10px', left: '10px' }}
            onClick={onClose}
          >
            <icons.close />
          </LinkBox>
        </>

        <FlexBox
          marginTop="xxl"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box style={{ height: '130px', width: '130px' }}>
            <img src={cookieImage} alt="cookie" />
          </Box>
          <Box marginTop="md" style={{ width: '250px' }}>
            <p
              style={{
                fontSize: '20px',
                fontWeight: 'lighter',
                fontFamily: 'Rubik',
                textAlign: 'center',
                lineHeight: '26px',
                color: '#424240',
              }}
            >
              This website uses cookies to ensure you get the best experience on
              our website.
            </p>
          </Box>
        </FlexBox>
      </CookieConsent>
    </>
  );
};
