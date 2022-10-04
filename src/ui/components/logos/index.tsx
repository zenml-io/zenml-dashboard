import React from 'react';

import { Image } from '..';

import logo from '../../assets/logo.svg';
import logoWhite from '../../assets/logo_white.svg';

export const ZenMLLogo: React.FC = () => (
  <Image style={{ width: 113, height: 32 }} src={logo} />
);

export const ZenMLLogoWhite: React.FC = () => (
  <Image style={{ width: 150, height: 35 }} src={logoWhite} />
);