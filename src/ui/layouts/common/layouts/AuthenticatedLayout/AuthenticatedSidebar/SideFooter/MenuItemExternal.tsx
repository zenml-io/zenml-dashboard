import React from 'react';
import { Box } from '../../../../../../components';
export const MenuItemExternal: React.FC<{
  id?: any;
  subItem?: boolean;
  text: string;
  to: string;
  Icon: React.ComponentType;
}> = ({ id, text, to, Icon, subItem }) => {
  return (
    <a
      id={id}
      target="__blank"
      rel="noopener noreferrer"
      className="!py-1 flex justify-center items-center  rounded-md !px-2 hover:bg-neutral-200"
      href={to}
    >
      <Box>
        <Icon />
      </Box>
    </a>
  );
};
