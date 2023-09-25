import React, { useState } from 'react';
import {
  FlexBox,
  Box,
  Row,
  FullWidthSpinner,
  EditField,
  PrimaryButton,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import { StackBox } from '../../../common/StackBox';
import { SidePopup } from '../../CreateStack/ListForAll/SidePopup';
import { NonEditableConfig } from '../../../NonEditableConfig';
import {
  useDispatch,
  useHistory,
  useLocation,
  useSelector,
} from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import {
  showToasterAction,
  stackComponentsActions,
  stacksActions,
} from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';
import { ToggleField } from '../../../common/FormElement';

export const Configuration: React.FC<{
  stackId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ stackId, tiles, fetching = false }) => {
  const { stack } = useService({ stackId });
  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const locationPath = useLocation() as any;

  const history = useHistory();

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedStackBox, setSelectedStackBox] = useState<any>();

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  const onCallApi = (name?: string, toggle?: boolean) => {
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );

    const body = {
      user: user?.id,
      workspace: id,
      is_shared: toggle,
      name: name,
    };
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/stacks/${stackId}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        dispatch(
          showToasterAction({
            description: 'Stack has been updated successfully.',
            type: toasterTypes.success,
          }),
        );

        dispatch(
          stacksActions.stackForId({
            stackId: stackId,
            onSuccess: () => setLoading(false),
            onFailure: () => setLoading(false),
          }),
        );
      })
      .catch((err) => {
        setLoading(false);

        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };

  const onPressEnter = (event?: any, defaultValue?: any) => {
    if (event.key === 'Enter') {
      onCallApi(event.target.value);
    }
  };

  return (
    <FlexBox.Column fullWidth>
      <FlexBox.Row flexDirection="column" marginLeft="md" marginTop="lg">
        <Box style={{ width: '30%' }}>
          <EditField
            disabled
            onKeyDown={(e: any) => onPressEnter(e, stack.is_shared)}
            onChangeText={(e: any) => onPressEnter(e, stack.is_shared)}
            label={'Stack Name'}
            optional={false}
            defaultValue={stack.name}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
        <Box marginTop="lg">
          <ToggleField
            name="Share Component with public"
            value={stack.isShared}
            onHandleChange={() => onCallApi(stack.name, !stack.isShared)}
            label="Share Component with public"
            disabled={true}
          />
        </Box>
      </FlexBox.Row>
      <Box margin="md">
        <Row>
          {tiles &&
            tiles.map((tile: any, index: number) => (
              <Box
                key={index}
                style={{ cursor: 'pointer' }}
                className={styles.tile}
                marginTop="md"
                marginLeft="md"
                onClick={() => {
                  setShowPopup(true);
                  setSelectedStackBox(tile);
                }}
              >
                <StackBox
                  image={tile.logo}
                  stackName={tile.name}
                  stackDesc={tile.type}
                />
              </Box>
            ))}
        </Row>
      </Box>

      {showPopup && (
        <SidePopup
          isCreate={false}
          onSeeExisting={() => {
            dispatch(
              stackComponentsActions.getMy({
                workspace: selectedWorkspace
                  ? selectedWorkspace
                  : locationPath.split('/')[2],
                type: selectedStackBox.type,

                page: 1,
                size: 1,
                id: selectedStackBox.id,
                onSuccess: () => {
                  history.push(
                    routePaths.stackComponents.configuration(
                      selectedStackBox.type,
                      selectedStackBox.id,
                      selectedWorkspace,
                    ),
                  );
                },
                onFailure: () => {},
              }),
            );
          }}
          onClose={() => {
            setShowPopup(false);
            setSelectedStackBox(null);
          }}
        >
          <Box marginTop="md" paddingBottom={'xxxl'}>
            <NonEditableConfig details={selectedStackBox}></NonEditableConfig>
          </Box>
        </SidePopup>
      )}
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
                routePaths.stacks.UpdateStack(selectedWorkspace, stack.id),
              )
            }
            className={styles.updateButton}
          >
            Update Stack
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
