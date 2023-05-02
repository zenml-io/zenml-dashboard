import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppRoute } from '../../../routes';
import { Box, FlexBox, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs } from '../common/Tabs';
import Header from './Header';
import Stacks from './Stacks';
import Component from './Component';
// import { routePaths } from '../../../routes/routePaths';
// import { useLocationPath, useSelector } from '../../hooks';
// import { workspaceSelectors } from '../../../redux/selectors';

export const BasePage: React.FC<{
  tabPages: TabPage[];
  fromConfigureComponent?: boolean;
  fromRegisterComponent?: boolean;
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  title?: string;
  singleTab?: boolean;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  fromRegisterComponent = false,
  fromConfigureComponent = false,
  tabPages,
  breadcrumbs,
  singleTab = false,
  tabBasePath,
  renderHeaderRight,
  headerWithButtons,
  children,
  title,
}) => {
  // const history = useHistory();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const locationPath = useLocationPath();
  return (
    <>
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
          <FlexBox.Row
            justifyContent="space-between"
            style={{ marginTop: '-20px' }}
          >
            {!fromConfigureComponent && (
              <Component fromRegisterComponent={fromRegisterComponent} />
            )}

            {/* {fromConfigureComponent && (
              <Component fromRegisterComponent={fromRegisterComponent} />
            )} */}
            <Box
              marginLeft="lg"
              style={{ width: !fromConfigureComponent ? '80%' : '100%' }}
            >
              {children}
              {tabPages.length > 1 || singleTab ? (
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
          </FlexBox.Row>
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
        )} */}
      </AuthenticatedLayout>
    </>
  );
};

export default Stacks;
