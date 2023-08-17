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
import { workspaceSelectors } from '../../../../redux/selectors';

const getTabPages = (stackId: TId, selectedWorkspace: string): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stack.configuration(selectedWorkspace, stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackId={stackId} />,
      path: routePaths.stack.runs(selectedWorkspace, stackId),
    },
  ];
};

const getBreadcrumbs = (
  stackId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.list(selectedWorkspace),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(selectedWorkspace, stackId),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(stack.id, selectedWorkspace);
  const breadcrumbs = getBreadcrumbs(stack.id, selectedWorkspace);

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

              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            {stack.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.md} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.md} />
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
