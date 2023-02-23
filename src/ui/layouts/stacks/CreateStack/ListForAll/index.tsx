import React from 'react';
import { Box, FlexBox, H2, FormTextField } from '../../../../components';
import { ToggleField } from '../../../common/FormElement';

import { stackComponentSelectors } from '../../../../../redux/selectors';
import { useSelector } from 'react-redux';
import { GetList } from './GetList';
import { GetFlavorsListForLogo } from '../../../stackComponents/Stacks/List/GetFlavorsListForLogo';

interface Props {}

export const ListForAll: React.FC<Props> = () => {
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const { flavourList } = GetFlavorsListForLogo();

  return (
    <Box style={{ width: '100%' }}>
      <Box>
        <H2 style={{ fontWeight: 'bolder' }}>Register a Stack</H2>
      </Box>

      <Box marginTop="lg">
        <FlexBox.Row>
          <Box style={{ width: '30%' }}>
            <FormTextField
              onChange={(e: any) => {}}
              placeholder="Stack Name"
              label={'Enter Stack Name'}
              value=""
            />
          </Box>
          <Box marginLeft="xxxl" marginTop="md" style={{ width: '30%' }}>
            <ToggleField
              label={'Share Stack with public'}
              onHandleChange={(key: any, value: any) => {}}
            />
          </Box>
        </FlexBox.Row>
      </Box>
      <FlexBox.Column>
        {stackComponentsTypes?.map((item) => {
          return (
            <Box marginTop="lg" style={{ overflowX: 'auto' }}>
              <GetList type={item} flavourList={flavourList}></GetList>
            </Box>
          );
        })}
      </FlexBox.Column>

      {/* <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <FlexBox.Row alignItems="center">
          <H3 style={{ fontWeight: 'bold' }}>Artifact Store</H3>
          <span style={helperTextStyle}>&#40;5 Components&#41;</span>
        </FlexBox.Row>
        <FlexBox.Row>
          <Box style={{ width: '171px' }}>
            <StackBox stackName="Create" stackDesc="Create a stack" />
          </Box>
          {Array(5)
            .fill(null)
            ?.map(() => (
              <Box marginLeft="md">
                <CustomStackBox
                  image={logo}
                  stackName="Sample"
                  stackDesc="example text"
                />
              </Box>
            ))}
        </FlexBox.Row>
      </Box> */}

      {/* <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <FlexBox.Row alignItems="center">
          <H3 style={{ fontWeight: 'bold' }}>Secret Manager</H3>
          <span style={helperTextStyle}>&#40;7 Components&#41;</span>
        </FlexBox.Row>
        <FlexBox.Row>
          <Box style={{ width: '171px' }}>
            <StackBox stackName="Create" stackDesc="Create a stack" />
          </Box>
          {Array(7)
            .fill(null)
            ?.map(() => (
              <Box marginLeft="md">
                <CustomStackBox
                  image={logo}
                  stackName="Sample"
                  stackDesc="example text"
                />
              </Box>
            ))}
        </FlexBox.Row>
      </Box> */}
    </Box>
  );
};
