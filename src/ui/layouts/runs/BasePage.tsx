import React from 'react';
import { Box, FlexBox, IfElse, Paragraph, icons } from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { TabsRuns } from '../common/Tabs';
import Header from './Header';
import Stacks from './Stacks';
// Muhammad REACT FLOW BOX HERE
export const BasePage: React.FC<{
  tabPages: TabPage[];
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  tabPages,
  breadcrumbs,
  tabBasePath,
  renderHeaderRight,
  headerWithButtons,
  children,
}) => {
  return (
    <AuthenticatedLayout breadcrumb={[...breadcrumbs]}>
      <SidebarContainer>
        <IfElse
          condition={!!headerWithButtons}
          renderWhenTrue={() => (
            <Header.HeaderWithButtons
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

          <Box style={{ position: 'relative' }}>
            <Box>
              <TabsRuns pages={tabPages} basePath={tabBasePath} />
            </Box>

            <Box style={{ position: 'absolute', top: '-1rem', right: 0 }}>
              <FlexBox
                style={{
                  borderRadius: '4px',
                  border: '1px solid #DADADA',
                  background: '#ECECEC',
                  padding: '8px 20px',
                  cursor: 'pointer',
                }}
              >
                <Paragraph>Copy</Paragraph>
                <icons.copy
                  // onClick={handleCopy}
                  style={{ marginLeft: '10px' }}
                  color={iconColors.black}
                  size={iconSizes.sm}
                />
              </FlexBox>
            </Box>
          </Box>
        </Box>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default Stacks;
