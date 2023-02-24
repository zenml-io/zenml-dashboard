import React, { useState } from 'react';
import { Box, FlexBox, H2, FormTextField } from '../../../../components';
import { ToggleField } from '../../../common/FormElement';

import {
  sessionSelectors,
  stackComponentSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { GetList } from './GetList';
import { GetFlavorsListForLogo } from '../../../stackComponents/Stacks/List/GetFlavorsListForLogo';
import { SidePopup } from './SidePopup';
import { showToasterAction } from '../../../../../redux/actions';
import axios from 'axios';
import { toasterTypes } from '../../../../../constants';
import { useHistory } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
// import { callActionForStacksForPagination } from '../../Stacks/useService';

interface Props {}

export const ListForAll: React.FC<Props> = () => {
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  // const { dispatchStackData } = callActionForStacksForPagination();
  const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const { flavourList } = GetFlavorsListForLogo();
  const [stackName, setStackName] = useState('');
  const [isShared, setIshared] = useState(false);
  const [selectedStack, setSelectedStack] = useState<any>([]);
  const [selectedStackBox, setSelectedStackBox] = useState<any>();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const selectStack = (data: any) => {
    setShowPopup(true);
    setSelectedStackBox(data);
  };
  const onCreateStack = () => {
    if (!stackName) {
      return dispatch(
        showToasterAction({
          description: 'Enter Stack Name',
          type: toasterTypes.failure,
        }),
      );
    }
    const components = selectedStack.map((item: any) => {
      return { [item.type]: [item.id] };
    });
    var mergedObject = components.reduce((c: any, v: any) => {
      for (var k in v) {
        c[k] = c[k] || [];
        c[k].push(v[k][0]);
      }
      return c;
    }, {});
    if (!mergedObject.hasOwnProperty('orchestrator')) {
      return dispatch(
        showToasterAction({
          description: 'Select Atleast one component from Orchestrator',
          type: toasterTypes.failure,
        }),
      );
    }
    if (!mergedObject.hasOwnProperty('artifact_store')) {
      return dispatch(
        showToasterAction({
          description: 'Select Atleast one component from Artifact Store',
          type: toasterTypes.failure,
        }),
      );
    }
    const finalData = Object.assign({}, mergedObject);
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: stackName,
      components: finalData,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/stacks`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        // const id = response.data.id;

        // setLoading(false);
        dispatch(
          showToasterAction({
            description: 'Stack has been created successfully',
            type: toasterTypes.success,
          }),
        );
        // dispatchStackData(1, 10);
        history.push(routePaths.stacks.base);
        // dispatchStackComponentsData(1, 10);

        // history.push(
        //   routePaths.stackComponents.configuration(
        //     flavor.type,
        //     id,
        //     selectedWorkspace,
        //   ),
        // );
      })
      .catch((err) => {
        // debugger;
        // setLoading(false);
        // dispatch(
        //   showToasterAction({
        //     description: err?.response?.data?.detail[0],
        //     type: toasterTypes.failure,
        //   }),
        // );
      });
  };

  return (
    <Box style={{ width: '100%' }}>
      <Box>
        <H2 style={{ fontWeight: 'bolder' }}>Register a Stack</H2>
      </Box>

      <Box marginTop="lg">
        <FlexBox.Row>
          <Box style={{ width: '30%' }}>
            <FormTextField
              onChange={(e: any) => {
                setStackName(e);
              }}
              placeholder="Stack Name"
              label={'Enter Stack Name'}
              value={stackName}
            />
          </Box>
          <Box marginLeft="xxxl" marginTop="md" style={{ width: '30%' }}>
            <ToggleField
              label={'Share Stack with public'}
              onHandleChange={(value: any) => setIshared(!isShared)}
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

      {showPopup && (
        <SidePopup
          registerStack={() => {
            onCreateStack();
          }}
          onSeeExisting={() => {}}
          onClose={() => setShowPopup(false)}
        >
          <Box marginTop="md">
            {/* <FormTextField
              onChange={(e: any) => {}}
              placeholder=""
              label='Stack Name'
              value={selectedStackBox.name}
            /> */}
          </Box>
        </SidePopup>
      )}

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
