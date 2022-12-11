import React, { useState, useEffect } from 'react';
import { MenuItem } from '../Menu/MenuItem';
import { MenuItemExternal } from './MenuItemExternal';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons, Paragraph } from '../../../../../../components';
import { iconSizes, iconColors, DEFAULT_PROJECT_NAME } from '../../../../../../../constants';
import { translate } from '../translate';
import { sessionSelectors } from '../../../../../../../redux/selectors/session';
import { useSelector } from '../../../../../../hooks';
import axios from 'axios';

export const SideFooter: React.FC = () => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [apiVersion, setApiVersion] = useState('');

  useEffect(() => {
    if (authToken) {
      const getApiVersion = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/version`,
          {
            headers: {
              Authorization: `bearer ${authToken}`,
            },
          },
        );
        setApiVersion(data);
      };

      getApiVersion();
    }
  }, [authToken]);

  const url_string = window.location.href; 
  const url = new URL(url_string);
  const projectName = url.searchParams.get("project");

  return (
    <>
      <Box marginHorizontal="md" paddingBottom="md">
        <Separator.LightNew />
      </Box>

      <MenuItemExternal
        id='documentation'
        Icon={() => <icons.docs color={iconColors.white} size={iconSizes.md} />}
        to="https://docs.zenml.io"
        text="Documentation"
      />
      <MenuItemExternal
        id='example'
        Icon={() => (
          <icons.example color={iconColors.white} size={iconSizes.md} />
        )}
        to="https://docs.zenml.io/getting-started/examples"
        text="Example & Tutorials"
      />
      <MenuItemExternal
        id='report'
        Icon={() => <icons.tool color={iconColors.white} size={iconSizes.md} />}
        to="https://github.com/zenml-io/zenml-dashboard/issues/new/choose"
        text="Report Issue"
      />
      <MenuItem
        id='settings' 
        Icon={() => (
          <icons.settings color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.settings.personalDetails + `?project=${projectName ? projectName : DEFAULT_PROJECT_NAME}`}
        text={translate('menu.setting.text')}
      />

      <Box style={{ paddingLeft: '12px' }} paddingTop="md" paddingBottom="xs">
        <Paragraph color="white" style={{ fontSize: '8px', fontWeight: 400 }}>
          UI Version v{process.env.REACT_APP_VERSION}
        </Paragraph>
        <Paragraph color="white" style={{ fontSize: '8px', fontWeight: 400 }}>
          ZenML v{apiVersion}
        </Paragraph>
      </Box>
    </>
  );
};
