import React, { useEffect, useState } from 'react';

// import { Box, Paragraph, icons } from '../../../components';
// import { iconColors, iconSizes } from '../../../../constants';
// import { formatDateToDisplayOnTable } from '../../../../utils';
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { UpdateConfig } from './UpdateConfig';
// import styles from './NestedRow.module.scss';
// import { MetaData } from './Metadata';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocation, useSelector } from '../../../hooks';
// import FilterComponent, {
//   getInitialFilterStateForRuns,
// } from '../../../components/Filters';
import { Box } from '../../../components';
import {
  // stackPagesSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
// import { List } from '../Stacks/List';
// import { Box, Row } from '../../../components';
// import { StackBox } from '../../common/StackBox';

// import { GetFlavorsListForLogo } from '../../stackComponents/Stacks/List/GetFlavorsListForLogo';
// import { FullWidthSpinner } from '../../../components';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';

const getTabPages = (
  secretId: TId,
  selectedWorkspace: string,
  routeState?: any,
  // history?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.update.text'),
      Component: () => <UpdateConfig secretId={secretId} state={routeState} />,
      path: routePaths.secret.updateSecret(secretId, selectedWorkspace),
    },
    // {
    //   text: translate('tabs.metaData.text'),
    //   Component: () => <MetaData secretId={secretId}></MetaData>,
    //   path: routePaths.secret.metaData(secretId, selectedWorkspace),
    // },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const workspaceName = url.searchParams.get('workspace');
const workspace = workspaceName ? workspaceName : DEFAULT_WORKSPACE_NAME;

const getBreadcrumbs = (
  secretId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.secrets.text'),
      clickable: true,
      to: routePaths.secrets.base + `?workspace=${workspace}`,
      // to: routePaths.stacks.list(selectedWorkspace),
    },
    {
      name: secretId,
      clickable: true,
      to: routePaths.secret.configuration(secretId, selectedWorkspace),
    },
  ];
};

export interface SecretDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { secret } = useService();
  const location = useLocation();
  const filteredSecret: any = [];
  filteredSecret.push(secret);
  const history = useHistory();
  const [routeState, setRouteState] = useState({}) as any;

  useEffect(() => {
    setRouteState(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);

  // const { flavourList, fetching } = GetFlavorsListForLogo();
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

  // if (flavourList?.length > 1) {
  //   for (const [key] of Object.entries(secret?.components)) {
  //     const { logo_url }: any = flavourList.find(
  //       (fl: any) =>
  //         fl.name === secret?.components[key][0]?.flavor &&
  //         fl.type === secret?.components[key][0]?.type,
  //     );
  //     console.log(logo, 'flavourListflavourList');

  //     nestedRowtiles.push({
  //       ...secret?.components[key][0],
  //       type: key,
  //       name: secret?.components[key][0]?.name,
  //       id: secret?.components[key][0]?.id,
  //       logo: logo_url,
  //     });
  //   }
  // }
  console.log(secret, 'secretsecret');
  const tabPages = getTabPages(secret.id, selectedWorkspace, routeState);
  const breadcrumbs = getBreadcrumbs(secret.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredSecret,
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
  const openDetailPage = (secret: any) => {
    history.push(routePaths.secrets.list(selectedWorkspace));
  };
  return (
    <BasePage
      headerWithButtons
      singleTab={true}
      tabPages={tabPages}
      tabBasePath={routePaths.secret.base(secret.id)}
      breadcrumbs={breadcrumbs}
      title="Secrets"
    >
      <Box marginTop="lg">
        <CollapseTable
          pagination={false}
          renderAfterRow={(secret: any) => <></>}
          headerCols={headerCols}
          tableRows={filteredSecret}
          emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
