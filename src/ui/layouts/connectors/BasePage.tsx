import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppRoute } from '../../../routes';
import { Box, FlexBox, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs } from '../common/Tabs';
import Header from './Header';
import Stacks from './Connectors';
// import { routePaths } from '../../../routes/routePaths';
// import { useSelector } from '../../hooks';
// import { workspaceSelectors } from '../../../redux/selectors';

export const BasePage: React.FC<{
  tabPages: TabPage[];
  singleTab?: boolean;
  title?: string;
  fromConfigureComponent?: boolean;
  fromRegisterComponent?: boolean;
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  // fromRegisterComponent = false,
  // fromConfigureComponent = false,
  tabPages,
  title,
  singleTab = false,
  breadcrumbs,
  tabBasePath,
  renderHeaderRight,
  headerWithButtons,
  children,
}) => {
  // const history = useHistory();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return (
    <AuthenticatedLayout breadcrumb={[...breadcrumbs]}>
      <SidebarContainer>
        <IfElse
          condition={!!headerWithButtons}
          renderWhenTrue={() => (
            <Header.HeaderWithButtons
              title={title}
              breadcrumbs={[...breadcrumbs]}
              renderRight={renderHeaderRight}
            />
          )}
          renderWhenFalse={() => (
            <Header.DefaultHeader
              breadcrumbs={[...breadcrumbs]}
              renderRight={renderHeaderRight}
            />
          )}
        />

        <Box>
          {children}
          {tabPages.length >= 1 && singleTab ? (
            <Tabs pages={tabPages} basePath={tabBasePath} />
          ) : (
            <>
              <FlexBox marginTop="xxl" marginBottom="sm"></FlexBox>
              <FlexBox marginBottom="xxl">
                {/* <Switch> */}
                <Redirect exact from={tabBasePath} to={tabPages[0].path} />
                {tabPages.map((page, index) => (
                  <AppRoute
                    key={index}
                    path={page.path}
                    exact={true}
                    component={page.Component}
                  />
                ))}
                {/* </Switch> */}
              </FlexBox>
            </>
          )}
        </Box>
      </SidebarContainer>

      {/* {!fromRegisterComponent && !fromConfigureComponent && (
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
              onClick={() =>
                history.push(
                  routePaths.connectors.registerConnectors(selectedWorkspace),
                )
              }
            >
              Register Connector
            </PrimaryButton>
          </Box>
        </FlexBox>
      )} */}
    </AuthenticatedLayout>
  );
};

export default Stacks;
