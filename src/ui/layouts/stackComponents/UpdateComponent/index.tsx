import React, { useEffect, useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box } from '../../../components';
// import { iconColors, iconSizes } from '../../../../constants';
import { camelCaseToParagraph } from '../../../../utils';
// import styles from './index.module.scss';
// import cn from 'classnames';
import { translate } from './translate';
import { UpdateConfig } from './UpdateConfig';
// import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import {
  useHistory,
  useLocation,
  useLocationPath,
  useSelector,
} from '../../../hooks';

import { workspaceSelectors } from '../../../../redux/selectors';
// import { List as StackComponenList } from '../Stacks/List';

import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
// import { GetFlavorsListForLogo } from '../Stacks/List/GetFlavorsListForLogo';

// const FilterWrapperForRun = () => {
//   const locationPath = useLocationPath();

//   // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
//   const [filters, setFilter] = useState([getInitialFilterStateForRuns()]);
//   function getFilter(values: any) {
//     const filterValuesMap = values.map((v: any) => {
//       return {
//         column: v.column.selectedValue,
//         type: v.contains.selectedValue,
//         value: v.filterValue,
//       };
//     });
//     return filterValuesMap;
//   }
//   return (
//     <FilterComponent
//       getInitials={getInitialFilterStateForRuns}
//       filters={filters}
//       setFilter={setFilter}
//     >
//       <Runs
//         filter={getFilter(filters)}
//         stackComponentId={locationPath.split('/')[5]}
//       />
//     </FilterComponent>
//   );
// };

const getTabPages = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
  loading?: boolean,
  routeState?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.update.text'),
      Component: () => <UpdateConfig state={routeState} stackId={stackId} />,
      path: routePaths.stackComponents.updateComponent(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
    // {
  ];
};

const getBreadcrumbs = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: camelCaseToParagraph(locationPath.split('/')[4]),

      clickable: true,
      to: routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedWorkspace,
      ),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stackComponents.updateComponent(
        camelCaseToParagraph(locationPath.split('/')[4]),
        stackId,
        selectedWorkspace,
      ),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const location = useLocation();
  const [routeState, setRouteState] = useState({}) as any;
  // const { flavourList } = GetFlavorsListForLogo();
  useEffect(() => {
    setRouteState(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);
  const { stackComponent, id, flavor, loading } = useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(
    id,
    locationPath,
    selectedWorkspace,
    loading,
    routeState,
  );
  const breadcrumbs = getBreadcrumbs(id, locationPath, selectedWorkspace);
  const mappedStackComponent: any = [];
  mappedStackComponent.push(stackComponent);
  const history = useHistory();

  // useEffect(() => {
  //   if (flavourList.length) {
  const mappedStackComponentWithLogo: any = mappedStackComponent.map(
    (item: any) => {
      const temp: any = flavor.find(
        (fl: any) => fl.name === item.flavor && fl.type === item.type,
      );
      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: temp.logo_url,
            name: item.flavor,
          },
        };
      }
      return item;
    },
  );
  const headerCols = GetHeaderCols({
    mappedStackComponentWithLogo,
  });

  // }, [flavourList]);
  // debugger;
  // const boxStyle = {
  //   backgroundColor: '#E9EAEC',
  //   padding: '10px 0',
  //   borderRadius: '8px',
  //   marginTop: '20px',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  // };
  // const headStyle = { color: '#828282' };
  // const paraStyle = { color: '#515151', marginTop: '10px' };
  // const data = [
  //   { name: 'Anom', age: 19, gender: 'Male' },
  //   { name: 'Megha', age: 19, gender: 'Female' },
  //   { name: 'Subham', age: 25, gender: 'Male' },
  // ];
  // const history = useHistory();
  const openDetailPage = (stack: TStack) => {
    history.push(
      routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedWorkspace,
      ),
    );
  };
  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      singleTab={true}
      tabBasePath={routePaths.stackComponents.base(
        stackComponent.id,
        selectedWorkspace,
      )}
      breadcrumbs={breadcrumbs}
      title="Stack Components"
    >
      <Box style={{ marginTop: '40px', overflowX: 'auto' }}>
        {/* {mapStackComponent.length ? ( */}
        <CollapseTable
          pagination={false}
          renderAfterRow={(stack: TStack) => <></>}
          headerCols={headerCols}
          tableRows={mappedStackComponentWithLogo}
          // emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
