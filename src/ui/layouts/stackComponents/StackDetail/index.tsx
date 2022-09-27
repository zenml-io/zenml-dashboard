import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box, Paragraph, icons } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
import { formatDateToDisplay } from '../../../../utils'
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';

const getTabPages = (stackId: TId, locationPath: any): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stackComponents.configuration(
        locationPath.split('/')[2],
        stackId,
      ),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackComponentId={stackId} />,
      path: routePaths.stackComponents.runs(
        locationPath.split('/')[2],
        stackId,
      ),
    },
  ];
};

const getBreadcrumbs = (stackId: TId, locationPath: any): TBreadcrumb[] => {
  return [
    {
      name: locationPath.split('/')[2],
      clickable: true,
      to: routePaths.stackComponents.base(locationPath.split('/')[2]),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        locationPath.split('/')[2],
        stackId,
      ),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const { stackComponent } = useService();

  const tabPages = getTabPages(stackComponent.id, locationPath);
  const breadcrumbs = getBreadcrumbs(stackComponent.id, locationPath);

  const boxStyle = { backgroundColor: '#E9EAEC', padding: '30px 0', borderRadius: '8px', marginTop: '20px', display: 'flex', justifyContent: 'space-around' }
  const headStyle = { color: '#828282', fontSize: '12px' }
  const paraStyle = { color: '#515151', marginTop: '10px' }

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stackComponents.base(stackComponent.id)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle} >
        <Box>
          <Paragraph style={headStyle}>ID</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.id}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Shared</Paragraph>
          <Paragraph style={{ marginTop: '10px', justifyContent: 'center', borderRadius: '50%', height: '25px', width: '25px', paddingTop: '3px', textAlign: 'center' }}>
            {stackComponent.isShared ? 
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} /> 
              : <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            } 
          </Paragraph>
        </Box> 
        <Box>
          <Paragraph style={headStyle}>Name</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.name}</Paragraph>
        </Box> 
        <Box>
          <Paragraph style={headStyle}>Flavor</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.flavor}</Paragraph>
        </Box> 
        <Box>
          <Paragraph style={headStyle}>Author</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.user.name}</Paragraph>
        </Box> 
        <Box>
          <Paragraph style={headStyle}>Created</Paragraph>
          <Paragraph style={paraStyle}>{formatDateToDisplay(stackComponent.createdAt)}</Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default StackDetail;
