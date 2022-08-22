import React from 'react';

import { Image } from '..';

import logo from '../../assets/logo.svg';

export const MaiotLogo: React.FC = () => (
  <Image style={{ width: 113, height: 32 }} src={logo} />
);
