import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MenuItem.module.css';
import { camelCaseToParagraph } from '../../../../../../../utils';

export const MenuItem: React.FC<{
  innerItem?: boolean;
  subItem?: boolean;
  text: string;
  to: string;
  exact?: boolean;
  Icon: React.ComponentType;
  id?: any;
  isActive?: ({ match, location }: { match: any; location: any }) => boolean;
}> = ({ id, text, to, exact = false, Icon, isActive, subItem, innerItem }) => {
  return (
    <NavLink
      id={id}
      isActive={(match, location) => {
        if (!isActive) return !!match;
        return isActive({ match, location });
      }}
      activeClassName={`bg-theme-surface-primary stroke-primary-400 hover:bg-theme-surface-primary ${styles.activeItem}`}
      className="block py-1 px-2 rounded-md text-theme-text-primary hover:bg-neutral-200"
      to={to}
      exact={exact}
    >
      <div className="flex justify-center items-center py-1 px-2 flex-col">
        <Icon />
        <p className="text-theme-text-primary mt-[4px] text-text-xs mb-0">
          {camelCaseToParagraph(text)}
        </p>
      </div>
    </NavLink>
  );
};
