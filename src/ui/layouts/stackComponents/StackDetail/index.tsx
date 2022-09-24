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

const getTabPages = (stackId: TId): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stackComponents.configuration(stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackId={stackId} />,
      path: routePaths.stackComponents.runs(stackId),
    },
  ];
};

const getBreadcrumbs = (stackId: TId, locationPath: any): TBreadcrumb[] => {
  return [
    {
      name: 'Components',
      clickable: true,
      to: routePaths.stackComponents.base(locationPath.split('/')[2]),
    },
    {
      name: 'alerter',
      clickable: true,
      to: routePaths.stackComponents.configuration(stackId),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const { stackComponent } = useService();

  const tabPages = getTabPages(stackComponent.id);
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
          <Paragraph style={{ marginTop: '10px', justifyContent: 'center', backgroundColor: stackComponent.isShared ? '#47E08B' : '#FF5C93', borderRadius: '50%', height: '25px', width: '25px', paddingTop: '3px', textAlign: 'center' }}>
            {stackComponent.isShared ? 
              <icons.check color={iconColors.white} size={iconSizes.sm} /> 
              : <icons.close color={iconColors.white} size={iconSizes.sm} />
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
