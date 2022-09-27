import React from 'react';

import { Box, Paragraph, icons } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
import { formatDateToDisplay } from '../../../../utils'
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';

const getTabPages = (stackId: TId): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stack.configuration(stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackId={stackId} />,
      path: routePaths.stack.runs(stackId),
    },
  ];
};

const getBreadcrumbs = (stackId: TId): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.list,
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();

  const tabPages = getTabPages(stack.id);
  const breadcrumbs = getBreadcrumbs(stack.id);

  const boxStyle = { backgroundColor: '#E9EAEC', padding: '30px 0', borderRadius: '8px', marginTop: '20px', display: 'flex', justifyContent: 'space-around' }
  const headStyle = { color: '#828282' }

  return (
    <BasePage
      headerWithButtons={false}
      tabPages={tabPages} 
      tabBasePath={routePaths.stack.base(stack.id)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle} >
        <Box>
          <Paragraph style={headStyle}>Stack ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px', fontWeight: "bold" }}>{stack.id}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Shared</Paragraph>
          <Paragraph style={{ marginTop: '10px', justifyContent: 'center', borderRadius: '50%', height: '25px', width: '25px', paddingTop: '3px', textAlign: 'center' }}>
            {stack.isShared ? 
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} /> 
              : <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            } 
          </Paragraph>
        </Box> 
        <Box>
          <Paragraph style={headStyle}>Author</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px', fontWeight: "bold" }}>{stack.userName}</Paragraph>
        </Box> 
        <Box>
          <Paragraph style={headStyle}>Created</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px', fontWeight: "bold" }}>{formatDateToDisplay(stack.creationDate)}</Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default StackDetail;
