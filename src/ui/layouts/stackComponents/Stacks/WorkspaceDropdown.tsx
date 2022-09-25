import React, { useState } from 'react';
import cn from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  LinkBox,
  Paragraph,
  If,
  icons,
  FlexBox,
  Truncate,
} from '../../../components';
import styles from './WorkspaceDropdown.module.scss';
import { iconSizes, iconColors } from '../../../../constants/icons';

export const WorkspaceDropdown: React.FC<{
  setCurrentWorkspace: (workspace: TWorkspace) => void;
  currentWorkspace: TWorkspace | null;
  workspaces: TWorkspace[];
}> = ({ setCurrentWorkspace, currentWorkspace, workspaces }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onClick = (workspace: TWorkspace) => {
    setDropdownOpen(false);
    setCurrentWorkspace(workspace);
  };

  if (!workspaces || workspaces.length === 0) return null;

  return (
    <Box style={{ position: 'relative' }}>
      <LinkBox onClick={() => setDropdownOpen(!dropdownOpen)}>
        <FlexBox.Row alignItems="center">
          <Truncate maxLines={1}>
            <Paragraph color="primary" size="small">
              {currentWorkspace && currentWorkspace.name}
            </Paragraph>
          </Truncate>

          <Box paddingLeft="xs">
            <icons.chevronDownLight
              size={iconSizes.xs}
              color={iconColors.primary}
            />
          </Box>
        </FlexBox.Row>
      </LinkBox>
      <If condition={dropdownOpen}>
        {() => (
          <OutsideClickHandler onOutsideClick={() => setDropdownOpen(false)}>
            <Box className={styles.dropdown}>
              {workspaces.map((workspace: TWorkspace, index: number) => (
                <LinkBox key={index} onClick={() => onClick(workspace)}>
                  <Box
                    className={cn(
                      styles.dropdownItem,
                      currentWorkspace &&
                        workspace.id === currentWorkspace.id &&
                        styles.currentDropdownItem,
                    )}
                    paddingHorizontal="sm"
                    paddingVertical="sm"
                  >
                    <Truncate maxLines={1}>
                      <Paragraph size="small">{workspace.name}</Paragraph>
                    </Truncate>
                  </Box>
                </LinkBox>
              ))}
            </Box>
          </OutsideClickHandler>
        )}
      </If>
    </Box>
  );
};
