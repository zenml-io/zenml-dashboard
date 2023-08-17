import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { camelCaseToParagraph } from '../../../../utils';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';

import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';

import { workspaceSelectors } from '../../../../redux/selectors';

import { Table } from '../../common/Table';
import { useHeaderCols } from './HeaderCols';

export interface RunDetailRouteParams {
  type: string;
  stackComponentId: TId;
  id: TId;
}

export const RunDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const history = useHistory();
  const { stackComponentId, runId, fetching, run, metadata } = useService();
  const runRow: any = [];
  runRow.push(run);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = [
    {
      text: 'DAG',

      Component: () => (
        <DAG runId={runId} fetching={fetching} metadata={metadata} />
      ),
      path: routePaths.run.component.statistics(
        locationPath.split('/')[4],
        stackComponentId,
        runId,
        selectedWorkspace,
      ),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.component.results(
        locationPath.split('/')[4],
        stackComponentId,
        runId,
        selectedWorkspace,
      ),
    },
  ];
  const breadcrumbs = [
    {
      name: camelCaseToParagraph(locationPath.split('/')[4]),
      clickable: true,
      to: routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedWorkspace,
      ),
    },
    {
      name: stackComponentId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackComponentId,
        selectedWorkspace,
      ),
    },
    {
      name: `Run ${runId}`,
      clickable: false,
      to: routePaths.run.component.statistics(
        locationPath.split('/')[5],
        stackComponentId,
        runId,
        selectedWorkspace,
      ),
    },
  ];
  const headerCols = useHeaderCols({
    runs: runRow,
  });
  const openDetailPage = (stack: TStack) => {
    history.push(
      routePaths.stackComponents.runs(
        locationPath.split('/')[4],
        stackComponentId,
        selectedWorkspace,
      ),
    );
  };

  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.component.base(runId, stackComponentId)}
      breadcrumbs={breadcrumbs}
    >
      <Table
        pagination={false}
        headerCols={headerCols}
        tableRows={runRow}
        trOnClick={openDetailPage}
      />
    </BasePage>
  );
};

export default RunDetail;
