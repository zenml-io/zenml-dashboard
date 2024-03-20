import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Paragraph } from '../typographies';

type Tooltip = {
  id: any;
  text: any;
};

export const Tooltip = ({ id, text }: Tooltip) => {
  return (
    <ReactTooltip id={id} place="top" effect="solid">
      <Paragraph color="white">{text}</Paragraph>
    </ReactTooltip>
  );
};
