import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box, FlexBox, PrimaryButton } from '../../../components';
// import { iconColors, iconSizes } from '../../../../constants';
import { camelCaseToParagraph } from '../../../../utils';
// import styles from './index.module.scss';
// import cn from 'classnames';
import { translate } from './translate';
import { Configuration } from './Configuration';
// import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import FilterComponent, {
  getInitialFilterState,
  // getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { workspaceSelectors } from '../../../../redux/selectors';
// import { List as StackComponenList } from '../Stacks/List';
import { List } from '../../stacks/Stacks/List';
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

const FilterWrapperForStacks = () => {
  const locationPath = useLocationPath();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterState()]);
  function getFilter(values: any) {
    const filterValuesMap = values.map((v: any) => {
      return {
        column: v.column.selectedValue,
        type: v.contains.selectedValue,
        value: v.filterValue,
      };
    });
    return filterValuesMap;
  }
  return (
    <Box marginTop="lg" style={{ width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterState}
        filters={filters}
        setFilter={setFilter}
      >
        <List
          stackComponentId={locationPath.split('/')[5]}
          filter={getFilter(filters)}
        />
        <FlexBox
          style={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            marginRight: '45px',
          }}
        >
          <Box marginBottom="lg">
            <PrimaryButton
              onClick={() => {
                history.push(
                  routePaths.stackComponents.registerComponents(
                    locationPath.split('/')[4],
                    selectedWorkspace,
                  ),
                );
              }}
            >
              Register New Component
            </PrimaryButton>
          </Box>
        </FlexBox>
      </FilterComponent>
    </Box>
  );
};
const getTabPages = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
  loading?: boolean,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} loading={loading} />,
      path: routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
    // {
    //   text: translate('tabs.runs.text'),
    //   Component: FilterWrapperForRun,
    //   path: routePaths.stackComponents.runs(
    //     locationPath.split('/')[4],
    //     stackId,
    //     selectedWorkspace,
    //   ),
    // },
    {
      text: 'Stacks',
      Component: FilterWrapperForStacks,
      path: routePaths.stackComponents.stacks(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
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
      to: routePaths.stackComponents.configuration(
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
  // const { flavourList } = GetFlavorsListForLogo();

  const { stackComponent, id, flavor, loading } = useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(id, locationPath, selectedWorkspace, loading);
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
      tabBasePath={routePaths.stackComponents.base(
        stackComponent.id,
        selectedWorkspace,
      )}
      breadcrumbs={breadcrumbs}
      title="Stack Components"
    >
      {/* <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>ID</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.id}</Paragraph>
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
            {stackComponent.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            )}
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
          <Paragraph style={paraStyle}>{stackComponent?.user?.name}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Created</Paragraph>
          <Paragraph style={paraStyle}>
            {formatDateToDisplayOnTable(stackComponent.created)}
          </Paragraph>
        </Box>
      </Box> */}
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
        {/* // ) : (
        //   <FullWidthSpinner color="black" size="md" />
        // )} */}

        {/* <StackComponenList
          filter={[]}
          pagination={false}
          isExpended={true}
          id={id}
        ></StackComponenList> */}
        {/* <>
          <table className={cn(styles.table)}>
            <tbody>
              <tr className={cn(styles.tableHeader)}>
                <th className={cn(styles.tableHeaderText)}>Id</th>
                <th className={cn(styles.tableHeaderText)}>Name</th>
                <th className={cn(styles.tableHeaderText)}>Flavor</th>
                <th className={cn(styles.tableHeaderText)}>Shared</th>
                <th className={cn(styles.tableHeaderText)}>Author</th>
                <th className={cn(styles.tableHeaderText)}>Created</th>
              </tr>
              <tr className={cn(styles.tableRow)}>
                <td>{stackComponent.id}</td>
                <td>{stackComponent.name}</td>
                <td>{stackComponent.flavor}</td>
                <td>{stackComponent.isShared}</td>
                <td>{stackComponent.user.name}</td>
                <td> {formatDateToDisplayOnTable(stackComponent.created)}</td>
              </tr>
            </tbody>
          </table>
        </> */}
      </Box>
    </BasePage>
  );
};

export default StackDetail;
