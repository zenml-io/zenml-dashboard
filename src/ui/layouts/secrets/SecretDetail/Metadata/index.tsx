import React from 'react';
// import { translate } from '../translate';
// import { RunsTable } from '../../RunsTable';
// import { useService } from './useService';

export const MetaData: React.FC<{
  isExpended?: any;
  secretId: TId;
  filter?: any;
  runId?: any;
  pagination?: boolean;
}> = ({ secretId, filter, isExpended = false }) => {
  // const [sortBy, setSortBy] = useState('created');
  // function getSorted(activeSorting: any, activeSortingDirection: any) {
  //   setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  //   // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  // }
  // const { fetching, runIds, runsPaginated } = useService({
  //   isExpended,
  //   secretId,
  //   filter,
  //   sortBy,
  // });
  // console.log(filter, 'filter11');
  return (
    <>Coming soon</>
    // <RunsTable
    //   isExpended={isExpended}
    //   stackId={stackId}
    //   id={runId}
    //   pagination={pagination}
    //   getSorted={getSorted}
    //   fetching={runId === undefined && fetching}
    //   paginated={runsPaginated}
    //   emptyStateText={translate('emptyState.text')}
    //   runIds={runId === undefined ? runIds : [runId]}
    //   filter={filter}
    // />
  );
};
