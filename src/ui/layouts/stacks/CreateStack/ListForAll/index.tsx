import React, { useState } from 'react';
import { Box, FlexBox, H2, FormTextField } from '../../../../components';
import { ToggleField } from '../../../common/FormElement';

import { stackComponentSelectors } from '../../../../../redux/selectors';
import { useSelector } from 'react-redux';
import { GetList } from './GetList';
import { GetFlavorsListForLogo } from '../../../stackComponents/Stacks/List/GetFlavorsListForLogo';
import { SidePopup } from './SidePopup';

interface Props {}

export const ListForAll: React.FC<Props> = () => {
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const { flavourList } = GetFlavorsListForLogo();

  const [selectedStack, setSelectedStack] = useState<any>([]);
  const [selectedStackBox, setSelectedStackBox] = useState<any>();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  
  const selectStack = (data: any) => {
    setShowPopup(true)
    setSelectedStackBox(data)
  }

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

      {selectedStack?.length >= 0 && (
        <FlexBox.Row marginTop="md">
          {selectedStack?.map((e: any) => (
            <Box
              onClick={() => selectStack(e)}
              marginLeft="sm"
              style={{
                height: '60px',
                width: '60px',
                padding: '10px 3px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                border:
                  selectedStackBox?.id === e.id
                    ? '2px solid #431E93'
                    : '2px solid #fff',
                borderRadius: '6px',
              }}
            >
              <img
                src={e.flavor.logoUrl}
                alt={e.name}
                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
              />
            </Box>
          ))}
        </FlexBox.Row>
      )}

      <FlexBox.Column>
        {stackComponentsTypes?.map((item) => {
          return (
            <Box marginTop="lg" style={{ overflowX: 'auto' }}>
              <GetList
                type={item}
                flavourList={flavourList}
                selectedStack={selectedStack}
                setSelectedStack={setSelectedStack}
              />
            </Box>
          );
        })}
      </FlexBox.Column>

      {showPopup &&
        <SidePopup
          registerStack={() => {}} 
          onSeeExisting={() => {}}
          onClose={() => setShowPopup(false)}
        >
          <Box marginTop='md'>
            <FormTextField
              onChange={(e: any) => {}}
              placeholder=""
              label='Stack Name'
              value={selectedStackBox.name}
            />
          </Box>
        </SidePopup>
      }

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
