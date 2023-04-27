import React, { useState } from 'react';

// import { Box, Paragraph, icons } from '../../../components';
// import { iconColors, iconSizes } from '../../../../constants';
// import { formatDateToDisplayOnTable } from '../../../../utils';
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
// import styles from './NestedRow.module.scss';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { Box } from '../../../components';
import {
  // stackPagesSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
// import { List } from '../Stacks/List';
// import { Box, Row } from '../../../components';
// import { StackBox } from '../../common/StackBox';

import logo from '../../../assets/logo.svg';
import { GetFlavorsListForLogo } from '../../stackComponents/Stacks/List/GetFlavorsListForLogo';
import { FullWidthSpinner } from '../../../components';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';

const FilterWrapperForRun = () => {
  const locationPath = useLocationPath();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const history = useHistory();
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForRuns()]);
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
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      >
        <Runs
          filter={getFilter(filters)}
          stackId={locationPath.split('/')[4]}
        />
      </FilterComponent>
      {/* <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton
            onClick={() =>
              history.push(routePaths.stacks.createStack(selectedWorkspace))
            }
          >
            Register New Stack
          </PrimaryButton>
        </Box>
      </FlexBox> */}
    </Box>
  );
};

const getTabPages = (
  stackId: TId,
  fetching: boolean,
  selectedWorkspace: string,
  tiles?: any,
  history?: any,
): TabPage[] => {
  return [
    // {
    //   text: 'Components',
    //   Component: () => (
    //     <Box margin="md">
    //       <Row className={styles.nestedrow}>
    //         {tiles &&
    //           tiles.map((tile: any, index: number) => (
    //             <Box
    //               key={index}
    //               className={styles.tile}
    //               marginTop="md"
    //               marginLeft="md"
    //               onClick={() => {}}
    //             >
    //               <StackBox
    //                 image={tile.logo}
    //                 stackName={tile.name}
    //                 stackDesc={tile.type}
    //               />
    //             </Box>
    //           ))}
    //       </Row>
    //     </Box>
    //   ),
    //   path: routePaths.stack.components(stackId, selectedWorkspace),
    // },
    {
      text: translate('tabs.configuration.text'),
      Component: () => (
        <Configuration fetching={fetching} tiles={tiles} stackId={stackId} />
      ),
      path: routePaths.stack.configuration(stackId, selectedWorkspace),
    },
    {
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.stack.runs(selectedWorkspace, stackId),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const workspaceName = url.searchParams.get('workspace');
const workspace = workspaceName ? workspaceName : DEFAULT_WORKSPACE_NAME;

const getBreadcrumbs = (
  stackId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.base + `?workspace=${workspace}`,
      // to: routePaths.stacks.list(selectedWorkspace),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId, selectedWorkspace),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();
  const filteredStacks: any = [];
  filteredStacks.push(stack);
  const history = useHistory();
  const nestedRowtiles = [];
  const { flavourList, fetching } = GetFlavorsListForLogo();
  // const stackComponentsMap = stackComponents.map((item) => {
  //   const temp: any = flavourList.find(
  //     (fl: any) => fl.name === item.flavor && fl.type === item.type,
  //   );
  //   if (temp) {
  //     return {
  //       ...item,
  //       flavor: {
  //         logoUrl: temp.logo_url,
  //         name: item.flavor,
  //       },
  //     };
  //   }
  //   return item;
  // });

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  if (Object.keys(stack).length === 0) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  if (flavourList?.length > 1) {
    for (const [key] of Object.entries(stack?.components)) {
      const { logo_url }: any = flavourList.find(
        (fl: any) =>
          fl.name === stack?.components[key][0]?.flavor &&
          fl.type === stack?.components[key][0]?.type,
      );
      console.log(logo, 'flavourListflavourList');

      nestedRowtiles.push({
        ...stack?.components[key][0],
        type: key,
        name: stack?.components[key][0]?.name,
        id: stack?.components[key][0]?.id,
        logo: logo_url,
      });
    }
  }

  const tabPages = getTabPages(
    stack.id,
    fetching,
    selectedWorkspace,
    nestedRowtiles,
    history,
  );
  const breadcrumbs = getBreadcrumbs(stack.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredStacks,
  });
  // const boxStyle = {
  //   backgroundColor: '#E9EAEC',
  //   padding: '10px 0',
  //   borderRadius: '8px',
  //   marginTop: '20px',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  // };
  // const headStyle = { color: '#828282' };
  const openDetailPage = (stack: TStack) => {
    history.push(routePaths.stacks.list(selectedWorkspace));
  };
  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stack.base(stack.id)}
      breadcrumbs={breadcrumbs}
      title="Stacks"
    >
      <Box marginTop="lg">
        <CollapseTable
          pagination={false}
          renderAfterRow={(stack: TStack) => <></>}
          headerCols={headerCols}
          tableRows={filteredStacks}
          emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
      {/* <List filter={[]} pagination={false} isExpended id={stack.id}></List> */}
      {/* <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>NAME</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>SHARED</Paragraph>
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
          <Paragraph style={headStyle}>AUTHOR</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack?.user?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>CREATED</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateToDisplayOnTable(stack.created)}
          </Paragraph>
        </Box>
      </Box> */}
    </BasePage>
  );
};

export default StackDetail;
