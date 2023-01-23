import React from 'react';

import { Box, Paragraph, icons } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
import { formatDateToDisplayOnTable } from '../../../../utils';
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useSelector } from '../../../hooks';
import { projectSelectors } from '../../../../redux/selectors';

const getTabPages = (stackId: TId, selectedProject: string): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stack.configuration(selectedProject, stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackId={stackId} />,
      path: routePaths.stack.runs(selectedProject, stackId),
    },
  ];
};

const getBreadcrumbs = (
  stackId: TId,
  selectedProject: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.list(selectedProject),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(selectedProject, stackId),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const tabPages = getTabPages(stack.id, selectedProject);
  const breadcrumbs = getBreadcrumbs(stack.id, selectedProject);

  const boxStyle = {
    backgroundColor: '#E9EAEC',
    padding: '10px 0',
    borderRadius: '8px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const headStyle = { color: '#828282' };

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stack.base(stack.id)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>Stack ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Shared</Paragraph>
          <Paragraph
            style={{
              marginTop: '10px',
              justifyContent: 'center',
              borderRadius: '50%',
              height: '25px',
              width: '25px',
              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            {stack.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            )}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Author</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack.userName}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Created</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateToDisplayOnTable(stack.created)}
          </Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default StackDetail;
